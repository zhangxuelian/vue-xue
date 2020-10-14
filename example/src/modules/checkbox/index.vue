<template>
    <div class="demo-wrap">
        <div class="title">checkbox复选框</div>
        <x-checkbox v-model="isCheck" value="香蕉">测试</x-checkbox>
        <div>选中状态{{isCheck}}</div>
        <div class="title">禁用</div>
        <x-checkbox v-model="isCheck" value="香蕉" :disabled="true">测试</x-checkbox>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isCheck: false
        };
    },
    methods:{
        clickEvt(){
            console.log(12121)
        }
    }
};
</script>