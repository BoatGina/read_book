import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
import * as getters from './getters'
// import { state, mutations } from './mutations'
import account from './modules/account'
import book from './modules/book'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	// actions,
	getters,
	// state,
	// mutations,
	modules: {
		account,
		book
	}
})