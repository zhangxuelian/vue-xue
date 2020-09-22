<template>
    <div>
        <x-checkbox v-model="isCheck">测试</x-checkbox>
    </div>
</template>
<script>
import xCheckbox from "../../../../src/checkbox"
export default {
    components:{ xCheckbox },
    data(){
        return {
            isCheck: false
        }
    }
    
}
</script>