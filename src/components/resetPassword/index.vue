<template>
  <div class="resetModal">
    <el-dialog
      :visible="emailResetPasswordVisible"
      :modal-append-to-body="false"
      width="446px"
      class="resetModal-dialog"
      :center="true"
      @open="open"
      @close="close"
    >
      <div class="resetPassword-wrapper">
        <div class="tab-wrapper">
          <!-- <span class="login-tab isActive" ref="loginTab" @click="toLogin">登录</span>
            <span class="line-tab"></span>
            <span class="register-tab" ref="registerTab" @click="toRegister">注册</span> -->
          <span class="login-tab">重置密码</span>
        </div>
        <div class="form-wrapper">
          <div class="register-wrapper">
            <el-form
              :model="resetPasswordForm"
              :rules="resetPasswordRules"
              ref="resetPasswordForm"
              label-width="70px"
              hide-required-asterisk
              label-position="right"
              class="form-register"
            >
              <el-form-item prop="email">
                <template slot="label">邮箱</template>
                <el-input
                  width="200"
                  v-model="resetPasswordForm.email"
                  placeholder="请输入邮箱"
                  maxlength="255"
                  autofocus
                  validate-event
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="code">
                <template slot="label">验证码</template>
                <el-input
                  v-model="resetPasswordForm.code"
                  placeholder="请输入验证码"
                  maxlength="6"
                >
                  <template slot="suffix">
                    <div class="getCode" @click="!isCountdown && getCode()">
                      <span class="line"></span>
                      <span class="text" v-if="!isCountdown">获取验证码</span>
                      <span class="text" v-else>{{
                        countdown + " 秒后可重发"
                      }}</span>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="newPassword">
                <template slot="label">新密码</template>
                <el-input
                  type="password"
                  v-model="resetPasswordForm.newPassword"
                  placeholder="请输入新密码"
                  maxlength="16"
                  :show-password="true"
                >
                </el-input>
              </el-form-item>
            </el-form>
            <!-- <div class="otherItem-wrapper">
                <el-checkbox label="记住我" class="rememberMe" ></el-checkbox>
                <span class="forgotPsd">忘记密码</span>
              </div> -->
          </div>
        </div>

        <div slot="footer" class="btn-wrapper">
          <div class="login-btn" @click="resetPassword()">
            <span v-show="!isLoading">保存</span>
            <i class="el-icon-loading" v-show="isLoading"></i>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { sendCode, resetPassword } from "@/api/login";

export default {
  name: "EmailResetPassword",
  data() {
    return {
      isLoading: false,
      resetPasswordForm: {
        email: "",
        code: "",
        newPassword: "",
      },
      resetPasswordRules: {
        email: [
          {
            type: "string",
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            min: 3,
            max: 255,
            message: "长度在 3 到 255 个字符",
            trigger: "blur",
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        code: [
          {
            type: "string",
            required: true,
            message: "请输入验证码",
            trigger: "blur",
          },
          { max: 6, message: "请输入正确验证码 ", trigger: "blur" },
        ],
        newPassword: [
          {
            type: "string",
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      countdown: 60,
      isCountdown: false,
    };
  },
  methods: {
    open() {
      console.log("open");
    },
    close() {
      console.log("close");
      this.$store.state.global.emailResetPasswordVisible = false;
    },
    getCode() {
      this.$refs["resetPasswordForm"].validateField("email", async (Error) => {
        if (
          Error == "请输入正确的邮箱地址" ||
          Error == "长度在 3 到 255 个字符" ||
          Error == "请输入邮箱"
        ) {
        } else {
          try {
            let res = await sendCode(this.resetPasswordForm.email);
            if (res.code === 200) {
              this.$message.success("验证码发送成功，请注意查收！");
              this.isCountdown = true;
              this.getTime();
            } else {
              this.$message.error("验证码发送失败");
            }
          } catch (error) {
            this.$message.error(error.msg);
          }
        }
      });
    },
    resetPassword() {
      this.$refs["resetPasswordForm"].validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          try {
            let result = await resetPassword(
              this.resetPasswordForm.email,
              this.resetPasswordForm.code,
              this.resetPasswordForm.newPassword
            );
            if (result.code == 200) {
              this.$message({
                message: result.msg,
                type: "success",
              });
              this.close();
              this.$store.state.user.isLogin = true;
            } else {
              this.$message({
                message: result.msg,
                type: "error",
              });
            }
            this.isLoading = false;
          } catch (error) {
            // console.log(error);
            this.$message({
              message: error.response.data.msg,
              type: "error",
            });
          } finally {
            this.isLoading = false;
          }
        } else {
          return false;
        }
      });
    },
    getTime() {
      this.timer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(this.timer);
          this.countdown = 60;
          this.isCountdown = false;
        }
      }, 1000);
    },
  },
  computed: {
    ...mapState("global", ["emailResetPasswordVisible"]),
  },
};
</script>

<style lang="less">
.resetModal-dialog {
  .el-dialog {
    @media screen and (max-width: 424px) {
      width: 14rem !important;
      .el-dialog__body {
        padding: 10px 0 20px;
      }
    }
  }
}

.resetModal {
  .resetPassword-wrapper {
    // width: 400px;

    .tab-wrapper {
      color: #505050;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;

      .login-tab {
        font-size: 18px;
        cursor: pointer;
      }

      .line-tab {
        width: 1px;
        height: 20px;
        background-color: #e7e7e7;
        margin: 0 21px;
      }

      .register-tab {
        font-size: 18px;
        cursor: pointer;
      }

      .isActive {
        color: @primary-color;
      }
    }

    .form-wrapper {
      margin-top: 30px;

      .login-wrapper,
      .register-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .register-wrapper {
        .form-register {
          width: 84%;
          position: relative;
          left: -12px;

          @media screen and (max-width: 424px) {
            width: 90%;
          }

          @media screen and (max-width: 320px) {
            width: 98%;
          }
        }

        .getCode {
          display: flex;
          align-items: center;
          margin-right: 10px;

          .line {
            display: inline-block;
            width: 1px;
            height: 20px;
            background: #e7e7e7;
            margin-right: 16px;
          }

          .text {
            color: @primary-color;
            cursor: pointer;
          }
        }
      }
    }

    .btn-wrapper {
      width: 100%;
      display: flex;
      margin-top: 20px;
      justify-content: center;

      .login-btn {
        box-sizing: border-box;
        width: 194px;
        height: 40px;
        border-radius: 8px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        background-color: @primary-color;
        color: #fff;
        @media screen and (max-width: 424px) {
          width: 140px;
        }

        @media screen and (max-width: 320px) {
          width: 100px;
        }
      }
    }
  }
}
</style>