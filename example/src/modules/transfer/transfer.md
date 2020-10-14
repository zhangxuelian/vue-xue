## 组件说明
transfer组件
:::demo 
```html
<template>
     <div class="demo-wrap">
         <div class="title">transfer穿梭框</div>
         <div class="transfer-box">
            <x-transfer :transfer-config="transferConfig"></x-transfer>
         </div>
    </div>
</template>
<script>
export default {
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
<style lang="scss" scoped>
.transfer-box{
    width:500px;
    height:300px;
}
</style>
```
:::