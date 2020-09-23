<template>
    <div>
        <x-tree :tree-config="treeConfig"></x-tree>
    </div>
</template>
<script>
export default {
    data(){
        return {
             treeConfig:{
                 search:true,
                  data: [{
                        name:'test',
                        id:1,
                        children: [{
                            name:'child1-1',
                            id:11
                        },{
                            name:'child1-2',
                            id:12
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