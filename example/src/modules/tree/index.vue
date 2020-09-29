<template>
    <div class="demo-wrap">
        <div class="title">tree树形组件</div>
        <x-tree :tree-config="treeConfig"></x-tree>
        <x-tree :tree-config="treeConfig2"></x-tree>
    </div>
</template>
<script>
// import tree from "../../../../src/tree";
export default {
    //  components:{
    //     tree
    // },
    data() {
        return {
            treeConfig: {
                search: true,
                expendIconPosition: "left",
                checkNodes: [],
                data: [
                    {
                        name: "test",
                        id: 1,
                        children: [
                            {
                                name: "child1-1",
                                id: 11,
                            },
                            {
                                name: "child1-2",
                                id: 12,
                            },
                        ],
                    },
                    {
                        name: "test2",
                        id: 2,
                    },
                ],
                checkbox: true,
                clickNode: (item) => {
                    console.log(item);
                },
            },
            treeConfig2: {
                showIcon: true,
                expendIconPosition: "right",
                data: [
                    {
                        name: "菜单1",
                        id: 1,
                        iconClass: "xue-icon xue-icon-ios-home-outline",
                        children: [
                            {
                                name: "child1",
                                id: 11,
                            },
                        ],
                    },
                    {
                        name: "菜单2",
                        id: 2,
                        iconClass: "xue-icon xue-icon-ios-home-outline",
                    },
                    {
                        name: "菜单3",
                        id: 2,
                        iconClass: "xue-icon xue-icon-ios-home-outline",
                    },
                    {
                        name: "菜单4",
                        id: 2,
                        iconClass: "xue-icon xue-icon-ios-home-outline",
                    },
                ],
                clickNode: (item) => {
                    console.log(item);
                },
            },
        };
    },
};
</script>
<style lang="scss">
.demo-wrap .xue-icon {
    display: inline-block;
    font-size: 20px;
    color: inherit;
}
</style>