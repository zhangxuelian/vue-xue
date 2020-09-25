<template>
    <div class="transfer-box">
        <x-transfer :transfer-config="transferConfig"></x-transfer>
    </div>
</template>
<script>
/* import xTransfer from "../../../../src/transfer"; */
export default {
    /* components:{
        xTransfer
    }, */
    data(){
        return {
            transferConfig:{
                data:[{
                    value:'11',
                    label: '测试1'
                },{
                     value:'12',
                    label: '测试2'
                }]
            }
        }
    }
}
</script>
<style lang="scss">
.transfer-box{
    width:500px;
    height:300px;
}
</style>