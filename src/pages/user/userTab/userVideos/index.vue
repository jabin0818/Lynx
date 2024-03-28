<template>
  <div id="user-videos">
    <div class="sub-header">
      <div class="sub-header-title">
        <el-input
          type="text"
          class="sub-header-search"
          placeholder="搜索视频"
          suffix-icon="el-icon-search"
          v-model="query.search"
          @keyup.enter.native="searchKeyWord()"
        >
        </el-input>
      </div>
      <div class="sub-type-box">
        <div class="sub-type-sort">
          <el-popover
            placement="bottom-end"
            width="40"
            trigger="click"
            popper-class="st-sort-popover"
          >
            <div id="subtype-sort-wrapper">
              <a class="sub-type active" ref="timeBtn" @click="dataSort('time')">最新</a>
              <span class="sub-type-line"></span>
              <a class="sub-type" ref="hotBtn" @click="dataSort('hot')">热门</a>
            </div>
            <i class="el-icon-sort" slot="reference"></i>
          </el-popover>
        </div>
        <div class="sub-type-filter">
          <el-dropdown
            trigger="click"
            @command="videosFilter"
            placement="bottom-start"
          >
            <span class="el-dropdown-link">
              <i class="iconfont icon-shaixuan1"></i>
              <i class="el-icon-arrow-down el-icon--right"></i>
              {{ videosFilterCond }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="{ label: '全部', value: 'all' }"
                icon="el-icon-plus"
                >全部</el-dropdown-item
              >
              <el-dropdown-item
                v-for="item in classifyData"
                :key="item.id"
                :command="{ label: item.name, value: item.id }"
                icon="el-icon-plus"
                >{{item.name}}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="video-list">
      <div class="video-item" v-for="item in userVideos" :key="item.id" @click="toVideoDetail(item.id)">
        <div class="cover-container-wrapper">
          <div class="cover-play">
            <i class="el-icon-video-play"></i>
          </div>
          <div class="cover-container">
            <img :src="item.cover" />
            <div class="mask">
              <span class="duration">{{ item.duration }}</span>
            </div>
          </div>
        </div>
        <div class="info-container">
          <div class="video-title">
            <span
              >{{ item.title }}</span
            >
          </div>
          <div class="play-and-time">
            <div class="play-num">
              <i class="el-icon-video-play"></i>
              <span>{{ item.watchNum }}</span>
            </div>
            <div class="split">·</div>
            <div class="time-text">
              <i class="el-icon-time"></i>
              <span>{{ item.issTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="data-loading-more" @click="loadMore">
      <i class="el-icon-loading" v-show="!finish"></i>
      <span v-show="finish">{{
        hasNext ? "加载更多" : "暂无更多数据"
      }}</span>
    </div>
  </div>
</template>

<script>
import { selectUserVideos } from "@/api/user";
import { getNotesType } from "@/api/notes";
import { mapState } from "vuex";
export default {
  name: "UserVideos",
  data() {
    return {
      videosFilterCond: "",
      userVideos: [],
      query: {
        page: 1,
        rows: 5,
        search: null,
        sort: 0,//0：时间 1：观看数排序
      },
      finish: false,
      hasNext: false,
      count: 0,
      typeId: null,
      classifyData: [],
    };
  },
  mounted() {
    this.getUserVideo(false)
    this.getClassifyData()
  },
  methods: {
    toVideoDetail(id) {
      let routeData = this.$router.resolve("/video/detail/" + id);
      window.open(routeData.href, "_blank");
    },
    videosFilter(e) {
      if(e.value === 'all') {
        this.typeId = null
        this.videosFilterCond = e.label;
        this.getUserVideo(false)
        return;
      }
      this.videosFilterCond = e.label;
      this.typeId = e.value;
      this.getUserVideo(false)
    },
    searchKeyWord(e) {
      this.getUserVideo(false)
    },
    dataSort(type) {
      if(type === 'time') {
        this.query.sort= 0
        this.$refs.hotBtn.classList.remove("active")
        this.$refs.timeBtn.classList.add("active")
      } else if(type === 'hot'){
        this.query.sort= 1
        this.$refs.timeBtn.classList.remove('active')
        this.$refs.hotBtn.classList.add('active')
      }
      this.getUserVideo(false)
    },
    notesFilter(e) {
      if(e.value === 'all') {
        this.typeId = null
        this.videosFilterCond = e.label;
        this.getUserVideo(false)
        return;
      }
      this.videosFilterCond = e.label;
      this.typeId = e.value;
      this.getUserVideo(false)
    },
    async getUserVideo(isLoadMore) {
      if (!isLoadMore) {
        this.query.page = 1;
      }
      try {
        let res = await selectUserVideos(this.userInfo.id,this.query.page, this.query.rows,this.query.search,this.query.sort,this.typeId);
      console.log("获取个人的视频",res)
      if(res.code === 200) {
        if (isLoadMore) {
          this.userVideos = this.userVideos.concat(res.data.data);
        } else {
          this.userVideos = res.data.data;
        }
        this.count = res.data.count;
        this.finish = true;
        if (this.count > this.userVideos.length) {
          this.hasNext = true;
        } else {
          this.hasNext = false;
        }
      }
      } catch (error) {
        this.userVideos = []
      }
      
    },
    loadMore() {
      if (this.hasNext && this.finish) {
        this.query.page++;
        this.getUserVideo(true);
      }
    },
    async getClassifyData() {
      let result = await getNotesType();
      if (result.code === 200) {
        this.classifyData = result.data;
      }
    },
  },
  computed: {
    ...mapState("user",["userInfo"])
  }
};
</script>

<style lang="less" scoped>
#user-videos {
  background-color: #fff;
  border-radius: 6px;
  padding-bottom: 4px;
  .sub-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 28px;
    height: 48px;
    white-space: nowrap;
    border-bottom: 2px solid rgba(230, 230, 231, 0.5);

    .sub-header-title {
      .sub-header-search {
        /deep/ .el-input__inner {
          height: 32px;
          border-radius: 16px;
        }

        /deep/ .el-input__suffix-inner {
          i {
            line-height: 32px;
          }
        }
      }
    }

    .sub-type-box {
      display: flex;
      align-items: center;
      margin-left: auto;

      i {
        color: #000;
        font-size: 16px;
        margin-left: 20px;
        cursor: pointer;
      }
      .sub-type-filter {
        position: relative;
        i {
          &:last-child {
            margin-left: 0;
            font-size: 12px;
          }
        }
      }
    }
  }

  .video-list {
    display: grid;
    position: relative;
    grid-gap: 20px 20px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 12px 20px;
    width: 100%;
    // grid-column: span 4;
    // grid-template-columns: repeat(4, 1fr);
    // grid-gap: 30px;

    .video-item {
      cursor: pointer;

      .cover-container-wrapper {
        position: relative;
        width: 100%;
        height: 140px;

        &:hover .cover-play {
          opacity: 1;
          visibility: visible;
        }

        .cover-play {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(29, 33, 41, 0.5);
          z-index: 2;
          border-radius: 6px;
          visibility: hidden;
          opacity: 0;
          transition: all 0.25s;

          i {
            font-size: 38px;
          }
        }

        .cover-container {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 6px;
          }

          .mask {
            position: absolute;
            bottom: 4px;
            right: 4px;

            .duration {
              float: right;
              // display: inline-block;
              height: 20px;
              padding: 2px 4px;
              border-radius: 6px;
              line-height: 17px;
              background-color: rgba(0, 0, 0, 0.3);
              color: #fff;
              font-size: 14px;
            }
          }
        }

        // .cover-container-mask {
        //   position: absolute;
        //   bottom: 0;
        //   left: 0;
        //   z-index: 2;
        //   box-sizing: border-box;
        //   padding: 16px 8px 6px;
        //   width: 100%;
        //   height: 38px;
        //   border-bottom-right-radius: 6px;
        //   border-bottom-left-radius: 6px;
        //   background-image: linear-gradient(
        //     180deg,
        //     rgba(0, 0, 0, 0) 0%,
        //     rgba(0, 0, 0, 0.8) 100%
        //   );
        //   color: #fff;
        //   font-size: var(--subtitle-font-size);
        //   line-height: var(--icon-size);
        //   opacity: 1;
        //   display: -webkit-flex;
        //   display: flex;
        //   align-items: center;
        //   justify-content: space-between;

        //   .cover-stats-left {
        //     min-width: 0;
        //     flex: 1;
        //     display: flex;
        //     align-items: center;
        //     justify-content: flex-start;

        //     .stats-item {
        //       display: flex;
        //       margin-right: 12px;
        //       align-items: flex-start;
        //       justify-content: center;

        //       .stats-item-icon {
        //         margin-right: 2px;
        //         color: #fff;
        //         font-size: 14px;
        //       }
        //       .stats-item-text {
        //         font-size: 13px;
        //       }
        //     }
        //   }

        //   .cover-duration {
        //     font-size: 13px;
        //   }
        // }
      }

      .info-container {
        padding-top: 8px;

        .video-title {
          font-size: 16px;
          color: #000;
          overflow: hidden;
          white-space: normal;
          word-break: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          transition: all 0.1s;
          &:hover {
            color: @primary-color;
          }
        }

        .play-and-time {
          display: flex;
          align-items: center;

          .play-num {
            font-size: 14px;
            color: #999;

            i {
              font-size: 13px;
              margin-right: 3px;
            }
          }

          .split {
            margin: 0 5px;
            font-size: 16px;
            color: #999;
          }

          .time-text {
            position: relative;
            top: 1px;
            font-size: 14px;
            color: #999;

            i {
              font-size: 13px;
              margin-right: 3px;
            }
          }
        }
      }
    }
  }
}

#subtype-sort-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 6px;
  .sub-type {
    position: relative;
    font-size: 14px;
    color: #72777b;
    cursor: pointer;
    &.active {
      color: @primary-color;
    }
  }

  .sub-type-line {
    width: 1px;
    height: 12px;
    background-color: #b2bac2;
    opacity: 0.5;
  }
}
</style>