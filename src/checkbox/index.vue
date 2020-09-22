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
<style scoped>
.x-checkbox-wrap{
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
}
.x-checkbox-wrap.x-checkbox-disabled {
    cursor: not-allowed;
}
.x-checkbox-wrap + .x-checkbox-wrap {
    margin-left: 20px;
}
.x-checkbox-wrap .x-checkbox-icon {
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid #cee0f0;
    background-color: #fff;
    text-align: center;
}
.x-checkbox-wrap .x-checkbox-icon::before {
    display: block;
    position: absolute;
    width: 5px;
    height: 10px;
    border: 2px solid transparent;
    border-top: 0;
    border-left: 0;
    transform: translate(5px, 2px) rotate(45deg);
    top: 0;
}
.x-checkbox-checked .x-checkbox-icon {
    border-color: #80cbff;
    background-color: #dff2ff;
    position: relative;
}
.x-checkbox-checked .x-checkbox-icon::before {
    content: "";
    border-color: #1994ff;
}
.x-checkbox-disabled .x-checkbox-icon {
    background-color: #f5f7fa;
}
.x-checkbox-checked.x-checkbox-disabled .x-checkbox-icon {
    background-color: #f5f7fa;
}
.x-checkbox-checked.x-checkbox-disabled .x-checkbox-icon::before {
    opacity: 0.5;
}
.x-checkbox-mixed .x-checkbox-icon {
    position: relative;
    background-color: #dff2ff;
}
.x-checkbox-mixed .x-checkbox-icon::before {
    content: "";
    display: block;
    position: absolute;
    width: 8px;
    height: 0;
    transform: none;
    top: 8px;
    left: 4px;
    border-color: #1994ff;
}
.x-checkbox-wrap .x-checkbox-content {
    display: inline-block;
}
</style>