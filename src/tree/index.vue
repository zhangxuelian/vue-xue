<template>
    <div class="x-tree-wrap" :class="{'tree-search': treeConf.search}">
        <div class="search-container" v-if="treeConf.search">
            <input type="text" class="csh-ipt" v-model="searchText">
        </div>
            <!-- <tree-node :nodeData="treeConf.data"></tree-node> -->
        <div class="x-tree-container" v-for="(item,$index) in treeConf.data" :key="$index">
            <div class="tree-content" v-if="!item.hideNode">
                <i
                    class="expand-icon"
                    v-if="item[treeConf.childName]"
                    :class="{'is-open':item.isOpen,[treeConf.iconClass]:true}"
                    @click.self="expend(item)"
                ></i>
                <x-checkbox
                    v-if="treeConf.checkbox"
                    v-model="item.checked"
                    :mixed="item.mixed"
                    @click.native="clickCheckbox(item)"
                    class="checkbox-box"
                ></x-checkbox>
                <span class="node-name" @click="clickNode(item)">{{item[treeConf.nodeName]}}</span>
            </div>
            <tree-node
                :nodeData="item[treeConf.childName]"
                v-if="item[treeConf.childName] && item.isOpen"
            ></tree-node>
        </div>
    </div>
</template>
<script>
import treeNode from "./tree_node";
import xCheckbox from "../checkbox";
import normalUtil from "../util/data_util";
export default {
    name: 'x-tree',
    props: ["treeConfig"],
    components: {
        treeNode,
        xCheckbox,
    },
    provide() {
        return {
            $treeRoot: this,
        };
    },
    data() {
        return {
            defaultTreeConf: {
                data: [],
                nodeName: "name", // 节点标题字段名
                childName: "children", // 子节点列表字段名
                uniqueId: "id", // 唯一标识字段名
                showIcon: false, // 是否展示图标 false
                iconClass: "", // 自定义图标样式名
                checkbox: false,
                search: false, // 是否支持搜索
                checkNodes: [],
                expendAll: false, // 是否展开所有节点
                expandOnClick: true, // 是否在选中树节点时展开子列表 true
                accordion: false, // 是否手风琴模式 false
                checkNode: function(){}, // 选中节点
                clickNode: function(){}, // 单击节点
                completeTree: function(){} // 树构建完成
            },
            treeNodeMap: {},
            searchText: ''
        };
    },
    mounted() {
        this.initTree(this.treeConf.data);
    },
    methods: {
        initTree(data, parentId) {
             this.treeConf.checkNodes = [];
            data.forEach((item) => {
                if (parentId) {
                    item.parentId = parentId;
                }
                // 复选框初始化
                if (this.treeConf.checkbox) {
                    if(item.checked){
                        this.clickCheckbox(item);
                    } 
                }
                if(this.treeConf.expendAll){
                    this.$set(item,'isOpen',true);
                }
                this.treeNodeMap[item[this.treeConf.uniqueId]] = item;
                if (
                    item[this.treeConf.childName] &&
                    item[this.treeConf.childName].length
                ) {
                    this.initTree(
                        item[this.treeConf.childName],
                        item[this.treeConf.uniqueId]
                    );
                }
            });
            // 树构建完成
            if (parentId == undefined) {
                if (normalUtil.isFunction(this.treeConf.completeTree)) {
                    this.treeConf.completeTree();
                }
            }
        },
        clickCheckbox(item){
            this.$set(item, "mixed",false);
            this.checkNodesStatus(item);
            // 子节点
            if(item[this.treeConf.childName]&&item[this.treeConf.childName].length){
                this.judgeChildNode(item);
            }
            // 父节点
            if(item.parentId){
                this.judgeParent(this.treeNodeMap[item.parentId]);
            }
            // 勾选完成回调
            if (normalUtil.isFunction(this.treeConf.checkNode)) {
                this.treeConf.checkNode(item);
            }
              
        },
        checkNodesStatus(item){
            var index = normalUtil.eleInArr(this.treeConf.checkNodes,this.treeConf.uniqueId,item[this.treeConf.uniqueId]);
            if(index>-1){
                  this.treeConf.checkNodes.splice(index,1);
            } else{
                this.treeConf.checkNodes.push(item);
            }
        },
        judgeChildNode(node){
            node[this.treeConf.childName].forEach(item=>{
                this.$set(item,"checked",node.checked);
                this.checkNodesStatus(item);
                // 递归子节点
                if(item[this.treeConf.childName] && item[this.treeConf.childName].length){
                    this.judgeChildNode(item);
                }
            })
        },
        judgeParent(parent){
            let mixed = false;
            let checked = true; 
            parent[this.treeConf.childName].forEach(item=>{
                if(item.checked){
                    mixed = true;
                } else if(item.mixed){
                      mixed = true;
                      checked = false; 
                    } else{
                        checked = false; 
                    }
            })
            if(checked){
                this.checkNodesStatus(parent);
                this.$set(parent, "checked", true);
                this.$set(parent, "mixed",false);
            } else if(mixed){
                this.$set(parent, "mixed",true);
                this.$set(parent, "checked", false);
            } else {
                this.$set(parent, "mixed",false);
                this.$set(parent, "checked", false);
            }
            // 递归父节点
            if(parent.parentId){
                this.judgeParent(this.treeNodeMap[parent.parentId]);
            }
        },
        expend(item){
            this.$set(item, "isOpen", !item.isOpen);
            if (this.treeConf.accordion) {
                this.cllapseNode(item);
            }
        },
        // 手风琴收起其他兄弟节点
        cllapseNode(node) {
            let parent;
            if (node.parentId) {
                parent = this.treeNodeMap[node.parentId][
                    this.treeConf.childName
                ];
            } else {
                parent = this.treeConf.data;
            }
            if (parent.length > 1) {
                parent.forEach((item) => {
                    if (
                        item[this.treeConf.uniqueId] !=
                        node[this.treeConf.uniqueId]
                    ) {
                        this.$set(item, "isOpen", false);
                    }
                });
            }
        },
        // 单击节点
        clickNode(node){
            if(this.treeConf.expandOnClick){
                this.expend(node)
            }
            if (normalUtil.isFunction(this.treeConf.clickNode)) {
                this.treeConf.clickNode(node);
            }
        },
        filterNode(data){
            data.forEach(item=> {
                // 节点未包含搜索关键字，当其兄弟节点全都未包含搜索关键字时，父节点才隐藏
                if (item[this.treeConf.nodeName].indexOf(this.searchText) == -1) {
                    this.$set(item,'hideNode',true);
                } else {
                // 节点包含搜索关键字，其父节点也取消隐藏
                    this.filterParentNode(item);
                }
                if (item[this.treeConf.childName] && item[this.treeConf.childName].length) {
                    this.filterNode(item[this.treeConf.childName]);
                }
            })
        },
        filterParentNode(node){
            this.$set(node,'hideNode',false);
            this.$set(node,'isOpen',true);
              if(node.parentId){
                  this.filterParentNode(this.treeNodeMap[node.parentId]); 
              }
        },
    },
    watch: {
        "treeConf.data": function (newVal, oldVal) {
            if (newVal) {
                this.initTree(this.treeConf.data);
            }
        },
        searchText: function(newVal,oldVal){
            this.filterNode(this.treeConf.data);
        }
    },
    computed: {
        treeConf() {
            return Object.assign(this.defaultTreeConf, this.treeConfig);
        },
    },
   
};
</script>
<style lang="scss">
.x-tree-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    // color: #fff;
    overflow: auto;
    .x-tree-item {
        position: relative;
        padding-left: 20px;
    }
    .tree-content {
        display: flex;
        align-items: center;
        height: 26px;
        cursor: pointer;
        position: relative;
        padding-left: 20px;
        .expand-icon {
            position: absolute;
            left: 0;
            display: inline-block;
            width: 16px;
            height: 16px;
            transition: all 0.3s ease-out;
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACIUlEQVRIS+2Ty2sTURTGvzO2u1opPuuyM6n4FhERUdD/ITMrd25EOiMiSqEUFYWgqGhRjKHWruoi+Cppy4QU3Pk/lKbWB0RUhNZOOmmSHrmTEWLT5OZF3eSu7/d95/zOOcTMm7CBj1qBzabdQtpsovi/SJ+8Sp7L53gIxBHLCPQ30t6Ld8ndixl+qwCd7bR65oLe+034/dPhUHT2GRjnvSCiR5auXqkndPj1bHc6h2kAvULfRsrpi3rPh5LA0cn57b+X8nEGHyxk4oGpa9dqCQ3HZnZl0jRNoD1CpwChPkMb/OtRMsPh8Y/blt28zcDhwie+Vy3ekfEvO5fcTALAXq9g8G3TCNwoLnjdpQm/SW5dybIN4IgnVHDHDGoDlTqN2J92uAtZEbbP/3fTMrRbazVlt/RlLNX1Pe3YBBz1RSGrCE2xkTcKJ5dgxv5CgTRoBtXQegVWPItIbKZr2VGmiHCsHCIxgrSbF50dEPyhYMAKanfL0ZDe4XP76xZnwZ0CcHwtKi8ssxoH8yEvDNxvGYH7ldBLA4V4bOJz509nZRLACX97r7e3UTib5bi/XEygq6ahPpRtdFWBwmT0/fzmxR+5CTBO+tubAqhbdKaQcrlP73ksCyu5Q5kgmpjrSP3iGMCn/L9MRJapq09l2rJ3KBNGonMdLvMYwGcJdMk01BGZRnqHtRjU+rfqGdZqXPdZNCuo7hk2WkALaaMES/QbjvQP/Q4MLDnxrlEAAAAASUVORK5CYII=");
            background-size: 100% 100%;
            transform: rotate(-90deg);
            &.is-open {
                transform: rotate(0);
            }
        }
        .checkbox-box{
            margin-right: 8px;
        }
        .node-name{
            display:inline-block;
            width: 100%;
        }
        &:hover{
            background-color: #cee0f0;
        }
    }
}
</style>