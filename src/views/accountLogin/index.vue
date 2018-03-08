<template>
  <div class="accountLogin">
    <div class="logo">
      <img src="./logo.svg"/>
      <span>校园读书</span>
    </div>

   <div class="w-form">
       <input type="text" name="clear" style="position:fixed;bottom:-9999px;" />
       <input type="password" name="clear" style="position:fixed;bottom:-9999px;" />
       <div class="w-form-row">
         <input type="text" placeholder="学号" ref="account" v-model="accountName" @blur.stop="hideUserList" @focus.stop="handleAccount" autocomplete="off">
         <div class="w-form-auto" v-show="showUserlist">
           <div class="w-form-auto-item" v-for="(item, index) in userList" @click="selectAccount(item, index)" :key="index">
             {{item.username}}
           </div>
         </div>
       </div>
       <div class="w-form-row">
         <input type="password" placeholder="密码" ref="password" v-model="accountPwd" autocomplete="off" @focus.stop="hiddenError">
       </div>
       <div class="w-form-row w-form-remember">
         <input type="checkbox" v-model="savePassword">记住密码
       </div>
        <!-- 登录按钮 -->
       <div class="w-form-tips w-form-tips-error" v-show="errorMsg">
          {{errorMsg}}
        </div>
        <div class="w-form-btn">
          <button @click="login">登录</button>
        </div>
        <!-- 忘记密码 -->
        <div class="w-reg">
          <router-link to="/resetpwd"  replace>忘记密码？</router-link>
        </div>
   </div>
   
  </div>
</template>

<script>
import { check_login } from "@/api/login";
import util from "@/utils/util";
import { mapActions } from "vuex";

export default {
  name: "accountLogin",
  data() {
    return {
      vuegConfig: {
        forwardAnim: "fadeInRight"
      },
      accountName: "",
      accountPwd: "",
      errorMsg: "",
      savePassword: true,
      showUserlist: false
    };
  },
  methods: {
    ...mapActions(["setAccountInfo"]),
    validate(user, pwd) {
      if (user == "") {
        this.errorMsg = "用户名不能为空";
        return false;
      }
      if (pwd == "") {
        this.errorMsg = "密码不能为空";
        return false;
      }
      return true;
    },
    async login() {
      //验证数据
      if (!this.validate(this.accountName, this.accountPwd)) return;

      let req = {
        user: this.accountName,
        pwd: this.accountPwd
      };
      //登录
      const res = await check_login(req);
      this.callback(res);
    },
    //登陆后的回调
    callback({ code, data, message }) {
      console.log("登录回调函数------");
      if (code == 1) {
        // 成功登陆后处理
        util.setItem("userId", data.loginStatus.userId);
        let req = {
          username: this.accountName,
          pwd: null
        };
        if (this.savePassword) {
          req.pwd = this.accountPwd;
        }
        util.saveAccount(req);
        this.setAccountInfo(data.userInfo).then(() => {
          this.$router.replace("/");
        });
      } else {
        this.errorMsg = message;
        return false;
      }
    },
    hiddenError() {
      this.errorMsg = "";
    },
    handleAccount() {
      this.errorMsg = "";
      if (this.userList.length > 0) {
        this.showUserlist = true;
      }
    },
    hideUserList() {
      this.showUserlist = false;
    },
    selectAccount(item, index) {
      this.accountName = item.username;
      if (item.pwd) {
        this.accountPwd = item.pwd;
      }
      this.showUserlist = false;
    }
  },
  computed: {
    userList: function() {
      return util.getItem("userList") ? util.getItem("userList") : [];
    }
  },
  created() {
    // 如果登录了，跳转到登录页面
    if (util.getItem("userId")) {
      this.$router.replace("/");
    }
  },
  components: {}
};
</script>

<style scoped lang="scss" type="text/css">
@import "../../common/scss/minxin.scss";
@import "../../common/scss/form.scss";
.accountLogin {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: 1rem;
}

.logo {
  position: relative;
  width: px2rem(350);
  height: px2rem(350);
  img {
    position: absolute;
    top: -0.35rem;
    display: inline-block;
    width: 100%;
  }
  span {
    font-size: 0.5rem;
    width: 100%;
    display: inline-block;
    text-align: center;
    position: absolute;
    bottom: 0;
    letter-spacing: 5px;
  }
}
</style>
