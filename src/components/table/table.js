
import dataUtil from '../../util/data_util';
import xCheckbox from '../checkbox';
import xRadio from '../radio';
import xPagination from '../pagination';
export default {
    name:'x-table',
    comments:{
        xCheckbox,
        xRadio,
        xPagination
    },
    props:{
        tableConfig:{
            type: Object,
            require: true
        }
    },
    data(){
        return {
            radioCheck: null,
            defaultConfig: {
                defaultNull: '无', //当data为undefined时默认显示文字
                pagination: true, //显示分页
                maxSize: 5, //分页最大选项数
                page: 1, //当前页
                pagesize: true, //显示分页信息
                size: 10, //当前页记录数
                pageList: [10, 25, 50, 100, 150, 200], //设置分页size
                total: 0, //总记录数
                optConfigExt: [], //扩展操作列配置
                colunms: [], //表头
                rows: [], //表记录
                uniqueId: 'id', //唯一标识字段名
                noDataText: '暂无数据', //暂无数据显示文字
                showIndex: false, //显示序号
                indexTitle: '序号', //序号表头标题
                checkbox: false, //多选
                radio: false, //单选
                selectAll: false, //是否全选
                checkRows: [], //选中记录
                tableHover: true, //是否显示划过变色效果
                showTableCol: false, //是否显示选项
                selectAllColumn: true, //是否全选列显示
                rowDbclick: function () {}, //行双击回调
                rowClick: function () {}, //行单击回调
                turnPage: function () {}, //分页回调
                toolbar: { //一般工具栏
                    show: false,
                    title: '列表',
                    tools: [{
                        text: '刷新',
                        icon: 'xui-icon xui-icon-ios-refresh',
                        callback: function () {}
                    }]
                }
            },
            layout:0
        }
    },
    created() {
        this.formatterTable();
        this.layout = 0;
        if (this.tableConf.pagination || this.tableConf.toolbar.show) {
            this.layout = this.tableConf.pagination ? 1 : 2;
            if (this.tableConf.pagination && this.tableConf.toolbar.show) {
                this.layout = 3;
            }
        }
    },
    methods:{
        //单击列
        colClick (row, $event, click) {
            if (dataUtil.isFunction(click)) {
                click(row);
                $event.stopPropagation();
            }
        },
        // 单击行
        rowClick (row, event) {
            let self =this;
            // 防止双击触发两次单击事件
            if (this.clicked) {
                this.cancelClick = true;
                return;
            }
            this.clicked = true;
            setTimeout(()=>{
                if (self.cancelClick) {
                    self.cancelClick = false;
                    self.clicked = false;
                    return;
                }
                if (dataUtil.isFunction(self.tableConf.rowClick)) {
                    self.tableConf.rowDbclick(row);
                }
                self.cancelClick = false;
                self.clicked = false;
            },200)
        },
        //双击行
        rowDbclick (row, event) {
            if (dataUtil.isFunction(this.tableConf.rowDbclick)) {
                this.tableConf.rowDbclick(row);
            }
        },
        //全选、取消全选
        selectAll () {
            this.tableConf.checkRows =[];
            this.tableConf.rows.forEach( item =>{
                if (this.tableConf.selectAll) {
                    item.$checked =true;
                    this.tableConf.checkRows.push(item);
                 } else {
                    item.$checked =false;
                }
            });
        },
        //判断是否全选
        syncCheckRows () {
            let isSelectAll = this.tableConf.rows.every(item =>{
                return item.$checked;
            });
            this.tableConf.selectAll = isSelectAll;
            console.log( this.tableConf.checkRows)
        },
        checkboxClick(row){
            this.$forceUpdate();// 强制更新视图
            if (row.$checked) { // 选择
                this.tableConf.checkRows.push(row);
                this.syncCheckRows();
            } else { // 取消选择
                let index = dataUtil.eleInArr(this.tableConf.checkRows, this.tableConf.uniqueId, row[this.tableConf.uniqueId]);
                this.tableConf.checkRows.splice(index, 1);
                this.syncCheckRows();
            }
        },
        noPermission(){
           console.log('暂无权限')
        },
        formatterCol:function(item,list){
            item.formatter(list).then(function(ret){
                list[item.name] = ret;
            },function(){
                list[item.name] = '';
            })
        },
        formatterTable(){
            //操作列格式化
            this.tableConf.optConfigExt.forEach( (item, index)=> {
                item.optContent.forEach( (list, i)=> {
                    if (dataUtil.isFunction(list.formatter)) {
                        this.tableConf.rows.forEach( (row, j)=> {
                            row[list.id] = list.formatter(row);
                        });
                    }
                });
            });
             //列格式化
             this.tableConf.colunms.forEach((item, index)=> {
                if (dataUtil.isFunction(item.formatter)) {
                    this.tableConf.rows.forEach(  (list, i)=> {
                        if (item.formatter(list) && typeof (item.formatter(list).then) == 'function') {
                           self.formatterCol(item,list);
                        } else {
                            list[item.name] = item.formatter(list) || '';
                        }
                    })
                }
                if (this.tableConf.checkbox && this.tableConf.rows && this.tableConf.rows.length) {
                    this.tableConf.selectAll = true;
                    this.tableConf.rows.forEach((list, i) =>{
                        if (this.tableConf.checkRowsMap) {
                            list.$checked = this.tableConf.checkRowsMap[list[this.tableConf.uniqueId]];
                        } else {
                            list.$checked = false;
                        }
                        this.tableConf.selectAll = this.tableConf.selectAll && list.$checked;
                    })
                }
            });
        }
    },
    watch:{
        radioCheck(){
            this.tableConf.checkRows = [this.radioCheck];
            // this.tableConf.checkRowsMap = {};
            // this.tableConf.checkRowsMap[this.radioCheck[this.tableConf.uniqueId]] = true;
        },
        'tableConf.rows':function(){
            console.log(1)
            this.formatterTable();
        }
    },
    computed:{
        tableConf(){
            return Object.assign(this.defaultConfig, this.tableConfig);
        },
        colspan(){
            return (this.tableConf.colunms.length
            + (this.tableConf.checkbox ? 1 : 0) 
            + (this.tableConf.radio ? 1 : 0) 
            + (this.tableConf.showIndex ? 1 : 0) 
            + (this.tableConf.optConfigExt.length || 0))
        }
    }
}