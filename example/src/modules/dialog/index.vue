<template>
  <div class="demo-wrap">
    <div class="module-wrap">
      <div class="title">弹窗组件</div>
      <div class="content">
        <button @click="dialog1" class="xui-btn">自定义弹窗--内容</button>
        <button class="xui-btn"  @click="dialog2">自定义弹窗--组件</button>
      </div>
      <div class="config"></div>
    </div>
  </div>
</template>

<script>
import { dateUtil } from "xue";
import dialog22 from './dialog1'
export default {
  data(){
  },
  methods: {
    dialog1() {
      console.log(dateUtil);
      this.$xdialog({
        title: "弹窗标题",
        drag: {
          enabled: true,
          boundary: true,
        },
        content: "自定义内容",
        contentClass: "",
        wrapClass: "",
        showHeader: true,
        showHeaderClose: true,
        showFooter: true,
        confirmText: "确定",
        cancelText: "取消",
      });
    },
    dialog2(){
      this.$xdialog({
        title: "弹窗标题",
        drag: {
          enabled: true,
          boundary: true,
        },
        component: dialog22,
        contentClass: "",
        wrapClass: "",
        showHeader: false,
        showHeaderClose: true,
        showFooter: true,
        confirmText: "确定",
        cancelText: "取消",
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/common.scss";
</style>