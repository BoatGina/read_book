import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import vueg from 'vueg'
import VueTouch from 'vue-touch'
import 'vueg/css/transition-min.css'
import '@/common/js/hide-address'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './common/iconfont/iconfont.css'
import vuescroll from 'vue-scroll'

Vue.use(vuescroll)


Vue.use(VueTouch, {name: 'v-touch'})

Vue.use(Mint);

Vue.config.productionTip = false   //生产环境请用true

// 用 axios 进行 Ajax 请求
Vue.use(VueAxios, axios)

// Vuex 进行状态管理
Vue.use(Vuex)

// vueg 转场动画
const options = {
	forwardAnim: 'fadeInRight', //前进动画，默认为fadeInRight
    backAnim: 'fadeInLeft', //后退动画，默认为fedeInLeft
	duration:0.2
}
Vue.use(vueg, router, options)

// fastclick,解决移动端300ms延迟
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body)
	}, false)
}

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})