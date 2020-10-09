<template>
    <div class="demo-wrap">
        <x-tabs value="1">
            <x-tab-pane label="示例" value="1">
                <div class="title">checkbox复选框</div>
                <x-checkbox v-model="isCheck" value="香蕉">测试</x-checkbox>
                <div>选中状态{{isCheck}}</div>
                <div class="title">禁用</div>
                <x-checkbox v-model="isCheck" value="香蕉" :disabled="true">测试</x-checkbox>
            </x-tab-pane>
            <x-tab-pane label="代码" value="2">
               
            </x-tab-pane>
            <x-tab-pane label="文档" value="3">
                <md></md>
            </x-tab-pane>
        </x-tabs>
    </div>
</template>
<script>
import md from "./checkbox.md";
export default {
    components: {
        md,
    },
    data() {
        return {
            isCheck: false,
            defaultImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAsUlEQVQ4T2NkoDJgpLJ5DKMGUh6iWMOwZ/6ufwwMBMP3X0miGzO6E7AaWD91FQ8vl8BnfO79zC3F3him84soA0GKeubvrGBgYGzHYWhmSaLbDGxyeJNNz/xdbxkYGITQND4rSXSTxuV6gumwZ/6u/8iaSxLd8OohaGDf3F0m/5gYTkMM/a9Zkuh+A1/YEjQQEp679jIwMH4qSXQNJJSwiDKQkCHI8qMGkhJa2NUO/jAEANm4JRWmrrgRAAAAAElFTkSuQmCC'
        };
    },
    methods:{
        clickEvt(){
            console.log(12121)
        }
    }
};
</script>