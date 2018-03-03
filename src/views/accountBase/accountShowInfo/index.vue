<template>
  <div class="accountShowInfo">
    <!-- 顶部信息栏 -->
    <mt-header :fixed=true :title="account.nickname"  >
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <!-- 内容区 -->
    <div class="infoTop">
      <img :src="account.iconUrl"/> 
      <p class="instruction">{{ account.sex }} · {{ account.address }}</p>
      <ul class="info_wrapper">
        <li>
          <p>{{account.read_len | timeFormat}}</p>
          <p>读书时长</p>
        </li>
        <li>
          <p>{{account.zan_num}}个</p>
          <p>收到的赞</p>
        </li>
        <li>
          <p>{{account.cared_count}}人</p>
          <p>关注我</p>
        </li>
      </ul>
    </div>

    <!-- 最近阅读书籍和书架 -->
    <div class="history_wrapper">
      <h1>最近阅读</h1>
      <ul class="book_list">

      </ul>
      <p class="see_book">查看书架</p>
    </div>
   
  </div>
</template>

<script>
export default {
  name: "accountShowInfo",
  data() {
    return {
      vuegConfig: {
        forwardAnim: "fideIn",
        backAnim: "fideOut",
        duration: 0.5
      }
    };
  },
  computed: {
    account() {
      if (this.$route.params.id == this.$store.getters.accountInfo.id) {
        return this.$store.getters.accountInfo;
      } else {
        // 根据ID进行请求
      }
    }
  },
  methods: {},
  created() {},
  filters: {
    timeFormat(data) {
      let time = Math.round(data / 60 / 60);
      let hour = Math.floor(time / 60);
      let minute = Math.floor(time % 60);
      return `${hour}时${minute}分`;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss" type="text/css">
@import "../../../common/scss/minxin.scss";

.accountShowInfo {
  width: 100%;
  height: 100%;
  background: #eee;
  .mint-header {
    background: transparent !important;
  }
  .infoTop {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: center;
    padding-top: px2rem(100);
    width: 100%;
    height: px2rem(600);
    background: rgba($color: #999, $alpha: 0.8);
    // box-shadow: 0 -5px 5px rgba($color: #666, $alpha: 0.5) inset;
    font-size: 0.3rem;
    color: #fff;
    img {
      width: px2rem(200);
      height: px2rem(200);
      border-radius: 50%;
      border: 1px solid #fff;
    }
    p {
      width: 100%;
      text-align: center;
    }
    .instruction {
      // color: #999;
    }
  }
  .info_wrapper {
    width: 100%;
    height: px2rem(150);
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      width: 33%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      align-items: center;
      justify-content: center;
      p:last-child {
        color: #ccc;
      }
    }
  }
  .history_wrapper{
    position: relative;
    width: 100%;
    height: px2rem(500);
    background: #fff;
    margin-top: px2rem(20);
    >h1{
      width: 100%;
      height: px2rem(100);
      line-height: px2rem(100);
      font-weight: normal;
      color: #666;
      font-size: 0.3rem;
      text-align: center;
    }
    .book_list{
      display: flex;
      align-items: center;
      justify-content: center;
      
      width: 100%;
      height: px2rem(300);
      // background: green;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }
    .see_book{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: px2rem(100);
      line-height: px2rem(100);
      color: #000;
      font-size: 0.3rem;
      text-align: center;
    }
  }
}
</style>
