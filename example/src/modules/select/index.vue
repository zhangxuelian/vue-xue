<template>
    <div>
         <x-select :select-config="selectConfig"></x-select>
    </div>
</template>
<script>
export default {
    data(){
        return {
            selectConfig:{
              checkbox: true,
              data:[{
                label:'ceshi',
                value:'1'
              },{
                 label:'ceshi2',
                  value:'2'
              }]
            }
        }
    }
}
</script>
<style lang="scss">
</style>