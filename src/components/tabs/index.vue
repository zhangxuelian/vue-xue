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
$tab-bg: #fff !default;
$border-color-base: #dcdfe6 !default;
$background-color-base: #f5f7fa !default;
$color-primary: #409eff !default;
$color-text-primary: #303133 !default;
$color-text-regular: #606266 !default;
$tab-size: ((lg, 12, 20, 16, 4), (sm, 9, 15, 12, 3), (mini, 7, 15, 12, 3));

@mixin tab-type-card() {
    .x-nav-wrap {
        border-bottom: none;
        border-bottom: solid 1px $border-color-base;

        .nav-item {
            margin-right: 5px;

            .nav-link {
                border: solid 1px $border-color-base;
                border-radius: 3px 3px 0 0;
                border-bottom: none;
                margin-bottom: -1px;
                background-color: $background-color-base;
            }

            &.active {
                .nav-link {
                    border-bottom: solid 1px $tab-bg !important;
                    background-color: $tab-bg;
                }
            }
        }
    }
}

@mixin tab-type-border-card() {
    border: solid 1px $border-color-base;
    border-radius: 3px;
    box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);

    .x-nav-wrap {
        border-bottom: none;
        border-bottom: solid 1px $border-color-base;
        background-color: $background-color-base;

        .nav-item {
            .nav-link {
                border-bottom: solid 1px $border-color-base;
                margin-bottom: -1px;
                background-color: $background-color-base;
            }

            &.active {
                .nav-link {
                    border: solid 1px $border-color-base;
                    border-bottom: solid 1px $tab-bg;
                    border-top: none;
                    background: $tab-bg;
                }
            }

            &:first-child {
                .nav-link {
                    border-left: none;
                }
            }
        }
    }
}

.x-tabs-wrap {
    position: relative;

    .x-nav-wrap {
         &::after {
            display: block;
            clear: both;
            content: "";
        }
        border-bottom: solid 2px $border-color-base;
        .nav-item {
            float: left;

            .nav-link {
                display: block;
                padding: 8px 16px;
                color: $color-text-regular;
                font-size: 14px;
                background-color: $tab-bg;
                margin-bottom: -2px;
                border-bottom: solid 2px $border-color-base;
                cursor: pointer;

                &:hover {
                    color: $color-primary;
                    .nav-close{
                        display:inline-block;
                    }
                }
                .nav-close{
                    display: none;
                    font-style:normal;
                    font-size:inherit;
                }
            }

            &.active {
                .nav-link {
                    border-bottom: solid 2px $color-primary;
                    color: $color-primary;
                    .nav-close{
                        display:inline-block;
                    }
                }
            }

            &.disabled {
                .nav-link {
                    cursor: not-allowed;
                    color: #b9babc;
                    border-color: #e2e4ea;
                }
            }
        }
    }

    .x-tab-content {
        padding: 10px;
        box-sizing: border-box;
    }

    &.card {
        @include tab-type-card();
    }

    &.border-card {
        @include tab-type-border-card();
    }
}

@each $name, $padding-y, $padding-x, $font-size, $border-radius in $tab-size {
    .x-tabs-wrap.x-tabs-#{$name} {
        .x-nav-wrap .nav-item .nav-link {
            padding: #{$padding-y}px #{$padding-x}px;
            font-size: #{$font-size}px;
        }
    }
}
</style>