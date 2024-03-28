<template>
  <div id="user-block">
    <div class="user-baseInfo user-item" @click="toUserHomePage">
      <img
        :src="
          userInfo.avatar
            ? userInfo.avatar
            : require('@/assets/img/user/default_avatar.jpg')
        "
        alt=""
        class="avatar"
      />
      <div class="info-box">
        <div class="info-username">
          <span class="name">{{ userInfo.username }}</span>
          <span class="gender"><i class="el-icon-male"></i></span>
          <!-- el-icon-female -->
          <span class="rank"><i class="iconfont icon-1"></i></span>
        </div>
        <div class="info-intro">{{ userInfo.resume }}</div>
      </div>
    </div>

    <div class="follow-block-headers">
      <a class="follow-item" @click="toUserFollow">
        <div class="item-count">
          {{ userInfo.numFoll ? userInfo.numFoll : "0" }}
        </div>
        <div class="item-title">关注</div>
      </a>
      <a class="follow-item" @click="toUserFans">
        <div class="item-count">{{ userInfo.fans ? userInfo.fans : "0" }}</div>
        <div class="item-title">粉丝</div>
      </a>
      <a class="follow-item" @click="toUserNotes">
        <div class="item-count">
          {{ userInfo.numPub ? userInfo.numPub : "0" }}
        </div>
        <div class="item-title">发布</div>
      </a>
    </div>
    <!-- <div class="inof-active">
      <el-tooltip content="获得关注量" placement="bottom" effect="light">
        <div class="stat-item">
          <div class="stat-img">
            <i class="el-icon-user"></i>
          </div>
          <div class="stat-txt">
            <span class="stat-num">123</span>
          </div>
        </div>
      </el-tooltip>
      <el-tooltip content="获得点赞量" placement="bottom" effect="light">
        <div class="stat-item">
          <div class="stat-img">
            <i class="iconfont icon-good"></i>
          </div>
          <div class="stat-txt">
            <span class="stat-num">123</span>
          </div>
        </div>
      </el-tooltip>
      <el-tooltip content="发布动态数" placement="bottom" effect="light">
        <div class="stat-item">
          <div class="stat-img">
            <i class="iconfont icon-dongtai2"></i>
          </div>
          <div class="stat-txt">
            <span class="stat-num">123</span>
          </div>
        </div>
      </el-tooltip>
    </div> -->
    <!-- <div class="operate-btn">
      <div class="followBtn following"></div>
      <div class="directBtn">私信</div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UserBlock",
  props: {},
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    toUserHomePage() {
      this.$router.push({
        path: `/user/${this.userInfo.id}`,
      });
    },
    toUserFollow() {
      this.$router.push(`/user/${this.userInfo.id}/follow`);
    },
    toUserFans() {
      this.$router.push(`/user/${this.userInfo.id}/fans`);
    },
    toUserNotes() {
      this.$router.push(`/user/${this.userInfo.id}/notes`);
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  watch: {},
};
</script>

<style lang="less" scoped>
#user-block {
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 6px;

  .user-item {
    display: flex;
    align-items: center;
  }

  .user-baseInfo {
    padding-bottom: 15px;
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

  .follow-block-headers {
    display: flex;
    background-color: #fff;
    border-radius: 6px;

    .follow-item {
      flex: 1 1 auto;
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
}
</style>