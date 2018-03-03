import Vue from 'vue'
import Router from 'vue-router'


/**
 * [异步视图加载函数]
 * @param  {[string]} name [视图名称]
 * @return {[promise]}      [视图]
 */
const asyncView = (name) => {
    return resolve => require([`../views/${name}/index`], resolve)
}



//异步加载组件
const pageHome = asyncView('pageHome'),
    discovery = asyncView('discovery'),
    bookshelf = asyncView('bookshelf'),
    idea = asyncView('idea'),
    // 个人中心模块
    accountMain = asyncView('accountMain'),
    accountLogin = asyncView('accountLogin'),
    accountLetter = asyncView('accountBase/accountLetter'),
    accountSetUp = asyncView('accountBase/accountSetUp'),
    accountEditInfo = asyncView('accountBase/accountEditInfo'),
    accountShowInfo = asyncView('accountBase/accountShowInfo'),
    accountStatistics = asyncView('accountLists/accountStatistics'),
    accountRank = asyncView('accountLists/accountRank'),
    accountFollow = asyncView('accountLists/accountFollow'),
    accountNote = asyncView('accountLists/accountNote'),
    accountBooklist = asyncView('accountLists/accountBooklist'),
    bookCategory = asyncView('bookstore/bookCategory'),
    bookDatil = asyncView('bookstore/bookDatil'),
    book = asyncView('bookstore/book'),
    bookRead = asyncView('bookstore/bookRead'),
    search = asyncView('bookstore/search'),
    ranklist = asyncView('discoveryLists/ranklist'),
    ranklistDetail = asyncView('discoveryLists/ranklistDetail')


Vue.use(Router);

//路由
const routes = [{
    path: '/',
    name: 'home',
    redirect: { name: 'main' }
}, {
    path: '/main',
    name: 'main',
    component: pageHome,
    children: [
        {
            path: '',
            name: 'discovery',
            component: discovery
        },
        {
            path: 'bookshelf',
            name: 'bookshelf',
            component: bookshelf
        }, {
            path: 'idea',
            name: 'idea',
            component: idea
        }, {
            path: 'account',
            name: 'account',
            component: accountMain
        }
    ]
},
{
    path: '/login',
    name: 'login',
    component: accountLogin
},
{
    path: '/user/s/letter',
    name: 'letter',
    component: accountLetter
},
{
    path: '/user/s/setUp',
    name: 'setUp',
    component: accountSetUp
},
{
    path: '/user/s/editInfo',
    name: 'editInfo',
    component: accountEditInfo
},
{
    path: '/user/s/showInfo/:id',
    name: 'showInfo',
    component: accountShowInfo
},
{
    path: '/user/s/statistics',
    name: 'statistics',
    component: accountStatistics
},
{
    path: '/user/s/rank',
    name: 'rank',
    component: accountRank
},
{
    path: '/user/s/follow',
    name: 'follow',
    component: accountFollow
},
{
    path: '/user/s/note',
    name: 'note',
    component: accountNote
},
{
    path: '/user/s/bookList',
    name: 'bookList',
    component: accountBooklist
},
// 书城
{
    path: '/book/s/bookstore',
    name: 'bookCategory',
    component: bookCategory
},
{
    path: '/book/s/bookDatil',
    name: 'bookDatil',
    component: bookDatil
}, {
    path: '/book/:bookId',
    name: 'book',
    component: book
},
{
    path: '/readbook/:bookId',
    name: 'readbook',
    component: bookRead
},
{
    path: '/search',
    name: 'search',
    component: search
},
// 发现
{
    path: '/ranklist',
    name: 'ranklist',
    redirect: '/ranklist/weekRank',
    component: ranklist,
    children: [{
        path: '/ranklist/*',
        name: 'RanklistDetail',
        component: ranklistDetail
    }]
}];


const router = new Router({
    mode: "history",
    routes
});

router.beforeEach((to, from, next) => {

    //检查登录
    console.log("-----------------");
    console.log(from);
    console.log(to);
    next();
    // next('/login');
    // if (true) {
    //     next('/login');
    // } else {
    //     next();
    // }
});

export default router;