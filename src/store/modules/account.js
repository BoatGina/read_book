import * as types from '../mutation-types';
import util from '@/utils/util.js';

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
        console.log("vuex获取到的数据：");
        console.log(data);
        state.accountInfo = data;
        util.setItem('accountInfo',data);
    },
}

// actions
const actions = {
    async setAccountInfo({commit},accountInfo){
        commit(types.SET_ACCOUNT_INFO, accountInfo);
    }
}

export default {
    state,
    actions,
    mutations
}