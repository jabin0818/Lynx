<template>
  <div class="main-header">
    <div class="header-left-content">
      <!-- hiddenNav -->
      <div class="self-nav-toogle">
        <div class="site-nav-menu-wrapper" ref="container">
          <div
            id="site-nav-menu"
            @click="
              () => {
                isNavClick = !isNavClick;
              }
            "
          >
            <div></div>
          </div>
          <transition name="el-fade-in">
            <div
              class="dropdown-menu-container"
              style="padding-top: 15px"
              v-show="isNavClick"
            >
              <div class="nav-popover-content">
                <div class="nav-entry-popover">
                  <div class="nav-inner-list">
                    <router-link to="/index" class="nav-inner-list__item"
                      >首页
                    </router-link>
                    <router-link to="/card" class="nav-inner-list__item"
                      >卡片
                    </router-link>
                    <router-link to="/video" class="nav-inner-list__item"
                      >视频
                    </router-link>
                    <router-link to="/tags/all" class="nav-inner-list__item"
                      >标签
                    </router-link>
                    <router-link
                      to="/message"
                      class="nav-inner-list__item entrymMessage"
                      >消息
                    </router-link>
                    <router-link
                      to="/community"
                      class="nav-inner-list__item entrymDynamic"
                      >动态
                    </router-link>
                    <router-link
                      to="/creator/home"
                      class="nav-inner-list__item entrymWriting"
                      >创作中心
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <a class="self-nav-toogle-logo">
          <img src="../../assets/logo.png" class="site-nav-logo" />
        </a>
      </div>

      <!-- logo -->
      <!-- <div @click="refresh" class="header-item-logo"> -->
      <div class="header-item-logo" @click="backHome">
        <img src="../../assets/logo.png" alt="lynx" style="height: 100%" />
      </div>

      <!-- 首页 -->
      <div class="header-item-menu">
        <!-- <el-menu
          class="el-menu-vertical-demo menu-left"
          :default-active="activeIndex"
          mode="horizontal"
          text-color="#606266"
          active-text-color="@primary-color"
          @select="handleSelect"
        >
          <el-menu-item style="border: none" index="1">首页</el-menu-item>
          <el-menu-item style="border: none" index="2">笔记</el-menu-item>
          <el-menu-item style="border: none" index="3" disabled
            >标签</el-menu-item
          >
          <el-menu-item style="border: none" index="4">管理</el-menu-item>
        </el-menu> -->
        <ul class="left-entry">
          <li class="left-entry-li">
            <router-link to="/index" active-class="le-li-active" class=""
              >首页</router-link
            >
          </li>
          <li class="left-entry-li">
            <router-link to="/card" active-class="le-li-active"
              >卡片</router-link
            >
          </li>
          <li class="left-entry-li">
            <router-link to="/video" active-class="le-li-active"
              >视频</router-link
            >
          </li>
          <!-- <li class="left-entry-li">
            <router-link to="/community" active-class="le-li-active"
              >社区</router-link
            >
          </li> -->
          <!--<li class="left-entry-li">
            <router-link to="/creator/content/notes/essays" class="">管理</router-link>
          </li> -->
          <li class="left-entry-li">
            <router-link to="/tags/all" active-class="le-li-active"
              >标签</router-link
            >
          </li>
        </ul>
      </div>

      <!-- 搜索框 -->
      <div class="header-search">
        <el-input
          class="header-search-input"
          suffix-icon="el-icon-search"
          @focus="focus"
          @blur="blur"
        />
        <span class="header-search-icon">
          <i class="el-icon-search"></i>
        </span>
      </div>
    </div>
    <div class="header-right-content">
      <!-- 头像 -->
      <div
        class="header-item avatar-container"
        @mouseenter="isLogin && avatarMouseenter()"
        @mouseleave="isLogin && avatarMouseleave()"
        @click="!isLogin && loginRegister()"
      >
        <div class="wrap-container">
          <template v-if="isLogin && userInfo">
            <a
              class="header-entry-mini"
              :class="
                isAvatarHover === true
                  ? 'header-entry-mini-fadeOut'
                  : avatarVisi === true
                  ? 'header-entry-mini-fadeIn'
                  : ''
              "
            >
              <img
                class="entry-mini-img"
                :src="userInfo.avatar ? userInfo.avatar : ''"
              />
            </a>
            <a
              class="header-entry-avatar"
              :class="
                isAvatarHover === true
                  ? 'header-entry-avatarbloomSmall'
                  : avatarVisi === true
                  ? 'header-entry-avatarFadeSmall'
                  : ''
              "
              @click="toUserCenter"
            >
              <div class="lynx-avatar">
                <img
                  class="lynx-avatar-img"
                  :src="userInfo.avatar ? userInfo.avatar : ''"
                />
              </div>
            </a>
          </template>
          <template v-else>
            <div class="header-login-entry"><span> 登录 </span></div>
          </template>
        </div>
        <transition name="el-fade-in">
          <div
            class="header-avatar"
            v-if="isLogin && userInfo"
            v-show="isAvatarHover"
          >
            <div class="avatar-panel-popover">
              <div class="avatar-panel">
                <div class="avatar-panel-ul">
                  <a class="big-avatar"></a>
                  <a class="nickname-item" @click="toUserCenter">
                    <span>{{ userInfo ? userInfo.username : "" }}</span>
                    <span
                      class="avatar-panel-gender"
                      :style="
                        userInfo.gender === '女'
                          ? 'background-color: #ff42b3;'
                          : ''
                      "
                      v-if="
                        userInfo.gender === '男' || userInfo.gender === '女'
                      "
                    >
                      <i
                        class="el-icon-male"
                        v-show="userInfo.gender === '男'"
                      ></i>
                      <i
                        class="el-icon-female"
                        v-show="userInfo.gender === '女'"
                      ></i>
                    </span>
                  </a>
                  <!-- <div class="coins-item">
                    <a>
                      <span class="coin-item__text">雪免:</span
                      ><span class="coin-item__num">45</span>
                    </a>
                    <a>
                      <span class="coin-item__text">L币:</span
                      ><span class="coin-item__num">0</span>
                    </a>
                    <div class="coin-animation" style="display: none"></div>
                  </div> -->
                  <div class="level-item">
                    <a class="level-item-bar">
                      <div class="level-item-bar-tag">
                        <i class="iconfont icon-1"></i>
                      </div>
                      <div class="level-progress">
                        <div
                          class="level-progress-inner"
                          style="width: 71%"
                        ></div>
                      </div>
                      <div class="level-item-bar-tag">
                        <i class="iconfont icon-2"></i>
                      </div>
                    </a>
                    <div class="level-item-text">
                      当前经验值20500，距离升级Lv.2 还需要8300
                    </div>
                  </div>
                  <div class="counts-item">
                    <a class="single-count-item">
                      <div class="count-num">{{ userInfo.numFoll }}</div>
                      <div class="count-text">关注</div>
                    </a>
                    <a class="single-count-item">
                      <div class="count-num">{{ userInfo.fans }}</div>
                      <div class="count-text">粉丝</div>
                    </a>
                    <a class="single-count-item">
                      <div class="count-num">{{ userInfo.numPub }}</div>
                      <div class="count-text">笔记</div>
                    </a>
                  </div>
                  <div class="link-item">
                    <a class="single-link-item" @click="toUserCenter">
                      <div class="link-title">
                        <i class="el-icon-user"></i>
                        <span>个人中心</span>
                      </div>
                      <i class="el-icon-arrow-right"></i>
                    </a>
                    <router-link
                      to="/creator/content/notes/essays"
                      class="single-link-item"
                    >
                      <div class="link-title">
                        <i class="iconfont icon-gaojian"></i>
                        <span>稿件管理</span>
                      </div>
                      <i class="el-icon-arrow-right"></i>
                    </router-link>
                  </div>
                  <div class="split-line"></div>
                  <div class="logout-item" @click="userLogout()">
                    <i class="iconfont icon-tuichudenglu"></i>
                    <span>退出登录</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <LoginRegister v-if="!isLogin" />
      <EmailResetPassword v-if="!isLogin" />

      <!-- 消息 -->
      <div
        class="header-item badge-container"
        @mouseenter="messageMouseenter"
        @mouseleave="messageMouseleave"
      >
        <a class="right-entry-outside" @click="toMessage">
          <div class="badge-hint" v-if="this.message">
            {{ this.message.length }}
          </div>
          <i class="el-icon-message"></i>
          <span class="right-entry-text">消息</span>
        </a>
        <transition name="el-fade-in">
          <div
            class="badge-popover"
            style="padding-top: 15px"
            v-show="isMessageHover"
          >
            <div class="badge-popover-content">
              <div class="message-entry-popover">
                <div class="message-inner-list">
                  <router-link
                    to="/message/comment"
                    class="message-inner-list__item"
                    >评论
                    <!-- <div class="badge-hint"></div> -->
                  </router-link>
                  <router-link
                    to="/message/like"
                    class="message-inner-list__item"
                    >点赞
                    <!-- <div class="badge-hint"></div> -->
                  </router-link>
                  <!-- <a class="message-inner-list__item">@我 </a> -->
                  <router-link
                    to="/message/follow"
                    class="message-inner-list__item"
                    >关注
                    <!-- <div class="badge-hint"></div> -->
                  </router-link>
                  <router-link
                    to="/message/chat"
                    class="message-inner-list__item"
                    >私信
                    <div class="badge-hint" v-if="this.message">
                      {{ this.message.length }}
                    </div>
                  </router-link>
                  <router-link
                    to="/message/system"
                    class="message-inner-list__item"
                    >系统消息
                    <!-- <div class="badge-hint"></div> -->
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- 动态 -->
      <div
        class="header-item dynamic-container"
        @mouseenter="dynamicMouseenter"
        @mouseleave="dynamicMouseleave"
      >
        <a class="right-entry-outside" @click="toDynamic">
          <div class="badge-hint" v-if="this.dynamciMsgNum">
            {{ this.dynamciMsgNum }}
          </div>
          <i class="iconfont icon-dongtai2"></i>
          <span class="right-entry-text">动态</span>
        </a>
        <transition name="el-fade-in">
          <div
            class="dynamic-popover"
            style="padding-top: 15px"
            v-show="isDynamicHover"
          >
            <div class="dynamic-popover-content">
              <div class="dynamic-entry-popover">
                <div class="dynamic-inner-list">
                  <router-link
                    to="/community?tab=all"
                    class="dynamic-inner-list__item"
                    >全部
                  </router-link>
                  <router-link
                    to="/community/?tab=note"
                    class="dynamic-inner-list__item"
                    >笔记
                  </router-link>
                  <router-link
                    to="/community/?tab=card"
                    class="dynamic-inner-list__item"
                    >卡片
                  </router-link>
                  <router-link
                    to="/community/?tab=video"
                    class="dynamic-inner-list__item"
                    >视频
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- 创作中心 -->
      <div class="header-item writing-container">
        <router-link to="/creator/home" class="right-entry-outside">
          <i class="iconfont icon-dengpao"></i>
          <span class="right-entry-text">创作中心</span>
        </router-link>
      </div>

      <!-- 写笔记 -->
      <div
        class="header-item contribute-container"
        @mouseenter="uploadMouseenter"
        @mouseleave="uploadMouseleave"
      >
        <!-- <el-popover
          placement="bottom-start"
          width="206"
          v-model="visible"
          :visible-arrow="false"
          :offset="400"
          popper-class="contribute-popover"
          trigger="hover"
          :close-delay="140">
          <div class="contribute-popover-wrapper">
            <a href="" class="upload-item" @click="toWriteNotes">
              <i class="el-icon-edit"></i>
              <span>发布笔记</span>
            </a>
            <router-link target="_blank" :to="{path:'/card/creation' }" class="upload-item" @click="toWriteCard">
              <i class="el-icon-edit"></i>
              <span>发布卡片</span>
            </router-link>
            <a href="" class="upload-item">
              <i class="el-icon-edit"></i>
              <span>发布标签</span>
            </a>
          </div>
          <div class="options" slot="reference">
            <div class="releaseBtn" >
              <i class="el-icon-edit"></i>
              <span>发布</span>
            </div>
          </div>
        </el-popover> -->
        <div class="options">
          <div class="releaseBtn">
            <i class="el-icon-edit"></i>
            <span>发布</span>
          </div>
        </div>
        <transition name="el-fade-in">
          <div class="contribute-popover-wrapper" v-show="isUploadHover">
            <a class="upload-item" @click="toWriteNotes">
              <i class="el-icon-edit"></i>
              <span>发布笔记</span>
            </a>
            <a @click="toWriteCard" class="upload-item">
              <i class="el-icon-postcard"></i>
              <span>发布卡片</span>
            </a>
            <a @click="toWriteVideo" class="upload-item">
              <i class="el-icon-video-camera"></i>
              <span>发布视频</span>
            </a>
            <router-link
              :to="{ path: '/community' }"
              class="upload-item upload-item-dynamic"
            >
              <i class="iconfont icon-dongtai1"></i>
              <span>发布动态</span>
            </router-link>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import LoginRegister from "@/components/loginRegister/index";
import EmailResetPassword from "@/components/resetPassword";

import { mapState } from "vuex";
// import { _debounce, _throttle } from "@/utils/debounce.js";

export default {
  name: "Header",
  components: {
    LoginRegister,
    EmailResetPassword,
  },
  data() {
    return {
      // activeIndex: "1",
      avatarVisi: false,
      isAvatarHover: false,
      isMessageHover: false,
      isDynamicHover: false,
      isUploadHover: false,
      isNavClick: false,
      timer: 0, //上次打开用户头像信息框的时间，用于防抖
      delayer: null, //打开用户头像信息框延时功能
      visible: false,
    };
  },
  async mounted() {
    window.addEventListener("click", this.otherClose);
    //  await this.$store.dispatch('user/getUserInfo');
  },
  beforeDestroy() {
    /* 组件销毁的时候要移除侦听器 */
    window.removeEventListener("click", this.otherClose);
  },
  methods: {
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    backHome() {
      this.$router.push({
        path: "/index",
      });
    },
    //生成id
    getRands(length = 5) {
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let rands = arr
        .sort(() => Math.random() - 0.5)
        .slice(0, length)
        .join("");
      return Number(rands);
    },
    focus() {},
    blur() {},
    otherClose(e) {
      if (!this.$refs.container.contains(e.target)) this.isNavClick = false;
    },
    loginRegister() {
      this.$store.state.global.loginRegVisible = true;
    },
    toWriteNotes() {
      if (this.isLogin) {
        let routeData = this.$router.resolve("/notes/creation");
        window.open(routeData.href, "_blank");
      } else {
        this.$message.error("请先登录！");
        this.$store.state.global.loginRegVisible = true;
      }
    },
    toWriteCard() {
      if (this.isLogin) {
        let routeData = this.$router.resolve(
          `/card/creation/${this.getRands(11)}`
        );
        window.open(routeData.href, "_blank");
      } else {
        this.$message.error("请先登录！");
        this.$store.state.global.loginRegVisible = true;
      }
    },
    toWriteVideo() {
      if (this.isLogin) {
        let routeData = this.$router.resolve("/video/creation");
        window.open(routeData.href, "_blank");
      } else {
        this.$message.error("请先登录！");
        this.$store.state.global.loginRegVisible = true;
      }
    },
    toUserCenter() {
      let routeData = this.$router.resolve(`/user/${this.userInfo.id}`);
      window.open(routeData.href, "_blank");
    },
    avatarMouseenter() {
      this.delayer = setTimeout(() => {
        const dt = Date.now();
        if (dt - this.timer > 800) {
          this.isAvatarHover = true; //大于1s调用函数
          this.timer = dt;
        }
      }, 120);
    },
    avatarMouseleave() {
      clearTimeout(this.delayer);
      this.avatarVisi = true;
      this.isAvatarHover = false;
    },
    messageMouseenter() {
      this.isMessageHover = true;
    },
    messageMouseleave() {
      this.isMessageHover = false;
    },
    dynamicMouseenter() {
      this.isDynamicHover = true;
    },
    dynamicMouseleave() {
      this.isDynamicHover = false;
    },
    uploadMouseenter() {
      this.isUploadHover = true;
    },
    uploadMouseleave() {
      this.isUploadHover = false;
    },
    userLogout() {
      this.$confirm("是否确定退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$store.dispatch("user/userLogout");
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消'
          // });
        });
    },
    toMessage() {
      this.$router.push({
        path: "/message",
      });
    },
    toDynamic() {
      this.$router.push({
        path: "/community",
      });
    },
  },
  computed: {
    ...mapState("user", [
      "isLogin",
      "userInfo",
      "message",
      "newMessage",
      "dynamciMsgNum",
    ]),
  },
};
</script>

<style lang="less">
.el-header {
  width: 100%;
  padding: 0 !important;
}

.main-header {
  // width: 1100px;
  width: 100%;
  height: 60px;
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-left-content {
  display: flex;
  justify-content: left;
  align-items: center;
  width: 62%;

  @media screen and (max-width: 970px) {
    .header-item-logo,
    .header-item-menu {
      display: none;
    }
    .self-nav-toogle {
      display: block;
    }
  }

  @media screen and (min-width: 970px) {
    .header-item-logo,
    .header-item-menu {
      display: block;
    }
    .self-nav-toogle {
      display: none !important;
    }
  }

  .self-nav-toogle {
    display: none;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px 0 4px;
    border: none;
    font-size: 16px;
    cursor: pointer;

    .site-nav-menu-wrapper {
      height: 32px;
      width: 32px;
      // display: none;
      justify-content: center;
      align-items: center;
      margin-right: 15px;

      #site-nav-menu {
        height: 32px;
        width: 32px;
        display: flex;
        justify-content: center;
        align-items: center;

        & > div {
          height: 2px;
          width: 20px;
          background: #585858;
          position: relative;
          border-radius: 4px;
        }

        & > div:before {
          top: -8px;
        }

        & > div:after {
          top: 7px;
        }

        & > div:after,
        & > div:before {
          content: " ";
          display: block;
          height: 2px;
          width: 20px;
          background: #585858;
          position: absolute;
          left: 0;
          border-radius: 4px;
        }
      }

      .dropdown-menu-container {
        position: absolute;
        transition: 0.3s;
        z-index: 1;
        top: 80%;

        .nav-popover-content {
          position: relative;
          background-color: #fff;
          box-shadow: 0 0 30px rgb(0 0 0 / 10%);
          border-radius: 8px;
          border: 1px solid #e3e5e7;
          color: #18191c;

          .nav-entry-popover {
            overflow: hidden;
            width: 142px;
            border-radius: 8px;

            .nav-inner-list {
              display: flex;
              flex-direction: column;
              padding: 12px 0;

              .nav-inner-list__item {
                position: relative;
                display: flex;
                align-items: center;
                padding: 10px 0 10px 27px;
                color: #61666d;
                text-align: left;
                font-size: 14px;
                transition: background-color 0.3s;

                &:hover {
                  background-color: #e3e5e7;
                }
              }

              .entrymMessage,
              .entrymDynamic,
              .entrymWriting {
                display: none;
              }

              @media screen and (max-width: 540px) {
                .entrymMessage {
                  display: block;
                }
              }
              @media screen and (max-width: 480px) {
                .entrymDynamic {
                  display: block;
                }
              }
              @media screen and (max-width: 424px) {
                .entrymWriting {
                  display: block;
                }
              }
            }
          }
        }
      }
    }

    .self-nav-toogle-logo {
      cursor: pointer;
      height: 28px;
      padding: 0 12px;

      img {
        height: 100%;
      }
    }
  }

  .header-item-logo {
    cursor: pointer;
    height: 40px;
    padding: 0 12px;
  }

  .header-item-menu {
    padding: 0 12px;
    width: 300px;

    .left-entry {
      display: flex;
      justify-content: space-evenly;

      .left-entry-li {
        margin-right: 20px;

        a {
          height: 60px;
          line-height: 60px;
          font-size: 15px;
          cursor: pointer;

          color: #18191c;
        }

        .le-li-active {
          color: @primary-color;
        }
      }
    }
  }

  .header-search {
    max-width: 380px;
    width: 50%;
    min-width: 220px;
    font-size: 18px;

    @media screen and(max-width: 720px) {
      .header-search-input {
        display: none;
      }

      .header-search-icon {
        display: block !important;
      }

      & {
        max-width: 0;
        width: 0;
        min-width: 30px;
      }
    }

    .header-search-input {
      width: 100%;

      .el-input__inner {
        border-radius: 15px;
      }
    }

    .header-search-icon {
      font-size: 18px;
      display: none;
      i {
        font-size: 18px;
        color: @general-text-color;
        font-weight: 600;
      }
    }
  }
}

.header-right-content {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 60px;

  .header-search,
  .header-item,
  .header-item-login {
    padding-left: 4px;
  }

  .header-item {
    .right-entry-outside {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      flex-shrink: 0;
      margin-right: 0;
      min-width: 50px;
      text-align: center;
      font-size: 13px;

      .badge-hint {
        position: absolute;
        right: 4px;
        top: -8px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        color: #fff;
        background-color: @danger-color;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
        transform: scale(0.9);
      }
      i {
        // margin-bottom: 2px;
        font-size: 18px;
        color: #18191c;
      }
      .right-entry-text {
        word-break: keep-all; /* 不换行 */
        white-space: nowrap;
        color: #61666d;
      }
    }
  }

  .avatar-container {
    position: relative;
    padding-right: 12px;

    .wrap-container {
      position: relative;
      z-index: 2;

      .header-entry-mini {
        position: absolute;
        // top: 22px;
        // left: 40px;
        z-index: 2;
        display: block;
        width: 38px;
        height: 38px;
        border-radius: 50%;

        .entry-mini-img {
          position: relative;
          display: inline-block;
          line-height: 1;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: transparent;
          border-radius: 50%;
          image-rendering: -webkit-optimize-contrast;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: inherit;
          border: 1px solid #ccc;
        }
      }

      .header-entry-mini-fadeIn {
        animation: fadeIn 1.4s both;
      }

      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      .header-entry-mini-fadeOut {
        animation: fadeOut 0.2s both;
      }

      @keyframes fadeOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      .header-entry-avatar {
        // display: none;
        display: block;
        // width: 82px;
        // height:82px;
        width: 38px;
        height: 38px;

        .lynx-avatar {
          width: 100%;
          height: 100%;
          // transform: scale(.4);
          position: relative;
          // box-sizing: content-box;
          border: 1px solid #fff;
          border-radius: 50%;
          // margin: 0;
          // padding: 0;

          .lynx-avatar-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: translateZ(0);
            will-change: transform;
            border-radius: 50%;
            border: none;
            display: block;
            -o-object-fit: cover;
            object-fit: cover;
            image-rendering: -webkit-optimize-contrast;
            border: 1px solid #ccc;
          }
        }
      }

      .header-entry-avatarFadeSmall {
        animation: avatarFadeSmall 0.4s both;
      }

      @keyframes avatarFadeSmall {
        0% {
          transform: scale(2) translate(-5px, 16px);
        }
        60% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          // transform: scale(.4) translateY(-2px) translate(3px);
        }
      }

      .header-entry-avatarbloomSmall {
        animation: avatarbloomSmall 0.4s both;
      }

      @keyframes avatarbloomSmall {
        0% {
          // opacity: 0;
          // transform: scale(.4) translateY(-2px) translate(3px);
          // transform: scale(.4);
        }
        60% {
          opacity: 1;
        }
        100% {
          transform: scale(2) translate(-5px, 16px);
          // transform: scale(2)
        }
      }

      .header-login-entry {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        color: #fff;
        background: @primary-color;
        text-align: center;
        letter-spacing: 0;
        font-size: 14px;
        line-height: 36px;
      }
    }

    .header-avatar {
      // width: 55px;
      // height: 100%;
      height: 32px;
      position: absolute;
      // line-height: 54px;
      // text-align: center;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: translate(-48%, 14px);

      .avatar-panel-popover {
        .floatCard-avatar {
          height: 60px;
          width: 60px;
          float: left;
          border-radius: 50%;
          z-index: 999;
        }

        .avatar-panel {
          width: 100%;
          background-color: #fff;
          // box-shadow: 0 2px 5px rgba(24, 31, 36, 14);
          padding: 0 0 15px 0;
          position: relative;
          box-shadow: 0 0 30px rgb(0 0 0 / 10%);
          border-radius: 8px;
          border: 1px solid #e3e5e7;
          color: #18191c;

          .avatar-panel-ul {
            padding: 0 20px 6px;
            width: 300px;
            border-radius: 8px;
            background-color: #fff;

            .big-avatar {
              display: block;
              margin-bottom: 4px;
              width: 80px;
              height: 76px;
              opacity: 0;
            }

            .nickname-item {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: -34px;
              margin-bottom: 2px;
              font-size: 18px;
              font-weight: 500;

              .avatar-panel-gender {
                width: 17px;
                height: 17px;
                border-radius: 50%;
                color: #fff;
                text-align: center;
                line-height: 17px;
                font-size: 12px;
                margin: 0 5px;
                background-color: #4281ff;
                i {
                  font-size: 12px;
                }
              }
            }

            .coins-item {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 6px;
              font-size: 12px;
              color: #18191c;

              a {
                .coin-item__text {
                  display: inline-block;
                  margin-right: 5px;
                  color: #9499a0;
                }

                .coin-item__num {
                  display: inline-block;
                  margin-right: 10px;
                  color: #18191c;
                }
              }

              .coin-animation {
                position: absolute;
                bottom: -10px;
                left: 90px;
                width: 50px;
                height: 105px;
              }
            }

            .level-item {
              margin-right: 10px;
              margin-bottom: 10px;
              width: 250px;
              cursor: pointer;

              .level-item-bar {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 6px;

                .level-item-bar-tag {
                  display: flex;
                  align-items: center;
                  width: 32px;
                  height: 16px;
                  text-align: center;

                  i {
                    position: relative;
                    top: -6px;
                    width: 100%;
                    height: 100%;
                    font-size: 28px;
                    font-weight: 500;
                  }
                }

                .level-progress {
                  position: relative;
                  margin: 4px 6px;
                  width: 240px;
                  height: 2px;
                  background-color: #e3e5e7;

                  .level-progress-inner {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 80%;
                    height: 2px;
                    border-radius: 2px;
                    background: #f3cb85;
                  }
                }
              }

              .level-item-text {
                color: #c9ccd0;
                font-size: 12px;
              }
            }

            .counts-item {
              display: flex;
              justify-content: space-between;
              margin-bottom: 12px;
              padding: 0 20px;

              .single-count-item {
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: space-between;
                transition: color 0.2s;

                &:hover .count-num,
                &:hover .count-text {
                  color: @primary-color;
                }

                .count-num {
                  color: #18191c;
                  font-size: 18px;
                  transition: color 0.2s;
                }

                .count-text {
                  color: #9499a0;
                  font-weight: 400;
                  font-size: 12px;
                  transition: color 0.2s;
                }
              }
            }

            .link-item {
              .single-link-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 14px;
                height: 38px;
                border-radius: 8px;
                color: #61666d;
                font-size: 14px;
                cursor: pointer;
                transition: background-color 0.3s;
                white-space: nowrap;

                &:hover {
                  background-color: #e3e5e7;
                }

                .link-title {
                  display: flex;
                  align-items: center;

                  i {
                    margin-right: 16px;
                    font-size: 18px;
                  }
                  span {
                  }
                }

                i {
                  font-size: 16px;
                }
              }
            }

            .split-line {
              margin: 10px 0;
              width: 100%;
              height: 1px;
              background: #e3e5e7;
            }

            .logout-item {
              display: flex;
              align-items: center;
              padding: 10px 14px;
              border-radius: 8px;
              color: #61666d;
              font-size: 14px;
              cursor: pointer;
              transition: background-color 0.3s;

              &:hover {
                background-color: #e3e5e7;
              }

              i {
                margin-right: 16px;
                font-size: 18px;
              }

              span {
              }
            }
          }
        }
      }
    }
  }

  .badge-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-shrink: 0;
    margin-right: 0;
    min-width: 50px;
    text-align: center;
    font-size: 13px;

    i {
      font-weight: 600;
    }

    @media screen and (max-width: 540px) {
      display: none;
    }

    .badge-popover {
      position: absolute;
      transition: 0.3s;
      z-index: 1;
      top: 80%;

      .badge-popover-content {
        position: relative;
        background-color: #fff;
        box-shadow: 0 0 30px rgb(0 0 0 / 10%);
        border-radius: 8px;
        border: 1px solid #e3e5e7;
        color: #18191c;

        .message-entry-popover {
          overflow: hidden;
          width: 122px;
          border-radius: 8px;

          .message-inner-list {
            display: flex;
            flex-direction: column;
            padding: 12px 0;

            .message-inner-list__item {
              position: relative;
              display: flex;
              align-items: center;
              padding: 10px 0 10px 27px;
              color: #61666d;
              text-align: left;
              font-size: 14px;
              transition: background-color 0.3s;

              &:hover {
                background-color: #e3e5e7;
              }

              .badge-hint {
                position: absolute;
                right: 20px;
                top: 8px;
                width: 20px;
                height: 20px;
                // margin-left: 20px;
                border-radius: 50%;
                color: #fff;
                background-color: @danger-color;
                text-align: center;
                line-height: 20px;
                font-size: 12px;
                transform: scale(0.9);
              }
            }
          }
        }
      }
    }
  }

  .dynamic-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-shrink: 0;
    margin-right: 0;
    min-width: 50px;
    text-align: center;
    font-size: 13px;
    .right-entry-outside {
      i {
        font-weight: 600;
        font-size: 19px;
      }
    }
    @media screen and (max-width: 448px) {
      display: none;
    }

    .dynamic-popover {
      position: absolute;
      transition: 0.3s;
      z-index: 1;
      top: 80%;

      .dynamic-popover-content {
        position: relative;
        background-color: #fff;
        box-shadow: 0 0 30px rgb(0 0 0 / 10%);
        border-radius: 8px;
        border: 1px solid #e3e5e7;
        color: #18191c;

        .dynamic-entry-popover {
          overflow: hidden;
          width: 88px;
          border-radius: 8px;

          .dynamic-inner-list {
            display: flex;
            flex-direction: column;
            padding: 12px 0;

            .dynamic-inner-list__item {
              position: relative;
              display: flex;
              align-items: center;
              padding: 10px 0 10px 27px;
              color: #61666d;
              text-align: left;
              font-size: 14px;
              transition: background-color 0.3s;

              &:hover {
                background-color: #e3e5e7;
              }
            }
          }
        }
      }
    }
  }

  .writing-container {
    margin: 0 8px 0 4px;
    @media screen and (max-width: 424px) {
      display: none;
    }
    .right-entry-outside {
      i {
        font-size: 21px;
        // font-weight: 600;
      }
    }
  }

  .contribute-container {
    position: relative;
    padding-left: 12px;

    .options {
      font-size: 18px;

      &:hover {
        opacity: 0.7;
      }

      .releaseBtn {
        width: 90px;
        height: 34px;
        background-color: @primary-color;
        line-height: 34px;
        text-align: center;
        border-radius: 6px;
        color: #fff;

        @media screen and (max-width: 360px) {
          width: 40px;

          span {
            display: none;
          }
        }

        i {
          font-size: 16px;
          margin-right: 5px;
        }

        span {
          font-size: 14px;
        }
      }
    }

    .contribute-popover-wrapper {
      position: absolute;
      top: 51px;
      right: 0;
      display: flex;
      padding: 8px 10px;
      background-color: #fff;
      box-shadow: 0 0 30px rgb(0 0 0 / 10%);
      border-radius: 8px;
      border: 1px solid #e3e5e7;

      .upload-item {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: 62px;
        height: 63px;
        border-radius: 8px;
        text-align: center;
        text-decoration: none;
        // line-height: 63px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #e3e5e7;
        }

        i {
          color: #61666d;
          font-size: 26px;
          margin-bottom: 6px;
        }

        span {
          color: #61666d;
          font-size: 12px;
          line-height: 17px;
        }
      }

      .upload-item-dynamic {
        i {
          font-size: 29px;
        }
      }
    }
  }

  .languages {
    padding-left: 6px;
    box-sizing: content-box;

    .options {
      // font-size: 18px;

      div {
        height: 40px;
      }
    }
  }

  .header-item {
    cursor: pointer;
    color: #71777c;
  }

  .header-item-login {
    cursor: auto;
    color: #71777c;

    .options:hover {
      opacity: 0.7;
    }
  }
}

.header-message-box {
  .ant-tabs-nav-container {
    padding: 0 16px;
  }
}

// 移动端
// @media screen and (max-width: 900px) {
//   .header-message-box {
//     left: 0 !important;
//     position: relative;
//     display: flex;
//     justify-content: center;
//   }

//   .header-left-content {
//     .phone-frontPage {
//       padding: 0 8px;
//     }
//   }

//   .header-right-content {
//     .header-search,
//     .header-item,
//     .header-item-login {
//       padding: 0 8px;
//     }
//   }
// }

.ant-tabs-nav .ant-tabs-tab {
  margin: 0;
}

.header-theme-color-config {
  .ant-dropdown-menu {
    margin-top: -2px;
    padding: 12px;

    .color-options {
      display: flex;
      justify-content: space-around;

      div {
        width: 20px;
        height: 20px;
        margin: 0 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.avatar-menu-icon {
  font-size: 16px !important;
}

.el-menu.el-menu--horizontal {
  border: none !important;
}

.el-menu-item {
  width: none !important;
}

.contribute-popover {
  top: 51px !important;
  border-radius: 8px;
  box-shadow: 0 0 30px rgb(0 0 0 / 10%);
  border: 1px solid #e3e5e7;
  position: absolute;
  // top: 47px!important;
}
</style>