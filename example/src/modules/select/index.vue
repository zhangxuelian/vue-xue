<template>
    <div class="demo-wrap">
        <div class="title">select选择器</div>
        <h4>单选可过滤</h4>
        <x-select :select-config="selectConfig1"></x-select>
        <h4>单选不可过滤</h4>
        <x-select :select-config="selectConfig2"></x-select>
        <h4>多选可过滤</h4>
        <x-select :select-config="selectConfig3"></x-select>
        <h4>禁用</h4>
        <x-select :select-config="selectConfig4" :disabled="true"></x-select>
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
                setValue:'2'
            },
        };
    },
};
</script>