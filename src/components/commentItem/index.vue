
<template>
    <div class="content_wrapper">
    <p class="nickname">{{newItem.main_nickname}}</p>
    <p class="comment">{{newItem.comment}}</p>
    <div class="book_contain">
        <div class="book_wrapper">
            <img :src="newItem.cover" />
        </div>
        <p class="book_title">{{newItem.title}}</p>
    </div>
    <p class="handle_wrapper">
        <span class="icon_left">{{newItem.time | formatTime}}</span>
        <span class="icon_right">
            <i class="iconfont icon-aixin1" @click="handleZan"></i>
            <i class="iconfont icon-pinglun" @click="addComment"></i>
        </span>
    </p>

    <div class="comment_wrapper" v-if="(newItem.commentList &&　newItem.commentList.length > 0) || newItem.zan">
        <p v-if="zan" class="zan">
            <i class="iconfont icon-aixin1"></i> {{zan}}个赞</p>
        <ul v-if="newItem.commentList">
            <li v-for="(comment,index) in newItem.commentList" :key="index">
                <p>
                    <span class="name">{{comment.nickname}}</span> {{comment.content}}</p>
                <p v-if="(comment.replyList &&　comment.replyList.length > 0)" v-for="(reply,index) in comment.replyList" :key="index">
                    <span class="name">{{reply.from.nickname}}</span> 回复
                    <span class="name">{{comment.nickname}}</span> {{reply.content}}
                </p>
            </li>
        </ul>
    </div>

    <!-- 假数据 -->
    <!-- <div class="comment_wrapper" v-if="item.commentList || item.zan">
        <p v-if="zan" class="zan">
            <i class="iconfont icon-aixin1"></i> {{item.zan}}个赞</p>
        <ul v-if="item.commentList">
            <li v-for="(comment,index) in item.commentList" :key="index">
                <p><span class="name">{{comment.nickname}}</span> {{comment.content}}</p>
                <p v-if="comment.replyList" v-for="(reply,index) in comment.replyList" :key="index">
                    <span class="name">{{reply.from.nickname}}</span> 回复
                    <span class="name">{{comment.nickname}}</span> {{reply.content}}
                </p>
            </li>
        </ul>
    </div> -->

</div>
</template>

<script>
import { MessageBox } from "mint-ui";
import {
  addCommontList,
  addReplyList,
  addZan,
  delZan,
  getZan
} from "@/api/share.js";
import util from "@/utils/util.js";
import { getAllCommont } from "@/common/js/organize.js";

export default {
  name: "commentItem",
  data() {
    return {
      // 虚假数据
      commentList: [],
      newItem: null,
      zan:0
    };
  },
  props: ["item"],
  methods: {
    //   点赞
    async handleZan() {
      const isZan = await this.hasZan();
      const share_id = this.newItem.share_id;
      console.log("开始！", isZan);
      if (isZan) {
        const rs = await delZan(share_id);
        this.$set(this.newItem, "zan", this.zan--);
        console.log("结果：", rs);
      } else {
        const rs = await addZan(share_id);
        this.$set(this.newItem, "zan", this.zan++);
        console.log("结果：", rs);
      }
      console.log("新获取到的赞：", this.zan);
    },
    // 添加评论
    addComment() {
      MessageBox.prompt("请写下评论")
        .then(async ({ value, action }) => {
          if (value) {
            const update = {
              share_id: newItem.share_id,
              user_id: getItem("accountInfo").id,
              nickname: getItem("accountInfo").nickname,
              content: value
            };
            const rs = await addCommontList(update);
            console.log("前端添加评论的请求信息和返回信息：");
            console.log(update);
            console.log(rs);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 判断是否已经点过赞
    async hasZan() {
      const zan = this.zan
      const user_id = util.getItem('accountInfo').id
      console.log(zan,user_id)
      let rs = false
      if (zan) {
        zan.split(",").forEach(id => {
          if (user_id == id) {
            rs = true;
          }
        });
      }
      console.log("hasId:", rs);
      return rs;
    }
  },
  filters: {
    formatTime(data) {
      let newData = new Date(Number(data));
      return `${newData.getFullYear()}年${newData.getMonth() +
        1}月${newData.getDate()}日`;
    }
  },
  created() {
    this.newItem = this.item;
    this.zan = this.newItem.zan ? this.newItem.zan.split(',').length : 0;
  }
};
</script>

<style lang="scss" >
@import "../../common/scss/minxin.scss";
</style>