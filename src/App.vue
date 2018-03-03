<template>
  <div id="app"> 
    <router-view v-transition></router-view>
  </div>
</template>

<script>
import util from "@/utils/util";

export default {
  name: "app",
  created() {
    // 触发登录检查
    if (!util.getItem("userId")) {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" type="text/css">
// 全局定制样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -ms-touch-action: none;
  -webkit-touch-callout: none;
  user-select: none;
  text-size-adjust: none;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: "Microsoft Yahei" !important;
}

@media screen and (min-width: 769px) {
  body {
    box-shadow: 0 0 30px gray;
    margin: 0 auto;
  }
  body,
  #app {
    width: 440px;
  }
}

#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

a {
  display: inline-block;
  text-decoration: none;
  font-size: 16px;
  text-align: center;
}

input.text {
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  height: 40px;
  border-bottom: 1px solid #eee;
}

input.btn {
  display: block;
  border-radius: 2px;
  letter-spacing: 2px;
  font-size: 16px;
  text-align: center;
  outline: none;
  border: none;
  cursor: pointer;
}

button {
  text-align: center;
  outline: none;
  border: none;
}

.clearfix::after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  zoom: 1;
}

.left {
  float: left;
}
.right {
  float: right;
}

/*居中一个元素*/
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/*无序列表样式*/
ul {
  display: inline-block;
  li {
    list-style-type: none;
  }
}
/*页面切换动画*/
/*
.slide-enter,.slide-leave-to{
  transform:translate3d(100%,0,0);
  opacity:1;
}
*/

#vueg-background {
  opacity: 1;
  background: #fff !important;
}

// 修改mint-ui样式
.mint-header {
  height: 1rem;
  color: #666;
  background: #fff;
  font-size: 0.38rem;
}

.loadmore .mint-loadmore-text{
    font-size: 0.3rem !important;
    color: #999 !important;
}
</style>
