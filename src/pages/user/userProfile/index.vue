<template>
  <div id="userProfile-introduce">
    <!-- <div class="userBackgroundImg" :style="'background-image:url('+require('../../../assets/img/user/beijing.jpg')+')'"> -->
    <div class="userBackgroundImg">
      <img src="@/assets/img/user/beijing.jpg" />
      <div class="replace-Btn">
        <i class="el-icon-camera-solid"></i>
        <span> 编辑封面图片 </span>
      </div>
      <div class="userCover-ipInfo">
        <i class="el-icon-location"></i>
        <span> IP属地：广东 </span>
      </div>
    </div>
    <div class="userProfile">
      <div class="introduce-right">
        <div class="introduce-avatar">
          <div class="user-profile-avatar">
            <img
              :src="
                userData.avatar
                  ? userData.avatar
                  : require('@/assets/img/user/default_avatar.jpg')
              "
              alt=""
            />
            <a class="vip-icon">
              <i class="iconfont icon-renzhengyonghu"></i>
            </a>
          </div>
        </div>
        <div class="introduce-info">
          <div class="introduce-top">
            <div class="introduce-username">{{ userData.username }}</div>
            <div
              class="introduce-gender"
              :style="
                userData.gender === '女' ? 'background-color: #ff42b3;' : ''
              "
              v-if="userData.gender === '男' || userData.gender === '女'"
            >
              <i class="el-icon-male" v-show="userData.gender === '男'"></i>
              <i class="el-icon-female" v-show="userData.gender === '女'"></i>
            </div>
            <div class="introduce-level">
              <i class="iconfont icon-1"></i>
            </div>
            <div class="introduce-uid">
              <span class="uid">UID</span>
              <span class="uid-num">{{ userData.uuid }}</span>
            </div>
          </div>
          <!-- <div class="introduce-active">
            <div class="introduce-active-item">
              <span class="txt">总访问量</span>
              <span class="num">134</span>
            </div>
            <div class="introduce-active-line"></div>
            <div class="introduce-active-item">
              <span class="txt">原创</span>
              <span class="num">42</span>
            </div>
            <div class="introduce-active-line"></div>
            <div class="introduce-active-item">
              <span class="txt">排名</span>
              <span class="num">99+</span>
            </div>
          </div> -->
          <div class="introduce-other">
            <div class="introduce-txt">
              <div class="text">简介：{{ userData.resume }}</div>
              <!-- <div class="education">IP 属地：广东省</div> -->
            </div>
            <div class="introduce-more">
              <div class="introduce-more-row" v-show="showMoreIntro">
                <div class="introduce-more-col">
                  邮箱：{{ userData.account }}
                </div>
                <div class="introduce-more-col">
                  学历：{{ userData.degree ? userData.degree : "高端人士" }}
                </div>
              </div>
              <div class="introduce-more-row" v-show="showMoreIntro">
                <div class="introduce-more-col" v-if="userData.city">
                  地区：{{ userData.city }}
                </div>
                <div class="introduce-more-col" v-if="userData.birthday">
                  生日：{{ userData.birthday }}
                </div>
              </div>
              <!-- <div class="introduce-more-row" v-show="showMoreIntro">
                <div class="introduce-more-col">
                  加入时间：2000-01-01
                </div>
              </div> -->
              <div class="introduce-more-btn" @click="showMoreIntroBtn">
                <span>{{
                  showMoreIntro ? "收起更多详细信息" : "查看更多详细信息"
                }}</span>
                <i class="el-icon-arrow-down" v-show="!showMoreIntro"></i>
                <i class="el-icon-arrow-up" v-show="showMoreIntro"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="introduce-left">
        <div class="bottom-info">
          <i class="iconfont icon-diqiu"></i>
          <i class="iconfont github-fill icon-github-fill"></i>
          <i class="iconfont icon-xinlangweibo"></i>
        </div>
        <div class="top-btn">
          <template v-if="userData.id === userInfo.id">
            <div class="setting-btn" @click="toAccountSettings">设置</div>
            <div class="setting-btn btn" @click="toProfileSettings">
              编辑个人资料
            </div>
          </template>
          <template v-else>
            <div
              class="setting-btn"
              :class="{ following: userData.sub }"
              @click="follow"
            >
              {{ userData.sub ? "已关注" : "关注" }}
            </div>
            <div class="setting-btn btn" @click="toMessageChat">私信</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { subscribeUser, unsubscribeUser } from "@/api/dynamic.js";
import { mapState } from "vuex";

export default {
  name: "UserProfile",
  props: {
    userData: { Type: Object },
  },
  data() {
    return {
      showMoreIntro: false,
    };
  },
  // mounted() {
  // },
  methods: {
    showMoreIntroBtn() {
      this.showMoreIntro = !this.showMoreIntro;
    },
    toProfileSettings() {
      this.$router.push("/settings/profile");
    },
    toAccountSettings() {
      this.$router.push("/settings/account");
    },
    async follow() {
      if (!this.isLogin) {
        this.$message.error("请先登录！");
        this.$store.state.global.loginRegVisible = true;
        return;
      }
      if (this.userInfo.id && this.userData.id) {
        if (this.userData.sub) {
          // 取消关注
          this.$confirm("是否确定取消关注?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(async () => {
              let res = await unsubscribeUser(
                this.userInfo.uid,
                this.userData.uuid
              );
              if (res.code === 200) {
                if (res.data === "subtraction:1") {
                  this.$message({
                    type: "success",
                    message: "取消关注成功",
                  });
                  this.changeSubStatus(false);
                } else {
                  this.$message({
                    type: "warning",
                    message: "你还未关注该用户！",
                  });
                }
              } else {
                this.$message({
                  type: "error",
                  message: "网络繁忙！",
                });
                this.changeSubStatus(true);
              }
            })
            .catch(() => {});
        } else {
          // 关注
          let res = await subscribeUser(this.userInfo.id, this.userData.uuid);
          if (res.code === 200) {
            if (res.data == "add:1") {
              this.$message({
                type: "success",
                message: "关注成功",
              });
              this.changeSubStatus(true);
            } else {
              this.$message({
                type: "warning",
                message: "你已关注该用户！",
              });
            }
          } else {
            this.$message({
              type: "error",
              message: "网络繁忙！",
            });
            this.changeSubStatus(false);
          }
        }
      }
    },
    toMessageChat() {
      if (!this.isLogin) {
        this.$message.error("请先登录！");
        this.$store.state.global.loginRegVisible = true;
        return;
      }
      this.$router.push(`/message/chat/${this.userData.id}`);
    },
    changeSubStatus(isSub) {
      this.$emit("changeIsSub", isSub);
    },
  },
  computed: {
    ...mapState("user", ["isLogin", "userInfo"]),
  },
};
</script>

<style lang="less">
#userProfile-introduce {
  .userBackgroundImg {
    position: relative;
    height: 240px;
    overflow: hidden;
    border-radius: 6px 6px 0 0;

    img {
      position: relative;
      width: 100%;
      transform: translate(0, -50%);
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
    }

    .replace-Btn {
      display: flex;
      align-items: center;
      position: absolute;
      right: 24px;
      top: 24px;
      z-index: 2;
      color: hsla(0, 0%, 100%, 0.7);
      border-color: hsla(0, 0%, 100%, 0.24);
      border: 1px solid;
      border-radius: 10px;
      padding: 4px 10px;
      background-color: rgba(23, 23, 37, 0.5);
      cursor: pointer;

      i {
        font-size: 16px;
        margin-right: 4px;
      }
      span {
        font-size: 14px;
      }
    }

    .userCover-ipInfo {
      display: flex;
      align-items: center;
      position: absolute;
      bottom: 15px;
      right: 30px;
      padding: 3px 4px 2px 3px;
      border-radius: 4px;
      font-size: 14px;
      // backdrop-filter: blur(4px);
      // background: hsla(0, 0%, 7%, 0.12);
      color: hsla(0, 0%, 100%, 0.8);

      i {
        font-size: 16px;
        margin-right: 4px;
      }
      span {
        font-size: 14px;
      }
    }
  }

  .userProfile {
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding: 0 24px 10px;
    background: #fff;
    border-radius: 0 0 6px 6px;

    .introduce-right {
      display: flex;

      .introduce-avatar {
        position: relative;
        width: 120px;
        height: 90px;
        min-width: 122px;

        .user-profile-avatar {
          position: absolute;
          top: -36px;
          width: 120px;
          height: 120px;
          border: 4px solid #f0f0f2;
          border-radius: 50%;
          background: #fff;
          img {
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 50%;
          }

          .vip-icon {
            position: absolute;
            right: 0;
            bottom: -4px;
            width: 24px;
            height: 24px;
            display: block;

            i {
              color: @warning-color;
              font-size: 20px;
            }
          }
        }
      }

      .introduce-info {
        margin-left: 16px;

        .introduce-top {
          display: flex;
          align-items: center;
          line-height: 24px;
          margin-top: 6px;

          .introduce-username {
            color: #222226;
            font-size: 22px;
            font-weight: 500;
          }
          .introduce-gender {
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
          .introduce-level {
            i {
              font-size: 28px;
              font-weight: 500;
            }
          }

          .introduce-uid {
            display: flex;
            align-items: center;
            margin-left: 5px;
            .uid {
              transform: scale(0.8);
              display: inline-block;
              min-width: 24px;
              font-size: 12px;
              font-family: Microsoft YaHei;
              line-height: 14px;
              color: #9499a0;
              margin-right: 0px;
              margin-left: 7px;
              border: 1px solid #9499a0;
              border-radius: 4px;
            }
            .uid-num {
              color: #9499a0;
              font-family: Microsoft YaHei;
              font-size: 12px;
              line-height: 16px;
              padding-right: 6px;
            }
          }
        }

        .introduce-active {
          display: flex;
          align-items: center;
          margin-top: 10px;

          .introduce-active-item {
            display: flex;
            align-items: center;

            .txt {
              color: #555666;
              font-size: 14px;
              line-height: 16px;
              white-space: nowrap;
              margin-top: 1px;
              margin-right: 3px;
            }

            .num {
              color: #222226;
              font-weight: 600;
              font-size: 20px;
              line-height: 24px;
            }
          }

          .introduce-active-line {
            width: 1px;
            height: 16px;
            background: #e8e8ed;
            margin: 0 16px;
          }
        }

        .introduce-other {
          margin-top: 14px;

          .introduce-txt {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #555666;
            line-height: 20px;
            margin-bottom: 10px;

            .text {
              overflow: hidden;
              white-space: normal;
              word-break: break-word;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }
          }

          .introduce-more {
            .introduce-more-btn {
              margin-bottom: 10px;
              cursor: pointer;

              span {
                font-size: 14px;
                color: #555666;
                line-height: 20px;
              }

              i {
                font-size: 14px;
                color: #555666;
                margin-left: 5px;
              }
            }

            .introduce-more-row {
              display: flex;
              align-items: center;
              .introduce-more-col {
                font-size: 14px;
                color: #555666;
                line-height: 20px;
                margin-bottom: 10px;
                margin-right: 20px;
              }
            }
          }
        }
      }
    }

    .introduce-left {
      display: flex;
      flex-direction: column;
      padding: 20px 0;
      margin-left: 10px;

      .top-btn {
        display: flex;
      }

      .bottom-info {
        font-size: 14px;
        color: #555666;
        line-height: 20px;
        text-align: right;
        margin-bottom: 14px;

        i {
          margin-right: 20px;
          font-size: 18px;
          cursor: pointer;
        }
      }

      .setting-btn {
        width: 100px;
        height: 38px;
        padding: 0;
        margin-right: 10px;
        line-height: 38px;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        background-color: @primary-color;
        color: #fff;
        border: 1px solid @primary-color;
        border-radius: 4px;
        cursor: pointer;
        transition: opacity 0.25s;

        &.following {
          background-color: #fff;
          color: @primary-color;
        }

        &:hover {
          opacity: 0.7;
        }
      }

      .btn {
        width: 140px;
        background-color: #fff;
        color: @primary-color;
      }
    }
  }
}
</style>