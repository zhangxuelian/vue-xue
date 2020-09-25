<template>
    <div class="tab-panel" v-if="value==$parent.currentValue">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'x-tab-pane',
    props:['label','value','disabled']
}
</script>