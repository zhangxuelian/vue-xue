## 组件说明
select组件

:::demo 
```html
<template>
    <div class="demo-wrap">
        <div class="title">select选择器</div>
        <div>单选可过滤</div>
        <x-select :select-config="selectConfig1"></x-select>
        <div>单选不可过滤</div>
        <x-select :select-config="selectConfig2"></x-select>
        <div >多选可过滤</div>
        <x-select :select-config="selectConfig3"></x-select>
        <div >禁用</div>
        <x-select :select-config="selectConfig4" :disabled="true"></x-select>
        <div >自定义条目</div>
        <x-select :select-config="selectConfig5"  @change="change"></x-select>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectConfig1: {
                data: [
                    {
                        label: "ceshi",
                        value: "1",
                    },
                    {
                        label: "ceshi2",
                        value: "2",
                    },
                ],
                onSelect: (item) => {
                    console.log(item);
                },
                clearAll: ()=>{
                    console.log('清空了');
                }
            },
            selectConfig2: {
                filter: false,
                data: [
                    {
                        label: "ceshi",
                        value: "1",
                    },
                    {
                        label: "ceshi2",
                        value: "2",
                    },
                ],
                panelHeight: "auto",
            },
            selectConfig3: {
                checkbox: true,
                data: [
                    {
                        label: "ceshi",
                        value: "1",
                    },
                    {
                        label: "ceshi2",
                        value: "2",
                    },
                ],
            },
            selectConfig4: {
                data: [
                    {
                        label: "ceshi",
                        value: "1",
                    },
                    {
                        label: "ceshi2",
                        value: "2",
                    },
                ],
                setValue:'2',
                panelHeight: "auto",
            },
            selectConfig5: {
                create: true,
                data: [
                    {
                        label: "ceshi",
                        value: "ceshi",
                    },
                    {
                        label: "ceshi2",
                        value: "ceshi2",
                    },
                ],
                setValue:'ceshi3',
                panelHeight: "auto",
                onSelect:item=>{
                    console.log(item)
                }
            },
        };
    },
    methods:{
        change(value){
            console.log(value)
        }
    }
};
</script>

```
:::
