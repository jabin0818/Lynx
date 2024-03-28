<template>
  <div id="account-settings">
    <div class="account-settings-title">
      <span></span>
      <span>账号设置</span>
    </div>
    <div class="account-settings-body">
      <ul class="setting-list">
        <li class="setting-item">
          <span class="setting-title">手机号</span>
          <div class="setting-input-box">
            <span class="accout">未绑定</span>
            <div class="action-box">
              <button class="btn unlink-btn">绑定</button>
            </div>
          </div>
        </li>
        <li class="setting-item">
          <span class="setting-title">个人域名</span>
          <div class="setting-input-box">
            <span class="accout">未绑定</span>
            <div class="action-box">
              <button class="btn unlink-btn">绑定</button>
            </div>
          </div>
        </li>
        <li class="setting-item">
          <span class="setting-title">微博</span>
          <div class="setting-input-box">
            <span class="accout">未绑定</span>
            <div class="action-box">
              <button class="btn unlink-btn">绑定</button>
            </div>
          </div>
        </li>
        <li class="setting-item">
          <span class="setting-title">GitHub</span>
          <div class="setting-input-box">
            <span class="accout">未绑定</span>
            <div class="action-box">
              <button class="btn unlink-btn">绑定</button>
            </div>
          </div>
        </li>
        <li class="setting-item">
          <span class="setting-title">手机号</span>
          <div class="setting-input-box">
            <span class="accout">未绑定</span>
            <div class="action-box">
              <button class="btn unlink-btn">绑定</button>
            </div>
          </div>
        </li>
        <li class="setting-item">
          <span class="setting-title">邮箱</span>
          <div class="setting-input-box">
            <span class="accout">{{ userInfo.account }}</span>
            <div class="action-box">
              <button class="btn unlink-btn">换绑</button>
            </div>
          </div>
        </li>
        <li class="setting-item">
          <span class="setting-title">密码</span>
          <div class="setting-input-box">
            <span class="accout">
              <input type="password" value="123456" disabled
            /></span>
            <div class="action-box">
              <button class="btn unlink-btn" @click="changePassword">
                更换
              </button>
            </div>
          </div>
        </li>
        <li class="setting-item">
          <span class="setting-title">账号注销</span>
          <div class="setting-input-box">
            <span class="accout"></span>
            <div class="action-box">
              <button class="btn unlink-btn">注销</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <ChangePassword
      :visible="changePasswordVisible"
      @closeUploadModal="() => (changePasswordVisible = false)"
    />
  </div>
</template>

<script>
import ChangePassword from "./changePassword/index.vue";
import { mapState } from "vuex";

export default {
  name: "AccountSettings",
  components: {
    ChangePassword,
  },
  data() {
    return {
      changePasswordVisible: false,
    };
  },
  methods: {
    changePassword() {
      this.changePasswordVisible = true;
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
#account-settings {
  background: #fff;

  .account-settings-title {
    display: flex;
    align-items: center;
    height: 48px;
    padding-left: 30px;
    border-bottom: 2px solid #f6f6f6;

    span {
      &:nth-child(1) {
        width: 4px;
        height: 16px;
        background-color: @primary-color;
        border-radius: 4px;
        margin-right: 6px;
      }

      &:nth-child(2) {
        color: @primary-color;
        font-size: 14px;
        cursor: default;
      }
    }
  }

  .account-settings-body {
    padding: 20px 20px 0;
    position: relative;

    .setting-list {
      .setting-item {
        display: flex;
        align-items: center;
        padding: 24px 0;
        border-top: 1px solid #f1f1f1;

        &:first-child {
          border-top: none;
        }
        .setting-title {
          font-size: 14px;
          color: #333;
          width: 120px;
        }

        .setting-input-box {
          flex: 1 1 auto;
          display: flex;
          .accout {
            flex: 1 1 auto;
            font-size: 14px;
            color: #909090;

            input {
              border: none;
              background: #fff;
            }
          }

          .action-box {
            margin-left: 12px;
            .unlink-btn {
              padding: 0;
              font-size: 14px;
              color: #007fff;
              background-color: transparent;
              white-space: nowrap;
            }

            .btn {
              border-radius: 2px;
              border: none;
              outline: none;
              transition: background-color 0.3s, color 0.3s;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>