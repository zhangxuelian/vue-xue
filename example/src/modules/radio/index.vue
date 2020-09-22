<template>
    <div class="radio-box">
        <h3>基本用法</h3>
        <x-radio v-model="radioValue" value="male">男</x-radio>
        <x-radio v-model="radioValue" value="female">女</x-radio>
    </div>
</template>
<script>
import xRadio from "../../../../src/radio";
export default {
    components:{
        xRadio
    },
    data(){
        return {
            radioValue: "",
        }
    }
}
</script>
<style lang="scss">
.radio-box{
    padding:15px;
}
</style>