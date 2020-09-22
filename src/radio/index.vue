<template>
    <div :class="className" @click="onClick" class="x-radio">
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
<style lang="scss" scoped>
.x-radio {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    font-size: 16px;
    &.x-radio-disabled {
        cursor: not-allowed;
    }
    & + & {
        margin-left: 20px;
    }
}
.x-radio-icon {
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 1px solid #cee0f0;
    background-color: #fff;
    position: relative;
    text-align: center;
    &::after {
        content: "";
        position: absolute;
        left: 50%;
        right: 0;
        top: 50%;
        bottom: 0;
        width: 8px;
        height: 8px;
        border-radius: 100%;
        margin-left: -4px;
        margin-top: -4px;
    }
    .x-radio-checked & {
        border-color: #80cbff;
        background-color: #dff2ff;
        &::after {
            background: #1994FF;
        }
    }
    .x-radio-disabled & {
        background-color: #f5f7fa;
    }
    .x-radio-checked.x-radio-disabled & {
        background-color: #f5f7fa;
        &::after {
            opacity: 0.5;
        }
    }
}
.x-radio-content {
    display: inline-block;
    vertical-align: middle;
}
</style>