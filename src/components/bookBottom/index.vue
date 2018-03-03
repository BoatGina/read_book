
<template>
  <div class="bookBottom" :class="{disable:!selectedLen}">
    <mt-tabbar v-model="selected" :fixed="true" :value="selected">
      <mt-tab-item id="private" @click.native="privateBook">
        <i  slot="icon" class="iconfont icon-jiesuo1" v-if="privateTxt"></i>
        <i  slot="icon" class="iconfont icon-jiesuo" v-else></i>
        {{privateTxt? '关闭私密阅读':'私密阅读' }}
      </mt-tab-item>
      <mt-tab-item id="delete" class="clearStyle" @click.native="delBook">
        <i  slot="icon" class="iconfont icon-shanchu"></i>移出书架
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "bookBottom",
  data() {
    return {
      selected: ""
    };
  },
  props: {
    privateBooks: {
      type: Object
    },
    selectedLen: {
      type: Number
    },
    privateTxt: {
      type: Boolean
    }
  },
  methods: {
    privateBook() {
      this.$emit("privateRead");
    },
    delBook() {
      this.$emit("delBook");
    }
  },
  computed: {},
  watch: {
    selectedLen() {
      console.log("传进来的数值：");
      console.log(this.selectedLen);
    }
  },
  created() {
    console.log("传进来的数值：");
    console.log(this.selectedLen);
  }
};
</script>

<style lang="scss" >
@import "../../common/scss/minxin.scss";

.bookBottom {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  .mint-tabbar {
    box-shadow: 0px -2px 5px #ccc;
  }
}

.bookBottom {
  .is-selected {
    background-color: transparent !important;
    .iconfont,
    .mint-tab-item-label {
      color: #000 !important;
    }
    &.clearStyle {
      .iconfont,
      .mint-tab-item-label {
        color: red !important;
      }
    }
  }

  .clearStyle {
    color: red;
  }
  &.disable {
    .iconfont,
    .mint-tab-item-label {
      color: rgba($color: #000000, $alpha: 0.5) !important;
    }
    .clearStyle {
      .iconfont,
      .mint-tab-item-label {
        color: rgba($color: red, $alpha: 0.5) !important;
      }
    }
  }
}
.mint-tab-item-icon {
  .iconfont {
    font-size: 0.5rem;
  }
}

// .icon-shanchu{
//     color: red;
// }
</style>