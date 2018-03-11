<template>
  <div class="accountEditInfo">
    <!-- 顶部信息栏 -->
    <mt-header :fixed=true title="编辑个人资料"  >
      <mt-button icon="back" slot="left" @click="changeInfo"></mt-button>
    </mt-header>
    <!-- 内容 -->
    <ul>
      <!-- <li>
        <label>头像</label>
        <img />
      </li> -->
      <li>
        <label>昵称</label>
        <input v-model="account.nickname"/>
      </li>
      <li>
        <label>性别</label>
        <input v-model="account.sex"/>
      </li>
      <li>
        <label>地址</label>
        <input v-model="account.address"/>
      </li>
      <li>
        <label>介绍自己</label>
        <input v-model="account.introduce" placeholder="可以说说你的职业或爱好"/>
      </li>
      <li>
        <label>我的签名</label>
        <input v-model="account.signature"/>
      </li>
    </ul>
  </div>
</template>

<script>
import util from "@/utils/util.js";
import { setInfo } from "@/api/login.js";

export default {
  name: "accountEditInfo",
  data() {
    return {
      // vuegConfig: {
      //   forwardAnim: "slideOutUp"
      // },
    };
  },
  computed: {
    account() {
      return util.getItem("accountInfo") ? util.getItem("accountInfo") : [];
    }
  },
  methods: {
    changeInfo() {
      let update = this.account;
      console.log("用户信息：");
      console.log(update);
      setInfo(update, util.getItem("userId")).then(data => {
        console.log("设置用户信息后的返回数据：");
        console.log(data);
        util.setItem("accountInfo",update);
        this.$router.go(-1);
      });
    }
  },
  created() {},
  components: {},
  mounted() {
    // 处理光标问题
    // let inputs = document.getElementsByTagName("input");
    // console.log("标签集合：");
    // console.log(inputs);
  }
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
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
