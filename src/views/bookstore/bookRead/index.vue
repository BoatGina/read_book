<template>
	<div id="container" class="container">
		<mt-header fixed :title="$store.state.book.bookInfo.title" v-if="operation" class="head">
			<mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
		</mt-header>
		<v-touch class="content" @tap="operationAction($event)" @swipeleft="onSwipeLeft" :class="{'night-mode':nightMode}">
			<h3>{{bookChaptersContent.title}}</h3>
			<article v-html="bookChaptersBody"></article>
		</v-touch>
		<div class="menu" v-if="operation">
      <v-touch class="menu-btn" @tap="showChapter">
				<img src="./list.svg">
				<span>目录</span>
			</v-touch>
			<v-touch class="menu-btn" v-if="nightMode" @tap="changeMode">
				<img src="./sun.svg">
				<span>日间模式</span>
			</v-touch>
			<v-touch class="menu-btn" @tap="changeMode" v-else>
				<img src="./moon.svg">
				<span>夜间模式</span>
			</v-touch>
			<div class="menu-btn">
				<img src="./setting.svg">
				<span>设置</span>
			</div>
			
		</div>
		<!--阅读设置-->
		<!--<div class="read-setting">
	            <div class="setting-item">
	                <v-touch tag="span" @tap="increaseFont">
	                    <img src="../../assets/font_smaller.svg" />
	                </v-touch>
	                <v-touch tag="span" @tap="decreaseFont">
	                    <img src="../../assets/font_bigger.svg" />
	                </v-touch>
	            </div>
	            <div class="setting-item">
	                <v-touch tag="span" @tap="smallLineSpacing">
	                    <img src="../../assets/line_spacing_small.svg" />
	                </v-touch>
	                <v-touch tag="span" @tap="normalLineSpacing">
	                    <img src="../../assets/line_spacing_normal.svg" />
	                </v-touch>
	                <v-touch tag="span" @tap="bigLineSpacing">
	                    <img src="../../assets/line_spacing_big.svg" />
	                </v-touch>
	            </div>
	            <div class="setting-item">
	                <ul class="bg-color">
	                    <li></li>     
	                </ul>
	            </div>
	        </div>-->
		<!--目录-->
    <transition name='chapterStyle'>
		<v-touch tag="div" class="chapter-list" v-show="isShowChapter" @swipeleft="onSwipeLeft"   v-scroll="onScroll" >
			<div class="chapter-contents">
				<p>{{$store.state.book.bookInfo.title}}：目录</p>
				<v-touch tag="span" class="chapter-sort" @tap="descSort">
					<img src="./down.svg" v-if="!chapterDescSort">
					<img src="./up.svg" v-else>
				</v-touch>
			</div>
			<div class="chapter-wrapper">
        <ul id="chapter-list" v-if="loadedChapters">
				  <v-touch tag="li" v-for="(chapter, index) in loadedChapters" :key="index" @tap="jumpChapter(index)">{{chapter.title}}</v-touch>
			  </ul>
      </div>
		</v-touch>
    </transition>
	</div>
</template>

<script>
import bookApi from "@/api/book.js";
import util from "@/utils/util.js";
import { Indicator, MessageBox, Toast } from "mint-ui";
import {addRecord} from '@/api/bookHandle.js';

export default {
  name: "ReadBook",
  data() {
    return {
      vuegConfig: {
        forwardAnim: "fadeIn",
        backAnim: "fadeOut"
      },
      bookChapter: {},
      bookChaptersContent: "",
      loadedChapters: [], // 缓存滚动加载的章节列表
      loadPages: 1, // 滚动加载的记次
      firstLoad: true, // 首次加载标识符
      operation: false, // 显示操作界面标识符
      currentChapter: 0,
      nightMode: false, // 夜间/日间模式却换
      isShowChapter: false, // 是否显示目录
      chapterDescSort: false // 是否降序排列
    };
  },
  computed: {
    bookChaptersBody() {
      let content =
        this.bookChaptersContent && this.bookChaptersContent.cpContent
          ? "cpContent"
          : "body";
      return (
        this.bookChaptersContent &&
        this.bookChaptersContent[content].replace(/\n/g, "<br/>")
      );
    }
  },
  beforeCreate() {
    Indicator.open("加载中");
  },
  created() {
    let readRecord = util.getItem("followBookList")
      ? util.getItem("followBookList")
      : [];
    console.log("来自bookRead--source值");
    console.log(this.$store.state.book.source);

    bookApi
      .getChapters(this.$store.state.book.source)
      .then(data => {
        this.bookChapter = data;
        this.currentChapter =
          readRecord &&
          readRecord[this.$route.params.bookId] &&
          readRecord[this.$route.params.bookId].chapter
            ? readRecord[this.$route.params.bookId].chapter
            : 0;
        // 默认取前50章节
        console.log("来自bookRead--loadedChapters值");
        console.log(this.loadedChapters);
        this.loadedChapters = this.bookChapter.chapters.slice(0, 50);
        Indicator.close();
        this.getBookChapterContent();
      })
      .catch(err => {
        console.log(err);
        MessageBox.alert("加载失败，请重试").then(() => {
          // this.$router.push("/book/" + this.$route.params.bookId);
          this.$router.go(-1);
        });
      });
  },
  // mounted () {
  //     debugger
  //     let readRecord = util.getLocalStroageData('followBookList');
  //     let scrollTop = readRecord ? readRecord[this.$route.params.bookId].readPos : 0;
  //     if(this.firstLoad && scrollTop){
  //         document.getElementById('container').scrollTop = scrollTop;
  //     }else{
  //         this.firstLoad = false;
  //         document.getElementById('container').scrollTop = 0;
  //     }
  // },
  /**
   * watch 不知道是发生在updated之前还是之后
   */
  watch: {
    currentChapter: "getBookChapterContent"
  },
  methods: {
    getBookChapterContent() {
      // 不同源之间的章节数量不一样，当前阅读章节与源章节取小的，避免报错
      let lastChapter =
        this.currentChapter >= this.bookChapter.chapters.length - 1
          ? this.bookChapter.chapters.length - 1
          : this.currentChapter;
      Indicator.open("加载中");
      // 无论正序还是倒叙 当前章节字段都是 按正序的序号
      console.log("55555555555");
      console.log(this.bookChapter.chapters[lastChapter]);

      bookApi
        .getBookChapterContent(this.bookChapter.chapters[lastChapter].link)
        .then(data => {
          console.log("------------");
          console.log(data);
          /**
           *  判断是否是正版源，如果是正版，给出换源提示
           */
          if (data.chapter.cpContent && data.chapter.isVip) {
            MessageBox.alert("章节为正版源，请换源后重试").then(() => {
              // this.$router.push("/changeSource/" + this.$route.params.bookId);
            });
          } else {
            this.bookChaptersContent = data.chapter;
            document.getElementById("container").scrollTop = 0;
          }
          Indicator.close();
        })
        .catch(err => {
          console.log("~~~~~~~~~~");
          Indicator.close();
          MessageBox.alert("加载失败，请重试").then(() => {
            this.$router.go(-1);
          });
          console.log(err);
        });
    },
    operationAction($event) {
      // 判断点击位置 执行不同操作
      let el = $event.pointers[0] || $event.srcEvent;
      if (this.isShowChapter) {
        this.isShowChapter = false;
        return;
      }
      let screenHeight = document.body.clientHeight;
      let gap = document.body.clientHeight / 3;
      let targetPos = el.clientY;
      let contanierEle = document.getElementById("container");
      if (targetPos > 0 && targetPos < gap) {
        this.operation = false;
        contanierEle.scrollTop -= screenHeight;
      }
      if (targetPos > gap && targetPos < screenHeight - gap) {
        this.operation = !this.operation;
      }
      if (screenHeight - gap < targetPos && targetPos < screenHeight) {
        this.operation = false;
        // 判断是否到底部
        if (
          contanierEle.scrollHeight ===
          contanierEle.scrollTop + screenHeight
        ) {
          if (this.currentChapter >= this.bookChapter.chapters.length - 1) {
            Toast("这已经是最新的章节了~");
            return;
          }
          // 当前章节加1
          this.currentChapter += 1;
        }
        contanierEle.scrollTop += screenHeight;
      }
    },
    // 切换日间/夜间模式
    changeMode() {
      this.nightMode = !this.nightMode;
    },
    // 显示目录
    showChapter() {
      this.isShowChapter = true;
    },
    // 点击目录，跳转章节
    jumpChapter(index) {
      console.log("点击目录，跳转章节");
      console.log(this.currentChapter);
      console.log(this.chapterDescSort);
      console.log(this.bookChapter.chapters.length);
      this.currentChapter = this.chapterDescSort
        ? this.bookChapter.chapters.length - index - 1
        : index;
      this.isShowChapter = false;
      this.operation = false;
    },
    // 记录阅读历史
    recordReadHis() {
      let readRecord = util.getItem("followBookList") || {};
      readRecord[this.$route.params.bookId] = {
        cover: this.$store.state.book.bookInfo.cover,
        title: this.$store.state.book.bookInfo.title,
        chapter: this.currentChapter,
        source: this.$store.state.book.source,
        readPos: document.getElementById("container").scrollTop
      };
      util.setItem("followBookList", readRecord);
    },
    // 切换章节查看模式
    descSort() {
      // let bookChapterCount = this.bookChapter.chapters.length;
      // document.querySelector(".chapter-list").scrollTop = 0;
      // this.chapterDescSort = !this.chapterDescSort;
      // this.loadedChapters = this.chapterDescSort
      //   ? this.bookChapter.chapters
      //       .slice(bookChapterCount - 50, bookChapterCount)
      //       .reverse()
      //   : this.bookChapter.chapters.slice(0, 50);
      // this.loadPages = 1;
    },
    // 控制左手向左拖关闭目录
    onSwipeLeft() {
      this.isShowChapter = false;
    },
    // 滚动加载到底部，显示更多
    onScroll: function(e, position) {
      let bookChapterCount = this.bookChapter.chapters.length;
      if (position.scrollTop > 1300 * this.loadPages) {
        if (this.chapterDescSort) {
          this.loadedChapters = this.loadedChapters.concat(
            this.bookChapter.chapters
              .slice(
                bookChapterCount - 50 * (this.loadPages + 1),
                bookChapterCount - 50 * this.loadPages
              )
              .reverse()
          );
        } else {
          this.loadedChapters = this.loadedChapters.concat(
            this.bookChapter.chapters.slice(
              50 * this.loadPages,
              50 * (this.loadPages + 1)
            )
          );
        }
        this.loadPages++;
      }
    },
    /***
     * 增加字体
     */
    increaseFont() {
      // let articleElem = document.getElementsByTagName('article')[0]
      // articleElem.style.fontSize
    },
    /**
     * 减小字体
     */
    decreaseFont() {
      // let articleElem = document.getElementsByTagName('article')[0]
    }
  },
  /**
   * 对未加入书架的小说，提示是否加入书架
   */
  beforeRouteLeave(to, from, next) {
    console.log("路由开始离开---------");
    let readRecord = util.getItem("followBookList") || {};
    // 添加进阅读书籍中
    addRecord(util.getItem("userId"),this.$route.params.bookId).then((data)=>{
      console.log("执行添加阅读记录后返回的数据---------");
      console.log(data);
      if(data.code == 1){
        console.log("记录阅读成功");
      }else{
        console.log("记录阅读失败");
        console.log(data.data.message);
      }
    });
    if (!readRecord[this.$route.params.bookId]) {
      MessageBox.confirm("是否将小说加入书架？").then(
        () => {
          this.recordReadHis();
          Toast("添加成功！");
          next();
        },
        () => {
          next();
        }
      );
    } else {
      this.recordReadHis();
      next();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import "../../../common/scss/minxin.scss";

.container {
  background: #dad9d4;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  color: #000;
}

.content {
  min-height: 100vh;
}

article {
  font-size: 0.3rem;
  line-height: px2rem(40);
  padding: 0 0.2rem;
}

h3 {
  text-align: center;
  margin-top: 0;
  font-size: 0.4rem;
  margin-top: 0.2rem;
  margin-bottom: 0.4rem;
}

.head {
  background: #000;
  color: #f3e7e7;
}

.menu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #000;
  height: 1rem;
  width: 100%;
}

.menu img {
  color: #fff;
  width: 0.5rem;
  height: 0.5rem;
  align-self: center;
}

.menu-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #f3e7e7;
  text-align: center;
}

.menu-btn i {
  font-size: 0.3rem;
}

.menu-btn span {
  font-size: 0.3rem;
}

.arrow-left {
  position: absolute;
  left: 0.2rem;
  line-height: 0.5rem;
  font-size: 0.3rem;
}

.night-mode {
  background: #383434;
  color: #807d7d;
}

.chapter-list {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: auto;
  background: #fff;
  width: 80%;
  z-index: 10;
}

.chapter-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 1rem);
  overflow: auto;
}

.chapter-list ul {
  margin-top: 0;
  width: 100%;
}

.chapter-list li {
  padding-left: 0.4rem;
  line-height: 0.8rem;
  font-size: 0.32rem;
  border-bottom: 1px solid #f2f2f2;
}

.chapter-contents {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.2rem;
  box-sizing: border-box;
  height: 1rem;
  z-index: 1000;
  p {
    font-size: 0.4rem;
  }
}

.chapter-sort {
  margin-right: 0.2rem;
  align-self: center;
}

.chapter-sort img {
  width: 0.5rem;
  height: 0.5rem;
}

.chapterStyle-enter-active,
.chapterStyle-leave-active {
  transition: left 0.5s;
}
.chapterStyle-enter,
.chapterStyle-leave-to {
  left: -80%;
}
</style>