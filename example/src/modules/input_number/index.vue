<template>
    <div>
         <x-input-number :number-config="numberConfig" v-model="number"></x-input-number>
    </div>
</template>
<script>
import xInputNumber from "../../../../src/input_number";
export default {
    components:{
        xInputNumber
    },
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