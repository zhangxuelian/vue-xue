<template>
  <div class="">
    <div>这是弹窗内容</div>
       <x-switch :params="switchParams"></x-switch>
       <x-checkbox v-model="check"></x-checkbox>
      <x-number-keyboard>1212</x-number-keyboard>
    
  </div>
</template>

<script>
export default {
  data(){
    return {
      check:false,
         switchParams: {
                type:'text',
                data: [
                    {
                        value: "face",
                        label: "开启",
                    },
                    {
                        value: "card",
                        label: "关闭",
                    },
                ],
                activeValue: "face",
                valueField: "value",
                textField: "label",
            },
      radioValue:""
    }
  },
  mounted(){
  }
}
</script>

<style>

</style>