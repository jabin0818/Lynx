<template>
  <el-container id="notes-tag">
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <el-row class="detailTag-title">
        <el-col :span="24" class="detailTag-titleInfo">
          <div id="titleInfo-box">
            <!-- <div class="tag-info">
              <div class="title">MongoDB</div>
              <div class="tag-meta">89964 关注，2051 笔记</div>
            </div> -->
            <div class="tag-info-top">
              <div class="tap-title">
                <img src="../../../assets/img/tag/github.png" alt="github" />
                <h2>{{ tagInfo.tagName }}</h2>
              </div>
              <div class="tap-nums">
                <span>{{ tagInfo.userNum }} 关注</span>
                <span>{{ tagInfo.blogNum }} 笔记</span>
                <span>{{ tagInfo.blogNum }} 卡片</span>
                <span>{{ tagInfo.blogNum }} 视频</span>
              </div>
              <div
                :class="
                  tagInfo.isSelect === '1'
                    ? 'tap-follow subscribed'
                    : 'tap-follow'
                "
                @click="tagInfo.isSelect === '1' ? '' : followTag()"
              >
                <i class="el-icon-plus" v-show="tagInfo.isSelect !== '1'"></i>
                <span>{{ tagInfo.isSelect === "1" ? "已关注" : "关注" }}</span>
              </div>
            </div>
            <div class="tag-decs">标签简介</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="detailTag-body">
        <el-col :span="24" class="detailTag-navList">
          <div class="navList" v-if="data.length">
            <div class="navList-left">
              <!-- <div class="navList-btn subscribed">
                <span>已关注</span>
              </div> -->
              <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                  {{ classify }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-notebook-1" command="note"
                    >笔记</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-postcard" command="card"
                    >卡片</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-postcard" command="video"
                    >视频</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="navList-right">
              <div
                ref="hottestBtn"
                class="btn hot btn-outline"
                @click="showHottest"
              >
                最热
              </div>
              <div ref="newestBtn" class="btn new" @click="showNewest">
                最新
              </div>
            </div>
          </div>
          <el-empty v-else description="无数据"></el-empty>
        </el-col>
        <el-col :span="24" class="">
          <div class="entryList">
            <!-- 看backup.vue -->
            <!-- <ul class="detailTag-List">
            </ul> -->
            <ul class="detailTag-list">
              <li class="detailTag-item">
                <div class="detailTag-item-left">
                  <img src="../../../assets/img/boutique/english.jpg" alt="" />
                  <div class="mask">
                    <span class="duration">16:43</span>
                  </div>
                  <div class="type-tag">
                    <span class="type-text">视频</span>
                  </div>
                </div>
                <div class="detailTag-item-right">
                  <div class="detailTag-item-right-title">
                    <span>
                      【暗中观察06】抄袭三年只赔2000块？爱情公寓5还敢继续拍？中国抄袭简史：永无止境的撕逼大战和大获成功的抄袭者们-IC实验室出品
                    </span>
                  </div>
                  <div class="detailTag-item-right-intro">
                    <span
                      >这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本</span
                    >
                  </div>
                  <div class="detailTag-item-right-playinfo">
                    <span class="amount amount-play">
                      <i class="el-icon-video-play"></i>
                      <!-- <i class="iconfont icon-good"></i> -->
                      <span class="text">123</span>
                    </span>
                    <span class="amount amount-comment">
                      <i class="el-icon-chat-line-round"></i>
                      <!-- <i class="el-icon-star-off"></i> -->
                      <span class="text">231</span>
                    </span>
                  </div>
                </div>
              </li>
              <li class="detailTag-item">
                <div class="detailTag-item-left">
                  <img src="../../../assets/img/boutique/english.jpg" alt="" />
                  <div class="mask">
                    <span class="duration">16:43</span>
                  </div>
                  <div class="type-tag">
                    <span class="type-text">视频</span>
                  </div>
                </div>
                <div class="detailTag-item-right">
                  <div class="detailTag-item-right-title">
                    <span>
                      【暗中观察06】抄袭三年只赔2000块？爱情公寓5还敢继续拍？中国抄袭简史：永无止境的撕逼大战和大获成功的抄袭者们-IC实验室出品
                    </span>
                  </div>
                  <div class="detailTag-item-right-intro">
                    <span
                      >这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本</span
                    >
                  </div>
                  <div class="detailTag-item-right-playinfo">
                    <span class="amount amount-play">
                      <i class="el-icon-video-play"></i>
                      <!-- <i class="iconfont icon-good"></i> -->
                      <span class="text">123</span>
                    </span>
                    <span class="amount amount-comment">
                      <i class="el-icon-chat-line-round"></i>
                      <!-- <i class="el-icon-star-off"></i> -->
                      <span class="text">231</span>
                    </span>
                  </div>
                </div>
              </li>
              <li class="detailTag-item">
                <div class="detailTag-item-left">
                  <img src="../../../assets/img/boutique/english.jpg" alt="" />
                  <div class="mask">
                    <span class="duration">16:43</span>
                  </div>
                  <div class="type-tag">
                    <span class="type-text">视频</span>
                  </div>
                </div>
                <div class="detailTag-item-right">
                  <div class="detailTag-item-right-title">
                    <span>
                      【暗中观察06】抄袭三年只赔2000块？爱情公寓5还敢继续拍？中国抄袭简史：永无止境的撕逼大战和大获成功的抄袭者们-IC实验室出品
                    </span>
                  </div>
                  <div class="detailTag-item-right-intro">
                    <span
                      >这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本</span
                    >
                  </div>
                  <div class="detailTag-item-right-playinfo">
                    <span class="amount amount-play">
                      <i class="el-icon-video-play"></i>
                      <!-- <i class="iconfont icon-good"></i> -->
                      <span class="text">123</span>
                    </span>
                    <span class="amount amount-comment">
                      <i class="el-icon-chat-line-round"></i>
                      <!-- <i class="el-icon-star-off"></i> -->
                      <span class="text">231</span>
                    </span>
                  </div>
                </div>
              </li>
              <li class="detailTag-item">
                <div class="detailTag-item-left">
                  <img src="../../../assets/img/boutique/english.jpg" alt="" />
                  <div class="mask">
                    <span class="duration">16:43</span>
                  </div>
                  <div class="type-tag">
                    <span class="type-text">视频</span>
                  </div>
                </div>
                <div class="detailTag-item-right">
                  <div class="detailTag-item-right-title">
                    <span>
                      【暗中观察06】抄袭三年只赔2000块？爱情公寓5还敢继续拍？中国抄袭简史：永无止境的撕逼大战和大获成功的抄袭者们-IC实验室出品
                    </span>
                  </div>
                  <div class="detailTag-item-right-intro">
                    <span
                      >这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本</span
                    >
                  </div>
                  <div class="detailTag-item-right-playinfo">
                    <span class="amount amount-play">
                      <i class="el-icon-video-play"></i>
                      <!-- <i class="iconfont icon-good"></i> -->
                      <span class="text">123</span>
                    </span>
                    <span class="amount amount-comment">
                      <i class="el-icon-chat-line-round"></i>
                      <!-- <i class="el-icon-star-off"></i> -->
                      <span class="text">231</span>
                    </span>
                  </div>
                </div>
              </li>
              <li class="detailTag-item">
                <div class="detailTag-item-left">
                  <img src="../../../assets/img/boutique/english.jpg" alt="" />
                  <div class="mask">
                    <span class="duration">16:43</span>
                  </div>
                  <div class="type-tag">
                    <span class="type-text">视频</span>
                  </div>
                </div>
                <div class="detailTag-item-right">
                  <div class="detailTag-item-right-title">
                    <span>
                      【暗中观察06】抄袭三年只赔2000块？爱情公寓5还敢继续拍？中国抄袭简史：永无止境的撕逼大战和大获成功的抄袭者们-IC实验室出品
                    </span>
                  </div>
                  <div class="detailTag-item-right-intro">
                    <span
                      >这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本</span
                    >
                  </div>
                  <div class="detailTag-item-right-playinfo">
                    <span class="amount amount-play">
                      <i class="el-icon-video-play"></i>
                      <!-- <i class="iconfont icon-good"></i> -->
                      <span class="text">123</span>
                    </span>
                    <span class="amount amount-comment">
                      <i class="el-icon-chat-line-round"></i>
                      <!-- <i class="el-icon-star-off"></i> -->
                      <span class="text">231</span>
                    </span>
                  </div>
                </div>
              </li>
              <li class="detailTag-item">
                <div class="detailTag-item-left">
                  <img src="../../../assets/img/boutique/english.jpg" alt="" />
                  <div class="mask">
                    <span class="duration">16:43</span>
                  </div>
                  <div class="type-tag">
                    <span class="type-text">视频</span>
                  </div>
                </div>
                <div class="detailTag-item-right">
                  <div class="detailTag-item-right-title">
                    <span>
                      【暗中观察06】抄袭三年只赔2000块？爱情公寓5还敢继续拍？中国抄袭简史：永无止境的撕逼大战和大获成功的抄袭者们-IC实验室出品
                    </span>
                  </div>
                  <div class="detailTag-item-right-intro">
                    <span
                      >这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本</span
                    >
                  </div>
                  <div class="detailTag-item-right-playinfo">
                    <span class="amount amount-play">
                      <i class="el-icon-video-play"></i>
                      <!-- <i class="iconfont icon-good"></i> -->
                      <span class="text">123</span>
                    </span>
                    <span class="amount amount-comment">
                      <i class="el-icon-chat-line-round"></i>
                      <!-- <i class="el-icon-star-off"></i> -->
                      <span class="text">231</span>
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import Header from "@/components/header/index";
import SideToolbar from "@/components/sideToolbar/index";
import { getBlogsByTag, insertTags } from "@/api/tag";
import { mapState } from "vuex";

export default {
  name: "detailTag",
  components: {
    Header,
    SideToolbar,
  },
  data() {
    return {
      classify: "笔记",
      data: [],
      tagInfo: {},
      classifyView: {
        note: "笔记",
        card: "卡片",
        video: "视频",
      },
    };
  },
  async mounted() {
    this.tagInfo = this.$route.params;

    let type = this.$route.query.type;
    this.classify = this.classifyView[type];
    await this.getData();
    console.log("隐式参数", this.$route.params);
  },
  methods: {
    showHottest() {
      this.$router.push({
        query: { ...this.$route.query, sort: "hottest" },
      });
    },
    showNewest() {
      this.$router.push({
        query: { ...this.$route.query, sort: "newest" },
      });
    },
    toNotesDetail(blogId, userId) {
      let routeData = this.$router.resolve({
        path: "/notes/detail/" + blogId,
        query: {
          userId: userId,
        },
      });
      window.open(routeData.href, "_blank");
    },
    handleCommand(command) {
      this.$router.push({
        query: { ...this.$route.query, type: command },
      });
      this.classify = this.classifyView[command];
    },
    tagName(index) {
      if (this.data) {
        if (this.data[index]?.tagName) {
          return this.data[index].tagName.split("-");
        }
      }
    },
    async getData() {
      try {
        console.log(this.$route.params);
        let tagId = this.$route.params.tagId;
        console.log(tagId);
        if (tagId) {
          let res = await getBlogsByTag(tagId);
          if (res.code === 200) {
            this.data = res.data;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async followTag() {
      if (this.isLogin) {
        let res = await insertTags(this.userInfo.id, this.tagInfo.tagId);
        if (res.code === 200) {
          this.tagInfo.isSelect = "1";
          this.$message.success("关注成功！");
        } else {
          this.$message.error("关注失败！");
        }
      } else {
        this.$message.error("未登录！");
        console.log("没登录");
      }
    },
  },
  computed: {
    ...mapState("user", ["token", "isLogin", "userInfo"]),
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.query.sort === "hottest") {
          this.$nextTick(() => {
            this.$refs.newestBtn.classList.remove("btn-outline");
            this.$refs.hottestBtn.classList.add("btn-outline");
          });
        } else if (to.query.sort === "newest") {
          this.$nextTick(() => {
            this.$refs.hottestBtn.classList.remove("btn-outline");
            this.$refs.newestBtn.classList.add("btn-outline");
          });
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less">
#notes-tag {
  .el-main {
    width: 1100px;
    overflow: hidden !important;
    padding: 20px 20px;
    background-color: #fff;

    @media screen and (max-width: 1140px) {
      width: 100%;
    }
  }
}

#titleInfo-box {
  height: 150px;
  background: #f6f6f6;
  border-radius: 4px;
  padding: 30px;
  box-sizing: border-box;
  margin-bottom: 18px;

  .tag-info-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;
    margin-bottom: 22px;

    .tap-title {
      display: flex;
      align-items: center;

      img {
        width: 22px;
        height: 22px;
        box-shadow: 0 2px 3px 0 rgb(240 37 15 / 10%);
        border-radius: 10px 10px 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-style: inherit;
        color: #fff;
      }

      h2 {
        padding-left: 9px;
        font-size: 26px;
        font-weight: 600;
        color: #333;
      }
    }

    .tap-nums {
      flex: 1;
      font-size: 14px;
      font-weight: 400;
      color: #999;
      line-height: 20px;
      padding-left: 26px;
      span {
        margin-right: 20px;
      }
    }

    .tap-follow {
      // width: 84px;
      // height: 34px;
      padding: 8px 12px;
      // line-height: 34px;
      border: 1px solid @primary-color;
      background-color: transparent;
      box-shadow: 0 2px 3px 0 rgb(240 37 15 / 10%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 500;
      color: @primary-color;
      cursor: pointer;
      transition: all 0.2s;
      border-radius: 4px;
      &:hover {
        background-color: @primary-color;
        color: #fff;
      }
      i {
        font-size: 14px;
        margin-right: 3px;
        transform-origin: center center;
      }
      span {
      }
    }

    .subscribed {
      background-color: @primary-color;
      color: #fff;
    }
  }

  .tag-decs {
    font-size: 15px;
    font-weight: 400;
    color: #444;
    line-height: 24px;
  }

  // border-bottom: 1px solid #f1f1f1;

  // .tag-info {
  //   text-align: center;
  //   color: #666;
  //   padding: 48px 0;
  //   box-sizing: border-box;

  //   .title {
  //     font-size: 25px;
  //     line-height: 30px;
  //     font-weight: 700;
  //     margin-bottom: 4px;
  //   }

  //   .tag-meta {
  //     font-size: 12px;
  //     text-align: center;
  //     color: #666;
  //   }
  // }
}

.navList {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
  padding-bottom: 10px;

  .navList-left {
    display: flex;
    align-items: center;

    img {
      height: 24px;
      margin-right: 24px;
    }

    .el-dropdown-link {
      cursor: pointer;
      color: #000;
      font-size: 18px;
      margin: 12px auto;

      &:hover {
        color: @primary-color;
      }
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    .demonstration {
      display: block;
      color: #8492a6;
      font-size: 14px;
      margin-bottom: 20px;
    }

    // .navList-btn {
    //   border: 1px solid @primary-color;
    //   background-color: #fff;
    //   color: @primary-color;
    //   margin: 12px auto;
    //   font-size: 14px;
    //   padding: 6px 16px;
    //   outline: none;
    //   transition: background-color 0.3s, color 0.3s;
    //   cursor: pointer;
    // }

    // .subscribed {
    //   background-color: @primary-color;
    //   color: #fff;
    // }
  }

  .navList-right {
    display: flex;
    align-items: center;
    text-align: center;

    .btn {
      padding: 6px 12px;
      font-size: 16px;
      border-radius: 4px;
      user-select: none;
      cursor: pointer;
      border: 1px solid @primary-color;
      color: @primary-color;
      line-height: 16px;
    }

    .hot {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .new {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .btn-outline {
      color: #fff;
      background-color: @primary-color;
      border-color: @primary-color;
    }
  }
}

.entryList {
  background-color: #fff;
  .detailTag-List {
    .detailTag-Item {
      border-bottom: 1px solid @levelOne-border-color;
      padding: 16px 20px;
      // border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #fafafa;
      }

      .note-header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .note-header-tag {
          min-width: 16px;
          width: 50px;
          height: 20px;
          line-height: 21px;
          text-align: center;
          border-radius: 6px;
          background-color: @primary-color;
          color: #fff;
          font-size: 12px;
          margin-right: 4px;
          transform: scale(0.9);
        }

        .note-header-title {
          font-size: 16px;
          color: @main-text-color;
          font-weight: 600;
          overflow: hidden;
          white-space: normal;
          word-break: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          cursor: pointer;

          @media screen and (max-width: 720px) {
            font-size: 0.375rem;
          }
          @media screen and (max-width: 540px) {
            font-size: 16px;
          }
        }
      }

      .note-content {
        display: flex;
        justify-content: space-between;

        .note-content-img {
          min-width: 90px;
          min-height: 56px;
          width: 134px;
          height: 84px;
          margin-right: 16px;
          display: flex;
          -webkit-box-align: start;
          align-items: flex-start;
          padding-top: 2px;

          @media screen and (max-width: 720px) {
            width: 2.79rem;
            height: 1.75rem;
            margin-right: 0.33rem;
          }

          @media screen and (max-width: 340px) {
            display: none;
          }

          a {
            position: relative;
            border-radius: 2px;
            width: 100%;
            height: 100%;
            display: inline-block;
            background-size: cover;
            background-position: 50%;
            border: 1px solid #f5f6f7;
            overflow: hidden;
            background: #f5f6f7;

            img {
              width: 100%;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              height: auto;
              position: absolute;
            }
          }
        }

        .note-content-text {
          font-size: 14px;
          color: @general-text-color;
          -webkit-box-flex: 1;
          flex: 1;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;

          .note-uploader {
            display: flex;
            align-items: center;

            &:hover .note-uploader-icon {
              color: @primary-color;
              border: 2px solid @primary-color;
            }

            &:hover .note-uploader-name {
              color: @primary-color;
            }

            .note-uploader-icon {
              display: block;
              width: 21px;
              height: 13px;
              border-radius: 4px;
              border: 2px solid #9499a0;
              text-align: center;
              line-height: 11px;
              font-size: 10px;
              margin-right: 5px;
              color: #9499a0;
              font-weight: 600;
              transition: all 0.25s;
            }

            .note-uploader-name {
              font-size: 12px;
              color: #9499a0;
              cursor: pointer;
              font-family: "PingFang SC";
              font-weight: 600;
              transition: all 0.25s;
            }
          }

          .note-deputy-text {
            margin-top: 5px;

            .note-content-desc {
              font-size: 14px;
              font-weight: 400;
              color: @minor-text-color;
              // 7d8085
              overflow: hidden;
              white-space: normal;
              word-break: break-word;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;

              @media screen and (max-width: 720px) {
                font-size: 0.29rem;
              }
            }
          }

          .note-content-label {
            display: flex;
            align-items: center;

            span {
              position: relative;
              flex-shrink: 0;
              font-size: 13px;
              line-height: 22px;
              padding: 0 8px;
              color: #86909c;
              border-right: 1px solid #ddd;

              &:nth-child(1) {
                padding: 0 8px 0 0;
              }

              &:last-child {
                border-right: none;
              }

              &:hover {
                color: @primary-color;
              }
            }
          }

          .actions-info {
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            justify-content: space-between;

            .collectLikeComment {
              display: flex;
              align-items: center;

              & > span {
                display: flex;
                align-items: center;
                margin-right: 30px;

                i {
                  margin-right: 2px;
                  font-size: 15px;
                }
              }

              @media screen and (max-width: 640px) {
                .collection {
                  display: none;
                }
                & > span {
                  margin-right: 0.53rem;

                  i {
                    font-size: 0.267rem;
                  }
                }
              }
            }

            .actions-info-date {
              font-size: 14px;
              color: @minor-text-color;
              word-break: keep-all;
              white-space: nowrap;

              @media screen and (max-width: 480px) {
                font-size: 0.43rem;
              }
            }
          }
        }
      }
    }
  }

  .detailTag-list {
    display: grid;
    grid-gap: 20px 20px;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    padding: 12px 20px;
    .detailTag-item {
      display: flex;
      justify-content: space-between;
      width: 100%;
      min-width: 100px;
      height: 110px;

      border-radius: 6px;
      border: 1px solid #dcdfe6;
      .detailTag-item-left {
        position: relative;
        width: 40%;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          border-radius: 6px 0 0 6px;
        }

        .mask {
          position: absolute;
          bottom: 4px;
          right: 4px;

          .duration {
            float: right;
            height: 20px;
            padding: 2px 4px;
            border-radius: 6px;
            line-height: 20px;
            background-color: rgba(0, 0, 0, 0.3);
            color: #fff;
            font-size: 14px;
          }
        }

        .type-tag {
          position: absolute;
          top: 0;
          left: 8px;
          background-color: @primary-color;
          font-size: 12px;
          width: 18px;
          height: 36px;
          text-align: center;
          box-shadow: 0px 5px 8px 0px #adc5ff;
          &::after {
            position: absolute;
            content: "";
            left: 0;
            top: 100%;
            border: 9px solid @primary-color;
            border-bottom-color: transparent;
            border-top-width: 0;
          }
          .type-text {
            position: absolute;
            top: 3px;
            left: 0;
            font-size: 12px;
            color: #fff;
          }
        }
      }

      .detailTag-item-right {
        width: 60%;
        padding: 10px 0 10px 6px;
        .detailTag-item-right-title {
          margin-bottom: 8px;
          font-size: 16px;
          line-height: 20px;
          color: #000;
          overflow: hidden;
          white-space: normal;
          word-break: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          cursor: pointer;
        }

        .detailTag-item-right-intro {
          font-size: 14px;
          color: #666;
          margin-bottom: 6px;
          overflow: hidden;
          white-space: normal;
          word-break: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }

        .detailTag-item-right-playinfo {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .amount {
            display: flex;
            margin-right: 12px;
            align-items: flex-start;
            justify-content: center;
            i {
              margin-right: 2px;
              color: #9499a0;
              font-size: 14px;
            }

            .text {
              font-size: 13px;
              color: #9499a0;
            }
          }
        }
      }
    }
  }
}
</style>