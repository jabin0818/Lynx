<template>
  <div class="changeModal">
    <el-dialog
      :visible="visible"
      :modal-append-to-body="false"
      width="446px"
      class="changeModal-dialog"
      :center="true"
      @open="open"
      @close="close"
    >
      <div class="changePassword-wrapper">
        <div class="tab-wrapper">
          <span class="login-tab">更换密码</span>
        </div>
        <div class="form-wrapper">
          <div class="changePwd-wrapper">
            <el-form
              :model="changePasswordForm"
              :rules="changePasswordRules"
              ref="changePasswordForm"
              label-width="70px"
              hide-required-asterisk
              label-position="right"
              class="form-changePwd"
            >
              <el-form-item prop="oldPassword">
                <template slot="label">旧密码</template>
                <el-input
                  type="password"
                  width="200"
                  v-model="changePasswordForm.oldPassword"
                  placeholder="请输入旧密码"
                  maxlength="12"
                  autofocus
                  validate-event
                  :show-password="true"
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="newPassword">
                <template slot="label">新密码</template>
                <el-input
                  type="password"
                  v-model="changePasswordForm.newPassword"
                  placeholder="请输入新密码"
                  maxlength="12"
                  :show-password="true"
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <template slot="label">确认密码</template>
                <el-input
                  type="password"
                  v-model="changePasswordForm.confirmPassword"
                  placeholder="请确认新密码"
                  maxlength="12"
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
          <div class="login-btn" @click="changePassword()">
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
import { updateUserPassword } from "@/api/login";

export default {
  name: "ChangePassword",
  props: {
    visible: { type: Boolean, default: false },
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.changePasswordForm.confirmPassword !== "") {
          this.$refs.changePasswordForm.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changePasswordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isLoading: false,
      changePasswordForm: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      changePasswordRules: {
        oldPassword: [
          {
            type: "string",
            required: true,
            message: "请输入旧密码",
            trigger: "blur",
          },
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            type: "string",
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        confirmPassword: [
          {
            type: "string",
            required: true,
            message: "请再次输入密码",
            trigger: "blur",
          },
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    open() {
      console.log("open");
    },
    close() {
      this.$emit("closeUploadModal");
    },
    changePassword() {
      this.$refs["changePasswordForm"].validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          try {
            let result = await updateUserPassword(
              this.userInfo.id,
              this.userInfo.account,
              this.changePasswordForm.oldPassword,
              this.changePasswordForm.newPassword
            );
            if (result.code == 200) {
              this.$message({
                message: result.msg,
                type: "success",
              });
              this.close();
            } else {
              this.$message({
                message: result.msg,
                type: "error",
              });
            }
            this.isLoading = false;
          } catch (error) {
            console.log(error);
            this.$message({
              message: "旧密码错误！",
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
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
.changeModal-dialog {
  .el-dialog {
    @media screen and (max-width: 424px) {
      width: 14rem !important;
      .el-dialog__body {
        padding: 10px 0 20px;
      }
    }
  }
}

.changeModal {
  .changePassword-wrapper {
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

      .changePwd-tab {
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
      .changePwd-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .changePwd-wrapper {
        .form-changePwd {
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