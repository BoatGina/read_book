<template>
	<div class="Search">
		<div class="search-head">
            <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
			<span class="search-icon">
				<img src="./search.svg">
			</span>
			<input type="text" class="search-input" placeholder="输入书名或者作者名" @input="autoComplete" @keyup.enter="fuzzySearch" v-model="searchWord">
		</div>
		<!--显示热搜词与搜索历史（优先级最低）-->
		<div v-if="!searchWord" class="search-info">
			<ul class="search-word" v-if="searchHotWords">
				<v-touch tag="li" class="search-hot-word" v-for="(searchHotWord, index) in searchHotWords" :key="index" @tap="fuzzySearch">
					{{searchHotWord.word}}
				</v-touch>
			</ul>
			<div class="search-history">
				<div class="fun-bar">
					<span>搜索历史</span>
					<v-touch @tap="clearSearchHistory">
						<img src="./trash.svg">
					</v-touch>
				</div>
				<ul class="history-list">
					<v-touch tag="li" v-for="(history, index) in searchHistory" :key="index" @tap="fuzzySearch">{{history}}</v-touch>
				</ul>
			</div>
		</div>
	
		<!--显示自动补全（优先级最高）-->
		<ul class="auto-complete-list" v-if="autoCompleteList.length && searchWord">
			<v-touch tag="li" v-for="(item, index) in autoCompleteList" :key="index" @tap="fuzzySearch">
				{{item}}
			</v-touch>
		</ul>
		<!--显示搜索结果（优先级中）-->
		<ul class="search-result" v-if="searchResult.length">
			<Booklist v-for="book in searchResult" :book="book" :key="book._id"></Booklist>
		</ul>
	</div>
</template>

<script>
import bookApi from "@/api/book.js";
import Booklist from "@/components/Booklist";
import util from "@/utils/util.js";
import { Indicator } from "mint-ui";
// import {
//   SET_BACK_POSITION
// } from '@/store/mutationsType'

export default {
  name: "Search",
  components: {
    Booklist
  },
  data() {
    return {
      searchWord: "",
      searchHotWords: null,
      autoCompleteList: [],
      searchResult: [],
      searchHistory: [],
      vuegConfig: {
        forwardAnim: "slideInDown",  //slideInUp
        backAnim: "slideInUp"
      }
    };
  },
  computed: {
    back() {
      return this.$store.state.backPath.secPath;
    }
  },
  created() {
    this.searchHistory = util.getItem("searchHistory")
      ? util.getItem("searchHistory")
      : [];
    bookApi
      .getHotWords()
      .then(data => {
        this.searchHotWords = data.searchHotWords;
        // 只取前15个热词
        this.searchHotWords.length = 15;
      })
      .catch(err => {
        console.log(err);
      });
  },
  watch: {
    searchWord: function() {
      if (!this.searchWord) {
        this.autoCompleteList = [];
        this.searchResult = [];
        this.searchHistory = util.getItem("searchHistory")
          ? util.getItem("searchHistory")
          : [];
      }
    }
  },
  methods: {
    autoComplete() {
      bookApi
        .autoComplete(this.searchWord)
        .then(data => {
          this.autoCompleteList = data.keywords;
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * 模糊搜索
     * todo 问题： 点击热词或者搜索历史进行搜索时，自动填充输入框值后，会触发自动补全，自动补全是异步的，搜索结果也是异步的
     * 当自动补全请求慢于搜索结果返回时，页面上会出现自动补全的列表
     * fixed 使用input事件触发自动补全 不要监听searchWorld的变化，触发自动补全
     */
    fuzzySearch(el) {
      Indicator.open();
      this.searchWord = el.target.innerText || this.searchWord;
      // 设置搜索历史
      let searchHistory = util.getItem("searchHistory")
        ? util.getItem("searchHistory")
        : [];
      util.setItem("searchHistory", [this.searchWord, ...searchHistory]);
      //   this.$store.commit(SET_BACK_POSITION, '搜索')
      bookApi
        .fuzzySearch(this.searchWord)
        .then(data => {
          this.searchResult = data.books;
          this.autoCompleteList = [];
          Indicator.close();
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearSearchHistory() {
      util.setItem("searchHistory", []);
      this.searchHistory = [];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import "../../../common/scss/minxin.scss";
.Search {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fff;
}
.search-head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  //   padding: 0 1rem;
  z-index: 100;
  background: #fff;
}

.search-info {
  width: 100vw;
}

.search-input {
  width: 80%;
  line-height: 0.8rem;
  padding-left: 0.8rem;
  border: 1px solid #ccc;
  border-radius: px2rem(5);
  box-shadow: 0 px2rem(20) px2rem(80) rgba($color: #ccc, $alpha: 0.3);
}

.search-input:focus,
.cancel:focus {
  outline: none;
}

.search-word {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 1.2rem;
  border-bottom: 1px solid #f2f2f2;
}

.search-hot-word {
  font-size: 0.3rem;
  padding: 0.1rem 0.2rem;
  border: 1px solid #f2f2f2;
  border-radius: 0.8rem;
  margin-left: 0.3rem;
  margin-top: 0.2rem;
}

.search-hot-word:active {
  background: #f2f2f2;
}

.auto-complete-list {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
}

.auto-complete-list li {
  padding-left: 1.2rem;
  line-height: .8rem;
  border-bottom: 1px solid #f2f2f2;
  font-size: 0.32rem;
}

.auto-complete-list li:active {
  background: #f2f2f2;
}

.search-result {
  display: flex;
  flex-direction: column;
  margin-top: 1.2rem;
  width: 100%;
  background: #fff;
}

.search-icon img {
  position: absolute;
  left: 1.4rem;
  line-height: rem;
  width: 20px;
  top: 0.35rem;
}

.search-history {
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

.search-history .fun-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  //   margin-bottom: 0.5rem;
  line-height: 1rem;
  font-size: 0.3rem;
  color: #515151;
}

.search-history .fun-bar img {
  width: 0.5rem;
  height: 1rem;
  vertical-align: middle;
}

.history-list li {
  line-height: 1rem;
  font-size: 0.3rem;
  border-bottom: 1px solid #f2f2f2;
  color: #a08787;
}

.mint-button--default {
  color: #656b79;
  background-color: #fff !important;
  box-shadow: 0 0 0 #fff !important;
}

.mint-button mint-button--default mint-button--normal{
        position: relative;
    left: -0.2rem;
}
</style>
