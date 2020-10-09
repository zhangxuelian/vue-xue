<template>
    <div>
        <xable :table-config="tableConfig"></xable>
    </div>
</template>
<script>
import xable from "../../../../src/components/table";
export default {
    components: {
        xable,
    },
    data() {
        return {
            tableConfig: {
                showIndex: true, //显示序号
                checkbox: true,
                colunms: [
                    {
                        label: "标题栏1",
                        name: "name1",
                    },
                    {
                        label: "标题栏2",
                        name: "name2",
                    },
                    {
                        label: "标题栏3",
                        name: "name3",
                    },
                    {
                        label: "标题栏4",
                        name: "name4",
                    },
                    {
                        label: "标题栏5",
                        name: "name5",
                    },
                    {
                        label: "标题栏6",
                        name: "name6",
                    },
                ],
                rows: [
                    {
                        id: 1,
                        name1: 1,
                        name2: 1,
                        name3: 1,
                        name4: 1,
                        name5: 1,
                        name6: 1,
                    },
                    {
                        id: 2,
                        name1: 2,
                        name2: 2,
                        name3: 2,
                        name4: 2,
                        name5: 2,
                        name6: 2,
                    },
                    {
                        id: 3,
                        name1: "内容3",
                        name2: "内容3",
                        name3: "内容3",
                        name4: "内容3",
                        name5: "内容3",
                        name6: "内容3",
                    },
                ],
                optConfigExt: [
                    {
                        optName: "操作",
                        optStyle: {
                            width: "130px",
                        },
                        optContent: [
                            {
                                id: "add",
                                name: "添加",
                                showText: false,
                                className:
                                    "xue-icon xue-icon-ios-add-circle-outline",
                                callback: function (row) {
                                    console.log(row);
                                },
                                formatter: function (row) {
                                    return true;
                                },
                            },
                            {
                                id: "view",
                                name: "查看",
                                showText: true,
                                className:
                                    "xue-icon xue-icon-ios-create-outline",
                                formatter: function () {
                                    return true;
                                },
                            },
                            {
                                id: "cancle",
                                showText: true,
                                name: "取消",
                                className:
                                    "xue-icon xue-icon-ios-trash-outline",
                                formatter: function (row) {
                                    return false;
                                },
                            },
                        ],
                    },
                ],
                toolbar:{
                    show:true,
                    title:'列表',
                    tools:[{
                        text: '刷新',
                        icon: 'xui-icon xui-icon-ios-refresh',
                        callback: function () {
                            console.log(1)
                        }
                    },{
                        text: '刷新',
                        icon: 'xui-icon xui-icon-ios-refresh',
                    }]
                }
            },
        };
    },
};
</script>