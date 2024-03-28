<template>
  <div id="left-buttons">
    <!-- 点赞 -->
    <div
      class="panel-btn with-badge like-btn"
      :class="{ 'active-btn': dyData.isLike }"
      :badge="dyData.likeNum"
      @click="likeBtn"
    >
      <i class="iconfont icon-dianzan1"></i>
    </div>
    <!-- 评论 -->
    <div
      class="panel-btn with-badge comment-btn"
      :badge="dyData.commentNum"
      @click="scrollToComment"
    >
      <i class="iconfont icon-pinglun"></i>
    </div>
    <!-- 收藏 -->
    <div
      class="panel-btn with-badge"
      :class="{ 'active-btn': dyData.isStar }"
      :badge="dyData.starNum"
      @click="starBtn"
    >
      <i class="el-icon-star-on"></i>
    </div>
    <!-- 分享 -->
    <div class="panel-btn" @click="shareBtn">
      <i class="el-icon-share"></i>
    </div>
    <!-- 举报 -->
    <div class="panel-btn">
      <i class="el-icon-warning"></i>
    </div>
  </div>
</template>

<script>
import { likeBolgs } from "@/api/notes";
import { _throttle } from "@/utils/debounce";
import { mapState } from "vuex";

export default {
  name: "LeftButtons",
  props: {
    dyData: { type: Object, default: {} },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    async likeBtn() {
      let _this = this;
      _throttle(
        async function () {
          console.log(_this.isLogin);
          if (!_this.isLogin) {
            _this.$message.error("登录后即可点赞！");
            _this.$store.state.global.loginRegVisible = true;
            return;
          }
          let res = await likeBolgs(_this.dyData.noteId);
          if (res.code === 200) {
            console.log("!_this.dyData.isLike", !_this.dyData.isLike);
            _this.$emit("changeLeftButtonsData", {
              isLike: !_this.dyData.isLike,
              likeNum: !_this.dyData.isLike
                ? ++_this.dyData.likeNum
                : --_this.dyData.likeNum,
            });
          } else {
            if (_this.dyData.isLike) {
              _this.$message.error("取消点赞失败");
            } else {
              _this.$message.error("点赞失败");
            }
          }
        },
        2000,
        1,
        function () {
          _this.$message.error("请匆频繁操作！");
        }
      )();
    },
    starBtn() {
      if (!this.isLogin) {
        this.$message.error("登录后即可收藏！");
        this.$store.state.global.loginRegVisible = true;
        return;
      }
      this.$store.commit("global/SETCOLLECTIONCONTENTINFO", {
        type: 1, //1:笔记 2:卡片 3:视频
        id: this.dyData.noteId,
      });
      this.$store.state.global.collectionVisible = true;
    },
    shareBtn() {
      if (!this.isLogin) {
        this.$message.error("登录后即可分享！");
        this.$store.state.global.loginRegVisible = true;
        return;
      }
      this.$store.state.global.shareVisible = true;
    },
    scrollToComment() {
      let el = document.getElementById("comment");
      el.scrollIntoView();
    },
  },
  computed: {
    ...mapState("user", ["isLogin", "userInfo"]),
  },
};
</script>

<style lang="less" scoped>
#left-buttons {
  // position: fixed;
  // z-index: 888;

  .panel-btn {
    position: relative;
    margin-bottom: 24px;
    width: 48px;
    height: 48px;
    line-height: 52px;
    background-color: #fff;
    background-position: 50%;
    background-repeat: no-repeat;
    border-radius: 50%;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);
    cursor: pointer;
    text-align: center;
    font-size: 26px;

    i {
      color: @minor-text-color;
      transition: color 0.3s;
    }
    &:hover {
      box-shadow: 0 2px 15px 0 rgb(0 0 0 / 12%);
      i {
        color: @general-text-color;
      }
    }
  }

  .with-badge {
    &::after {
      content: attr(badge);
      position: absolute;
      top: 0;
      left: 75%;
      height: 17px;
      line-height: 17px;
      padding: 0 5px;
      border-radius: 9px;
      font-size: 11px;
      text-align: center;
      white-space: nowrap;
      background-color: #c2c8d1;
      color: #fff;
    }
  }

  .like-btn {
    i {
      font-size: 22px;
      position: relative;
      top: -2px;
    }
  }

  .comment-btn {
    i {
      font-size: 20px;
      position: relative;
      top: -1px;
    }
  }

  .active-btn {
    background-color: @primary-color;

    &::after {
      background-color: #71aaff;
    }
    &:hover {
      opacity: 0.8;
      i {
        color: #fff;
      }
    }
    i {
      color: #fff;
    }
  }
}
</style>