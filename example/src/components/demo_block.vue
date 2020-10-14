<template>
    <div class="demo-block">
        <!-- <div class="source">
            <slot name="source"></slot>
        </div>
        <div class="meta" ref="meta">
            <div class="description" v-if="$slots.default">
                <slot></slot>
            </div>
            <div class="highlight">
                <slot name="highlight"></slot>
            </div>
        </div> -->
        <x-tabs value="1">
            <x-tab-pane label="示例" value="1">
                 <div class="description" v-if="$slots.default">
                    <slot></slot>
                </div>
                <div class="source">
                    <slot name="source"></slot>
                </div>
            </x-tab-pane>
            <x-tab-pane label="代码" value="2">
               
             <div class="highlight">
                    <slot name="highlight"></slot>
                </div>
            </x-tab-pane>
        </x-tabs>
    </div>
</template>
<style lang="scss" >
.demo-block{
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    margin: 15px 0;
    max-height: 600px;
    overflow-y: auto;
    &:hover{
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .description{
       margin-bottom: 10px;
        p{
            line-height: 1.5;
        }
    }
}
</style>