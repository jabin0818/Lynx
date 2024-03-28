<template>
  <div id="main-video-index">
    <div class="videoIndex-header">
      <div class="videoIndex-title">
        <span class="title">视频</span>
      </div>
      <div class="videoIndex-more">
        <span class="more" @click="toVideoList">
          <span>更多</span>
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
    </div>
    <div class="videoIndex-main">
      <div class="videoIndex-list">
        <a
          class="video-item"
          v-for="item in videoData"
          :key="item.id"
          @click="toVideoDetail(item.id)"
        >
          <div class="cover-container-wrapper">
            <div class="cover-play">
              <i class="el-icon-video-play"></i>
            </div>
            <div class="cover-container">
              <img :src="item.cover" />
            </div>
            <div class="cover-container-mask">
              <div class="cover-stats-left">
                <span class="stats-item">
                  <i class="el-icon-video-play stats-item-icon"></i>
                  <span class="stats-item-text">{{ item.watchNum }}</span>
                </span>
                <span class="stats-item">
                  <i class="el-icon-chat-line-round stats-item-icon"></i>
                  <span class="stats-item-text">{{ item.commentNum }}</span>
                </span>
              </div>
              <span class="cover-duration">{{ item.duration }}</span>
            </div>
          </div>
          <div class="info-container">
            <div class="video-title">
              <span>{{ item.title }}</span>
            </div>
            <div class="author-and-time">
              <div class="author-name">
                <i class="iconfont icon-UPzhu"></i>
                <span>{{ item.userName }}</span>
              </div>
              <div class="split">·</div>
              <div class="time-text">{{ timeFormat(item.issTime) }}</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { randomVideos } from "@/api/index";
export default {
  name: "videosListIndex",
  data() {
    return {
      videoData: [],
    };
  },
  mounted() {
    this.getVideoData();
  },
  methods: {
    toVideoDetail(id) {
      let routeData = this.$router.resolve("/video/detail/" + id);
      window.open(routeData.href, "_blank");
    },
    toVideoList() {
      this.$router.push({
        path: "/video",
      });
    },
    async getVideoData() {
      let res = await randomVideos();
      console.log(res);
      if (res.code === 200) {
        this.videoData = res.data;
      }
    },
    timeFormat(t) {
      let str = t.split(" ");
      let date = str[0];
      let time = str[1].slice(0, 5);
      return date + " " + time;
    },
  },
};
</script>

<style lang="less" scoped>
#main-video-index {
  .videoIndex-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .videoIndex-title {
      width: 56px;
      height: 54px;
      line-height: 40px;
      margin-right: 25px;
      font-size: 28px;

      @media screen and (max-width: 840px) {
        // margin-right: 0.446rem;
        display: none;
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

    .videoIndex-more {
      .more {
        font-size: 14px;
        color: #666;
        cursor: pointer;
      }
    }
  }

  .videoIndex-main {
    .videoIndex-list {
      display: grid;
      position: relative;
      width: 100%;
      grid-column: span 3;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 30px;

      @media screen and (max-width: 640px) {
        grid-column: span 2;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;
      }
      .video-item {
        display: block;
        cursor: pointer;

        .cover-container-wrapper {
          position: relative;
          width: 100%;
          height: 146px;

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
          }

          .cover-container-mask {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 2;
            box-sizing: border-box;
            padding: 16px 8px 6px;
            width: 100%;
            height: 38px;
            border-bottom-right-radius: 6px;
            border-bottom-left-radius: 6px;
            background-image: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.8) 100%
            );
            color: #fff;
            font-size: var(--subtitle-font-size);
            line-height: var(--icon-size);
            opacity: 1;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .cover-stats-left {
              min-width: 0;
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: flex-start;

              .stats-item {
                display: flex;
                margin-right: 12px;
                align-items: flex-start;
                justify-content: center;

                .stats-item-icon {
                  margin-right: 2px;
                  color: #fff;
                  font-size: 14px;
                }
                .stats-item-text {
                  font-size: 13px;
                }
              }
            }

            .cover-duration {
              font-size: 13px;
            }
          }
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

          .author-and-time {
            display: flex;
            align-items: center;

            .author-name {
              font-size: 14px;
              color: #999;

              &:hover {
                color: @primary-color;
              }

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
            }
          }
        }
      }
    }
  }
}
</style>