<template>
    <div class="demo-wrap">
        <h3>radio单选框</h3>
        <x-radio v-model="radioValue" value="male">男</x-radio>
        <x-radio v-model="radioValue" value="female">女</x-radio>
    </div>
</template>
<script>
export default {
    data(){
        return {
            radioValue: "",
        }
    }
}
</script>