<template>
	<div class="book-list-wrap">
		<!-- <mt-loadmore :bottom-method="loadBottom" ref="loadmore"> -->
		<v-touch tag="ul" @swipeleft="swipeleft" @swiperight="swiperight">
			<Booklist v-for="book in rank.books" :book="book" :key="book._id"></Booklist>
		</v-touch>
		<!-- </mt-loadmore> -->
	</div>
</template>

<script>
import Booklist from '@/components/Booklist'
import bookApi from "@/api/book.js";
import { Indicator } from 'mint-ui'

export default {
  name: 'RanklistDetail',
  components: {
    Booklist
  },
  data () {
    return {
      rank: {},
      books: [],
      ranktype: '',
      rankTypeStack: ['/ranklist/weekRank', '/ranklist/monthRank', '/ranklist/totalRank'],
      currentRank: 0,
      currentLoadPage: 1
    }
  },
  methods: {
    fetchData () {
      Indicator.open();
      console.log("路由的路径path：");
      console.log(this.$route.path);
      switch (this.$route.path) {
        case '/ranklist/weekRank':
          this.rankType = this.$store.state.book.rankList.weekRankId;
          this.currentLoadPage = 0;
          break
        case '/ranklist/monthRank':
          this.rankType = this.$store.state.book.rankList.monthRankId;
          this.currentLoadPage = 0;
          break
        case '/ranklist/totalRank':
          this.rankType = this.$store.state.book.rankList.totalRankId;
          this.currentLoadPage = 0;
          break
        default:
          this.$router.push('/rank')
          break
      }
      console.log("rankType值：");
      console.log(this.rankType);
      bookApi.getRankList(this.rankType).then(data => {
          
        this.rank = data.ranking
        console.log("rank值：");
      console.log(this.rank);
        // 首次加载前20条数据
        this.books = data.ranking.books.slice(0, 20);
        console.log("books值：");
      console.log(this.books);
        Indicator.close()
      }).catch(error => {
        Indicator.close()
        console.log(error)
      })
    },
    swipeleft () {
      if (this.currentRank >= 2) {
        return
      }
      this.currentRank++
      this.$router.push(this.rankTypeStack[this.currentRank])
    },
    swiperight () {
      if (this.currentRank <= 0) {
        return
      }
      this.currentRank--
      this.$router.push(this.rankTypeStack[this.currentRank])
    },
    loadBottom () {
      this.books = this.rank.books.slice(0, this.currentLoadPage * 20 + 20)
      this.currentLoadPage++
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created () {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import "../../../common/scss/minxin.scss";
ul {
	display: flex;
	flex-direction: column;
}

.book-list-wrap {
	width: 100%;
	background: #fff;
	margin-top: 2rem;
}
</style>
