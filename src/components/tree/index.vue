<template>
    <div class="x-tree-wrap" :class="{'tree-search': treeConf.search}">
        <div class="search-container" v-if="treeConf.search">
            <input type="text" class="search-ipt xui-input" v-model="searchText" :placeholder="treeConf.placeholderText">
        </div>
        <tree-node :nodeData="treeConf.data"></tree-node>
        <!-- <div class="x-tree-container" v-for="(item,$index) in treeConf.data" :key="$index">
            <div class="tree-content" v-if="!item.hideNode">
                <i
                    class="expand-icon"
                    v-if="item[treeConf.childName]"
                    :class="{'is-open':item.isOpen}"
                    @click.self="expend(item)"
                ></i>
                <x-checkbox
                    v-if="treeConf.checkbox"
                    v-model="item.checked"
                    :mixed="item.mixed"
                    @click.native="clickCheckbox(item)"
                    class="checkbox-box"
                ></x-checkbox>
                <span class="node-icon" v-if="treeConf.showIcon">
                    <i v-if="item.iconClass" :class="{[item.iconClass]:true}"></i>
                    <i v-if="!item.iconClass && treeConf.icon.commonIconClass" :class="{[treeConf.icon.commonIconClass]:true}"></i>
                    <i v-if="!item.iconClass && !treeConf.icon.commonIconClass" :class="[item[treeConf.childName]?treeConf.icon.parentIconClass:treeConf.icon.leafIconClass]"></i> 
                </span>
                <span class="node-name" @click="clickNode(item)">{{item[treeConf.nodeName]}}</span>
            </div>
            <tree-node
                :nodeData="item[treeConf.childName]"
                v-if="item[treeConf.childName] && item.isOpen"
            ></tree-node>
        </div> -->
    </div>
</template>
<script>
import treeNode from "./tree_node";
import xCheckbox from "../checkbox";
import normalUtil from "@/util/data_util";
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
                placeholderText:"输入关键字过滤", // 自定义搜索placehoher文案
                nodeName: "name", // 节点标题字段名
                childName: "children", // 子节点列表字段名
                uniqueId: "id", // 唯一标识字段名
                showIcon: false, // 是否展示图标 false
                icon: {
                    // 当showIcon为true
                    // 1.如果子节点设置了iconClass,则优先展示iconClass的样式,如果没有：
                    // 2.如果设置了commonIconClass,则优先展示commonIconClass, 如果没有：
                    // 3.按是否有子节点来划分节点图标
                    commonIconClass: '', // 所有节点统一图标
                    parentIconClass: '', // 有子节点的节点图标 className
                    leafIconClass: '' // 无节点的节点图标 className
                },
                checkbox: false, // 是否多选
                search: false, // 是否支持搜索
                expendIconPosition: 'left',// 展开节点位置 'left'/'right'
                expendAll: false, // 是否展开所有节点
                expandOnClick: true, // 是否在选中树节点时展开子列表 true
                accordion: false, // 是否手风琴模式 false
                getCheckNodes: function(){},// 获取勾选的节点数组
                checkNode: function(){}, // 选中节点
                clickNode: function(){}, // 单击节点
                completeTree: function(){} // 树构建完成
            },
            treeNodeMap: {},
            checkNodes: [], // 选中的节点数组
            searchText: '',
            currentSelectedNode: '' // 当前选中节点
        };
    },
    mounted() {
        this.initTree(this.treeConf.data);
    },
    methods: {
        initTree(data, parentId) {
             this.checkNodes = [];
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
                if(item.isOpen){
                    this.filterParentNode(item);
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
             var index = normalUtil.eleInArr(this.checkNodes,this.treeConf.uniqueId,item[this.treeConf.uniqueId]);
            if(index<0 &&(item.checked || item.mixed)){
                this.checkNodes.push(item);
            } else if(index>-1 && !item.checked && !item.mixed){
                this.checkNodes.splice(index,1);
            }
        },
        judgeChildNode(node){
            node[this.treeConf.childName].forEach(item=>{
                this.$set(item,"checked",node.checked);
                this.$set(item,"mixed",false);
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
                this.$set(parent, "checked", true);
                this.$set(parent, "mixed",false);
            } else if(mixed){
                this.$set(parent, "mixed",true);
                this.$set(parent, "checked", false);
            } else {
                this.$set(parent, "mixed",false);
                this.$set(parent, "checked", false);
            }
            this.checkNodesStatus(parent);
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
            this.currentSelectedNode = node[this.treeConf.uniqueId];

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
        checkNodes(){
            if (normalUtil.isFunction(this.treeConf.getCheckNodes)) {
                this.treeConf.getCheckNodes(this.checkNodes);
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

</style>