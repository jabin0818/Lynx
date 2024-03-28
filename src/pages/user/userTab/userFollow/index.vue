<template>
  <div id="user-follow">
    <div class="sub-header">
      <div class="sub-header-title">
        <el-input
          type="text"
          class="sub-header-search"
          placeholder="搜索关注列表"
          suffix-icon="el-icon-search"
        >
        </el-input>
      </div>
    </div>
    <div class="user-follow-list">
      <div class="user-follow-item" v-for="item in userList" :key="item.id">
        <div class="uf-item-left">
          <div class="user-follow-avatar">
            <img :src="item.avatar" />
          </div>
          <div class="user-follow-info">
            <div class="name">{{ item.username }}</div>
            <div class="intor">{{ item.resume }}</div>
          </div>
        </div>
        <div class="uf-item-right">
          <div class="uf-item-btn user-follow-chatBtn">私信</div>
          <div class="uf-item-btn user-follow-unSubBtn">取消关注</div>
        </div>
      </div>

      <!-- <div style="text-align: center; padding: 16px 0 2px 0; color: #4281ff">
        <i class="el-icon-loading"></i>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getUserFollow } from "@/api/user.js";
export default {
  name: "UserFollow",
  data() {
    return {
      userList: [],
    };
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async getData() {
      let userId = this.$route.params.id;
      let res = await getUserFollow(userId);
      if (res.code === 200) {
        this.userList = res.data.data;
      }
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
#user-follow {
  background-color: #fff;
  border-radius: 6px;

  .sub-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 28px;
    height: 48px;
    white-space: nowrap;
    border-bottom: 2px solid rgba(230, 230, 231, 0.5);

    .sub-header-title {
      .sub-header-search {
        /deep/ .el-input__inner {
          height: 32px;
          border-radius: 16px;
        }

        /deep/ .el-input__suffix-inner {
          i {
            line-height: 32px;
          }
        }
      }
    }

    .sub-type-box {
      display: flex;
      align-items: center;
      margin-left: auto;

      i {
        color: #000;
        font-size: 16px;
        margin-left: 20px;
        cursor: pointer;
      }
      .sub-type-filter {
        position: relative;
        i {
          &:last-child {
            margin-left: 0;
            font-size: 12px;
          }
        }
      }
    }
  }

  .user-follow-list {
    padding: 12px 20px;

    .user-follow-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 76px;
      border-bottom: 1px solid #e5e9ef;
      &:last-child {
        border-bottom: 0;
      }
      .uf-item-left {
        display: flex;
        align-items: center;
        justify-content: center;

        .user-follow-avatar {
          width: 46px;
          height: 46px;
          margin-right: 5px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .user-follow-info {
          & > div {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            line-clamp: 1;
          }
          .name {
            color: #171725;
            margin-bottom: 6px;
            font-size: 15px;
          }

          .intor {
            color: #92929d;
            font-size: 12px;
          }
        }
      }

      .uf-item-right {
        display: flex;

        .uf-item-btn {
          height: 26px;
          line-height: 25px;
          font-size: 13px;
          text-align: center;
          font-weight: 500;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.25s;
          &:hover {
            opacity: 0.7;
          }
        }

        .user-follow-chatBtn {
          width: 76px;
          margin-right: 16px;
          color: @primary-color;
          background-color: #fff;
          border: 1px solid @primary-color;
        }

        .user-follow-unSubBtn {
          width: 100px;
          color: #8a8a92;
          background-color: #f1f1f5;
          border: 1px solid #dddde5;
          &.unSubIng {
            background-color: @primary-color;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>