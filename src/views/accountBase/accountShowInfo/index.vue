<template>
  <div class="accountShowInfo">
    <!-- 顶部信息栏 -->
    <mt-header :fixed=true :title="account.nickname"  >
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <!-- 内容区 -->
    <div class="infoTop">
      <img :src="account.iconUrl"/> 
      <p class="instruction">{{ account.sex }} · {{ account.address }}</p>
      <ul class="info_wrapper">
        <li>
          <p>{{account.read_len | timeFormat}}</p>
          <p>读书时长</p>
        </li>
        <li>
          <p>{{account.zan_num}}个</p>
          <p>收到的赞</p>
        </li>
        <li>
          <p>{{account.cared_count}}人</p>
          <p>关注我</p>
        </li>
      </ul>
    </div>

    <!-- 最近阅读书籍和书架 -->
    <div class="history_wrapper">
      <h1>最近阅读</h1>
      <div class="book_list">

        <p v-if="latelyReaded.length==0">暂无~</p>
        <ul class="book_list_ul" v-else>
          <li v-for="(item,index) in latelyReaded" :key="index">
            <div class="list_wrapper">
              <img :src="item.cover"/>
              <p>{{item.title}}</p>
            </div>
          </li>
        </ul>
      </div>
      <p class="see_book">查看书架</p>
    </div>
   
  </div>
</template>

<script>
import util from "@/utils/util.js";
import { getRecord } from "@/api/bookHandle.js";
import bookApi from "@/api/book.js";

export default {
  name: "accountShowInfo",
  data() {
    return {
      vuegConfig: {
        forwardAnim: "fideIn",
        backAnim: "fideOut",
        duration: 0.5
      },
      latelyReaded: []
    };
  },
  computed: {
    account() {
      if (this.$route.params.id == util.getItem("userId")) {
        return util.getItem("accountInfo");
      } else {
        // 根据ID进行请求
      }
    }
  },
  methods: {},
  created() {},
  filters: {
    timeFormat(data) {
      let time = Math.round(data / 60 / 60);
      let hour = Math.floor(time / 60);
      let minute = Math.floor(time % 60);
      return `${hour}时${minute}分`;
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      // 进入前，先请求阅读记录并储存在本地中
      console.log("请求阅读记录获取到的数据--------开始---->");
      getRecord(util.getItem("userId")).then(data => {
        console.log("请求阅读记录获取到的数据：");
        console.log(data);
        let bookArray = data.data.recordBook;
        if (bookArray) {
          bookArray = bookArray.split(",").slice(0, -1);
          if (bookArray.length > 4) {
            bookArray = bookArray.slice(0, 3);
          }
          if (bookArray.length > 0) {
            let newResult = [];
            bookArray.forEach(bookId => {
              bookApi.getBook(bookId).then(bookData => {
                bookData.cover = util.staticPath + bookData.cover;
                newResult.push(bookData);
              });
            });
            bookArray = newResult;
          }
        } else {
          bookArray = [];
        }
        vm.latelyReaded = bookArray;
        console.log("latelyReaded数值：");
        console.log(vm.latelyReaded);
      });
    });
  },
  components: {}
};
</script>

<style scoped lang="scss" type="text/css">
@import "../../../common/scss/minxin.scss";

.accountShowInfo {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #eee;
  .mint-header {
    background: transparent !important;
  }
  .infoTop {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: center;
    padding-top: px2rem(100);
    width: 100%;
    height: px2rem(600);
    background: rgba($color: #999, $alpha: 0.8);
    // box-shadow: 0 -5px 5px rgba($color: #666, $alpha: 0.5) inset;
    font-size: 0.3rem;
    color: #fff;
    img {
      width: px2rem(200);
      height: px2rem(200);
      border-radius: 50%;
      border: 1px solid #fff;
    }
    p {
      width: 100%;
      text-align: center;
    }
    .instruction {
      // color: #999;
    }
  }
  .info_wrapper {
    width: 100%;
    height: px2rem(150);
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      width: 33%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: center;
      align-items: center;
      justify-content: center;
      p:last-child {
        color: #ccc;
      }
    }
  }
  .history_wrapper {
    position: relative;
    width: 100%;
    height: px2rem(500);
    background: #fff;
    margin-top: px2rem(20);
    > h1 {
      width: 100%;
      height: px2rem(100);
      line-height: px2rem(100);
      font-weight: normal;
      color: #666;
      font-size: 0.3rem;
      text-align: center;
    }
    .book_list {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: px2rem(450);
      // background: green;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      > p {
        font-size: 0.3rem;
        color: #999;
      }
      .book_list_ul {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top:px2rem(15);
        li {
          // display: inline-block;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-content: flex-start;
          width: 30%;
          box-sizing: border-box;
          height: 100%;
          // background: red;
          overflow: hidden;
        }
        .list_wrapper {
          width: 75%;
          height: 100%;
          img {
            float: left;
            width: 100%;
          }
          p {
            float: left;
            width: 100%;
            text-align: center;
            color: #666;
            font-size: 0.3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .see_book {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: px2rem(100);
      line-height: px2rem(100);
      color: #000;
      font-size: 0.3rem;
      text-align: center;
    }
  }
}
</style>
