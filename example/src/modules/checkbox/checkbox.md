## 组件说明
checkbox复选框

:::demo 在`x-checkbox`元素中定义`v-model`绑定变量，默认绑定变量的值会是`Boolean`，选中为`true`。

```html
<template>
    <div class="demo-wrap">
        <div class="title">基础用法</div>
        <x-checkbox v-model="isCheck" value="香蕉">测试</x-checkbox>
        <div>选中状态{{isCheck}}</div>
        <div class="title">禁用</div>
        <x-checkbox v-model="isCheck" value="香蕉" :disabled="true">测试</x-checkbox>
    </div>
</template>
<script>
export default {
    data() {
        return {
          isCheck: false
        };
    },
    methods:{
        clickEvt(){
            console.log(12121)
        }
    }
};
</script>
```
:::

####  Attributes

| 属性           | 说明         |       类型       | 可选值 | 默认值 |
| -------------- | :----------- | :--------------: | :----: | :----: |
| value/v-model           | 绑定值 |      String      |   -    |   -   |
| disabled | 是否禁用 |      Boolean      |   -   |  false  |
| readOnly | 是否只读 |      Boolean      |   -    |  false  |
| mixed | 设置mixed状态(只负责控制样式) |      Boolean      |   -    | false |
| beforeChange | 选择前回调 |      Function（当前选中值）      |   -   |      |
