<template>
    <div class="example-wrap">
        <div class="example-header">
            <span>vue-xue example</span>
            <ul class="menu-list">
                <li v-for="(item, $index) in menuData" :key="$index">
                    <router-link :to="{ path: item.path }">{{
                        item.name
                    }}</router-link>
                </li>
            </ul>
        </div>
        <div class="example-body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuList: DIRECTORY || [],
            menuData: [
                {
                    path: "/getting_started",
                    name: "入门指南",
                },
                {
                    path: "/component",
                    name: "组件",
                },
                {
                    path: "/ui",
                    name: "UI",
                },
                {
                    path: "/tool",
                    name: "工具库",
                },
            ],
        };
    },
};
</script>
<style lang="scss">
@import "./src/assets/css/common.scss";
section {
    table {
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        font-size: 14px;
        margin-bottom: 15px;
        line-height: 1.5em;
        border: solid 1px #cee0f0;
        td,
        th {
            border: 1px solid #cee0f0;
            padding: 8px 10px;
        }
        tbody tr:nth-child(even) {
            background: #fafafa;
        }
    }
    pre {
        background: #333;
        border-radius: 3px;
        padding: 10px;
        color: #eee;
        line-height: 1.2;
    }
    p {
        line-height: 2;
    }
    .header-anchor{
        display:none;
    }
}
</style>

<style lang="scss" scoped>
.example-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    .example-header {
        height: 70px;
        background-color: #3eaf7c;
        color: #fff;
        font-size: 25px;
        font-weight: 700;
        line-height: 70px;
        padding: 0 10%;
        text-transform: uppercase;
        .menu-list {
            font-size: 16px;
            float: right;
            display: flex;
            li {
                padding: 0 15px;
            }

            li a {
                text-decoration: none;
                color: #fff;
                &.router-link-active {
                    color: #333;
                }
            }
        }
    }
    .example-body {
        padding: 15px;
    }
}
</style>