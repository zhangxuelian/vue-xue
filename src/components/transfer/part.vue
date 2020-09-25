<template>
    <div class="xue-part-wrap">
        <div class="part-header">
            <checkbox :outValue="isSelectAll" @change="selectAll">全选</checkbox>
            <span class="part-title" v-if="title">{{title}}</span>
        </div>
        <div class="xue-transfer-content" :class="{'transfer-filter-content': filter}">
            <div class="transfer-search-content" v-if="filter">
                <input type="text" v-model="searchText" class="transfer-search-input" />
            </div>
            <div class="transfer-list">
                <div
                    v-for="(item,$index) in filterData"
                    :key="$index"
                    class="transfer-item"
                    @click="checkItem(item)"
                >
                    <checkbox
                        v-model="valueMap[item[valueKey]]"
                        :readOnly="true"
                        :disabled="item.disabled"
                    >{{item[labelKey] ||  labelFormatter(item)}}</checkbox>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import checkbox from "../checkbox";
export default {
    components: {
        checkbox,
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        value: {
            type: Array,
            default() {
                return [];
            },
        },
        valueKey: {
            type: String,
            default: "value",
        },
        labelKey: {
            type: String,
            default: "label",
        },
        title: {
            type: String,
            default: "",
        },
        filter: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            valueMap: {},
            innerValue: this.value,
            searchText: ""
        };
    },
    created() {
        this.filterData.forEach((item) => {
            if (this.value.includes(item[this.valueKey])) {
                this.valueMap[item[this.valueKey]] = true;
            } else {
                this.valueMap[item[this.valueKey]] = false;
            }
        });
    },
    methods: {
        checkItem(item) {
            if (item.disabled) return;
            var index = this.value.indexOf(item[this.valueKey]);
            if (index > -1) {
                this.value.splice(index, 1);
            } else {
                this.value.push(item[this.valueKey]);
            }
        },
        selectAll(val) {
            if (val) {
                 this.filterData.forEach((item) => {
                    if (item.disabled) return;
                    this.innerValue.push(item[this.valueKey]);
                });
            } else {
                this.innerValue = [];
            }
        },
        labelFormatter(item){
            this.$emit('labelFormatter',item);
        }
    },
    watch: {
        value(val) {
            this.innerValue = val;
        },
        innerValue(val) {
            this.$emit("checkChange", val);
            this.$emit('input', val); // v-model绑定的是input事件
            this.valueMap = {};
            val.forEach((item) => {
                this.valueMap[item] = true;
            });
        }
    },
    computed: {
        isSelectAll() {
            if (!this.innerValue.length || !this.filterData.length) {
                return false;
            }
            var data = this.filterData.filter(item=>{
                return !item.disabled;
            })
            return this.innerValue.length === data.length;
        },
        filterData(){
            return this.data.filter(item=>{
                this.$emit('labelFormatter',item);
                return (item[this.labelKey].indexOf(this.searchText) != -1);
            });
        }
    },
};
</script>
<style lang="scss" scoped>
.xue-part-wrap {
    box-sizing: border-box;
    height: 100%;
    min-width: 200px;
    background-color: #fff;
    display: inline-block;
    vertical-align: middle;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-sizing: border-box;
    overflow: hidden;
    .part-header {
        padding-left: 10px;
        height: 36px;
        line-height: 36px;
        background: #f5f7fa;
        box-sizing: border-box;
        .part-title {
            margin-left: 10px;
        }
    }
    .xue-transfer-content {
        padding: 8px 0;
        box-sizing: border-box;
        height: calc(100% - 36px);
        position: relative;
        &.transfer-filter-content {
            padding-top: 50px;
        }
        .transfer-search-content {
            height: 40px;
            position: absolute;
            top: 8px;
            width: 90%;
            text-align: center;
            left: 5%;
        }
        .transfer-search-input {
            height: 32px;
            width: 100%;
            font-size: 14px;
            display: inline-block;
            box-sizing: border-box;
            border-radius: 16px;
            padding: 0 10px;
            border: 1px solid #dcdfe6;
            &:focus{
                border-color:#409eff;
            }
        }
        .transfer-list{
            overflow: auto;
            height: 100%;
        }
    }
    .transfer-item {
        line-height: 30px;
        padding: 0 10px;
        &:hover {
            background: #f5f7fa;
        }
    }
}
</style>