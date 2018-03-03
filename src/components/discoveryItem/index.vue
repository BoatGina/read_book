
<template>
  <div class="discoveryItem">
    <!-- 标题 -->
    <h1>{{listData.title}}</h1>

    <!-- 内容 -->
    <ul class="rank_wrapper">
        <li v-for="item in books"  :key="item._id">
			<div class="img_wrapper" @click="readBook(item._id)">
                <img v-lazy="handleImg(item.cover)"/>
            </div>
            <p>{{ item.title }}</p>
		</li>
    </ul>
    <!-- 获取更多 -->
    <mt-button @click.native="gainMore" size="small" type="primary"  class="more_btn">更多 ></mt-button>
  </div>
</template>

<script>
import bookApi from "@/api/book.js";
import util from "@/utils/util";
import { Indicator } from "mint-ui";

export default {
  name: "discoveryItem",
  data() {
    return {
      ranklist: null,
      rankData: null,
      //  获取书籍信息
      books: null
    };
  },
  props: ["listData"],
  methods: {
    handleImg(cover) {
      return util.staticPath + cover;
    },
    // 获得更多书籍信息
    gainMore() {
        this.$store.commit("SET_RANK",this.rankData);
        this.$router.push('/ranklist');
    },
    // 读书
    readBook(bookId) {
      // 获取小说详情
      bookApi
        .getMixSource(bookId)
        .then(data => {
          console.log("获取数据信息：");
          console.log(data);
          this.$store.commit("SET_CURRENT_SOURCE", data[0]._id);
          this.jumpRead(bookId);
        })
        .catch(err => {
          console.log(err);
        });
    },
    jumpRead(bookId) {
      bookApi.getBook(bookId).then(
        data => {
          this.$store.commit("SET_READ_BOOK", data);
          this.$router.push("/readbook/" + bookId);
        },
        err => {
          this.$router.go(-1);
          console.log(err);
        }
      );
    }
  },
  computed: {},
  created() {
    console.log("---------");
    console.log(this.listData);
    Indicator.open();
    bookApi
      .getRankList(this.listData['_id'])
      .then(data => {
        this.rankData = data.ranking;
        // 首次加载前4条数据
        this.books = data.ranking.books.slice(0, 4);
        console.log("获取到书籍的信息：");
        console.log(this.rankData);
        Indicator.close();
      })
      .catch(error => {
        Indicator.close();
        console.log(error);
      });
  }
};
</script>

<style scoped lang="scss" type="text/css">
@import "../../common/scss/minxin.scss";

.discoveryItem {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  h1 {
    font-size: 0.35rem;
    font-weight: normal;
    text-align: center;
    margin-top: 0.5rem;
  }
}

.rank_wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  align-content: flex-start;
  padding: 0 px2rem(50);
  padding-top: px2rem(50);
  width: 100%;
  height: px2rem(900);
  li {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    align-content: flex-start;
    width: 50%;
    height: 3.8rem;
    .img_wrapper {
      width: 75%;
      height: px2rem(250);
      margin-bottom: 0.2rem;
    //   border:1px solid #ccc;
      box-shadow: 0 5px px2rem(20) rgba($color: #ccc, $alpha: 1.0);
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      width: 100%;
      font-size: 0.3rem;
      text-align: center;
    //   margin-bottom: 0.2rem;
    }
  }
}

.more_btn {
  position: fixed;
  bottom: 0.8rem;
  left: 50%;
  transform: translateX(-50%);

}
img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>