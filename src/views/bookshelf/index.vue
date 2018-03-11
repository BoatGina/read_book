
<template>
  <div class="bookshelf" >
    <!-- 顶部信息栏 -->
    <mt-header :fixed=true title="" >
      <mt-button  slot="left" @click.stop="stopEdit" v-if="editStatus">
          <i slot="icon" class="iconfont icon-guanbi" ></i>
      </mt-button>
      <mt-button slot="right"  @click.stop="startEdit" v-else>
        <transition name="fade">
          <span class="start_edit">编辑</span>
        </transition>
      </mt-button>
    </mt-header>
    <h1 class="new_title">
        <p>书架</p>
        <p class="title_bottom" v-show="editStatus">{{ selectedLen > 0 ? `已选择${selectedLen}本书`:'请选择书籍'  }}</p>
    </h1>

    <!-- 书架内容 -->
    <ul class="books">
      <v-touch v-for="(item,index) in books" :key="item._id" :class="{active: selectedBooks[item._id]!=undefined}" 
      tag="li" @tap="handleBooks(item._id,index)" @press="pinchEvent(item._id,index)">
         <div class="img_wrapper">
            <img v-lazy="item.cover"/>
            <div class="icon_wrapper" v-show="editStatus">
              <i class="iconfont icon-icon" ></i>
            </div>
            <!-- 私密保护 -->
            <div class="private_read" v-show="privateBooks[item._id]!=undefined">
              <i class="iconfont icon-ai241"></i>
            </div>
          </div>
          <p class="book_name">{{item.title | formatTittle}}</p>
      </v-touch>

      <li class="book_store">
        <router-link to="/book/s/bookstore" class="img_wrapper">
          <span>+</span>
        </router-link>
      </li>
      
    </ul>

    <!-- 编辑底部导航 --> 
    <bookBottom v-show="editStatus" :privateTxt='privateTxt' :selectedLen='selectedLen' @delBook='delBook' @privateRead='privateRead'></bookBottom>
  </div>
</template>

<script>
import bookBottom from "../../components/bookBottom/index";
import util from "@/utils/util.js";
import bookApi from "@/api/book.js";
import { Indicator } from "mint-ui";
import {
  deleteBookShelf,
  addBookShelf,
  getBookShelf
} from "@/api/bookHandle.js";

export default {
  name: "bookshelf",
  data() {
    return {
      // 编辑状态
      editStatus: false,
      // 私密字体样式
      privateTxt: false,
      // 私密阅读对象
      privateBooks: {},
      // 选中的书籍对象和长度
      selectedBooks: {},
      selectedLen: 0,
      // 书架列表
      books: []
    };
  },
  methods: {
    startEdit() {
      this.editStatus = true;
    },
    stopEdit() {
      this.editStatus = false;
      this.selectedBooks = [];
      this.selectedLen = 0;
      this.selectedBooks = {};
      // this.$set(this.selectedBooks, index, undefined);
    },
    handleBooks(id, index) {
      // 如果是在编辑书架
      if (this.editStatus) {
        if (this.selectedBooks[id] === undefined) {
          this.$set(this.selectedBooks, id, index);
          this.selectedLen++;
        } else {
          this.$set(this.selectedBooks, id, undefined);
          this.selectedLen--;
        }
        // 私密样式设置
        this.privateStyle(id, index);
      } else {
        // 如果是阅读书籍,则跳转到书籍阅读页面
        this.readBook(id);
      }
      console.log("选中书籍的selectedLen:");
      console.log(this.selectedLen);
      console.log("选中书籍的selectedBooks:");
      console.log(this.selectedBooks);
    },
    pinchEvent(id, index) {
      console.log(4444445555);
      if (!this.editStatus) {
        this.editStatus = true;
      }
      this.handleBooks(id, index);
    },
    privateStyle(id, index) {
      if (this.selectedLen > 1) {
        // 如果选中书籍中有一个是没有私密的，就显示私密
        for (let item in this.selectedBooks) {
          if (this.privateBooks[item] != item) {
            this.privateTxt = false;
          }
        }
      } else if (this.selectedLen == 0) {
        this.privateTxt = false;
      } else {
        if (this.privateBooks[id] == id) {
          this.privateTxt = true;
        } else {
          this.privateTxt = false;
        }
      }
    },
    // 私密阅读事件
    privateRead() {
      if (this.selectedLen > 1) {
        let privateCount = 0;
        for (let item in this.selectedBooks) {
          if (this.privateBooks[item]) {
            privateCount++;
          }
        }

        // 如果选中的全都是私密的
        if (privateCount == this.selectedLen) {
          for (let item in this.selectedBooks) {
            this.$set(this.privateBooks, item, undefined);
            this.addPrivate(item, 2);
          }
        } else {
          // 如果选中的全是非私密的 或者有的是非私密的
          for (let item in this.selectedBooks) {
            this.$set(this.privateBooks, item, item);
            this.addPrivate(item, 1);
          }
        }
      } else if (this.selectedLen == 1) {
        // 如果是单个文件，则分别判断
        // 判断是否是私密保护
        for (let item in this.selectedBooks) {
          let isPrivate = !!this.privateBooks[item];
          if (isPrivate) {
            this.$set(this.privateBooks, item, undefined);
            this.addPrivate(item, 2);
          } else {
            this.$set(this.privateBooks, item, item);
            this.addPrivate(item, 1);
          }
        }
      } else {
        return;
      }

      this.stopEdit();
    },
    // 添加私密信息到local缓存中
    addPrivate(bookId, num) {
      let localShelf = util.getItem("followBookList")
        ? util.getItem("followBookList")
        : [];
      if (num == 1) {
        // 添加
        localShelf[bookId]["private"] = true;
      } else {
        // 删除
        localShelf[bookId]["private"] = false;
      }
      util.setItem("followBookList", localShelf);
    },
    // 初始化数据
    async getBookUpdate() {
      let localShelf,
        that = this;
      // Indicator.open();
      let bookId = await this.getBookList();
      console.log("bookId数组的值：");
      console.log(bookId);
      if (!!bookId.length) {
        let newShelf = {};
        for (let i = 0; i < bookId.length; i++) {
          let data = await bookApi.getBook(bookId[i]);
          let newData = {};
          newData.cover = util.staticPath + data.cover;
          newData.title = data.title;
          newShelf[bookId[i]] = newData;
          newData._id = bookId[i];
          this.books.push(newData);
        }
        util.setItem("followBookList", newShelf);
        console.log("books的值：");
        console.log(this.books);
        console.log("newShelf的值：");
        console.log(newShelf);
      } else {
        Indicator.close();
        console.log("关闭Indicator");
      }
    },
    /**
     * 返回追更新的书本id
     */
    async getBookList() {
      let localShelf = null;
      let bookListArray = [];
      if (util.getItem("followBookList")) {
        localShelf = util.getItem("followBookList");
        for (let bookId in localShelf) {
          bookListArray.push(bookId);
        }
      } else {
        let data = await getBookShelf(util.getItem("userId"));
        console.log("888888888888");
        console.log(data);
        if (data.code == 1) {
          // bookListArray = data.data.bookshelf
          //   ? data.data.bookshelf.split(",")
          //   : "";
          if (data.data.bookshelf) {
            bookListArray = data.data.bookshelf.split(",");
            if (!bookListArray[bookListArray.length - 1]) {
              bookListArray.pop();
            }
          }else{
            bookListArray="";
          }
        }
      }
      console.log("bookListArray的值");
      console.log(bookListArray);
      return bookListArray;
    },
    // 删除书籍
    delBook() {
      let localShelf = util.getItem("followBookList")
        ? util.getItem("followBookList")
        : [];
      let newBooks = this.deepClone(this.books);
      let newBooks2 = [];
      for (let booId in this.selectedBooks) {
        if (this.selectedBooks[booId]) {
          delete localShelf[booId];
          deleteBookShelf(util.getItem("userId"), booId).then(res => {
            console.log("删除书架书籍：");
            console.log(res.data.message);
          });
          newBooks[this.selectedBooks[booId]] = undefined;
        }
      }
      for (let i = 0; i < newBooks.length; i++) {
        if (newBooks[i]) {
          newBooks2.push(newBooks[i]);
        }
      }
      this.books = newBooks2;
      console.log("删除书籍后的books:");
      console.log(this.books);
      util.setItem("followBookList", localShelf);
      this.stopEdit();
    },
    // 判断传入对象的类型
    isClass(o) {
      if (o === null) return "Null";
      if (o === undefined) return "Undefined";
      return Object.prototype.toString.call(o).slice(8, -1);
    },
    // 深度复制对象
    deepClone(obj) {
      let result;
      let oClass = this.isClass(obj);
      if (oClass === "Object") {
        result = {};
      } else if (oClass === "Array") {
        result = [];
      } else {
        return obj;
      }
      for (let key in obj) {
        let copy = obj[key];
        if (this.isClass(copy) == "Object") {
          result[key] = this.deepClone(copy); //递归调用
        } else if (this.isClass(copy) == "Array") {
          result[key] = this.deepClone(copy);
        } else {
          result[key] = obj[key];
        }
      }
      return result;
    },
    // 读书
    readBook(bookId) {
      // Indicator.open();
      // 获取小说详情
      // if (!this.$store.state.book.source) {
      bookApi
        .getMixSource(bookId)
        .then(data => {
          this.$store.commit("SET_CURRENT_SOURCE", data[0]._id);
          this.jumpRead(bookId);
        })
        .catch(err => {
          console.log(err);
        });
      // }else{
      //   this.jumpRead(bookId);
      // }
    },
    jumpRead(bookId) {
      bookApi.getBook(bookId).then(
        data => {
          console.log("该书的数据：");
          console.log(data);
          let book = data;
          this.$store.commit("SET_READ_BOOK", book);
          this.$router.push("/readbook/" + bookId);
          // Indicator.close();
        },
        err => {
          this.$router.go(-1);
          console.log(err);
        }
      );
    }
  },
  filters: {
    formatTittle(val) {
      // return Number(val.length) > 12 ? `${val.slice(0, 10)}...` : val;
      if (val) {
        return val;
      } else {
        return "未知书名";
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.editStatus) {
      this.stopEdit();
      next(false);
    } else {
      next();
    }
  },
  computed: {
    localShelf() {
      let localShelf = util.getItem("followBookList")
        ? util.getItem("followBookList")
        : [];
      return localShelf;
    }
  },
  mounted() {},
  components: {
    bookBottom
  },
  created() {
    this.getBookUpdate();
  }
};
</script>

<style lang="scss" >
@import "../../common/scss/minxin.scss";

.bookshelf {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fff;
}

.new_title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  // flex-direction: column;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1rem;
  font-size: 0.4rem;
  z-index: 100;
  font-weight: normal;
  p {
    width: 100%;
    text-align: center;
  }
  .title_bottom {
    font-size: 0.3rem;
  }
}

.start_edit {
  font-size: 0.35rem;
  color: #4876ff;
}

.books {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  // display:grid;
  // grid-template-columns:auto  auto  auto ;
  margin-top: 1rem;
  li {
    // position: relative;
    width: px2rem(250);
    margin-top: px2rem(20);
    .img_wrapper {
      position: relative;
      width: px2rem(160);
      height: px2rem(225);
      overflow: hidden;
      margin: 0 auto;
      box-shadow: 0px 2px 2px #888888;
      background: #ccc;
      &:last-child {
        background-color: #fff;
      }
      img {
        display: inline-block;
        width: px2rem(180);
      }
      .icon_wrapper {
        position: absolute;
        bottom: px2rem(2);
        right: px2rem(2);
        z-index: 100;
        width: px2rem(40);
        height: px2rem(40);
        text-align: center;
        border-radius: 50%;
        background: rgba($color: #000000, $alpha: 0.5);
        .iconfont {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.2rem;
          color: rgba(255, 255, 255, 0.966);
        }
      }
    }
    .book_name {
      width: px2rem(160);
      font-size: 12px;
      padding-top: 0.12rem;
      // height: 0.8rem;
      margin: 0 auto;
      overflow: hidden;
    }
    .private_read {
      position: absolute;
      left: 0;
      bottom: 0;
      width: px2rem(50);
      height: px2rem(50);
      background: linear-gradient(
        to right top,
        #3b6df7 0%,
        #5a99f7 50%,
        transparent 50%,
        transparent 100%
      );
      .iconfont {
        position: absolute;
        left: 0;
        bottom: 0;
        color: #fff;
        font-size: 0.2rem;
      }
    }
    &.book_store {
      .img_wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ccc;
        box-shadow: 0px 0px 0px #888888;
        font-size: 1rem;
        font-weight: normal;
        color: #999;
        span {
          position: relative;
          top: -5px;
        }
      }
    }
  }
}
// 过渡效果
.fade-enter-active,
.fade-leave {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
li.active {
  .icon_wrapper {
    background: #3b6df7 !important;
  }
}
image[lazy="loading"] {
  background: #eee;
}
</style>