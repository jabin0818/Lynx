<template>
  <div class="loginModal">
    <el-dialog
      :visible="loginRegVisible"
      :modal-append-to-body="false"
      width="446px"
      class="loginModal-dialog"
      :center="true"
      @open="open"
      @close="close"
    >
      <div class="loginReg-wrapper">
        <div class="tab-wrapper">
          <span class="login-tab isActive" ref="loginTab" @click="toLogin"
            >登录</span
          >
          <span class="line-tab"></span>
          <span class="register-tab" ref="registerTab" @click="toRegister"
            >注册</span
          >
        </div>
        <div class="form-wrapper">
          <div class="login-wrapper" v-show="modalLogin">
            <el-form
              :model="loginForm"
              :rules="loginRules"
              ref="loginForm"
              label-width="50px"
              hide-required-asterisk
              label-position="right"
              class="form-login"
            >
              <el-form-item prop="email">
                <template slot="label">邮箱</template>
                <el-input
                  width="200"
                  v-model="loginForm.email"
                  placeholder="请输入邮箱"
                  maxlength="255"
                  autofocus
                  validate-event
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <template slot="label">密码</template>
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  placeholder="请输入密码"
                  :show-word-limit="true"
                  maxlength="16"
                  :show-password="true"
                >
                </el-input>
              </el-form-item>
            </el-form>
            <div class="otherItem-wrapper">
              <el-checkbox
                label="记住我"
                v-model="rememberChecked"
                class="rememberMe"
              ></el-checkbox>
              <span class="forgotPsd" @click="toEmailResetPassword"
                >忘记密码</span
              >
            </div>
          </div>
          <div class="register-wrapper" v-show="!modalLogin">
            <el-form
              :model="registerForm"
              :rules="registerRules"
              ref="registerForm"
              label-width="70px"
              hide-required-asterisk
              label-position="right"
              class="form-register"
            >
              <el-form-item prop="email">
                <template slot="label">邮箱</template>
                <el-input
                  width="200"
                  v-model="registerForm.email"
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
                  v-model="registerForm.code"
                  placeholder="请输入验证码"
                  maxlength="6"
                >
                  <template slot="suffix">
                    <div class="getCode" @click="!isCountdown && getCode()">
                      <span class="line"></span>
                      <span class="text" v-if="!isCountdown">获取验证码</span>
                      <i class="el-icon-loading" v-if="captchaLoading"></i>
                      <span class="text" v-if="isCountdown">{{
                        countdown + " 秒后可重发"
                      }}</span>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <template slot="label">密码</template>
                <el-input
                  type="password"
                  v-model="registerForm.password"
                  placeholder="请输入密码"
                  maxlength="16"
                  :show-password="true"
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="repPassword">
                <template slot="label">重复密码</template>
                <el-input
                  type="password"
                  v-model="registerForm.repPassword"
                  placeholder="请再次输入密码"
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
          <div class="login-btn" @click="modalLogin ? login() : register()">
            <span v-show="!isLoading">{{ modalLogin ? "登录" : "注册" }}</span>
            <i class="el-icon-loading" v-show="isLoading"></i>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { sendCode, register } from "@/api/login";
import { getUserPsd, setUserPsd, clearUserPsd } from "@/utils/localStorage";
export default {
  name: "LoginRegister",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.repPassword !== "") {
          this.$refs.registerForm.validateField("repPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      modalLogin: true,
      loginForm: {
        email: "",
        password: "",
      },
      registerForm: {
        email: "",
        code: "",
        password: "",
        repPassword: "",
      },
      loginRules: {
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
        password: [
          {
            type: "string",
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 5,
            max: 12,
            message: "长度在 5 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      registerRules: {
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
        password: [{ validator: validatePass, trigger: "blur" }],
        repPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
      isLoading: false,
      countdown: 60,
      isCountdown: false,
      websock: null,
      websockNet: null,
      captchaLoading: false,
      rememberChecked: false,
    };
  },
  methods: {
    ...mapActions("user", ["userLogin"]),
    // initWebSocket(userId) {
    //   this.websock = new WebSocket(`ws://localhost:8088/dynamic/1812446557`);
    //   this.websock.onmessage = this.websocketonmessage;
    //   this.websock.onopen = this.websocketonopen;
    //   this.websock.onerror = this.websocketonerror;
    //   this.websock.onclose = this.websocketclose;
    // },
    // websocketonmessage(e) {
    //   console.log("websocket接收到的消息", e);
    // },
    // websocketonopen() {
    //   let action = { message: "sys_info" };
    //   this.websocketsend(JSON.stringify(action));
    // },
    // websocketsend(data) {
    //   this.websock.send(data);
    // },
    // websocketonerror() {
    //   this.initWebSocket();
    // },
    // websocketclose() {
    //   console.log("关闭");
    // },
    open() {
      if (getUserPsd()) {
        this.loginForm.email = this.$utils.decrypt(getUserPsd().email);
        this.loginForm.password = this.$utils.decrypt(getUserPsd().password);
      }
    },
    close() {
      this.$store.state.global.loginRegVisible = false;
    },
    toLogin() {
      this.modalLogin = true;
      this.$refs.registerTab.classList.remove("isActive");
      this.$refs.loginTab.classList.add("isActive");
    },
    toRegister() {
      this.modalLogin = false;
      this.$refs.loginTab.classList.remove("isActive");
      this.$refs.registerTab.classList.add("isActive");
    },
    getCode() {
      this.captchaLoading = true;
      this.$refs["registerForm"].validateField("email", async (Error) => {
        if (
          Error == "请输入正确的邮箱地址" ||
          Error == "长度在 3 到 255 个字符" ||
          Error == "请输入邮箱"
        ) {
        } else {
          try {
            let res = await sendCode(this.registerForm.email);
            if (res.code === 200) {
              this.$message.success("验证码发送成功，请注意查收！");
              this.captchaLoading = false;
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
    toEmailResetPassword() {
      this.$store.state.global.emailResetPasswordVisible = true;
    },
    login() {
      this.$refs["loginForm"].validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          try {
            const res = await this.userLogin({
              email: this.loginForm.email,
              password: this.loginForm.password,
            });
            if (res === "ok") {
              this.$message({
                message: "登录成功！",
                type: "success",
              });
              this.close();
              if (this.rememberChecked) {
                // 本地缓存帐号密码
                let rememberInfo = {
                  email: this.$utils.encrypt(this.loginForm.email),
                  password: this.$utils.encrypt(this.loginForm.password),
                };
                setUserPsd(rememberInfo);
              } else {
                clearUserPsd();
              }
            } else {
              this.$message({
                message: result.msg,
                type: "error",
              });
            }
            this.isLoading = false;
          } catch (error) {
            console.log(error);
            if (error.code === 401) {
              this.$message({
                message: error.msg,
                type: "error",
              });
            }
          } finally {
            this.isLoading = false;
          }
        } else {
          return false;
        }
      });
    },
    register() {
      this.$refs["registerForm"].validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          try {
            let result = await register(
              this.registerForm.email,
              this.registerForm.code,
              this.registerForm.password
            );
            if (result.code == 200) {
              this.$message({
                message: result.msg,
                type: "success",
              });
              this.toLogin();
            } else {
              this.$message({
                message: result.msg,
                type: "error",
              });
            }
          } catch (error) {
            this.$message({
              message: "发生错误！" + error,
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
    ...mapState("global", ["loginRegVisible"]),
    ...mapState("user", ["userId"]),
  },
};
</script>

<style lang="less">
.loginModal-dialog {
  .el-dialog {
    @media screen and (max-width: 424px) {
      width: 14rem !important;
      .el-dialog__body {
        padding: 10px 0 20px;
      }
    }
  }
}

.loginModal {
  .loginReg-wrapper {
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

        .form-login {
          width: 80%;
          @media screen and (max-width: 424px) {
            width: 90%;
          }

          @media screen and (max-width: 320px) {
            width: 98%;
          }
        }

        .otherItem-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 80%;

          .rememberMe {
          }

          .forgotPsd {
            font-size: 14px;
            color: @primary-color;
            cursor: pointer;
          }
        }
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
          justify-content: center;
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

          i {
            color: @primary-color;
            line-height: 40px;
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