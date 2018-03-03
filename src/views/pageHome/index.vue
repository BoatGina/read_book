<template>
  <div class="pageHome"> 
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <tabBottom></tabBottom>
  </div>
</template>

<script>
import tabBottom from "../../components/tabBottom";


export default {
  name: "pageHome",
  components: {
    tabBottom
  },
  created() {
    
  }
};
</script>

<style lang="scss" type="text/css">
// 过渡效果
.fade-enter-active,
.fade-leave {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.pageHome {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: calc(55px);
  width: 100%;
  overflow: auto;
}
</style>
