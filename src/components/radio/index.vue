<template>
    <div :class="className" @click="onClick" class="x-radio-wrap">
        <div class="x-radio-icon"></div>
        <div class="x-radio-content" v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'x-radio',
    model: {
        prop: "outValue", //  v-model的值传入 outValue
        event: "change",
    },
    props: {
        disabled: {
            type: Boolean,
        },
        value: {
            required: true,
        },
        cancleable: {
            type: Boolean,
            default: false,
        },
        outValue: {},
    },
    methods: {
        onClick() {
            if (this.disabled) {
                return;
            }
            if (!this.isChecked) {
                this.$emit("change", this.value);
            } else if (this.cancleable) {
                this.$emit("change", null);
            }
        },
    },
    computed: {
        isChecked() {
            return this.outValue === this.value;
        },
        className() {
            return {
                "x-radio-disabled": this.disabled,
                "x-radio-checked": this.isChecked,
            };
        },
    },
};
</script>