
<template>
  <div class="discovery">
     <!-- 顶部信息栏 -->
    <mt-header :fixed=true title="发现" >
      <mt-button slot="right" @click="jumpStore" ><span class="bookstore">书城</span></mt-button>
    </mt-header>

    <!-- 主要内容 -->
    <swiper :options="swiperOption">
        <swiper-slide class="slide1" v-if="ranklist">
          <discoveryItem :listData='ranklist[0]' ></discoveryItem>
        </swiper-slide>
        <swiper-slide class="slide2" v-if="ranklist">
          <discoveryItem :listData='ranklist[1]' ></discoveryItem>
        </swiper-slide>
        <swiper-slide class="slide3" v-if="ranklist">
          <discoveryItem :listData='ranklist[2]' ></discoveryItem>
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import discoveryItem from "@/components/discoveryItem";
import bookApi from "@/api/book.js";

export default {
  name: "discovery",
  data() {
    return {
      swiperOption: {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        },
        // pagination: {
        //   el: ".swiper-pagination"
        // }
      },
      // 数据数组
      ranklist:null
    };
  },
  methods: {
    jumpStore(){
      console.log("书城：：：");
      this.$router.push('/book/s/bookstore');
    }
  },
  components: {
    swiper,
    swiperSlide,
    discoveryItem
  },
  beforeCreate() {
    console.log("发现  开始啦");
    bookApi
      .getRankType()
      .then(data => {
        this.ranklist = data["male"].slice(0, 3);
        this.ranklist[0].title='最热榜';
        console.log("所有排名类型：");
        console.log(data);
        console.log(this.ranklist);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang="scss" type="text/css">
@import "../../common/scss/minxin.scss";
.discovery {
  width: 100%;
  height: 100%;
  background: rgba($color: #eee, $alpha: 1);
  .mint-header {
    background: transparent;
    z-index: 100;
  }
  // .swiper-container{
  //   position: absolute;
  //   bottom: 0;
  // }
}

.bookstore {
  color: rgb(30, 98, 224);
}
.swiper-container {
  height: 100%;
  padding-bottom: 0.3rem;
  padding-top: 1.2rem;
}

.swiper-inner {
  width: 100%;
  height: px2rem(500);
  padding-top: 50px;
  padding-bottom: 50px;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
  width: px2rem(600);
  height: 100%;
  border-radius: px2rem(10);
  box-shadow: 0 0 px2rem(50) rgba($color: #888, $alpha: 0.5);
  background: #fff;
}
</style>