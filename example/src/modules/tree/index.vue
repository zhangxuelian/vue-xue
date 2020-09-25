<template>
    <div class="demo-wrap">
        <div class="title">tree树形组件</div>
        <x-tree :tree-config="treeConfig"></x-tree>
        <x-tree :tree-config="treeConfig2"></x-tree>
    </div>
</template>
<script>
// import tree from "../../../../src/tree";
export default {
    //  components:{
    //     tree
    // },
    data(){
        return {
             treeConfig:{
                 search:true,
                expendIconPosition:'left',
                 checkNodes:[],
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
                checkbox: true,
                clickNode:item=>{
                    console.log(item)
                }
            },
            treeConfig2:{
                showIcon: true,
                data:[{
                    name:'菜单1',
                    id:1,
                    iconClass:'test-1'
                },{
                    name:'菜单2',
                    id:2,
                      iconClass:'test-1'
                },{
                    name:'菜单3',
                    id:2,
                      iconClass:'test-1'
                },{
                    name:'菜单4',
                    id:2,
                    iconClass:'test-1'
                }],
                clickNode:item=>{
                    console.log(item)
                }
            }
        }
    }
}
</script>
<style lang="scss">
.demo-wrap .test-1{
    width: 20px;
    height:20px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACwUlEQVRYR+2XzVLTUBiGz8mplDYt1MFxASNpalIcFo7u3LGua2/AhS6caREdRRCorUUdZfjRteMFeANeg8PgRhZNnSaFtpTSHwraNn8NEzRtgZQQsNUFWeZ8Oc/7vefNlwl0+76OWAA2ASC4BDp5KSAngdprSPmWv3QcrjWqKHlI3V5e7mTjh1nnAs4daLsDThyhN08GyY+ft9Irqz/LHQ2hE8fQ0gxJUYPdjkq1Jj+bSzDfVssHRLTNgR4cYYvTbpoiuh1a19+Z8s6DIBtrdqEtAvTgXJL/FQizse1dWW6rAAeOsKVpN003db6W5sv+FyxTPARXhfxVBxz2P3B3w/b1Db7sD7GxQkmW9CZuSwEXLBCKkqKcdEzrwZMZvuIPc0y+KOnCWzrgG3G57t65PDAW4WKpTUEwEqHCF6cJ2uu21QOXzoqVQCjOZAut4boCVPjTe/0ehCDcKkh8IMwyx4nYh08RtJdswDe2xGogxDKbeVE0En/kCN6OE55bNxwXtQd/i4gzqU3xiBMqfGGKoIea4JmcVFU7z+SM4boOdFkgfDdBXL05jPfWReRFPvBSdaIhQg+eVevCXDSdFQw71/bWDWFXF4Tzk27q+pC9RytUNx8Nc9FUVhBx237aKS/Z7dTWcwWJ97dw6rhjaPkW2KwYXHhO0MO0vQ5RRUzMrf0Yv98/6CVt9fv5ogpnmWTGOLCmvgV2G8QWp0j6mqcRsFoNKBgGoLZRYVsSRiNcNJHiDd8WU3NAK1bP+v3MwZmurRVLsvAwEmfYpMAbpb3V+okmYS+O0FKQpD1XrHgdviOJY7NcNL7GnxpuahS7nAh9CJJeYsBqL+3K4qPZRDSWqJwJbkqAWtzXiyyRxwQ5/2ljPcZWqqe1va1fQ7OiTpQBs5uaqT8X8B848M9/Tn0rIwDIkwDCPjPhOXOtouQBQK/2AGxxYqbeY5fXAAAAAElFTkSuQmCC');
    background-size: 100% 100%;
}
</style>