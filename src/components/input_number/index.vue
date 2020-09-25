<template>
    <div class="xue-input-number-wrap" :class="{'xue-input-number-disabled': disabled}">
        <div
            class="input-number-btn input-number-decrease"
            :class="{'input-number-btn-disabled':disabled||leftDisabled}"
            @click="decrease"
        >-</div>
        <div class="input-number-content">
            <input
                type="text"
                v-model="number"
                class="input-number-input"
                :class="{'is-suffix':numberConf.suffix}"
                :readonly="numberConf.readonly"
                @blur="inputBlur"
                @change="inputChange"
                @focus="inputFocus"
            />
            <span class="input-number-suffix" v-if="numberConf.suffix">{{numberConf.suffix}}</span>
        </div>
        <div
            class="input-number-btn input-number-increase"
            :class="{'input-number-btn-disabled':disabled||rightDisabled}"
            @click="increase"
        >+</div>
    </div>
</template>
<script>
import normalUtil from "@/util/data_util";
export default {
    name: 'x-input-number',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        numberConfig: {
            type: Object,
            default() {
                return {};
            },
        },
        value: {},
    },
    data() {
        return {
            defaultConfig: {
                min: -Infinity,
                max: Infinity,
                step: 1,
                suffix: "",
                precision: 0, // 精度 不能小于步进精度
                readonly: false,
                changeCallback: function () {},
            },
            number: "",
            isFocus: false,
            stepPrecision: 0, // 步进精度
        };
    },
    created() {
        this.number = parseFloat(this.value).toFixed(this.numberConf.precision);
        this.stepPrecision = this.getPrecision(this.numberConf.step);
    },
    methods: {
        getPrecision(value) {
            if (value === undefined) return 0;
            const valueString = value.toString();
            const dotPosition = valueString.indexOf(".");
            let precision = 0;
            if (dotPosition !== -1) {
                precision = valueString.length - dotPosition - 1;
            }
            return precision;
        },
        toPrecision(num, precision) {
            return parseFloat(
                Math.round(num * Math.pow(10, precision)) /
                    Math.pow(10, precision)
            ).toFixed(this.numberConf.precision);
        },
        decrease() {
            if (this.disabled || this.leftDisabled) {
                return;
            }
            if(this.stepPrecision>this.numberConf.precision) {
              console.warn('[Warn][InputNumber]precision should not be less than the decimal places of step');
               return;
            };
            let number = Number(this.number);
            number -= this.numberConf.step;
            this.checkData(number);
        },
        increase() {
            if (this.disabled || this.rightDisabled) {
                return;
            }
            if(this.stepPrecision>this.numberConf.precision) {
              console.warn('[Warn][InputNumber]precision should not be less than the decimal places of step');
               return;
            };
            let number = Number(this.number);
            number += this.numberConf.step;
            this.checkData(number);
        },
        checkData(number) {
            let lastVal = Number(this.value);
            number = Number(number);
            //支持负值、空值、0及非0开头数字
            // var reg = /^-?(0|[1-9][0-9]*)*$/;
            var reg = /^(-?\d+)(\.\d+)?$/;
            if (reg.test(number)) {
                if (this.number >= this.numberConf.max) {
                    this.number = this.numberConf.max;
                } else if (number <= this.numberConf.min) {
                    this.number = this.numberConf.min;
                } else {
                    this.number = number;
                }
            } else {
                //不符合规则的值重置为上一次更改的值
                this.number = lastVal;
            }
            this.number = this.toPrecision(
                this.number,
                this.numberConf.precision
            );
        },
        inputBlur(event) {
            this.checkData(this.number);
            this.isFocus = false;
            this.$emit("blur", event);
        },
        inputChange(event) {
            this.$emit("change", event);
        },
        inputFocus(event) {
            this.isFocus = true;
            this.$emit("focus", event);
        },
    },
    watch: {
        number(val, oldVal) {
            if (this.isFocus) return;
            let lastVal = this.value;
            this.checkData(val);
            if (val == lastVal) return;
            this.$emit("input", val);
            if (normalUtil.isFunction(this.numberConf.changeCallback)) {
                this.numberConf.changeCallback(val);
            }
        },
    },
    computed: {
        leftDisabled() {
            return this.number <= this.numberConf.min;
        },
        rightDisabled() {
            return this.number >= this.numberConf.max;
        },
        numberConf() {
            return Object.assign(this.defaultConfig, this.numberConfig);
        },
    },
};
</script>
<style lang="scss" scoped>
.xue-input-number-wrap {
    position: relative;
    display: inline-block;
    .input-number-btn {
        position: absolute;
        font-size: 22px;
        z-index: 1;
        top: 1px;
        width: 40px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background: #f5f7fa;
        color: #606266;
        cursor: pointer;
        box-sizing: border-box;
        &.input-number-decrease {
            left: 1px;
            border-radius: 4px 0 0 4px;
            border-right: 1px solid #dcdfe6;
        }
        &.input-number-increase {
            right: 1px;
            border-radius: 0 4px 4px 0;
            border-left: 1px solid #dcdfe6;
        }
        &:hover {
            color: #409eff;
        }
        &.input-number-btn-disabled {
            cursor: not-allowed;
            border-color: #e4e7ed;
            color: #e4e7ed;
            &:hover {
                color: #e4e7ed;
            }
        }
    }
    .input-number-input {
        border-radius: 4px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #dcdfe6;
        outline: none;
        width: 180px;
        font-size: inherit;
        box-sizing: border-box;
        padding-left: 50px;
        padding-right: 50px;
        &.is-suffix {
            padding-right: 70px;
        }
        &:hover {
            border-color: #c0c4cc;
        }
        &:active,
        &:focus {
            border-color: #409eff;
        }
    }
    .input-number-suffix {
        position: absolute;
        right: 50px;
        line-height: 40px;
    }
    // &:hover{
    //     .input-number-input{
    //         border-color: #409eff;
    //     }
    // }
    &.xue-input-number-disabled {
        cursor: not-allowed;
        border-color: #e4e7ed;
        color: #e4e7ed;
        .input-number-input {
            color: #c0c4cc;
            background-color: #f5f7fa;
            &:hover,
            &:active,
            &:focus {
                border-color: #e4e7ed;
            }
        }
    }
}
</style>