## 组件说明
tree组件


:::demo 
```html
<template>
    <div class="demo-wrap">
        <div class="title">tree树形组件</div>
        <x-tree :tree-config="treeConfig"></x-tree>
        <x-tree :tree-config="treeConfig2"></x-tree>
    </div>
</template>
<script>
export default {
    data() {
        return {
            treeConfig: {
                search: true,
                expendIconPosition: "left",
                expendAll:false,
                    expandOnClick:false,
                data: [
                    {
                        name: "test",
                        id: 1,
                        children: [
                            {
                                name: "child1-1",
                                id: 11,
                                children:[{
                                    name: "child1-1-1",
                                     isOpen:true,
                                     checked:true,
                                    id: 111,
                                },{
                                    name: "child1-1-2",
                                    id: 112,
                                }]
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
                    {
                        name: "test3",
                        id: 3,
                    },
                ],
                checkbox: true,
                clickNode: (item) => {
                    console.log(item);
                },
                getCheckNodes:(checkNodes)=>{
                    console.log(checkNodes)
                }
            },
            treeConfig2: {
                showIcon: true,
                expendIconPosition: "left",
                expandOnClick:false,
                icon:{
                    parentIconClass:'xue-icon xue-icon-ios-compass',
                    leafIconClass:'xue-icon xue-icon-ios-home-outline'
                },
                data: [
                    {
                        name: "菜单1",
                        id: 1,
                        // iconClass: "xue-icon xue-icon-ios-home-outline",
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
                         children: [
                            {
                                name: "child21",
                                id: 21,
                            },
                            {
                                name: "child22",
                                id: 22
                            },
                        ],
                        
                    },
                    {
                        name: "菜单3",
                        id: 3,
                    },
                    {
                        name: "菜单4",
                        id: 4,
                    },
                ],
                clickNode: (item) => {
                    console.log(item);
                },
                getCheckNodes:(checkNodes)=>{
                    console.log(checkNodes)
                }
            },
        };
    },
    methods:{
        
    }
};
</script>
<style lang="scss">
.demo-wrap .xue-icon {
    display: inline-block;
    font-size: 20px;
    color: inherit;
}
</style>
```
:::