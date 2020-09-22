<template>
    <div>
         <x-select :select-config="selectConfig"></x-select>
    </div>
</template>
<script>
import xSelect from "../../../../src/select";
export default {
    components:{
        xSelect
    },
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