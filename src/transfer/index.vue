<template>
    <div class="xue-transfer-wrap">
        <part :data="leftData" 
        v-model="leftSelect" 
        :valueKey="transferConf.valueField" 
        :labelKey="transferConf.labelField" 
        @checkChange="leftCheckChange"
        @labelFormatter="labelFormatter"
        :title="transferConf.leftTitle"
        :filter="transferConf.filter"></part>
        <div class="transfer-middle">
            <button class="transfer-btn transfer-to-left" @click="toLeft()" :class="{'transfer-btn-disabled': !rightSelect.length}">{{transferConf.toLeftText}}</button>
            <button class="transfer-btn transfer-to-right" @click="toRight()" :class="{'transfer-btn-disabled': !leftSelect.length}">{{transferConf.toRightText}}</button>
        </div>
        <part 
        :data="rightData" v-model="rightSelect" 
        :valueKey="transferConf.valueField" 
        :labelKey="transferConf.labelField" 
        @checkChange="rightCheckChange"
        @labelFormatter="labelFormatter"
        :title="transferConf.rightTitle"
        :filter="transferConf.filter"></part>
    </div>
</template>
<script>
import part from './part'
import normalUtil from "../util/data_util";
export default {
    name: 'x-transfer',
    components:{
        part
    },
    props:{
        transferConfig:{
            type: Object,
            default(){
                return {}
            }
        },
        value:{ // 右侧列表key值
            type: Array,
            default(){
                return [];
            }
        }
    },
    data(){
        return {
            innerValue: [], // 内部右侧列表key值
            leftSelect: [], // 左侧选中key值
            rightSelect: [], // 右侧选中key值
            defaultConfig: {
                data: [], // 数据源
                toLeftText: 'to left', // toleft 文案
                toRightText: 'to right', // to right 文案
                leftTitle: '',
                rightTitle: '',
                valueField: "value", //选项key值
                labelField: "label", //显示的字段名
                value: [], // 右侧列表key值
                filter: false,
                labelFormatter: function(){}, // 自定义显示文案
                onChange: function(){},
                leftCheckChange: function(){},
                rightCheckChange: function(){}
            }
        }
    },
    methods:{
        toLeft(){
            if(this.rightSelect.length) {
                this.innerValue = this.innerValue.filter((item) =>{
                   return this.rightSelect.indexOf(item) == -1
                });
                this.rightSelect = [];
            }
        },
        toRight(){
            if(this.leftSelect.length) {
                this.innerValue.push(...this.leftSelect);
            }
            this.leftSelect = [];
        },
        leftCheckChange(checkArray){
            if (normalUtil.isFunction(this.transferConf.leftCheckChange)) {
                this.transferConf.leftCheckChange(checkArray);
            }
        },
        rightCheckChange(checkArray){
            if (normalUtil.isFunction(this.transferConf.rightCheckChange)) {
                this.transferConf.rightCheckChange(checkArray);
            }
        },
         // 自定义输入框中的内容
        labelFormatter: function(item) {
            if (normalUtil.isFunction(this.transferConf.labelFormatter)) {
                item[this.transferConf.labelField] = item[this.transferConf.labelField] || this.transferConf.labelFormatter(item)  || "";
            }
        }
    },
    watch:{
        'transferConf.value': function(val){
            this.innerValue = val;
        },
        innerValue: function(val){
            // 右侧列表元素变化后
            if (normalUtil.isFunction(this.transferConf.onChange)) {
                this.transferConf.onChange(val);
            }
            this.transferConf.value = val;
            this.$emit('input', val); // v-model绑定的是input事件
        }
    },
    computed:{
        transferConf() {
           return Object.assign(this.defaultConfig, this.transferConfig);
        },
        leftData() {
            return this.transferConf.data.filter(item=>{
                return !this.innerValue.includes(item[this.transferConf.valueField])
            });
        },
        rightData() {
           return this.transferConf.data.filter(item=>{
                return this.innerValue.includes(item[this.transferConf.valueField])
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.xue-transfer-wrap{
    display: flex;
    height: 100%;
    .transfer-middle{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 15px;
        box-sizing: border-box;
    }
    .transfer-btn{
        border-radius: 4px;
        outline:  0;
        height: 40px;
        width: 60px;
        color: #fff;
        background-color: #409eff;
        cursor: pointer;
        outline: 0;
        border:0;
        &:hover{
            color: #fff;
            background-color: #66b1ff;
        }
        &.transfer-btn-disabled{
            cursor:not-allowed;
            background-color: #a0cfff;
        }
    }
    .transfer-btn + .transfer-btn{
        margin-top: 15px;
    }
    ::-webkit-scrollbar-button:vertical {
    display: none;
}
}
    
</style>