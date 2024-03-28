<template>
  <div id="card-left-buttons">
    <!-- 点赞 -->
    <div
      class="panel-btn with-badge like-btn"
      :class="{ 'active-btn': isLike }"
      :badge="data.likeNum"
      @click="likeBtn"
    >
      <i class="iconfont icon-dianzan1"></i>
    </div>
    <!-- 收藏 -->
    <div
      class="panel-btn with-badge"
      :class="{ 'active-btn': isStar }"
      :badge="data.starNum"
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
import { mapState } from "vuex";

export default {
  props: {
    data: { type: Object },
  },
  data() {
    return {
      isLike: false,
      isStar: false,
    };
  },
  mounted() {
    this.isLike = this.data.isLike;
    this.isStar = this.data.isStar;
  },
  methods: {
    async likeBtn() {
      if (!this.isLogin) {
        this.$message.error("登录后即可点赞！");
        this.$store.state.global.loginRegVisible = true;
        return;
      }
      console.log("卡片点赞");
      // let res = await likeBolgs(this.data.noteId)
      // console.log(res)
      // if(res.code === 200) {
      //   this.isLike = true;
      // } else {
      //   this.$message.error('点赞失败')
      // }
    },
    starBtn() {
      if (!this.isLogin) {
        this.$message.error("登录后即可收藏！");
        this.$store.state.global.loginRegVisible = true;
        return;
      }
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
  },
  computed: {
    ...mapState("user", ["isLogin"]),
  },
};
</script>

<style lang="less" scoped>
#card-left-buttons {
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
      font-size: 24px;
      position: relative;
      top: -2px;
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