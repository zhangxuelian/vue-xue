<template>
    <div
        class="x-select-wrap"
        @mouseenter="inputHovering = true"
        @mouseleave="inputHovering = false"
        v-click-outside="clickOtherArea"
    >
        <input
            @click="openPanel($event)"
            type="text"
            class="select-input xui-input"
            :title="selectConf.inputLabel"
            :class="selectClass"
            v-model="selectConf.inputLabel"
            :style="iptStyle"
            :disabled="disabled"
            :readonly="!selectConf.create"
            :placeholder="selectConf.placeholderText"
            @blur="panelBlur()"
        />
        <i @click="clear()" title="清空" class="icon delete-icon" v-show="showClose"></i>
        <i
            class="icon dropdown-icon"
            :class="{'is-reverse': isReverse,'disabled':disabled}"
            v-if="!showClose"
        ></i>

        <!-- <transition :name="isPlacementTop ? 'el-zoom-in-bottom':'el-zoom-in-top'"> -->
            <div class="x-select-content" :id="id" :style="contentStyle" v-show="isDropdown">
                <div class="filter-wrap" v-if="selectConf.filter && !selectConf.create">
                    <div class="select-filter-wrap">
                        <input type="text" v-model="selectConf.myLabel" class="select-filter xui-input" />
                    </div>
                </div>

                <ul class="select-list">
                    <li
                        @click="onSelect(item,$event)"
                        v-for="(item,$key) in selectConf.filterData.slice(0,selectConf.showLimit)"
                        :key="$key"
                        :class="{'active': !!selectConf.checkRowsMap[item[selectConf.valueField]]}"
                    >
                        <x-checkbox
                            v-model="selectConf.checkRowsMap[item[selectConf.valueField]]"
                            :readOnly="true"
                            v-if="selectConf.checkbox"
                        ></x-checkbox>
                        <span>{{item[selectConf.textField] || textFieldFormat(item)}}</span>
                        <!-- <div class="checkbox-wrap" :class="{'gx-checked':selectConf.checkRowsMap[item[selectConf.valueField]]}" v-if="selectConf.checkbox"></div> -->
                    </li>
                    <li v-if="!!!selectConf.data || !selectConf.data.length" class="empty-data">
                        <span>暂无数据</span>
                    </li>
                </ul>
                <div class="triangle" :class="{'placement-top':isPlacementTop}"></div>
            </div>
        <!-- </transition> -->
    </div>
</template>
<script>
import dom from "../../util/dom_util";
import normalUtil from "../../util/data_util";
import xCheckbox from "../checkbox";
export default {
    name: "x-select",
    // model:{
    //     prop: "value",
    //     event: "change"
    // },
    props: ["selectConfig", "disabled", "selectClass"],
    components: { xCheckbox },
    directives: {
        clickOutside: {
            bind: function (el, binding, vnode) {
                el.clickOutsideEvent = function (event) {
                    // here I check that click was outside the el and his children
                    if (!(el == event.target || el.contains(event.target))) {
                        // and if it did, call method provided in attribute value
                        if (binding.expression) {
                            vnode.context[binding.expression](event);
                        }
                    }
                };
                document.body.addEventListener("click", el.clickOutsideEvent);
            },
            unbind: function (el) {
                document.body.removeEventListener(
                    "click",
                    el.clickOutsideEvent
                );
            },
        },
    },
    data() {
        return {
            id: null,
            inputHovering: false,
            isReverse: false,
            isDropdown: false,
            isPlacementTop: false,
            setVal: "",
            contentStyle: {},
            iptStyle: {},
            defaultSelectConfig: {
                data: [],
                filterData: [],
                checkbox: false,
                create: false,//创建条目,为true时，输入过滤器隐藏可过滤
                filter: true, // 是否可以过滤
                enableEmpty: true, //是否可以置空
                valueField: "value", //对应选项value值
                textField: "label", //显示在输入框中的字段名
                panelHeight: "250px", //面板高度
                panelWidth: "180px", //面板以及输入框宽度
                height: "30px", //输入框高度
                inputLabel: "", //输入框双向绑定内容
                myLabel: "", // 过滤框双向绑定值
                showLimit: 50,
                checkLimit: null, // 多选，最多选几个
                checkRows: [], //选中数组Row
                checkRowsMap: {},
                setValue: "", //设置值
                placeholderText: '请选择', // 自定义placeholder文案
                onSelect: function () {},
                clearAll: function () {},
                textFieldFormat: function () {},
            },
        };
    },
    mounted() {
        this.id =
            "xueSelect_" +
            new Date().getTime() +
            Math.round(Math.random() * 10000);
        this.selectConf.filterData = this.selectConf.data;
        this.setVal = this.selectConf.setValue || "";
        this.contentStyle = {
            width: this.selectConf.panelWidth,
            height: this.selectConf.panelHeight,
            paddingTop: this.selectConf.filter && !this.selectConf.create ? "38px" : "0",
        };
        this.iptStyle = {
            width: this.selectConf.panelWidth,
            height: this.selectConf.height,
        };
    },
    methods: {
        onSelect(item) {
            if (this.selectConf.checkbox) {
                if (
                    !this.selectConf.checkRowsMap[
                        item[this.selectConf.valueField]
                    ]
                ) {
                    this.addRow(item);
                } else {
                    this.delRow(item);
                }
            } else {
                // 单选
                this.hide();
                this.selectConf.checkRows = [item];
            }
            this.assignData();
            if (normalUtil.isFunction(this.selectConf.onSelect)) {
                this.selectConf.onSelect(item);
            }
        },
        assignData() {
            var label = "",
                value = "";
            this.selectConf.checkRowsMap = {};
            this.selectConf.checkRows.forEach((item) => {
                this.textFieldFormat(item);
                label += item[this.selectConf.textField] + ",";
                value += item[this.selectConf.valueField] + ",";
                this.selectConf.checkRowsMap[
                    item[this.selectConf.valueField]
                ] = true;
            });
            if (label) {
                label = label.substring(0, label.length - 1);
                value = value.substring(0, value.length - 1);
            }
            this.selectConf.inputLabel = label;
        },
        addRow(item) {
            if (
                item[this.selectConf.valueField] &&
                this.selectConf.checkLimit
            ) {
                if (
                    this.selectConf.checkLimit ==
                    this.selectConf.checkRows.length
                ) {
                    console.warn(
                        "最多只能选" + this.selectConf.checkLimit + "个"
                    );
                    return;
                }
            }
            this.selectConf.checkRows.push(item);
            this.selectConf.checkRowsMap[
                item[this.selectConf.valueField]
            ] = true;
        },
        delRow(row) {
            this.selectConf.checkRows.forEach((item, index) => {
                if (
                    item[this.selectConf.valueField] ===
                    row[this.selectConf.valueField]
                ) {
                    this.selectConf.checkRows.splice(index, 1);
                }
            });
        },
        clear() {
            this.selectConf.inputLabel = "";
            this.selectConf.myLabel = "";
            this.selectConf.checkRowsMap = {};
            this.selectConf.checkRows = [];
            if (normalUtil.isFunction(this.selectConf.clearAll)) {
                this.selectConf.clearAll();
            }
        },
        setValue(value) {
            if (this.selectConf.checkbox) {
                //多选
                var valueArr = value.split(",");
                var rows =
                    normalUtil.eleInArrByKeys(
                        this.selectConf.data,
                        this.selectConf.valueField,
                        valueArr
                    ) || [];
                this.selectConf.checkRows = rows;
                this.assignData();
            } else {
                //单选
                var index = normalUtil.eleInArr(
                    this.selectConf.data,
                    this.selectConf.valueField,
                    value
                );
                if (index != -1) {
                    this.selectConf.checkRows = [];
                    this.selectConf.checkRows.push(this.selectConf.data[index]);
                    this.assignData();
                }
            }
        },
        // 自定义输入框中的内容
        textFieldFormat: function (item) {
            if (normalUtil.isFunction(this.selectConf.textFieldFormat)) {
                item[this.selectConf.textField] =
                    this.selectConf.textFieldFormat(item) ||
                    item[this.selectConf.textField] ||
                    "";
            }
        },
        openPanel: function (e) {
            var panelEle = document.getElementById(this.id);
            document.body.appendChild(panelEle);

            var clientHeight = document.body.clientHeight,
                clientWidth = document.body.clientWidth;

            var top = e.clientY,
                left = e.clientX,
                height = e.target.offsetHeight;
            this.isDropdown = true;
            this.isReverse = true;
            this.$nextTick(() => {
                var panelHeight = panelEle.offsetHeight;
                if (top + panelHeight > clientHeight) {
                    panelEle.style.top =
                        top - e.offsetY - panelHeight - 8 + "px";
                    panelEle.style.left = left - e.offsetX + "px";
                    this.isPlacementTop = true;
                } else {
                    panelEle.style.top = top - e.offsetY + height + 8 + "px";
                    panelEle.style.left = left - e.offsetX + "px";
                    this.isPlacementTop = false;
                }
            });
        },
        clickOtherArea(e) {
            var parents = dom.parents(e.target);
            if (dom.querySelector(parents, ".x-select-content").length != 0) {
                return;
            }
            this.hide();
        },
        hide() {
            this.isDropdown = false;
            this.isReverse = false;
        },
        panelBlur(){
            this.$emit('blur',this.selectConf.inputLabel);
        }
    },
    watch: {
        filterLabel(newVal, oldVal) {
            if (newVal) {
                this.selectConf.filterData = this.selectConf.data.filter(
                    (item) => {
                        if (
                            item[this.selectConf.textField].indexOf(newVal) !=
                            -1
                        )
                            return true;
                    }
                );
            } else {
                this.selectConf.filterData = this.selectConf.data;
            }
        },
        'selectConf.inputLabel':function(){
            this.$emit('change',this.selectConf.inputLabel);
        },
        "selectConf.data": function (newVal, oldVal) {
            if (newVal) {
                this.selectConf.filterData = this.selectConf.data;
            }
        },
        "selectConf.setValue": function (newVal, oldVal) {
            this.setVal = newVal;
        },
        setVal(value) {
            if(this.selectConf.create){ // 自定义条目赋值
                this.selectConf.inputLabel = this.selectConf.setValue;
            }
            this.setValue(value);
        },
    },
    computed: {
        selectConf() {
            return Object.assign(this.defaultSelectConfig, this.selectConfig);
        },
        filterLabel(){
            return this.selectConf.create ? this.selectConf.inputLabel : this.selectConf.myLabel;
        },
        showClose() {
            return (
                this.selectConf.enableEmpty &&
                this.selectConf.inputLabel &&
                this.inputHovering &&
                !this.disabled
            );
        },
    },
    beforeDestroy() {
        let el = document.getElementById(this.id);
        if (el) {
            el.parentNode.removeChild(el);
        }
    },
};
</script>
