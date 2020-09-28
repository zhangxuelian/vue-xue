<template>
    <div class="demo-wrap">
        <x-switch :params="switchParams"></x-switch>
    </div>
</template>

<script>
export default {
    data() {
        return {
            switchParams: {
                type: "text",
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
            }
        };
    },
};
</script>

<style>
</style>