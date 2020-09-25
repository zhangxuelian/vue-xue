<template>
  <div class="x-dialog-wrap">
    <div class="x-dialog-container layer-anim layer-anim-00" :class="wrapClass" v-drag="drag">
      <div class="x-dialog-header" v-show="showHeader" id="dragElement">
        <span class="x-dialog-title">{{title}}</span>
        <i class="x-dialog-close" @click="close('close')" id="ignoreDrag" v-show="showHeaderClose"></i>
      </div>
      <div class="x-dialog-content" :class="contentClass">
        <component
          v-if="!!component"
          v-bind:is="component"
          :params="componentParams"
          @getReturn="getReturn"
        ></component>
        <div v-if="!component" v-html="content"></div>
      </div>
      <div class="x-dialog-footer" v-show="showFooter">
        <button class="x-dialog-cancel" @click="close('cancel')">{{cancelText}}</button>
        <button class="x-dialog-confirm" @click="close('confirm')">{{confirmText}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import dom from "@/util/dom_util";
export default {
  name: "xDialog",
  data() {
    return {
      title: "标题",
      drag: {
        enabled: true,
        boundary: true,
      },
      content: "",
      contentClass: "",
      wrapClass: "",
      component: null,
      componentParams: {},
      showHeader: true,
      showHeaderClose: true,
      showFooter: true,
      confirmText: "确定",
      cancelText: "取消",
      returnData: null,
    };
  },
  directives: {
    drag(el, binding) {
      if (binding.value.enabled) {
        let { x, y } = binding.modifiers;
        var offsetX, offsetY, clientX, clientY;
        el.style.position = "absolute";
        el.querySelector("#dragElement").style.cursor = "move";
        el.addEventListener("mousedown", mousedown);
        function mousedown(e) {
          var parents = dom.parents(e.target);
          if (
            e.target.id == "ignoreDrag" ||
            dom.querySelector(parents, "#ignoreDrag").length != 0 ||
            dom.querySelector(parents, "#dragElement").length == 0
          ) {
            return;
          }
          offsetX = e.offsetX;
          offsetY = e.offsetY;
          clientX = e.clientX;
          clientY = e.clientY;
          el.style.left = clientX - offsetX + "px";
          el.style.top = clientY - offsetY + "px";
          document.addEventListener("mousemove", mousemove);
          document.addEventListener("mouseup", mouseup);
        }
        function mousemove(e) {
          clientX = e.clientX;
          clientY = e.clientY;
          let left = 0,
            top = 0;
          if (binding.value.boundary) {
            let width = el.clientWidth,
              height = el.clientHeight;
            let clientHeight = document.body.clientHeight,
              clientWidth = document.body.clientWidth;
            let tempLeft = clientX - offsetX,
              tempTop = clientY - offsetY;
            if (tempLeft < 0) {
              left = 0;
            } else if (clientWidth - tempLeft < width) {
              left = clientWidth - width;
            } else {
              left = clientX - offsetX;
            }
            if (tempTop < 0) {
              top = 0;
            } else if (clientHeight - tempTop < height) {
              top = clientHeight - height;
            } else {
              top = clientY - offsetY;
            }
          } else {
            left = clientX - offsetX;
            top = clientY - offsetY;
          }
          el.style.left = left + "px";
          el.style.top = top + "px";
        }
        function mouseup(e) {
          document.removeEventListener("mousedown", mousedown);
          document.removeEventListener("mousemove", mousemove);
        }
      }
    },
  },
  methods: {
    show(cb) {
      var self = this;
      typeof cb === "function" && cb.call(this, this);
      this.on = new Promise((resolve) => {
        self.resolve = resolve;
      });
      return this;
    },
    close(type) {
      var ret = this.resolve({
        type: type,
        data: this.returnData,
      });
      if (typeof ret == "undefined" || ret == true) {
        this.hide();
      }
    },
    hide() {
      document.body.removeChild(this.$el);
      this.$destroy();
    },
    getReturn(data) {
      this.returnData = data;
    },
  },
};
</script>

<style>
.x-dialog-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2000;
}
.x-dialog-container {
  background: #fff;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-width: 300px;
}
.layer-anim {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}
@keyframes layer-bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.layer-anim-00 {
  animation-name: layer-bounceIn;
}
.x-dialog-header {
  height: 45px;
  border-bottom: solid 1px #eee;
  position: relative;
  padding-right: 45px;
  box-sizing: border-box;
}
.x-dialog-title {
  line-height: 45px;
  padding: 0 15px;
  display: block;
}
.x-dialog-close {
  position: absolute;
  right: 0;
  top: 0;
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  cursor: pointer;
  background-position: center center;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAwklEQVRYR+2V0Q2AIAxEK5PpELoCYSLCCjqETkYMiSaEqFz7IZrUX9ve8zhsR42frrE+KYA6oA5ADnjve+fcxrmyaE8VIA0yxqxEtFhrJwQihDAT0RhjHGrgVYAkeA5EIDi1aTYEgEJwxVkANQiJOBvgDkIqLgIoIY5Qjkg+rgIMZ6Bszr46vYJvSDnnnwD5mb9+BFeBey2ET0JSCDgDiABSIwohZzCnFvoPfGIZoas1txftgTOArGFJjQKoA+pAcwd26uiQIdRekm8AAAAASUVORK5CYII=);
}
.x-dialog-close:hover {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAxElEQVRYR+2VUQqDMBBEJ/Ri8RD2AEJPVfAA9RDmYqIESglBzewKSYXNr5ud52SSdWi8XGN9GIA5YA5QDvj36sPLBcmVZfcUAWIjPDADmMLgngyEH9cPgB4LuhJ4ESAK/hoSEJLa2JsCYCGk4iKAEoRGXAxwBKEVVwHkEN9Q9pKQpkGmM5CnP/nr+Im+IXmfewKkZ179CPYCVy2EZ0JaCDoDjABTowqhpLGklnoH/mMYtRzHzPi9UkOH8IrI2V4DMAfMgQ03F4whxalSiAAAAABJRU5ErkJggg==);
}
.x-dialog-content {
}
.x-dialog-footer {
  height: 38px;
  padding: 10px;
  border-top: solid 1px #eee;
  text-align: right;
}
.x-dialog-footer button {
  padding: 8px 15px;
  background: #eee;
  font-family: Microsoft Yahei;
  border-radius: 3px;
  margin-left: 10px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #666;
}
.x-dialog-cancel {
}
.x-dialog-cancel:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.x-dialog-confirm {
  color: #fff !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}
.x-dialog-confirm :hover {
  background: #66b1ff !important;
  border-color: #66b1ff !important;
  color: #fff;
}
</style>