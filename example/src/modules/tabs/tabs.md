## 组件说明
tabs组件

:::demo 
```html
<template>
    <div>
        <p>基础用法</p>
        <x-tabs v-model="active" @click="tabClick">
            <x-tab-pane label="菜单1" value='11'>菜单1内容</x-tab-pane>
            <x-tab-pane label="菜单2" value='12'>菜单2内容</x-tab-pane>
            <x-tab-pane label="菜单3" value='13' >菜单3内容</x-tab-pane>
        </x-tabs>
        <div>当前tab值{{active}}</div>
        <p>样式1</p>
        <x-tabs v-model="active" type="card" :closable="true">
           <x-tab-pane label="菜单1" value='11'>菜单1内容</x-tab-pane>
            <x-tab-pane label="菜单2" value='12'>菜单2内容</x-tab-pane>
            <x-tab-pane label="菜单3" value='13' >菜单3内容</x-tab-pane>
        </x-tabs>
        <p>测试2</p>
        <x-tabs v-model="active" type="border-card" >
            <x-tab-pane label="菜单1" value='11'>菜单1内容</x-tab-pane>
            <x-tab-pane label="菜单2" value='12' :disabled="true">菜单2内容</x-tab-pane>
            <x-tab-pane label="菜单3" value='13' >菜单3内容</x-tab-pane>
        </x-tabs>

    </div>
</template>
<script>
export default {
    data(){
        return {
            active: 11
        }
    },
    methods:{
      tabClick(tab){
          console.log('点击了',tab)
      }  
    }
}
</script>

```
:::