<template>
  <div class="example-wrap">
    <div class="example-header">
      <span>vue-xue example</span>
      <ul class="menu-list">
        <li v-for="(item,$index) in menuData" :key="$index">
          <router-link :to="{path:item.path}">{{item.name}}</router-link>
          <!-- <a @click="navItemClick(item)" :class="{'active': currentNav==item.name}">{{item.name}}</a> -->
        </li>
      </ul>
      </div>
    <div class="example-body">
       <router-view></router-view>
      <!-- <div class="nav-list">
        <ul>
          <li v-for="item in menuList" :key="item" @click="linkRoute(item)">{{item}}</li>
        </ul>
      </div>
      <div class="module-wrap">
        <router-view></router-view>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: DIRECTORY || [],
      menuData:[{
          path: "/getting_started",
          name: '入门指南'
        }, {
            path: '/component',
            name: '组件'
        }, {
            path: '/ui',
            name: 'UI'
        }, {
            path: '/tool',
            name: '工具库'
        }],
        // currentNav:'入门指南'
    };
  },
  mounted(){
    console.log(this.$router)
    
  },
  // methods: {
  //   navItemClick(item){
  //     this.currentNav = item.name;
  //     this.$router.push(item.path);
  //   },
  //   linkRoute(item) {
  //     this.$router.push("/component" + item);
  //   },
  // }
};
</script>
<style lang="scss">
  @import "./src/assets/css/common.scss";
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
    .menu-list{
      font-size: 16px;
      float: right;
      display: flex;
      li{
        padding: 0 15px;
      }
      
      li a {
        text-decoration: none;
        color: #fff;
        &.router-link-active{
          color: #333;
        }
      }
    }
  }
  .example-body {
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
}
</style>