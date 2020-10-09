<template>
    <div class="demo-wrap">
        <div class="title">radio单选框</div>
        <x-radio v-model="radioValue" value="male">男</x-radio>
        <x-radio v-model="radioValue" value="female">女</x-radio>
        <div class="title">禁用</div>
        <x-radio v-model="radioValue" value="male" :disabled="true">男</x-radio>
        <x-radio v-model="radioValue" value="female" :disabled="true">女</x-radio>
    </div>
</template>
<script>
export default {
    data(){
        return {
            radioValue: "",
        }
    },
    watch:{
        radioValue(){
            console.log(this.radioValue);
        }
    }
}
</script>