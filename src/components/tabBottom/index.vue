
<template>
  <div class="tab-bottom">
    <mt-tabbar v-model="selected" :fixed="true" :value="selected">
      <mt-tab-item id="discovery" @click.native="select('discovery')">
        <i  slot="icon" class="iconfont icon-faxian"></i>发现
      </mt-tab-item>
      <mt-tab-item id="bookshelf" @click.native="select('bookshelf')">
        <i  slot="icon" class="iconfont icon-shujia"></i>书架
      </mt-tab-item>
      <mt-tab-item id="idea" @click.native="select('idea')">
        <i  slot="icon" class="iconfont icon-duihuakuang6"></i>想法
      </mt-tab-item>
      <mt-tab-item id="account" @click.native="select('account')">
        <i  slot="icon" class="iconfont icon-wo"></i>我
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "tab-bottom",
  data() {
    return {
      selected: ""
    };
  },
  methods: {
    select(path) {
      path = path == "discovery" ? "/main" : `/main/${path}`;
      this.$router.push({ path });
      
    },
    tellSelected() {
      // 通过路径名判断selected的值
      console.log("路径名：");
      console.log(this.$route.name);
      let pathName = this.$route.name;
      if (pathName == "main") {
        this.selected = "discovery";
        this.$router.push('/main');
      } else {
        this.selected = pathName;
      }
      // this.selected = this.$route.name;
    }
  },
  watch: {
    $route: function() {
      this.tellSelected();
    }
  },
  created() {
    this.tellSelected();
  }
};
</script>

<style lang="scss" >
@import "../../common/scss/minxin.scss";

.tab-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 500;
  .mint-tabbar {
    box-shadow: 0px -2px 5px #ccc;
  }
}

.mint-tab-item-icon {
  .iconfont {
    font-size: 0.5rem;
  }
}

.mint-tabbar > .mint-tab-item.is-selected {
  background-color: transparent !important;
  color: #2a5caa !important;
}
</style>