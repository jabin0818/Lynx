<template>
  <div id="relatVideo">
    <div class="relatVideo-hearder">
      <div class="relatVideo-title">
        <span>相关视频</span>
      </div>
    </div>
    <div class="relatVideo-main">
      <div class="relatVideo-list">
        <div
          class="relatVideo-item"
          v-for="(item, index) in videoList"
          :key="item.id"
          @click="toVideoDetail(item.id)"
        >
          <div class="relatVideo-item-left">
            <img :src="item.cover" alt="" />
            <div class="mask">
              <span class="duration">{{ item.duration }}</span>
            </div>
          </div>
          <div class="relatVideo-item-right">
            <div class="relatVideo-item-title">
              <span>
                {{ item.title }}
              </span>
            </div>
            <div class="relatVideo-item-other">
              <div class="relatVideo-item-author">
                <i class="iconfont icon-UPzhu"></i>
                <span>{{ item.userName }}</span>
              </div>
              <div class="relatVideo-item-playinfo">
                <span class="amount amount-play">
                  <i class="el-icon-video-play"></i>
                  <span class="text">{{ item.watchNum }}</span>
                </span>
                <span class="amount amount-comment">
                  <i class="el-icon-chat-line-round"></i>
                  <span class="text">{{ item.commentNum }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="more-relat-video" @click="loadMore">
          <span class="more-btn">
            {{ hasNext ? "加载更多" : "暂无更多数据" }}
          </span>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideoListByType } from "@/api/video";
import { computed } from "vue";

export default {
  props: {
    relatType: { type: String },
  },
  data() {
    return {
      videoList: [],
      params: { currentPage: 1, pageSize: 8 },
      finish: false,
      count: 0,
      hasNext: false,
    };
  },
  mounted() {
    this.getVideoListData(false);
  },
  methods: {
    async getVideoListData(isLoadMore) {
      // console.log(this.typeId);
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      let page = String(this.params.currentPage);
      let row = String(this.params.pageSize);
      let result = await getVideoListByType(this.relatType, page, row);
      // console.log("获取视频List的接口：", result);
      if (result.code === 200) {
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
        // this.$message.success("无数据");
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
    toVideoDetail(id) {
      console.log(id);
      // this.$router.push(`/video/detail/${id}`);
      this.$router.push({ path: "/video/detail/" + id });
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
#relatVideo {
  .relatVideo-hearder {
    .relatVideo-title {
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      color: #000;
    }
  }

  .relatVideo-main {
    .relatVideo-list {
      .relatVideo-item {
        display: flex;
        justify-content: space-between;
        height: 108px;
        padding: 10px 0;

        .relatVideo-item-left {
          position: relative;
          width: 46%;
          margin-right: 4px;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
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

        .relatVideo-item-right {
          display: flex;
          flex-direction: column;
          // align-items: space-between;
          justify-content: space-between;
          width: 54%;

          .relatVideo-item-title {
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
          .relatVideo-item-other {
            .relatVideo-item-author {
              margin-bottom: 6px;
              font-size: 12px;
              line-height: 12px;
              color: #9499a0;
              cursor: pointer;
              &:hover {
                color: @primary-color;
              }

              i {
                font-size: 14px;
                margin-right: 4px;
              }
            }

            .relatVideo-item-playinfo {
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
      .more-relat-video {
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #252933;
        font-size: 15px;
        height: 46px;
        cursor: pointer;
        font-weight: 500;
        background-color: rgba(66, 129, 255, 0.04);

        &:hover {
          background-color: rgba(66, 129, 255, 0.1);
        }
        &:hover i {
          animation: mobile-animation 1s ease 0.3s infinite;
        }

        @keyframes mobile-animation {
          0% {
            transform: translateY(0px);
          }
          20% {
            transform: rotate(2px);
          }

          40% {
            transform: translateY(0px);
          }

          80% {
            transform: translateY(2px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        i {
          margin-left: 8px;
          transition: all 0.2s;
        }
      }
    }
  }
}
</style>