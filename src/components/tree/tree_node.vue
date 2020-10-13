<template>
    <div>
        <div class="x-tree-item" v-for="(item,$index) in nodeData" :key="$index">
            <div class="tree-content" v-if="!item.hideNode">
                <div class="expand-box" @click="expend(item)"  v-if="item[$treeRoot.treeConf.childName]" :class="{'expand-right':$treeRoot.treeConf.expendIconPosition ==='right'}">
                    <i
                        class="expand-icon"
                        :class="{'is-open':item.isOpen}"
                    ></i>
                </div>

                <x-checkbox
                    v-if="$treeRoot.treeConf.checkbox"
                    v-model="item.checked"
                    :mixed="item.mixed"
                    @change="clickCheckbox(item)"
                    class="checkbox-box"
                ></x-checkbox>
                <span class="node-icon" v-if="$treeRoot.treeConf.showIcon">
                    <i v-if="item.iconClass" :class="{[item.iconClass]:true}"></i>
                    <i v-if="!item.iconClass && $treeRoot.treeConf.icon.commonIconClass" :class="{[$treeRoot.treeConf.icon.commonIconClass]:true}"></i>
                    <i v-if="!item.iconClass && !$treeRoot.treeConf.icon.commonIconClass" :class="[item[$treeRoot.treeConf.childName]?$treeRoot.treeConf.icon.parentIconClass:$treeRoot.treeConf.icon.leafIconClass]"></i> 
                </span>
                <span
                    class="node-name"
                    @click="clickNode(item)"
                    :title="item[$treeRoot.treeConf.nodeName]"
                >{{item[$treeRoot.treeConf.nodeName]}}</span>
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
    components: {
        xCheckbox,
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
        clickCheckbox(item) {
            this.$treeRoot.clickCheckbox(item);
        },
        clickNode(node) {
            this.$treeRoot.clickNode(node);
        },
    },
};
</script>
<style lang="scss" scoped>
</style>