import * as types from '../mutation-types'

// init state
const state = {
   loginStatus:{
       isLogin:false
   },
   accountInfo:null
}

// mutations
const mutations = {
    [types.SET_ACCOUNT_INFO](state, data) {
        state.accountInfo = data;
    },
}

// actions
const actions = {
    
}

export default {
    state,
    actions,
    mutations
}