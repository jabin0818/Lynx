<template>
  <div id="setMenu">
    <div class="setMenu-title" @click="backUserCenter">
      <i class="el-icon-arrow-left"></i>
      <span>返回个人主页</span>
    </div>
    <div class="setMenu-sidebar">
      <router-link
        to="/settings/profile"
        active-class="sidebar-nav-active"
        class="sidebar-nav-item"
      >
        <i class="el-icon-s-custom"></i>
        <span>个人资料</span>
      </router-link>
      <router-link
        to="/settings/account"
        active-class="sidebar-nav-active"
        class="sidebar-nav-item"
      >
        <i class="el-icon-s-tools"></i>
        <span>账号设置</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SetMenu",
  methods: {
    backUserCenter() {
      this.$router.replace(`/user/${this.userInfo.id}`);
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
#setMenu {
  background: #fff;
  height: 626px;
  border-radius: 6px;

  .setMenu-title {
    display: flex;
    align-items: center;
    height: 48px;
    cursor: pointer;
    color: #909090;
    border-bottom: 2px solid #f6f6f6;
    transition: color 0.18s;

    &:hover {
      color: @primary-color;
    }

    i {
      margin-right: 6px;
      margin-left: 24px;
    }

    span {
      font-size: 14px;
    }
  }

  .setMenu-sidebar {
    padding: 8px;

    .sidebar-nav-item {
      display: flex;
      align-items: center;
      font-weight: 400;
      height: 48px;
      font-size: 16px;
      color: #4e5969;
      border-radius: 4px;
      transition: color 0.18s;
      &:hover {
        color: @primary-color;
      }

      i {
        margin-right: 12px;
        margin-left: 24px;
      }

      span {
      }
    }

    .sidebar-nav-active {
      background: #e8f3ff;
      color: @primary-color;
    }
  }
}
</style>