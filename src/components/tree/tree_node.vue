<template>
    <div>
        <div class="x-tree-item" v-for="(item,$index) in nodeData" :key="$index">
            <div class="tree-content" v-if="!item.hideNode">
                <i
                    class="expand-icon"
                    v-if="item[$treeRoot.treeConf.childName]"
                    :class="{'is-open':item.isOpen,[$treeRoot.treeConf.iconClass]:true}"
                    @click.self="expend(item)"
                ></i>
                <x-checkbox
                  v-if="$treeRoot.treeConf.checkbox"
                  v-model="item.checked"
                   :mixed="item.mixed"
                   @click.native="clickCheckbox(item)"
                    class="checkbox-box"
                  ></x-checkbox>
                <span class="node-name" @click="clickNode(item)">{{item[$treeRoot.treeConf.nodeName]}}</span>
            </div>
            <tree-node
                :nodeData="item[$treeRoot.treeConf.childName]"
                v-if="item[$treeRoot.treeConf.childName] && item.isOpen"
            ></tree-node>
        </div>
    </div>
</template>
<script>
import xCheckbox from "../checkbox";
export default {
    name: "treeNode",
    inject: ["$treeRoot"],
    components:{
        xCheckbox
    },
    props: {
        nodeData: {},
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {
        expend(item) {
            this.$treeRoot.expend(item);
        },
        clickCheckbox(item){
            this.$treeRoot.clickCheckbox(item);
        },
        clickNode(node){
            this.$treeRoot.clickNode(node);
        }
    },
};
</script>
<style lang="scss" scoped>
</style>