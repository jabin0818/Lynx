<template>
  <div id="authors-block">
    <div class="authors-baseInfo authors-item" @click="toUserHomePage">
      <img
        :src="
          authorInfo.avatar
            ? authorInfo.avatar
            : require('@/assets/img/user/default_avatar.jpg')
        "
        alt=""
        class="avatar"
      />
      <div class="info-box">
        <div class="info-username">
          <span class="name">{{ authorInfo.username }}</span>
          <span class="gender"><i class="el-icon-male"></i></span>
          <!-- el-icon-female -->
          <span class="rank"><i class="iconfont icon-1"></i></span>
        </div>
        <div class="info-intro">{{ authorInfo.resume }}</div>
      </div>
    </div>

    <div class="inof-active">
      <a class="stat-item" @click="toUserFollow">
        <div class="item-count">{{ authorInfo.fans }}</div>
        <div class="item-title">关注</div>
      </a>
      <a class="stat-item" @click="toUserFans">
        <div class="item-count">{{ authorInfo.fans }}</div>
        <div class="item-title">粉丝</div>
      </a>
      <a class="stat-item" @click="toUserNotes">
        <div class="item-count">{{ authorInfo["sum(views)"] }}</div>
        <div class="item-title">发布</div>
      </a>
    </div>
    <div class="operate-btn">
      <div class="followBtn following">已关注</div>
      <div class="directBtn">私信</div>
    </div>
  </div>
</template>

<script>
import { getAuthorInfo } from "@/api/user.js";
export default {
  name: "AuthorBlock",
  props: {
    authorId: { type: String },
  },
  data() {
    return {
      authorInfo: {},
    };
  },
  async mounted() {},
  methods: {
    async getData() {
      if (this.authorId) {
        let result = await getAuthorInfo(this.authorId);
        if (result.code === 200) {
          this.authorInfo = result.data;
        }
      }
    },
    toUserHomePage() {
      this.$router.push({
        path: `/user/${this.authorId}`,
      });
    },
    toUserFollow() {
      this.$router.push(`/user/${this.$route.params.id}/follow`);
    },
    toUserFans() {
      this.$router.push(`/user/${this.$route.params.id}/fans`);
    },
    toUserNotes() {
      this.$router.push(`/user/${this.$route.params.id}/notes`);
    },
  },
  watch: {
    authorId: {
      handler(newValue) {
        if (newValue) {
          this.getData();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less">
#authors-block {
  border-radius: 6px;
  background: #fff;
  margin-bottom: 20px;

  .authors-item {
    display: flex;
    align-items: center;
  }

  .authors-baseInfo {
    cursor: pointer;
    .avatar {
      flex: 0 0 auto;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 1px solid #ccc;
    }

    .info-box {
      flex: 1 1 auto;
      min-width: 0;
      margin-left: 16px;

      .info-username {
        display: flex;
        align-items: center;
        font-weight: 500;
        line-height: 20px;
        color: #252933;
        white-space: pre-wrap;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .name {
          display: inline-block;
          vertical-align: top;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 128px;
          font-size: 17px;
        }

        .gender {
          width: 17px;
          height: 17px;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          line-height: 17px;
          font-size: 12px;
          margin: 0 5px;
          background-color: @primary-color;
        }

        .rank {
          margin: 0 5px;
          line-height: 0px;
          i {
            font-size: 28px;
            font-weight: 500;
          }
        }
      }

      .info-intro {
        margin-top: 4px;
        font-size: 14px;
        color: #515767;
        font-weight: 400;
        line-height: 22px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .inof-active {
    display: flex;
    background-color: #fff;
    border-radius: 6px;
    .stat-item {
      flex: 1 1 auto;
      padding: 15px 0;
      text-align: center;
      cursor: pointer;
      &:hover .item-count,
      &:hover .item-title {
        color: @primary-color;
      }
      .item-count {
        color: #31445b;
        margin-top: 6px;
        margin-bottom: 6px;
        font-size: 18px;
        font-weight: 600;
        transition: color 0.25s;
      }
      .item-title {
        color: #666;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .operate-btn {
    display: flex;
    align-items: center;

    .followBtn {
      display: flex;
      align-items: center;
      border-radius: 4px;
      // width: 122px;
      width: 56%;
      font-size: 14px;
      justify-content: center;
      color: #fff;
      padding: 7px 20px;
      background-color: @primary-color;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: rgba(66, 129, 255, 0.9);
      }

      &.following {
        background-color: #e3e5e7;
        color: #9499a0;
        &:hover {
          background-color: #f1f2f3;
        }
      }
    }

    .directBtn {
      font-size: 14px;
      box-sizing: border-box;
      display: flex;
      // width: 122px;
      width: 44%;
      height: 36px;
      background: rgba(66, 129, 255, 0.06);
      border: 1px solid @primary-color;
      border-radius: 4px;
      color: @primary-color;
      justify-content: center;
      align-items: center;
      margin-left: 16px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: rgba(66, 129, 255, 0.1);
      }
    }
  }
}
</style>