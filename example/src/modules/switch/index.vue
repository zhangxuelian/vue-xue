<template>
    <div class="demo-wrap">
       
        <div class="title"> 默认开关</div>
        <x-switch :params="switchParams1" @change="change"></x-switch>
        <div class="title"> 带文字开关</div>
            <x-switch :params="switchParams"></x-switch>
            <div class="title">禁用</div>
            <x-switch :params="switchParams2"></x-switch>
    </div>
</template>

<script>
export default {
    data() {
        return {
            switchParams: {
                type:'text',
                data: [
                    {
                        value: "face",
                        label: "开启",
                    },
                    {
                        value: "card",
                        label: "关闭",
                    },
                ],
                activeValue: "face",
                valueField: "value",
                textField: "label",
            },
            switchParams1: {
                activeValue: 0,
            },
            switchParams2: {
                activeValue: 0,
                disabled: true
            }
        };
    },
    methods:{
        change(params){
            console.log(params)
        }
    }
};
</script>

<style>
</style>