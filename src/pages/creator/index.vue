<template>
  <el-container id="creator">
    <el-header>
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
                        <a class="nav-inner-list__item">首页 </a>
                        <a class="nav-inner-list__item">笔记 </a>
                        <a class="nav-inner-list__item">视频 </a>
                        <a class="nav-inner-list__item">问答 </a>
                        <a class="nav-inner-list__item entrymMessage">消息 </a>
                        <a class="nav-inner-list__item entrymDynamic">动态 </a>
                        <a class="nav-inner-list__item entrymWriting"
                          >创作中心
                        </a>
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
          <div class="header-item-logo">
            <img
              src="../../assets/logo_creator.png"
              alt="lynx"
              style="height: 100%"
            />
          </div>
        </div>
        <div class="header-right-content">
          <!-- 头像 -->
          <div class="header-item avatar-container">
            <a class="header-entry-mini" @click="toUserCenter">
              <img class="entry-mini-img" :src="userInfo.avatar" />
            </a>
          </div>

          <!-- 消息 -->
          <div
            class="header-item badge-container"
            @mouseenter="messageMouseenter"
            @mouseleave="messageMouseleave"
          >
            <a class="right-entry-outside" @click="toMessage">
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
                      </router-link>
                      <router-link
                        to="/message/like"
                        class="message-inner-list__item"
                        >点赞
                      </router-link>
                      <router-link
                        to="/message/follow"
                        class="message-inner-list__item"
                        >关注
                      </router-link>
                      <router-link
                        to="/message/chat"
                        class="message-inner-list__item"
                        >私信
                      </router-link>
                      <router-link
                        to="/message/system"
                        class="message-inner-list__item"
                        >系统消息
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- 返回首页 -->
          <div class="header-item backHome-container" @click="backHome">
            <a class="right-entry-outside">
              <i class="iconfont icon-home"></i>
              <span class="right-entry-text">首页</span>
            </a>
          </div>
        </div>
      </div>
    </el-header>
    <el-main class="creator-main">
      <el-container>
        <el-aside width="240px" class="creator-left">
          <div class="sidebar">
            <div class="nav-upload">
              <!-- <router-link target="_blank" :to="{ path: '/notes/creation' }">
                <i class="el-icon-edit"></i>
                创作
              </router-link> -->
              <div class="write-navTop">
                <div class="write-navTop-item" @click="toNoteCreation">
                  <div class="item-navIcon">
                    <i class="el-icon-collection"></i>
                  </div>
                  <div class="item-navTitle">写笔记</div>
                </div>
                <div class="write-navTop-item" @click="toCardCreation">
                  <div class="item-navIcon">
                    <i class="el-icon-files"></i>
                  </div>
                  <div class="item-navTitle">作卡片</div>
                </div>
                <div class="write-navTop-item" @click="toVideoUpload">
                  <div class="item-navIcon">
                    <i class="el-icon-video-camera"></i>
                  </div>
                  <div class="item-navTitle">发视频</div>
                </div>
                <div
                  class="write-navTop-item write-dynamic"
                  @click="toDynamicUpload"
                >
                  <div class="item-navIcon">
                    <i class="iconfont icon-dongtai1"></i>
                  </div>
                  <div class="item-navTitle">发动态</div>
                </div>
              </div>
            </div>
            <div class="nav-wrp">
              <el-menu
                class="el-menu-vertical"
                @open="handleOpen"
                @close="handleClose"
                :router="true"
                :default-active="activeIndex"
              >
                <el-menu-item index="/creator/home" class="el-menu">
                  <i class="iconfont icon-home"></i>
                  <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="/creator/content">
                  <template slot="title">
                    <i class="el-icon-edit"></i>
                    <span>内容管理</span>
                  </template>
                  <el-menu-item index="/creator/content/notes"
                    >笔记管理</el-menu-item
                  >
                  <el-menu-item index="/creator/content/card"
                    >卡片管理</el-menu-item
                  >
                  <el-menu-item index="/creator/content/video"
                    >视频管理</el-menu-item
                  >
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-pie-chart"></i>
                    <span>数据中心</span>
                  </template>
                  <el-menu-item index="3-1">内容数据</el-menu-item>
                  <el-menu-item index="3-2">关注者数据</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-document-copy"></i>
                    <span>创作成长</span>
                  </template>
                  <el-menu-item index="4-1">创作等级权益</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-coordinate"></i>
                    <span>活动中心</span>
                  </template>
                  <el-menu-item index="5-1">创作活动</el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                  <template slot="title">
                    <i class="el-icon-stopwatch"></i>
                    <span>帮助中心</span>
                  </template>
                  <el-menu-item index="6-1">常见问题</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </div>
        </el-aside>
        <el-main class="creator-right">
          <div class="right-wrap">
            <router-view></router-view>
          </div>
        </el-main>
        <SideToolbar />
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/header/index";
import SideToolbar from "@/components/sideToolbar/index";
import { mapState } from "vuex";

export default {
  name: "Creator",
  components: {
    Header,
    SideToolbar,
  },
  data() {
    return {
      avatarVisi: false,
      isMessageHover: false,
      isNavClick: false,
    };
  },
  mounted() {
    window.addEventListener("click", this.otherClose);
  },
  beforeDestroy() {
    /* 组件销毁的时候要移除侦听器 */
    window.removeEventListener("click", this.otherClose);
  },
  methods: {
    //生成id
    getRands(length = 5) {
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let rands = arr
        .sort(() => Math.random() - 0.5)
        .slice(0, length)
        .join("");
      return Number(rands);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    otherClose(e) {
      if (!this.$refs.container.contains(e.target)) this.isNavClick = false;
    },
    toUserCenter() {
      let routeData = this.$router.resolve(`/user/${this.userInfo.id}`);
      window.open(routeData.href, "_blank");
    },
    toNoteCreation() {
      let routeData = this.$router.resolve(`/notes/creation`);
      window.open(routeData.href, "_blank");
    },
    toCardCreation() {
      let routeData = this.$router.resolve(
        `/card/creation/${this.getRands(11)}`
      );
      window.open(routeData.href, "_blank");
    },
    toVideoUpload() {
      let routeData = this.$router.resolve(`/video/creation`);
      window.open(routeData.href, "_blank");
    },
    toDynamicUpload() {
      this.$router.push(`/community`);
    },
    backHome() {
      this.$router.push(`/index`);
    },
    messageMouseenter() {
      this.isMessageHover = true;
    },
    messageMouseleave() {
      this.isMessageHover = false;
    },
    toMessage() {
      this.$router.push({
        path: "/message",
      });
    },
  },
  computed: {
    ...mapState("user", ["isLogin", "userInfo"]),
    activeIndex() {
      return this.$route.matched[1].path;
    },
  },
};
</script>

<style lang="less">
.main-header {
  // width: 1100px;
  width: 100%;
  height: 60px;
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 20px;

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
              width: 122px;
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
        display: flex;
        align-items: center;
        flex-direction: column;
        flex-shrink: 0;
        margin-right: 0;
        min-width: 50px;
        text-align: center;
        font-size: 13px;
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

      .header-entry-mini {
        display: block;
        width: 38px;
        height: 38px;

        .entry-mini-img {
          width: 100%;
          height: 100%;
          border-radius: 100%;
          border: 1px solid #ccc;
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
              }
            }
          }
        }
      }
    }

    .backHome-container {
      .right-entry-outside {
        i {
          font-weight: 600;
        }

        span {
          margin-top: 3px;
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
}

.creator-main {
  width: 1300px;

  .sidebar {
    width: 240px;
    overflow: hidden;
    background: #fff;
    border-radius: 6px 6px 0 0;
    .nav-upload {
      width: 210px;
      margin: 10px auto;
      border-radius: 6px 6px 0 0;
      & > a {
        display: block;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        background: @primary-color;
        cursor: pointer;
        border-radius: 2px;

        i {
          margin-right: 8px;
          font-size: 18px;
        }
      }

      .write-navTop {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        position: relative;
        padding: 8px 0;

        .write-navTop-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50px;
          padding-bottom: 10px;
          border-radius: 6px;
          transition: all 0.2s;
          cursor: pointer;
          margin-right: 5px;

          .item-navIcon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-bottom: 6px;

            i {
              font-size: 20px;
            }
          }

          &:nth-child(1) {
            background-color: rgba(66, 129, 255, 0.2);

            &:hover {
              background-color: rgba(66, 129, 255, 0.4);
            }
            .item-navIcon {
              i {
                color: @primary-color;
              }
            }
          }

          &:nth-child(2) {
            background-color: rgba(103, 194, 58, 0.2);
            &:hover {
              background-color: rgba(103, 194, 58, 0.4);
            }
            .item-navIcon {
              i {
                color: @success-color;
              }
            }
          }

          &:nth-child(3) {
            background-color: rgba(230, 162, 60, 0.2);

            &:hover {
              background-color: rgba(230, 162, 60, 0.4);
            }
            .item-navIcon {
              i {
                color: @warning-color;
              }
            }
          }

          &:nth-child(4) {
            margin-right: 0;
            background-color: rgba(245, 108, 108, 0.2);
            &:hover {
              background-color: rgba(245, 108, 108, 0.4);
            }
            .item-navIcon {
              i {
                color: @danger-color;
              }
            }
          }

          .item-navTitle {
            white-space: nowrap;
            color: #444;
            font-size: 12px;
            line-height: 1;
            text-align: center;
          }
        }

        .write-dynamic {
          .item-navIcon {
            i {
              font-size: 26px;
            }
          }
        }
      }
    }

    .nav-wrp {
      // position: fixed;
      width: 240px;
      height: calc(100vh - 184px);
      top: 160px;
      bottom: 0;
      z-index: 2;
      overflow: hidden;
      overflow: auto;
      margin-bottom: 24px;

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background: #fff;
      }

      &::-webkit-scrollbar-thumb {
        background: #fff;
        border-radius: 4px;
      }

      &:hover::-webkit-scrollbar-thumb {
        background: hsla(0, 0%, 52.9%, 0.4);
      }

      .el-menu {
        border-right: none;
        border-radius: 0 0 6px 6px;
        .el-menu-item {
          i {
            vertical-align: middle;
            margin-right: 5px;
            margin-left: 3px;
            width: 24px;
            text-align: center;
            font-size: 20px;
          }
        }
        .el-menu-item.is-active {
          color: @primary-color;
          background-color: rgb(236, 242, 255);
        }
      }
    }
  }

  .creator-right {
    padding: 0;

    .right-wrap {
      margin-left: 24px;
      background-color: #fff;
      border-radius: 6px;
    }
  }
}
</style>