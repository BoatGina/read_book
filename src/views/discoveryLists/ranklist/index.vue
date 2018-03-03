<template>
	<div class="Ranklist">
		<mt-header fixed :title="headTitle">
			<mt-button slot='left' icon="back" @click="$router.replace('/main')"></mt-button>
		</mt-header>
		<ul class="rank-tab">
			<router-link tag="li" to="/ranklist/weekRank" active-class="active" exact>周榜</router-link>
			<router-link tag="li" to="/ranklist/monthRank" active-class="active" exact>月榜</router-link>
			<router-link tag="li" to="/ranklist/totalRank" active-class="active" exact>总榜</router-link>
		</ul>
		<router-view></router-view>
	</div>
</template>


<script>

export default {
  name: 'Ranklist',
  data () {
    return {
    }
  },
  computed: {
    headTitle () {
      return this.$store.state.book.rankList.headTitle;
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="text/css">
@import "../../../common/scss/minxin.scss";

// ul {
//     display: flex;
//     flex-wrap: nowrap;
// 	flex-direction: row;
// 	justify-content: space-between;
// 	width: 100%;
// 	background: #fff;
// }

.Ranklist{
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: auto;
}

.rank-tab {
    display: flex;
    flex-wrap: nowrap;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	background: #fff;
	position: fixed;
	top: 1rem;
	left: 0;
	z-index: 10;
	border-bottom: 1px solid #ccc;
}

li {
	text-align: center;
	line-height: 1rem;
    width: 33.3%;
    font-size: 0.32rem;
}

.active {
	border-bottom: 2px #04b1ff solid;
}
</style>
