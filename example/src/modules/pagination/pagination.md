## 组件说明
pagination

:::demo 
```html
<template>
    <div class="demo-wrap">
        <div class="title">基础用法</div>
        <x-pagination :total="100" v-model="page"></x-pagination>
        <div class="title">button按钮</div>
        <x-pagination
            :showTotal="false"
            :total="100"
            v-model="page"
            :type="'button'"
            @change="pageChange"
        ></x-pagination>
        <div class="title">大小</div>
        <div class="size">
            <x-pagination
                class="x-pagination-mini"
                :showTotal="false"
                :total="100"
                v-model="page"
            ></x-pagination>
        </div>
        <div  class="size">
            <x-pagination
                class="x-pagination-sm"
                :showTotal="false"
                :total="100"
                v-model="page"
            ></x-pagination>
        </div>
        <div  class="size">
            <x-pagination
                :showTotal="false"
                :total="100"
                v-model="page"
            ></x-pagination>
        </div>
        <div  class="size">
            <x-pagination
                class="x-pagination-lg"
                :showTotal="false"
                :total="100"
                v-model="page"
            ></x-pagination>
        </div>
          <div class="title">显示最大页码按钮数</div>
          <div class="size">
              <x-pagination
                :showTotal="false"
                :total="100"
                v-model="page"
                :maxSize="3"
            ></x-pagination>
          </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            page: 1,
        };
    },
    methods: {
        pageChange(page) {
            this.page = page;
            console.log(page);
        },
    },
};
</script>
<style lang="scss" scoped>
    .size{
        margin: 10px 0;
    }
</style>
```
:::