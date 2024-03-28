<template>
  <el-container id="videoIndex">
    <el-header>
      <Header />
    </el-header>
    <el-main class="video-main">
      <el-row class="video-container">
        <el-col :span="24">
          <div class="fixed-wrapper">
            <div class="video-title-h1">
              <span class="title">视频</span>
            </div>
            <div class="video-nav">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  v-for="(item, index) in classifyData"
                  :key="item.id"
                  :label="item.name"
                  class="testcolor"
                  :name="'' + index"
                  @click.native="changeTag()"
                >
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="video-tag">
            <v-clamp
              class="videoTags"
              :autoresize="true"
              :max-lines="1"
              :tag="'div'"
              :max-height="30"
              :expanded="tagIsFold"
              @clampchange="clampchange"
            >
              <button
                class="videoTags-item"
                style="padding: 0 20px; margin-right: 16px"
                v-for="item in types"
                :key="item.id"
                @click="changeType($event, item.id)"
              >
                {{ item.name }}
              </button>
              <template slot="after">
                <button
                  class="videoTags-item arrow-icon"
                  style="padding: 0 20px; margin-right: 16px"
                  @click="foldcardTags()"
                >
                  <span>{{ tagIsFold ? "收起" : "展开" }}</span>
                  <i class="el-icon-arrow-up" v-show="tagIsFold"></i>
                  <i class="el-icon-arrow-down" v-show="!tagIsFold"></i>
                </button>
              </template>
            </v-clamp>
          </div>
          <div class="videoList">
            <VideoList
              :data="videoList"
              @getMoreItem="loadMore"
              :finish="finish"
              :hasNext="hasNext"
            />
          </div>
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
  </el-container>
</template>

<script>
import VClamp from "@boyuai/vue-clamp";
import Header from "@/components/header/index";
import SideToolbar from "@/components/sideToolbar/index";
import VideoList from "./videoList/index.vue";
import { getNotesType } from "@/api/notes";
import { getCardsByType } from "@/api/card";
import { getVideoListByType } from "@/api/video";

export default {
  name: "VideoIndex",
  components: {
    Header,
    SideToolbar,
    VideoList,
    VClamp,
  },
  data() {
    return {
      activeName: "0",
      tagIsFold: false,
      classifyData: [],
      params: { currentPage: 1, pageSize: 8 },
      typeId: "",
      videoList: [],
      finish: false,
      count: 0,
      hasNext: false,
      height: 0,
    };
  },
  async mounted() {
    //分类标签tag初始化
    await this.getClassifyData();

    if (this.classifyData[0].id) {
      this.typeId = this.classifyData[0].id;
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      let index = this.activeName;
      this.typeId = this.classifyData[index].id;
    },
    changeType(event, id) {
      let dom = document.querySelector(".is-activity");
      if (dom) {
        dom.classList.remove("is-activity");
      }
      event.currentTarget.classList.add("is-activity");
      if (id) {
        let typeIdAry = this.typeId.split("-");
        if (typeIdAry.length >= 2) {
          this.typeId = typeIdAry[0];
          // console.log(this.typeId);
        }
        this.typeId = this.typeId + "-" + id;
      }
    },
    foldcardTags() {
      // this.$nextTick(() => {
      // this.tagIsFold = !this.tagIsFold
      // })
      this.tagIsFold = !this.tagIsFold;
    },
    clampchange(clamped) {
      // console.log(clamped);
    },
    async getClassifyData() {
      let result = await getNotesType();
      if (result.code === 200) {
        this.classifyData = result.data;
      }
    },
    async getVideoListData(isLoadMore) {
      // console.log(this.typeId);
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      let page = String(this.params.currentPage);
      let row = String(this.params.pageSize);
      let result = await getVideoListByType(this.typeId, page, row);
      console.log("获取视频的接口：", result);
      if (result.code === 200) {
        // this.classifyData = result.data
        console.log("获取视频列表成功");
        if (isLoadMore) {
          this.videoList = this.videoList.concat(result.data.data);
        } else {
          this.videoList = result.data.data;
        }
        this.count = result.data.count;
        this.finish = true;

        if (this.count > this.videoList.length) {
          this.hasNext = true;
        } else {
          this.hasNext = false;
        }
      } else {
        console.log("无数据");
        this.$message.success("无数据");
      }
    },
    loadMore() {
      if (this.hasNext && this.finish) {
        console.log("触发了loadMore");
        this.params.currentPage++;
        this.getVideoListData(true);
      } else {
      }
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
        this.getVideoListData(false);
      }
    },
  },
};
</script>

<style lang="less">
#videoIndex {
  background-color: #fff;
  min-height: 100vh;

  .el-main {
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

  .video-main {
    .video-container {
      .fixed-wrapper {
        display: flex;
        align-items: center;

        .video-title-h1 {
          width: 56px;
          height: 54px;
          line-height: 40px;
          margin-right: 25px;
          font-size: 28px;

          @media screen and (max-width: 840px) {
            font-size: 0.5rem;
            width: 1.2rem;
            margin-right: 0.446rem;
          }

          @media screen and (max-width: 480px) {
            // margin-right: 0.446rem;
            font-size: 18px;
            width: 40px;
          }

          .title {
            display: block;
            color: #000;
          }
        }
        .video-nav {
          .el-tabs__item {
            height: 40px;
            font-size: 16px;
            font-weight: 500;
            color: @general-text-color;

            @media screen and (max-width: 420px) {
              font-size: 14px;
              padding: 0 0.625rem;
            }

            @media screen and (max-width: 320px) {
              font-size: 13px;
            }
          }

          .el-tabs__item.is-active {
            color: @primary-color;
          }

          .el-tabs__active-bar {
            background: @primary-color;
          }

          .el-tabs__nav-wrap::after {
            background-color: transparent !important;
          }
        }
      }

      .video-tag {
        margin-bottom: 40px;

        .videoTags {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -16px;
          position: relative;

          .videoTags-item {
            margin-bottom: 16px;
            height: 30px;
            line-height: 30px;
            padding: 0 0.625rem;
            border: 1px solid @levelOne-border-color;
            color: @main-text-color;
            cursor: pointer;
            border-radius: 22px;
            text-align: center;
            font-size: 13px;
            background: #fff;

            @media screen and (max-width: 840px) {
              margin-bottom: 0.28rem;
              margin-right: 0.28rem;
              font-size: 0.23rem;
              padding: 0 0.37rem;
            }
          }

          .arrow-icon {
            color: @primary-color;
            // border: 1px solid @primary-color;
            margin-bottom: 0;

            i {
              margin-left: 5px;
              font-weight: bolder;
            }
          }

          .is-activity {
            background: @primary-color;
            color: #fff;
            border: none;
          }
        }
      }

      .videoList {
      }
    }
  }
}
</style>