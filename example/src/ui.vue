<template>
 <div class="ui-demo-wrap">
        <div class="nav-list">
            <ul>
                <li
                    v-for="item in menuList"
                    :key="item"
                    @click="linkRoute(item)"
                >
                    {{ item }}
                </li>
            </ul>
        </div>
        <div class="module-wrap">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
      data() {
        return {
            menuList: uiDirectory || [],
        };
    },
     methods: {
        linkRoute(item) {
            this.$router.push({
                path:'/ui/'+ item
            });
        },
    },
    
}
</script>
<style lang="scss" scoped>
.ui-demo-wrap {
    flex-grow: 1;
    display: flex;
    padding: 0 5%;
    .nav-list {
        width: 250px;
        height: 100%;
        // border: solid 1px #eee;
        box-sizing: border-box;
        ul {
            padding: 0;
            list-style-type: none;
            margin: 0;
            li {
                line-height: 40px;
                padding: 0 10px;
                cursor: pointer;
                 &:hover{
                    background: #cee0f0;
                }
            }
        }
    }
    .module-wrap {
        flex-grow: 1;
        box-sizing: border-box;
        padding: 10px;
    }
}
    
</style>