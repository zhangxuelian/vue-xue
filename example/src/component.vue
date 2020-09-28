<template>
    <div class="component-demo-wrap">
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
            menuList: DIRECTORY || [],
        };
    },
    methods: {
        linkRoute(item) {
            this.$router.push({
                path:'/component/'+ item
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.component-demo-wrap {
    flex-grow: 1;
    display: flex;
    padding: 0 10%;
    .nav-list {
        width: 250px;
        height: 100%;
        border: solid 1px #eee;
        box-sizing: border-box;
        ul {
            padding: 0;
            list-style-type: none;
            margin: 0;
            li {
                line-height: 40px;
                padding: 0 10px;
                cursor: pointer;
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