<template>
  <div class="bookCategory" v-scroll='onScroll'>
    <!-- 头部控制 -->
    <mt-header :fixed=true title="书城" v-show="!showSearch">
      <mt-button @click="back" icon="back"  slot="left"></mt-button>
    </mt-header>
     <mt-header :fixed=true title='' v-show="showSearch">
      <mt-button @click="back" icon="back"  slot="left"></mt-button>
    </mt-header>
    <p class="search_header search_common" v-show="showSearch" @click="$router.push('/search')"><i class="mintui mintui-search"></i>搜索</p>

    <!-- 搜索点击跳转搜索页面 -->
    <p class="search_wrapper search_common" @click="$router.push('/search')"><i class="mintui mintui-search"></i>搜索</p>
    
    <!-- 分类 -->
    <section v-for="(item ,key, index) in category" :key="index" class="category_wrapper">
			<p class="category-type">{{categoryType[key]}}</p>
			<ul>
				<li v-for="(cat, index) in item" :key="index" @click="$router.push({path:'/book/s/bookDatil',query:{gender:key,major:cat.name}})">
					<p class="category">{{cat.name}}</p>
					<span class="book-count">{{cat.bookCount}}</span>
				</li>
			</ul>
		</section>

   
  </div>
</template>

<script>
import bookApi from "@/api/book.js";
export default {
  name: "bookCategory",
  data() {
    return {
      vuegConfig: {
        // forwardAnim: "fadeIn",
        // backAnim:'fadeOut'
      },
      showSearch: false,
      category: null,
      categoryType: {
        male: "男生",
        female: "女生",
        press: "出版",
        picture: "图片"
      }
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    onScroll:function(e, position){
      if(position.scrollTop>55){
        this.showSearch=true;
      }else{
        this.showSearch=false;
      }
    }
  },
  created() {
    bookApi.getCategory().then(data => {
      console.log("请求放回的数据：");
      console.log(data);
      this.category = data;
    });
  },
  computed: {},
  components: {}
};
</script>

<style scoped lang="scss" type="text/css">
@import "../../../common/scss/minxin.scss";

.bookCategory {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fff;
  .search_wrapper {
    width: 90%;
    height: px2rem(100);
    line-height: px2rem(100);
    margin: 0 auto;
    margin-top: 1.2rem;
    border-radius: px2rem(5);
    box-shadow: 0 px2rem(20) px2rem(80) rgba($color: #ccc, $alpha: 0.3);
  }

  .search_header {
    position: fixed !important;
    top: px2rem(20);
    width: 80%;
    height: px2rem(70);
    line-height: px2rem(70);
    border-radius: px2rem(10);
    margin-left: 1rem;
    z-index: 2;
    border: 1px solid rgba($color: #999, $alpha: 0.2);
  }

  .search_common {
    font-size: 0.35rem;
    color: #999;
    padding-left: px2rem(50);
    .mintui-search {
      margin-right: px2rem(30);
    }
  }
}

.category_wrapper {
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 0.3rem;
    margin-right: 0.3rem;
    font-size: 0.3rem;
    font-weight: normal;
  }

  li {
    width: 33.3%;
    text-align: center;
  }

  .category {
    // font-weight: bold;
    // font-size: 0.8rem;
    margin-bottom: 0.1rem;
    margin-top: 0.2rem;
    line-height: px2rem(100);
  }

  .category-type {
    font-size: 0.4rem;
    line-height: px2rem(100);
    margin-top: 0.2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    border-bottom: 1px solid #f3eded;
    padding-left: 0.5rem;
  }

  .book-count {
    color: #959595;
  }
}
</style>
