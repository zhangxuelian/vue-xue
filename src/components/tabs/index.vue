<template>
    <div class="x-tabs-wrap" :class="{[type]:true}">
        <div class="x-nav-wrap">
              <div  class="nav-item" 
              @click="select(item)" 
              :class="{'active': item.value==currentValue,'disabled': item.disabled}" 
              v-for="(item,$index) in tabs" :key="$index"
               >
                <a class="nav-link" 
                > <span class="nav-text">{{item.label}}</span>
                    <i v-if="isClose && !item.disabled" class="nav-close" @click.stop="closeTab(item,$index)">×</i>
                </a>
            </div>
        </div>
        <div class="x-tab-content">
             <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name:'x-tabs',
    model:{
        prop: "value",
        event: "change"
    },
    props:{
        value:{},
        closable:{
            type:Boolean,
            default: false
        },
        type:{
            type: String,
            default: ''
        }
    },
   
    data() {
        return {
            currentValue: this.value,
            tabs:[]
        };
    },
     mounted(){
        this.$nextTick(()=>{
            this.tabs = this.$children;
        })
    },
    methods: {
         select(tab){
             if(tab.disabled){
                return;
             }
            this.currentValue = tab.value;
            this.$emit("click", {
                label: tab.label,
                value: tab.value
            });
            this.$emit("change", this.currentValue);
        },
        closeTab(tab,index){
            if(tab.disabled && this.$children.length<2){
                return;
             }
             if(tab.value == this.currentValue){
                 if(index<this.tabs.length-1){
                    this.currentValue = this.tabs[index+1].value;
                 } else {
                    this.currentValue = this.tabs[index-1].value;
                 }
             }
            this.$children.splice(index,1);
             this.$emit("remove", tab);
            // this.tabs = this.$children;

        }
    },
    computed:{
        isClose(){
            return this.closable && (this.tabs.length>1);
        }
    }
};
</script>
<style lang="scss">

</style>