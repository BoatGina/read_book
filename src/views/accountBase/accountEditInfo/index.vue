<template>
  <div class="accountEditInfo">
    <!-- 顶部信息栏 -->
    <mt-header :fixed=true title="编辑个人资料"  >
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <!-- 内容 -->
    <ul>
      <!-- <li>
        <label>头像</label>
        <img />
      </li> -->
      <li>
        <label>昵称</label>
        <input v-model="nickName"/>
      </li>
      <li>
        <label>性别</label>
        <input v-model="sex"/>
      </li>
      <li>
        <label>地址</label>
        <input v-model="address"/>
      </li>
      <li>
        <label>介绍自己</label>
        <input v-model="introduce" placeholder="可以说说你的职业或爱好"/>
      </li>
      <li>
        <label>我的签名</label>
        <input v-model="autograph"/>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "accountEditInfo",
  data() {
    return {
      // vuegConfig: {
      //   forwardAnim: "slideOutUp"
      // },
      iconUrl: "",
      nickName: "吉",
      address:'广东揭阳',
      sex:'女',
      introduce: "",
      autograph: ""
    };
  },
  methods: {},
  created() {},
  components: {}
};
</script>

<style scoped lang="scss" type="text/css">
@import "../../../common/scss/minxin.scss";

.accountEditInfo {
  width: 100%;
  height: 100%;
  background: #fff;
  font-size: 0.3rem;
  color: #666;
  ul {
    width: 100%;
    margin-top: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      min-height: px2rem(150);
      // line-height: px2rem(150);
      label {
        // float: left;
        height: 100%;
      }
      input,
      img {
        // float: right;
        display: inline-block;
        height: px2rem(150);
        outline: none;
        border: none;
        width: 70%;
        // height: 40%;
        font-size: 0.35rem;
        text-align: right;
        overflow: hidden;
        text-overflow:ellipsis;
      }
    }
  }
}
</style>
