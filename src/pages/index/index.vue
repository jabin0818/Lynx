<template>
  <el-container style="background-color: #fff">
    <el-header>
      <Header />
    </el-header>
    <el-main class="index-elMain">
      <el-row :gutter="40" class="recommended-container">
        <el-col :span="12" :sm="14" class="slideShow-card">
          <SlideShow />
        </el-col>
        <el-col :span="12" :sm="10" class="right-container">
          <el-row :gutter="60" class="recommend-card">
            <!-- 9 / 15 => 0 / 24 -->
            <!-- <el-col :span="9" class="card-graphic hidden-sm-and-down">
              <div class="graphic-item">
                <a class="recommend-img">
                  <img src="../../assets/img/2.jpg"/>
                </a>
                <a class="link-recommend">如何推进远程身份验证的发展?</a>
              </div>
              <div class="graphic-item">
                <a class="recommend-img">
                  <img src="../../assets/img/3.jpg"/>
                </a>
                <a class="link-recommend">如何推进远程身份验证的发展?如何推进远程身</a>
              </div>
            </el-col> -->
            <el-col :span="24" class="card-right">
              <div class="card-notice">
                <div class="notice-name">
                  <i class="el-icon-message-solid"></i>
                  <!-- <span>公告</span> -->
                </div>
                <div class="notice-content">
                  <el-carousel
                    :interval="4000"
                    height="46px"
                    direction="vertical"
                    trigger="click"
                    :autoplay="true"
                  >
                    <el-carousel-item
                      v-for="item in announcement"
                      :key="item.id"
                    >
                      <span>{{ item.title }} </span>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
              <div class="card-hot">
                <div class="card-hotList-hearder">
                  <span>
                    <i class="el-icon-guide"></i>
                    <span class="hotList-title">推荐</span>
                  </span>
                  <span @click="exchangeHotList">
                    <span class="hotList-exchange">换一批</span>
                    <i class="el-icon-refresh" ref="refreshIcon"></i>
                  </span>
                </div>
                <div class="card-hotList">
                  <div class="card-hotItem">
                    <div class="card-hotItem-mainTitle">
                      多数据库Citus集群的维护
                    </div>
                    <div class="card-hotItem-subtitle">
                      本文将介绍如何管理Citus集群的数千个数据库管理员采用的数百个数据库。本指南提供了一个完整且经过实战考验的解决方案。
                    </div>
                  </div>
                  <div class="card-hotItem">
                    <div class="card-hotItem-mainTitle">
                      如何在实践中将单体架构迁移到微服务
                    </div>
                    <div class="card-hotItem-subtitle">
                      关于从单体（Monoliths）架构迁移到微服务架构的主题有一些很好的文章，单体架构的优点和缺点非常简单。不过可以了解其他事项——策略。构建单体是因为它们更容易上手。当系统已经投入生产时，微服务通常是出于需要而出现的。
                    </div>
                  </div>
                  <div class="card-hotItem">
                    <div class="card-hotItem-mainTitle">
                      Node.js这么火，为什么还要选ASP.NET？
                    </div>
                    <div class="card-hotItem-subtitle">
                      初创公司最好考虑选择.NET而不是Node呢？以下是我的7个理由。
                    </div>
                  </div>
                  <div class="card-hotItem">
                    <div class="card-hotItem-mainTitle">
                      Adobe将对上万种颜色收费
                    </div>
                    <div class="card-hotItem-subtitle">
                      每月50元，否则文件变黑；Meta被裁员工将至少获71万补偿；C#
                      11 正式发布|极客头条
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row :gutter="40" class="index-container">
        <el-col :span="18" :xs="24" :sm="24" :md="18">
          <!-- <div class="fixed-wrapper">
              <div class="notes-title">
                <span class="title">笔记</span>
              </div>
              <div class="notes-nav">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane
                    v-for="(item, index) in classifyData"
                    :key="item.id"
                    :label="item.name"
                    class="testcolor"
                    :name="'' + index"
                    @click.native="changeTag()"
                  ></el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <div class="tags" ref="tags">
              <button
                class="tags-item"
                v-for="item in types"
                :key="item.id"
                @click="changeType($event, item.id)"
              >
                {{ item.name }}
              </button>
              <div
                class="tags-item arrow-icon"
                @click="foldTags"
                v-if="fristRowNum"
              >
                <span>{{ tagIsFold ? "展开" : "收起" }}</span>
                <i class="el-icon-arrow-up" v-show="!tagIsFold"></i>
                <i class="el-icon-arrow-down" v-show="tagIsFold"></i>
              </div>
            </div>
            <div class="noteList">
              <NotesList :data="notesListData" />
            </div> -->
          <VideosList class="VideosList" />
          <CardsList class="CardsList" />
          <NotesList @tranDataLen="receiveLen" />
        </el-col>
        <el-col :span="6" id="rightAside" class="hidden-sm-and-down">
          <div class="aside-wrap">
            <!-- 项目时间线和项目简介和项目技术栈、相关笔记 -->
            <HotTag :title="'热门标签'" />
            <Boutique />
            <AuthorsList />
            <HotRanking />
            <Links :dataLength="dataLength" />
          </div>
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/header/index";
import SlideShow from "./slideShow/index.vue";
import NotesList from "./notesList/index.vue";
import VideosList from "./videosList/index.vue";
import CardsList from "./cardsList/index.vue";
import HotTag from "@/components/right/hotTag/index";
import Boutique from "@/components/right/boutique/index";
import HotRanking from "@/components/right/hotRanking/index";
import AuthorsList from "@/components/right/authorsList/index";
import Links from "@/components/right/links/index";
import SideToolbar from "@/components/sideToolbar/index";

export default {
  name: "Index",
  components: {
    Header,
    SlideShow,
    NotesList,
    VideosList,
    CardsList,
    HotTag,
    Boutique,
    HotRanking,
    AuthorsList,
    Links,
    SideToolbar,
  },
  data() {
    return {
      dataLength: 0,
      announcement: [
        {
          id: 1,
          title: "公告：Lynx今日正式上线啦！",
        },
        {
          id: 2,
          title: "公告：Lynx是一个一站式的知识分享平台",
        },
        {
          id: 3,
          title: "公告：Lynx可以发布笔记、卡片、视频、动态和消息",
        },
      ],
    };
  },
  async mounted() {
    await this.$store.dispatch("user/getUserInfo");
  },
  methods: {
    receiveLen(e) {
      this.dataLength = e;
    },
    exchangeHotList() {
      this.$refs.refreshIcon.classList.add("rotating");
      setTimeout(() => {
        this.$refs.refreshIcon.classList.remove("rotating");
      }, 1000);
    },
  },
  computed: {
    types() {
      let index = Number(this.activeName);
      let types = Object.assign({}, this.classifyData[index]).types;
      return types;
    },
  },
  watch: {
    typeId(newValue) {
      // console.log(newValue);
      if (newValue) {
        this.getNotesListData(false);
      }
    },
  },
};
</script>

<style lang="less">
.index-elMain {
  width: 1300px;
  overflow: hidden !important;

  @media screen and (max-width: 1300px) {
    width: 1200px;
  }

  @media screen and (max-width: 1200px) {
    width: 1100px;
  }

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
}

.el-container.is-vertical {
  align-items: center;
}

.recommended-container {
  // width: 1300px;
  margin-bottom: 20px;
  .slideShow-card {
    @media screen and (max-width: 840px) {
      width: 100%;
    }
  }
  .right-container {
    @media screen and(max-width: 840px) {
      display: none;
    }

    .recommend-card {
      height: 346px;

      .card-graphic {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 100%;

        @media screen and(max-width: 1300px) {
          display: none;
        }

        .graphic-item {
          cursor: pointer;

          &:nth-child(1) {
            margin-bottom: 3px;
          }

          .recommend-img {
            display: block;
            width: 100%;
            height: 116px;
            overflow: hidden;
            margin-bottom: 3px;
            border-radius: 4px;
          }
          .link-recommend {
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            max-height: 48px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
        }
      }

      .card-right {
        @media screen and(max-width: 1300px) {
          width: 100% !important;
        }

        .card-notice {
          display: flex;
          align-items: center;
          height: 46px;
          margin-bottom: 20px;
          overflow: hidden;

          .notice-name {
            display: flex;
            align-items: center;
            flex: 1;
            color: #6c757d;
            // border-right: 2px solid @warning-color;
            // padding: 0 5px 0 10px;
            // margin-right:14px;

            i {
              font-size: 22px;
              color: @warning-color;
              // margin-right: 2px;

              &:hover {
                animation: wiggle-animation 1s ease 0.3s;
              }

              @keyframes wiggle-animation {
                0% {
                  transform: rotate(0deg);
                }

                20% {
                  transform: rotate(-14deg);
                }

                60% {
                  transform: rotate(14deg);
                }

                90% {
                  transform: rotate(-6deg);
                }

                100% {
                  transform: rotate(0deg);
                }
              }
            }

            span {
              font-size: 14px;
              font-weight: 600;
              color: @warning-color;
            }
          }

          .notice-content {
            flex: 10;
            width: 100%;
            height: 46px;
            line-height: 46px;
            text-align: center;
            background-color: #faecd8;
            border-radius: 4px;
            transition: all 0.25s;

            &:hover {
              background-color: #fce8ce;
            }

            .el-carousel__indicators--vertical {
              display: none;
            }

            span {
              color: @warning-color;
              cursor: pointer;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              word-break: break-all;
              padding: 0 5px;
            }
          }
        }

        .card-hot {
          height: 280px;

          .card-hotList-hearder {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid @levelOne-border-color;

            & > span {
              display: flex;
              align-items: center;
              justify-content: space-between;

              &:nth-child(1) {
                i {
                  margin-right: 5px;
                  color: @primary-color;
                  user-select: none;
                  transition: all 0.6s;
                  transform-style: preserve-3d;
                  font-size: 24px;

                  &:hover {
                    transform: rotateY(-180deg);
                  }
                }

                .hotList-title {
                  font-size: 16px;
                  font-weight: 600;
                  color: @main-text-color;
                }
              }

              &:nth-child(2) {
                cursor: pointer;

                .hotList-exchange {
                  color: @minor-text-color;
                  font-size: 13px;
                }

                i {
                  margin-left: 5px;
                  font-size: 16px;
                  color: @minor-text-color;
                }

                .rotating {
                  transition: all 1s;
                  transform: rotate(-360deg);
                }
              }
            }
          }

          .card-hotList {
            .card-hotItem {
              // margin-top: 16px;
              height: 60px;
              transition: all 0.25s;
              padding: 8px 5px;
              border-radius: 4px;

              &:hover {
                box-shadow: @element-boxshadow2;
              }

              .card-hotItem-mainTitle {
                color: #222226;
                font-size: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                word-break: break-all;
                cursor: pointer;

                // &:hover{
                //   text-decoration: underline;
                // }
              }

              .card-hotItem-subtitle {
                margin-top: 4px;
                font-size: 14px;
                color: #999;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                word-break: break-all;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}

.index-container {
  // width: 1300px;
  margin: 0 auto;

  .VideosList,
  .CardsList {
    margin-bottom: 40px;
  }
}

.el-header {
  position: sticky;
  top: 0;
  left: 0;
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  z-index: 999;
}

.aside-wrap {
  width: 100%;
  // border: 1px solid #ccc;

  .aside-one {
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;

    &:nth-child(1) {
      margin-bottom: 10px;
    }

    &:nth-child(2) {
      margin-bottom: 10px;
    }
  }
}
</style>
