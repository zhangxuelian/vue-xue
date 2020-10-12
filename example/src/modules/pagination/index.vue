<template>
    <div class="demo-wrap">
        <div class="title">基础用法</div>
        <x-pagination :total="100" v-model="page"></x-pagination>
        <div class="title">
             button按钮
        </div>
       <x-pagination :showTotal="false" :total="100" v-model="page" :type="'button'" @change="pageChange"></x-pagination>
    </div>
</template>
<script>
export default {
    data(){
        return {
            page:1
        }
    },
    methods:{
        pageChange(page){
            console.log(page)
        }
    }
}
</script>