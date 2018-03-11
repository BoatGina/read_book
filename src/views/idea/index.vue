
<template>
  <div class="idea">
    <!-- 顶部信息栏 -->
    <mt-header :fixed=true title="想法"  >
    </mt-header>

    <ul class="idea_ul" >
      <li v-for="(item,index) in ideaList" :key="index">
        <div class="icon_wrapper">
          <div class="img_wrapper">
            <img :src="item.userInfo.icon"/>
          </div>
        </div>


        <div class="content_wrapper">
          <p class="nickname">{{item.userInfo.nickname}}</p>
          <p class="comment">{{item.comment}}</p>
          <div class="book_contain">
            <div class="book_wrapper">
              <img :src="item.bookInfo.cover"/>
            </div>
            <p class="book_title">{{item.bookInfo.title}}</p>
          </div>

       
          <p class="handle_wrapper">
            <span class="icon_left">{{item.time | formatTime}}</span>
            <span class="icon_right">
              <i class="iconfont icon-aixin1"></i>
              <i class="iconfont icon-pinglun"></i>
            </span>
          </p>
        </div>  

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "idea",
  data() {
    return {
      ideaList: [
        {
          userInfo: {
            icon:
              "http://img4.imgtn.bdimg.com/it/u=3503097649,4282610101&fm=27&gp=0.jpg",
            nickname: "吉"
          },
          bookInfo: {
            cover:
              "http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F857368%2F857368_c92c5211a6504e0889fb1c09dcf4ce06.jpg%2F",
            title: "修真聊天群"
          },
          time: "1520746741545",
          comment:
            "好看这本书很好看v好看这本书很好看v好看这本书很好看v好看这本书很好看v好看这本书很好看v好看这本书很好看v"
        },
        {
          userInfo: {
            icon:
              "http://img4.imgtn.bdimg.com/it/u=3503097649,4282610101&fm=27&gp=0.jpg",
            nickname: "吉"
          },
          bookInfo: {
            cover:
              "http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F857368%2F857368_c92c5211a6504e0889fb1c09dcf4ce06.jpg%2F",
            title: "修真聊天群"
          },
          time: "1520746741545",
          comment: "这本书很好看"
        },
        {
          userInfo: {
            icon:
              "http://img4.imgtn.bdimg.com/it/u=3503097649,4282610101&fm=27&gp=0.jpg",
            nickname: "吉"
          },
          bookInfo: {
            cover:
              "http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F857368%2F857368_c92c5211a6504e0889fb1c09dcf4ce06.jpg%2F",
            title: "修真聊天群"
          },
          time: "1520746741545",
          comment: "这本书很好看"
        },
        {
          userInfo: {
            icon:
              "http://img4.imgtn.bdimg.com/it/u=3503097649,4282610101&fm=27&gp=0.jpg",
            nickname: "吉"
          },
          bookInfo: {
            cover:
              "http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F857368%2F857368_c92c5211a6504e0889fb1c09dcf4ce06.jpg%2F",
            title: "修真聊天群"
          },
          time: "1520746741545",
          comment: "这本书很好看"
        },
        {
          userInfo: {
            icon:
              "http://img4.imgtn.bdimg.com/it/u=3503097649,4282610101&fm=27&gp=0.jpg",
            nickname: "吉"
          },
          bookInfo: {
            cover:
              "http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F857368%2F857368_c92c5211a6504e0889fb1c09dcf4ce06.jpg%2F",
            title: "修真聊天群"
          },
          time: "1520746741545",
          comment: "这本书很好看"
        }
      ]
    };
  },
  methods: {},
  filters: {
    formatTime(data) {
      let newData = new Date(Number(data));
      return `${newData.getMonth() + 1}月${newData.getDate()}日`;
    }
  }
};
</script>

<style lang="scss" >
@import "../../common/scss/minxin.scss";

.idea {
  width: 100%;
  height: 100%;
  overflow: auto;
  .idea_ul {
    width: 100%;
    padding-top: 1rem;
    background: #eee;
    li {
      display: flex;
      width: 100%;
      margin-bottom: 0.3rem;
      background: #fff;
      padding-top: 0.2rem;
      padding-bottom: 0.3rem;
      .icon_wrapper {
        width: px2rem(120);
        .img_wrapper {
          width: px2rem(90);
          height: px2rem(90);
          border-radius: 50%;
          border: 1px solid #ccc;
          overflow: hidden;
          margin: 0 auto;
          margin-top: px2rem(10);
        }
        img {
          width: 100%;
          float: left;
        }
      }
      .content_wrapper {
        flex: 1;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        p {
          width: 100%;
          font-size: 0.3rem;
          color: #000;
          line-height: px2rem(50);
        }
        .nickname {
          // line-height: px2rem(50);
          color: #666;
        }
        .book_contain {
          display: flex;
          width: 100%;
          margin-top: 0.2rem;
          margin-bottom: 0.2rem;
          border: 1px solid #ccc;
          padding: px2rem(20);
          .book_wrapper {
            width: px2rem(80);
            height: px2rem(100);
            border: 1px solid #eee;
            box-shadow: 0 0 2px #ccc;
            img {
              float: left;
              width: 100%;
            }
          }
          .book_title {
            padding-left: px2rem(50);
          }
        }
        .handle_wrapper {
          display: flex ;
          justify-content: space-between ;
          padding-right: 0.2rem;
          .icon_left {
            color: #666;
          }
          .icon_right {
            .iconfont{
              margin-right: 0.1rem;
              font-size: 0.4rem;
              color: #999;
            }
          }
        }
      }
    }
  }
}
</style>