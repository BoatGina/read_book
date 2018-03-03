<template>
  <div class="accountMain">
    <!-- 顶部信息栏 -->
    <mt-header :fixed=true :title="account.nickname"  >
      <mt-button  slot="left" @click.stop="route('/user/s/letter')">
        <i  slot="icon" class="iconfont icon-icon-" ></i>
      </mt-button>
      <mt-button slot="right" @click.stop="route('/user/s/setUp')">
        <i  slot="icon" class="iconfont icon-iconfonticonfontjixieqimo"></i>
      </mt-button>
    </mt-header>
    <!-- 头像个人信息 -->
    <div class="baseInfo" @click.stop="route('/user/s/showInfo/'+account.id+'')">
      <div class="img_wrapper">
        <img :src="account.iconUrl" />
      </div>
      <p class="edit_info" @click.stop="route('/user/s/editInfo')">编辑个人资料</p>
      <i  slot="icon" class="iconfont icon-iconfontjiantou2" ></i>
    </div>
    <!-- 渲染列单 -->
    <ul  class="lists">
      <li v-for="(item,index) in lists"  :key="index"  @click.stop="route(item.path)">
          <div class="title_wrapper">
            <img :src="item.iconUrl" class="iconImg"/>
            <span class="title">{{item.title}}</span>
          </div>
          <div v-if="item.topWords" class="words">
            <p v-if="item.topWords" class="topWords">{{item.topWords.first }}<span class="num">{{item.topWords.num }}</span>{{item.topWords.last }}</p>      
            <p v-if="item.bottomWords" class="bottomWords">{{item.bottomWords}}</p>      
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "accountMain",
  data() {
    return {
      vuegConfig: {
        forwardAnim: "fadeInRight"
      }
    };
  },
  methods: {
    route(path) {
      this.$router.push(path);
    }
  },
  filters: {},
  create() {
    this.activeIndex = null;
  },
  computed: {
    account() {
      return this.$store.getters.accountInfo;
    },
    lists() {
      let list = [
        {
          title: "统计",
          iconUrl: require("./statistic.svg"),
          topWords: "",
          bottomWords: "",
          path: "/user/s/statistics"
        },
        {
          title: "排名",
          iconUrl: require("./rank.svg"),
          topWords: {
            first: "第",
            num: this.account.rank,
            last: "名"
          },
          bottomWords: this.account.read_len + "分钟",
          path: "/user/s/rank"
        },
        {
          title: "关注",
          iconUrl: require("./care.svg"),
          topWords: {
            first: "",
            num: this.account.care_count,
            last: "人关注我"
          },
          bottomWords: "已关注" + this.account.cared_count + "人",
          path: "/user/s/follow"
        },
        {
          title: "笔记",
          iconUrl: require("./note.svg"),
          topWords: {
            first: "",
            num: this.account.note_num,
            last: "个"
          },
          bottomWords:this.account.zan_num + "个赞 "+ this.account.comment_num +"个评论",
          path: "/user/s/note"
        },
        {
          title: "书单",
          iconUrl: require("./book.svg"),
          topWords: {
            first: "",
            num: this.account.list_num,
            last: "个"
          },
          bottomWords: "",
          path: "/user/s/bookList"
        }
      ];
      return list;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss" type="text/css">
@import "../../common/scss/minxin.scss";
.accountMain {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #eee;
}

.baseInfo {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  align-content: flex-end;
  flex-wrap: wrap;
  width: 100%;
  height: px2rem(380);
  background: #fff;
  margin-bottom: px2rem(20);
  .img_wrapper {
    width: px2rem(160);
    height: px2rem(160);
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #999;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .edit_info {
    width: 100%;
    text-align: center;
    font-size: 0.35rem;
    color: #666;
    line-height: 1rem;
  }
  .iconfont {
    color: #666;
    font-size: 0.35rem;
    position: absolute;
    top: 50%;
    right: px2rem(10);
    transform: translateY(-50%);
    font-style: normal;
  }
}

.lists {
  width: 100%;

  li {
    position: relative;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    width: 100%;
    height: px2rem(130);
    line-height: px2rem(130);
    background: #fff;
    font-size: 0.35rem;
    &:nth-child(3),
    &:last-child {
      margin-bottom: 0.2rem;
    }
    .title_wrapper {
      display: flex;
      // justify-content: space-between;
      align-items: center;
    }
    .iconImg {
      // position: relative;
      // top: px2rem(10);
      // font-size: 0.6rem;
      width: 1.2rem;
      padding-left: 0.5rem;
      padding-right: 0.2rem;
      color: blue;
    }
    .words {
      display: flex;
      flex-direction: column;
      justify-content: center;
      // position: absolute;
      text-align: right;
      font-size: 0.25rem;
      padding-right: 0.3rem;
      line-height: 0.4rem;
      .topWords {
        color: #000;
        .num {
          font-size: 0.4rem;
        }
      }
      .bottomWords {
        color: #666;
      }
    }
  }
}

.icon-icon- {
  font-size: 0.6rem;
}
.icon-iconfonticonfontjixieqimo {
  font-size: 0.45rem;
}
</style>
