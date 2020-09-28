<template>
    <div class="demo-wrap">
         <x-input-number :number-config="numberConfig" v-model="number"></x-input-number>
    </div>
</template>
<script>
export default {
    data(){
        return {
             numberConfig:{
                 max:10,
                 min:0
            },
            number:2
        }
    }
}
</script>