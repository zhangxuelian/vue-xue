<template>
  <div class="x-number-keyboard-wrap">
    <div class="x-keyboard-container">
      <div class="x-key-row" v-for="item in keyArray" :key="item[0]">
        <div
          class="x-key-column"
          v-for="text in item"
          :key="text"
          :class="'key-'+text"
          @click="selectKey(text)"
        >{{text == "del" ? "" : text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'x-number-keyboard',
  props: ["params"],
  data() {
    return {
      defaultColumnNumber: 3,
      defaultKeyTextArray: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "X",
        "0",
        "del",
      ],
    };
  },
  filters: {},
  computed: {
    columnNumber() {
      return this.params && this.params.columnNumber
        ? this.params.columnNumber
        : this.defaultColumnNumber;
    },
    keyTextArray() {
      return this.params && this.params.keyTextArray
        ? this.params.keyTextArray
        : this.defaultKeyTextArray;
    },
    keyArray() {
      var arr = [];
      if (this.columnNumber <= 0) {
        return arr;
      }
      if (!this.keyTextArray || !this.keyTextArray.length) {
        return arr;
      }
      try {
        let len = this.keyTextArray.length;
        let rowNumber = Math.ceil(len / this.columnNumber);
        let i = 0;
        while (i < rowNumber) {
          arr.push(
            this.keyTextArray.slice(
              i * this.columnNumber,
              i * this.columnNumber + this.columnNumber
            )
          );
          i++;
        }
        return arr;
      } catch (err) {
        return arr;
      }
    },
  },
  methods: {
    selectKey(text) {
      this.$emit("selectKey", text);
    },
  },
};
</script>

<style scoped>
/* .x-number-keyboard-wrap {
}
.x-keyboard-container {
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.x-key-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.x-key-column {
  background-color: #79bbe8;
  margin: 10px;
  width: 112px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border-radius: 5px;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
}
.x-key-column:active {
  background-color: #2e9ee8;
}
.key-del {
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADMUlEQVRoQ+3YXeifYxgH8M/f22IoceJlNXPASmqIg+Wl1jDCNge2sjehrETK5K3Ywba0JUoxIglrWVFshrKXhnKyOWBxJDuRQo0cKH9d/+5fPT2e/+93P8/z++03ee7D57mu6/5+r+u+Xu57YnJy8kT/4TXRERhz9LoIjDkAugh0EWjpge4ItXRga/X/dQQuxQKc0tqN+QZ+xbv4rafSNAJr8BLGMUd9hyvwZ5BoQuABbMEJ+Y4buuRCfNaEwGNYH8SHDqmewduwsy6BDVhXb5+RSdciEN5+HmtrwPkbb+An3IuzM3T34GMsw2UD5LMJRJK+gpUZAIoid2Fb+nARdmFOHxsvI3IriJ+Kvbi8j3wWgSiPb+KOmuBD/DocKOidh92YW2FrE54sfX8Vq9sQCC9sx6IG4EPlEK7H0YL+OfgAV6Zv4e1H8VxpjyV4a0B/6RuB0/F+8mJD/FNqXyI2+qVg5AzswDW4JwEtH73w/klNc+AsfIir2iAv6H6Dm3Gk8G0G5iWCxW3uT8Uip79URiA8vy+jAtTl9gNuwvd9FB/HMzX6SyWBqALl81gX7HTyUU5vwcEKgc14qOZGlQSexcM1DeWK/5gKwuEKhfvwQsa5L6pWEliB13MR1ZD7NoEv5kFZ/daU0Kdl2q0kEMkTdf/OTCM5Yl+lo1OuRFGFpmaZwro6Vb8ot4PWtGU0Ou9WrBpkIeN/jAaL8XtBNkaKqHLRZR9JVado6mJ8hFkD7PftA01mn/J+n+PG3syefp6fwBW78UY8VVKejf04tw+JrFGizfQZHv66ACBAfYILK0AV56De70EVMYtAGHsCT9eozz0AMbnGUYx1SfL8BX08+g7uxl9pmPsUkRPTrWwCYeBBRK2uc4mJOSdmqT/SeDwzI2eiWr2HazG/TQ5U6cbc8uKY7sBVeGpFoGdgOV7DyRneHLVIIwIB6na8jRjIxrkaEwjQN6S3mdyuOQqi0Qi/CMNNnlVCLwzEneHMUaAbYDMuRUvT9bMxgdgj7g7xOncsX+Z+LvWXVgTG4Px/b9n0CB0X4NvkQEdgWB7ojtCwPNnUTheBpp4bll4XgWF5sqmdfwDvWw9A+ok0CwAAAABJRU5ErkJggg==");
} */
</style>