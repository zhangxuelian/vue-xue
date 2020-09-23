<template>
    <div>
        <div class="title">复选框</div>
        <x-checkbox v-model="isCheck" value="香蕉">测试</x-checkbox>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isCheck: false
        }
    }
    
}
</script>