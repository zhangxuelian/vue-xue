<template>
    <div class="x-checkbox-wrap" @click="onClick" :class="className">
        <div class="x-checkbox-icon"></div>
        <div class="x-checkbox-content" v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'x-checkbox',
    model: {
        prop: "outValue",
        event: "change",
    },
    props: {
        disabled: {
            type: Boolean,
        },
        outValue: {
            type: Boolean,
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
        mixed: {
            // 只负责修改样式,半选中状态checked为false
            required: false,
            type: Boolean,
            default: false,
        },
        beforeChange: {
            require: false,
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onClick() {
            if (this.disabled || this.readOnly) {
                return;
            }
            // 选择前回调
            if (this.beforeChange) {
                this.$emit("beforeChange", this.outValue);
                return;
            }
            this.$emit("change", !this.outValue);
        },
    },
    computed: {
        className() {
            return {
                "x-checkbox-checked": this.outValue && !this.mixed,
                "x-checkbox-disabled": this.disabled,
                "x-checkbox-mixed": this.mixed && !this.outValue,
            };
        },
    },
};
</script>