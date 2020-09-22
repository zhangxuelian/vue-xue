<template>
    <div>
        <x-tree :tree-config="treeConfig"></x-tree>
    </div>
</template>
<script>
import xTree from "../../../../src/tree";
export default {
     components:{
        xTree
    },
    data(){
        return {
             treeConfig:{
                  data: [{
                        name:'test',
                        id:1,
                        children: [{
                            name:'child1-1',
                            id:11
                        }]
                  },{
                      name: "test2",
                      id: 2
                  }
                ],
                checkbox: true
            }
        }
    }
}
</script>