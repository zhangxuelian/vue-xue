<template>
   <div class="xui-table-wrap" :class="{0:'',1:'show-pagination',2:'show-toolbar',3:'show-toolbar-pagination'}[layout]">
    <div class="xui-table-header" v-if="tableConf.toolbar.show">
        <span class="table-title">
            {{tableConf.toolbar.title}}
        </span>
        <div class="btn-group toolbar-btn">
            <button class="btn" type="button"  @click="tool.callback&&tool.callback()"
                v-for="(tool,$index) in tableConf.toolbar.tools" :key="$index">
                <i :class="tool.icon"></i>{{tool.text}}
            </button>
            <!-- <div class="tooltip-container">
                <button class="btn" type="button" v-if="tableConf.showTableCol" id="showTableCol1"
                    :class="{'tooltip-btn':tableConf.toolbar.tools.length}">
                    <i class="xui-icon xui-icon-ios-eye-outline"></i>显示选项
                </button>
                <div class="option-dialog" v-if="tableConf.toolbar.show" id="showTableCol2">
                    <i class="arrow"></i>
                    <div class="option-top">
                        <span class="select-all" @click="popup.selectAll()">
                            <xue-checkbox ng-checked="tableConf.selectAllColumn"></xue-checkbox>
                            <label>全选</label>
                        </span>
                    </div>
                    <div class="option-content">
                        <ul>
                            <li ng-repeat="colunm in tableConf.colunms" @click="popup.singleSelect(colunm)">
                                <xue-checkbox ng-checked="colunm.show"></xue-checkbox>
                                <label>{{colunm.label}}</label>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
    <div class="xui-table-content">
        <table class="xui-table" :class="{'xui-table-hover':tableConf.tableHover}">
            <tr>
                <th v-if="tableConf.checkbox" class="table-checkbox">
                    <x-checkbox v-model="tableConf.selectAll" @change="selectAll()"></x-checkbox>
                </th>
                <th v-if="!tableConf.checkbox && tableConf.radio" class="table-checkbox">
                </th>
                <th v-if="tableConf.showIndex" style="min-width:30px">{{tableConf.indexTitle}}</th>
                <th v-for="(item,$index) in tableConf.colunms" :style="item.style" :key="$index"
                    :class="{isActive : item.name == tableConf.orderColumn}">
                    {{item.label}}
                </th>
                <th v-for="optConfig in tableConf.optConfigExt" :style="optConfig.optStyle" :key="optConfig.optName">
                    {{optConfig.optName}}</th>
            </tr>
            <tr v-for="(row,$index) in tableConf.rows" :key="$index"
                 @click="rowClick(row,$event)"
                @dblclick="rowDbclick(row,$event)" :class="{true:'selected'}[!!row.$checked]">
                <td v-if="tableConf.checkbox" class="table-checkbox">
                    <x-checkbox  v-model="row.$checked"  @click.native="checkboxClick(row)"></x-checkbox>
                </td>
                <td v-if="!tableConf.checkbox && tableConf.radio" class="table-checkbox">
                    <x-radio v-model="radioCheck" :value="row"></x-radio>
                </td>
                <td v-if="tableConf.showIndex">{{(tableConf.page-1)*tableConf.size+$index+1}}</td>
                <td v-for="(colunm,$index) in tableConf.colunms" :key="$index"
                    @click="colClick(row,$event,colunm.click)" :title="row[colunm.name]">
                    {{row[colunm.name]}}
                </td>
            
                <td v-for="optConfig in tableConf.optConfigExt"   :key="optConfig.optName" class="table-checkbox" data-event="notChecked">
                    <a v-for="(item,$index) in optConfig.optContent" :key="$index"
                        @click="!!row[item.id] ? item.callback&&item.callback(row):noPermission()"
                        :class="{[item.className&&!item.showText ? item.className : item.id]:true,'ope-hidden': !row[item.id]}" :title="item.name">
                        <span class="opt-conf-text" v-if="item.showText">{{item.name}}</span>
                    </a>
                </td>
            </tr>
            <tr v-if="!tableConf.rows || tableConf.rows.length == 0">
                <td :colspan="colspan"> {{tableConf.noDataText}}</td>
            </tr>
        </table>
    </div>
    <div class="xui-table-footer" v-if="tableConf.pagination">
        <div class="total-size" v-if="tableConf.pagesize">
            <div class="total">总共<span>{{tableConf.total}}</span>条记录</div>
            <div class="size">每页显示
                <select v-model="tableConf.size">
                    <option  v-for="(pageSize,index) in tableConf.pageList" :key="index" :value="pageSize">{{pageSize}}</option>
                </select>
                条
            </div>
        </div>
        <x-pagination :total="tableConf.total" v-model="tableConf.page" :page-size="tableConf.size" @change="tableConf.turnPage"></x-pagination>
    </div>
</div>
</template>
<script src="./table.js"></script>