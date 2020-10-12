<template>
<div class="x-pagination-wrap">
    <ul v-if="type=='list'">
        <li :class="{'disabled':current==1}" @click="turnPage(1)">
            {{ firstText }}
        </li>
        <li :class="{'disabled':current==1}" @click="turnPage(current-1)">{{ preText }}</li>
        <li v-for="page in pageShow" :key="page"
        :class="{'active':current==page}"
        @click="turnPage(page)">
            {{page}}
            </li>
        <li :class="{'disabled':current==pageCount}" @click="turnPage(current+1)">{{ nextText }}</li>
        <li :class="{'disabled':current==pageCount}" @click="turnPage(pageCount)">{{ lastText }}</li>
    </ul>
    <div  v-if="type=='button'" class="x-pagination-button-content">
        <button class="page-btn" @click="turnPage(1)" :class="{'disabled':current==1}"> 
            <span></span>
            {{ firstText }}
            </button>
        <button class="page-btn" @click="turnPage(current-1)" :class="{'disabled':current==1}"> {{ preText }}</button>
        <div class="page-info">
            <span class="total-info" v-if="showTotal">
                总共<span class="count">{{total}}</span>条记录
            </span>
            <span class="page-total">
                {{current+'/'+pageCount}}
            </span>
        </div>
        <button class="page-btn" @click="turnPage(current+1)" :class="{'disabled':current==pageCount}" > {{ nextText }}</button>
        <button class="page-btn" @click="turnPage(pageCount)" :class="{'disabled':current==pageCount}" > {{ lastText }}</button>
    </div>
</div>
    
</template>
<script>
export default {
    name:'x-pagination',
    model:{
        prop:'currentPage',
        event:'change'
    },
    props: {
        type:{
            type:String,
            default:'list'
        },
        showTotal:{
            type:Boolean,
            default: true
        },
        firstText: {
            type: String,
            default: "首页",
        },
        lastText: {
            type: String,
            default: "尾页",
        },
        preText: {
            type: String,
            default: "上页",
        },
        nextText: {
            type: String,
            default: "下页",
        },
        currentPage:{
            type: Number,
            default: 1
        },
        total:{ // 总数
            type: Number
        },
        pageSize:{// 每页条数
            default: 10
        },
        maxSize:{
            type: Number,
            default:5
        }
    },
    data(){
        return {
           current: this.currentPage
        }
    },
    methods:{
        turnPage(page){
            if(page<1){
                page =1;
            }
            if(page>this.pageCount){
                page = this.pageCount;
            }
            this.current = page;
            if( this.current != this.currentPage){
                this.$emit('change', this.current);
            }
        }
    },
    computed:{
        pageCount(){
            return Math.ceil(this.total/this.pageSize) || 1;
        },
        pageShow(){
            let pages = [];
            let startPage = 1, endPage = this.pageCount;
            if (this.maxSize < this.pageCount) {
                startPage = Math.max(this.current - Math.floor(this.maxSize / 2), 1);
                endPage = startPage +this.maxSize - 1;

                if (endPage > this.pageCount) {
                endPage = this.pageCount;
                startPage = endPage - this.maxSize + 1;
                }
            }
            for (let number = startPage; number <= endPage; number++) {
                pages.push(number);
            }
            return pages;
        }
    }
};
</script>