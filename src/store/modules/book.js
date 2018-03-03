import * as types from '../mutation-types'

// init state
const state = {
    source: '', // 小说源
    bookInfo: {}, //读书记录
    rankList: {
        weekRankId: '',
        monthRankId: '',
        totalRankId: '',
        headTitle: '', // 头部文字
    }
}

// mutations
const mutations = {
    [types.SET_CURRENT_SOURCE](state, source) {
        state.source = source
    },
    [types.SET_READ_BOOK](state, book) {
        state.bookInfo = book;
        console.log('store设置的书籍信息：');
        console.log(state.bookInfo);
    },
    [types.SET_RANK](state, rankDetail) {
        state.rankList = {
            'weekRankId': rankDetail._id,
            'monthRankId': rankDetail.monthRank,
            'totalRankId': rankDetail.totalRank,
            'headTitle': rankDetail.shortTitle
        }
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