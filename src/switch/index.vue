<template>
  <div class="x-switch-wrap">
    <div
      class="x-switch-container"
      :class="['x-switch-'+myParams.type,myParams.className]"
      @click="change"
    >
      <div class="x-switch-slider" :class="'slider-'+switchIndex">{{switchText.activeText}}</div>
      <span class="x-switch-span" :class="'span-'+switchIndex">{{switchText.inactiveText}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["params"],
  data() {
    return {
      defaultParams: {
        type: "default", // 1、default 2、text
        className: "",
        data: [0, 1],
        valueField: null,
        textField: null,
        activeValue: 0
      }
    };
  },
  computed: {
    myParams() {
      return Object.assign(this.defaultParams, this.params);
    },
    switchIndex() {
      let index = 0;
      if (this.myParams.valueField) {
        if (
          this.myParams.data[0][this.myParams.valueField] ==
          this.myParams.activeValue
        ) {
          index = 0;
        } else {
          index = 1;
        }
      } else {
        if (this.myParams.data[0] == this.myParams.activeValue) {
          index = 0;
        } else {
          index = 1;
        }
      }
      return index;
    },
    switchText() {
      if (this.myParams.type == "text") {
        let text = {
          activeText: "",
          inactiveText: ""
        };
        let otherIndex = this.switchIndex == 1 ? 0 : 1;
        if (this.myParams.valueField) {
          text.activeText = this.myParams.data[this.switchIndex][
            this.myParams.textField || this.myParams.valueField
          ];

          text.inactiveText = this.myParams.data[otherIndex][
            this.myParams.textField || this.myParams.valueField
          ];
        } else {
          text.activeText = this.myParams.data[this.switchIndex];
          text.inactiveText = this.myParams.data[otherIndex];
        }
        return text;
      } else {
        return "";
      }
    }
  },
  methods: {
    change() {
      let index = this.switchIndex == 0 ? 1 : 0;
      if (this.myParams.valueField) {
        this.myParams.activeValue = this.myParams.data[index][
          this.myParams.valueField
        ];
      } else {
        this.myParams.activeValue = this.myParams.data[index];
      }
      this.$emit(
        "change",
        this.myParams.activeValue,
        this.myParams.data[index]
      );
    }
  }
};
</script>

<style scoped>
.x-switch-wrap {
}
.x-switch-container {
  position: relative;
  cursor: pointer;
}
.x-switch-text.x-switch-container {
  width: 400px;
  height: 50px;
  background-color: #dbe7ff;
  border-radius: 25px;
}
.x-switch-text .x-switch-slider {
  width: 200px;
  height: 50px;
  line-height: 50px;
  background-color: #007ae6;
  color: #fff;
  border-radius: 25px;
  font-size: 20px;
  text-align: center;
  position: absolute;
  top: 0;
  transition: left 0.5s;
}
.x-switch-slider.slider-0 {
  left: 0;
}
.x-switch-slider.slider-1 {
  left: 200px;
}
.x-switch-text .x-switch-span {
  height: 50px;
  line-height: 50px;
  color: #007ae6;
  border-radius: 25px;
  text-align: center;
  font-size: 20px;
  width: 200px;
  position: absolute;
  top: 0;
}
.x-switch-span.span-0 {
  left: 200px;
}
.x-switch-span.span-1 {
  left: 0;
}
</style>