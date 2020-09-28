<template>
    <div class="demo-wrap">
        <x-tabs value="1">
            <x-tab-pane label="示例" value="1">
                <div class="title">checkbox复选框</div>
                <x-checkbox v-model="isCheck" value="香蕉">测试</x-checkbox>
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
        };
    },
};
</script>