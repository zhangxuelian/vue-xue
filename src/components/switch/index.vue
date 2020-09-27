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
  name: 'x-switch',
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

</style>