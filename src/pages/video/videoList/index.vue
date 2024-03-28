<template>
  <div id="main-video-content">
    <div class="video-list" v-if="data && data.length">
      <div class="video-list-wrapper">
        <a
          class="video-item"
          v-for="item in data"
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
              <div class="time-text">{{ item.issTime }}</div>
            </div>
          </div>
        </a>
      </div>
      <div class="data-loading-more" @click="loadMore">
        <i class="el-icon-loading" v-show="!finish"></i>
        <span class="listLoading-more-btn-text" v-show="finish">{{
          hasNext ? "加载更多" : "暂无更多数据"
        }}</span>
      </div>
    </div>
    <el-empty description="暂无视频数据" v-else></el-empty>
  </div>
</template>

<script>
export default {
  name: "videoList",
  props: {
    data: { type: Array },
    finish: { type: Boolean },
    hasNext: { type: Boolean },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toVideoDetail(id) {
      let routeData = this.$router.resolve("/video/detail/" + id);
      window.open(routeData.href, "_blank");
    },
    loadMore() {
      this.$emit("getMoreItem");
    },
  },
};
</script>

<style lang="less" scoped>
#main-video-content {
  .video-list {
    .video-list-wrapper {
      display: grid;
      position: relative;
      width: 100%;
      grid-column: span 4;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 30px;

      @media screen and (max-width: 840px) {
        grid-column: span 3;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
      }

      @media screen and (max-width: 640px) {
        grid-column: span 2;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 16px;
      }
      .video-item {
        display: block;
        cursor: pointer;

        .cover-container-wrapper {
          position: relative;
          width: 100%;
          height: 170px;

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