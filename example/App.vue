<template>
  <div class="example-wrap">
    <div class="example-header">vue-xue example</div>
    <div class="example-body">
      <div class="nav-list">
        <ul>
          <li v-for="item in menuList" :key="item" @click="linkRoute(item)">{{item}}</li>
        </ul>
      </div>
      <div class="module-wrap">
        <router-view></router-view>
      </div>
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
      this.$router.push("/" + item);
    },
  },
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