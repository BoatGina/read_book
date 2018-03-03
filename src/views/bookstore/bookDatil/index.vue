<template>
  <div class="bookDatil">
    <!-- 头部信息 -->
    <mt-header :fixed=true :title="major">
			<mt-button icon="back" slot="left" @click="back"></mt-button>
		</mt-header>

		<div class="select">
			<ul class="select-bar">
				<v-touch tag="li" v-for="(item, index) in types" :class="{'active': index === majorSelected}" :key="index" @tap="setType(item.type,index)">{{item.name}}</v-touch>
			</ul>
			<ul class="select-bar" v-if="mins.length>0">
				<v-touch tag="li" :class="{'active': index === minorSelected}" v-for="(minor, index) in mins" :key="index" @tap="setMinor(minor,index)">{{minor}}</v-touch>
			</ul>
		</div>
		<mt-loadmore class="loadmore" :style="loadmoreStyle" :top-method="loadTop" :bottom-method="loadBottom" :auto-fill="false" ref="loadmore">
			<ul class="book-list">
				<booklist v-for="book in books" :book="book" :key="book._id"></booklist>
			</ul>
		</mt-loadmore>
   
  </div>
</template>

<script>
import bookApi from "@/api/book.js";
import { Indicator } from "mint-ui";
import booklist from "@/components/bookList";

export default {
  name: "bookDatil",
  data() {
    return {
      vuegConfig: {
        forwardAnim: "fadeIn",
        backAnim:'fadeOut'
      },
      loadmoreStyle:'{margin-top:3rem}',
      books: null,
      type: "hot",
      gender: "",
      major: "",
      minor: "",
      mins: [],
      majorSelected: 0,
      minorSelected: 0,
      currentPage: 1,
      allLoaded: false,
      types: [
        {
          type: "hot",
          name: "热门"
        },
        {
          type: "new",
          name: "新书"
        },
        {
          type: "reputation",
          name: "好评"
        },
        {
          type: "over",
          name: "完结"
        }
        // {
        //   type: "monthly",
        //   name: "包月"
        // }
      ]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    /**
     * 根据筛选分类获取结果
     */
    getNovelListByCat(gender, type, major, minor) {
      Indicator.open("加载中");
      bookApi
        .getNovelListByCat(gender, type, major, minor)
        .then(data => {
          Indicator.close();
          this.books = data.books;
          console.log("加载出来的书籍信息：");
          console.log(this.books);
        })
        .catch(err => {
          Indicator.close();
          console.log(err);
        });
    },
    /**
     * 选择大类分类
     */
    setType(type, index) {
      this.majorSelected = index;
      this.type = type;
      this.getNovelListByCat(this.gender, this.type, this.major, this.minor);
    },

    /**
     * 选择子类分类
     */
    setMinor(minor, index) {
      this.minorSelected = index;
      this.minor = minor;
      this.getNovelListByCat(this.gender, this.type, this.major, this.minor);
    },
    /**
     * 下拉刷新
     */
    loadTop() {
      // 加载更多数据
      this.getNovelListByCat(this.gender, this.type, this.major, this.minor);
      this.$refs.loadmore.onTopLoaded();
    },

    /**
     * 加载更多
     */
    loadBottom() {
      // 加载更多数据
      let that = this;
      Indicator.open("加载中");
      bookApi
        .getNovelListByCat(
          this.gender,
          this.type,
          this.major,
          this.minor,
          this.currentPage * 20
        )
        .then(data => {
          that.books = [...that.books, ...data.books];
          that.currentPage++;
          Indicator.close();
        })
        .catch(err => {
          Indicator.close();
          console.log(err);
        });
      this.$refs.loadmore.onBottomLoaded();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.major = vm.$route.query.major;
      vm.gender = vm.$route.query.gender;
      /**
       * 获取大分类中的小类别
       */
      bookApi.getCategoryDetail().then(data => {
        console.log("--------78949848------");
        console.log(data);
        data[vm.$route.query.gender].forEach(type => {
          if (type.major === vm.$route.query.major) {
            vm.mins = type.mins;
          }
        });
      });
      vm.getNovelListByCat(
        vm.$route.query.gender,
        vm.type,
        vm.$route.query.major
      );
      // vm.$store.commit(SET_BACK_POSITION, "分类");
    });
  },
  components: {
    booklist
  }
};
</script>

<style scoped lang="scss" type="text/css">
@import "../../../common/scss/minxin.scss";

.bookDatil {
  width: 100%;
  height: 100%;
  overflow: auto;
  .select {
    position: fixed;
    top: 1rem;
    left: 0;
    background: #fff;
    z-index: 10;
    width: 100%;
  }

  .select-bar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: nowrap;
    height: 1rem;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: 1px solid #f2f2f2;
  }

  .select-bar li {
    flex-shrink: 0;
    line-height: 1rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    font-size: 0.35rem;
  }

  .active {
    color: red;
  }

  .book-list {
    width: 100%;
    background: #fff;
    overflow: auto;
  }

  .loadmore {
    margin-top: 3rem;
  }

  .active {
    color: #26a2ff;
  }
}




</style>
