<template>
  <div id="video-detail">
    <div class="video-title">
      <div class="title" :title="videoData.title">
        {{ videoData.title }}
      </div>
      <div class="video-data">
        <div class="video-data-list">
          <div class="video-data-item">
            <i class="el-icon-time stats-item-icon"></i>
            <span class="stats-item-text">{{ videoData.issTime }}</span>
          </div>

          <div class="video-data-item">
            <span class="stats-item-text">{{ videoData.watchNum }}</span>
            <span class="stats-item-text">播放</span>
          </div>
          <div clang="video-data-item-dot">·</div>
          <div class="video-data-item">
            <span class="stats-item-text">{{ videoData.comment_num }}</span>
            <span class="stats-item-text">评论</span>
          </div>
          <div
            class="video-data-item update"
            v-if="userInfo.id === videoData.userId"
            @click="updateVideo"
          >
            <span class="stats-item-text">编辑</span>
          </div>
        </div>
      </div>
    </div>
    <div class="video-player-container">
      <div class="video-player">
        <d-player ref="player" :options="dplayerOptions"></d-player>
      </div>
    </div>
    <div class="video-toolbar">
      <div class="toolbar-left">
        <span
          ref="likeSpan"
          class="like"
          :class="{ 'like-active': isLike }"
          @click="likeVideo($event)"
        >
          <i class="iconfont icon-good"></i>
          <span class="text">{{ videoData.likeNum }}</span>
        </span>
        <span class="star" @click="starBtn">
          <i class="el-icon-star-off"></i>
          <span class="text">{{ videoData.hoardNum }}</span>
        </span>
        <span class="share" @click="shareBtn">
          <i class="iconfont icon-fenxiang"></i>
          <span class="text">{{
            videoData.shareNum ? videoData.shareNum : "转发"
          }}</span>
        </span>
      </div>
      <div class="toolbar-right">
        <i class="el-icon-more"></i>
      </div>
    </div>
    <div class="video-desc" ref="videoDesc">
      <!-- <i class="el-icon-document"></i>简介： -->
      <v-clamp
        class="video-desc-wrapper"
        :autoresize="true"
        :max-lines="3"
        :tag="'div'"
        :max-height="120"
        :expanded="descIsFold"
        :ellipsis="''"
        @clampchange="clampchange"
      >
        {{ videoData.summary }}
        <template slot="after">
          <span
            class="switch-btn"
            @click="foldVideoDesc()"
            v-show="isShowDescSwitchBtn"
          >
            <span>切换</span>
            <i class="el-icon-arrow-right"></i>
          </span>
        </template>
      </v-clamp>
    </div>
    <div class="video-classify">
      <div class="tag-list-box">
        <div class="tag-list" v-if="videoData.types">
          <div class="tag-list-title">分类：</div>
          <a
            class="category-item"
            v-for="(item, index) in videoData.types.split(',')"
            :key="index"
          >
            <span>{{ item }}</span>
          </a>
        </div>
        <div class="tag-list label-list" v-if="videoData.tagName">
          <div class="tag-list-title">标签：</div>
          <a
            class="category-item"
            v-for="(item, index) in videoData.tagName.split('-')"
            :key="index"
          >
            <span>{{ item }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VClamp from "@boyuai/vue-clamp";
// import VueDPlayer from "vue-dplayer";
// import "vue-dplayer/dist/vue-dplayer.css";
import { getVideoDetail, likeVideo } from "@/api/video";
import { mapState } from "vuex";
export default {
  name: "VideoContent",
  components: {
    VClamp,
    // VueDPlayer,
  },
  data() {
    return {
      descIsFold: false,
      dplayerOptions: {
        theme: "#4281ff", // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
        screenshot: false, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: "auto", // 自动预加载
        volume: 0.4, // 初始化音量
        logo: require("@/assets/img/logo/video_logo.png"), // 在视频左脚上打一个logo
        video: {
          url: "", // 播放视频的路径
          // quality: [
          //   // 设置多个质量的视频
          //   {
          //     name: "HD",
          //     url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          //     type: "auto", // 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或 其他自定义类型
          //   },
          //   {
          //     name: "SD",
          //     url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          //     type: "auto",
          //   },
          // ],
          // defaultQuality: 0, // 默认是HD
          // pic: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png", // 视频封面图片
          // thumbnails: require("@/assets/thumbnails.jpg"), // 进度条上的缩略图,需要通过dplayer-thumbnails来生成
        },
        // subtitle: {
        //   url: "http://www.baidu.com",
        //   fontSize: "20px",
        //   bottom: "50%",
        // },
        // danmaku: {
        //   // 弹幕
        //   id: "9E2E3368B56CDBB4",
        //   api: "https://api.prprpr.me/dplayer/",
        //   token: "tokendemo",
        //   maximum: 1000,
        //   addition: ["https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142"],
        //   user: "DIYgod",
        //   bottom: "15%",
        //   unlimited: true,
        // },
        contextmenu: [
          // 右键菜单
          {
            text: "复制视频地址",
            click: (player) => {
              console.log("视频色彩调整", player);
            },
          },
          {
            text: "下载视频",
            link: "",
          },
          {
            text: "视频色彩调整",
            click: (player) => {
              console.log("视频色彩调整", player);
            },
          },
          {
            text: "视频音效调整",
            click: (player) => {
              console.log("视频音效调整", player);
            },
          },
        ],
        highlight: [
          // 进度条时间点高亮
          {
            text: "10M",
            time: 600,
          },
          {
            text: "20M",
            time: 1200,
          },
        ],
      },
      videoData: {},
      videoId: "",
      isShowDescSwitchBtn: false,
      isLike: false,
      isFinish: false,
    };
  },
  async mounted() {
    const player = this.$refs.player.dp;
    // console.log(player.video.setAttribute("crossorigin", "false"));
    // player.play();
    // setTimeout(() => {
    //   player.pause();
    // }, 2000);
    this.videoId = this.$route.params.id;
    await this.getVideoData();
    this.initSwitchBtn();
  },
  methods: {
    initSwitchBtn() {
      let txt = this.$refs.videoDesc.innerText;
      console.log(txt);
      if (txt?.substring(txt.length - 3) === "...") {
        this.isShowDescSwitchBtn = true;
      } else {
        this.isShowDescSwitchBtn = false;
      }
    },
    async getVideoData() {
      if (this.videoId !== "") {
        let res = await getVideoDetail(this.videoId, this.userInfo.id);
        if (res.code === 200) {
          this.isFinish = true;
          this.videoData = res.data.videoInfo;
          this.isLike = res.data.ifLike === 1 ? true : false;
          this.dplayerOptions.video.url = res.data.videoInfo.address;
          const player = this.$refs.player.dp;
          player.switchVideo({
            url: res.data.videoInfo.address,
            // pic: res.data.videoInfo.cover,
            // thumbnails: res.data.videoInfo.cover,
          });
          this.$emit("commentFlag", {
            isOpenComment: this.videoData.commentBol === 0 ? true : false,
            authorId: this.videoData.userId,
            relatType: this.videoData.typeId,
          });
        } else {
          this.$message.error("网络繁忙！");
        }
      }
    },
    clampchange(clamped) {
      // console.log(clamped);
    },
    foldVideoDesc() {
      this.descIsFold = !this.descIsFold;
    },
    play() {
      console.log("play callback");
    },
    starBtn() {
      this.$store.state.global.collectionVisible = true;
    },
    shareBtn() {
      this.$store.state.global.shareVisible = true;
    },
    async likeVideo(e) {
      if (!this.isFinish) return;
      if (this.videoId !== "") {
        let res = await likeVideo(this.videoId);
        console.log("点赞的接口：", res);
        if (res.code === 200) {
          if (this.isLike) {
            this.videoData.likeNum -= 1;
            this.isLike = false;
          } else {
            this.videoData.likeNum += 1;
            this.isLike = true;
          }
          console.log("点赞的接口成功");
          // this.$refs.likeSpan.classList.add("like-active");
          // this.
        }
      }
    },
    updateVideo() {
      if (this.videoId !== "") {
        this.$router.push({
          path: `/video/edit/${this.videoId}`,
          query: {
            userId: this.userInfo.id,
          },
        });
      }
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  watch: {
    "$route.params.id": async function (newVal, oldVal) {
      this.videoId = newVal;
      await this.getVideoData();
      this.initSwitchBtn();
    },
  },
};
</script>

<style lang="less" scoped>
#video-detail {
  .video-title {
    height: 80px;

    .title {
      font-size: 22px;
      color: #000;
      margin-bottom: 10px;
      overflow: hidden;
      white-space: normal;
      word-break: break-word;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .video-data {
      font-size: 13px;
      color: #9499a0;
      display: flex;
      align-items: center;
      height: 24px;
      line-height: 18px;
      position: relative;
      overflow: hidden;

      .video-data-list {
        display: flex;
        align-items: center;
        overflow: hidden;
        box-sizing: border-box;
        color: #999;
        .video-data-item {
          display: flex;
          align-items: center;
          margin: 0 7px;

          &:first-child {
            margin: 0 16px 0 0px;
          }

          .stats-item-icon {
            margin-right: 5px;
            font-size: 16px;
          }

          .stats-item-text {
            font-size: 13px;
          }
        }

        .video-data-item-dot {
          margin: 0 5px;
        }

        .update {
          color: @primary-color;
          cursor: pointer;
        }
      }
    }
  }

  .video-player-container {
    width: 100%;
    height: 500px;

    .video-player {
      width: 100%;
      height: 100%;
      .video {
        width: 100%;
        box-shadow: 0 0 8px#e5e9ef;
      }

      /deep/ .dplayer {
        height: 100%;
      }
    }
  }

  .video-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e3e5e7;
    padding-top: 16px;
    padding-bottom: 12px;
    height: 28px;
    line-height: 28px;
    box-sizing: content-box;

    .toolbar-left {
      // display: flex;
      // align-items: center;

      & > span {
        display: inline-flex;
        align-items: center;
        width: 110px;
        cursor: pointer;
        color: #000;

        i {
          font-size: 34px;
          margin-right: 4px;
          transition: color 0.2s;
        }

        .text {
          font-size: 16px;
        }

        &.like-active {
          color: @primary-color;
        }
      }

      .share {
        i {
          font-size: 32px;
        }
      }
    }

    .toolbar-right {
      cursor: pointer;
      i {
        font-size: 20px;
      }
    }
  }

  .video-desc {
    margin: 16px 0;
    .video-desc-wrapper {
      font-size: 15px;
      line-height: 24px;
      .switch-btn {
        height: 20px;
        font-size: 13px;
        margin-left: 5px;
        cursor: pointer;
        color: @primary-color;
      }
    }
  }

  .video-classify {
    padding-top: 10px;
    border-radius: 0 0 4px 4px;
    padding-bottom: 46px;

    .tag-list-box {
      margin-bottom: -12px;

      .tag-list {
        display: flex;
        font-size: 16px;
        margin-right: 30px;
        flex-shrink: 0;
        line-height: 36px;

        .tag-list-title {
          flex-shrink: 0;
          margin-right: 8px;
          font-size: 14px;
          color: #515767;
        }

        .category-item {
          background-color: #f2f3f5;
          color: #515767;
          display: flex;
          align-items: center;
          margin: 0 14px 14px 0;
          padding: 0 14px;
          border-radius: 4px;
          transition: background-color 0.15s linear;
          cursor: pointer;

          &:hover {
            background-color: #e4e6eb;
          }

          span {
            white-space: nowrap;
            line-height: 36px;
          }
        }
      }

      .label-list {
        .category-item {
          background-color: rgba(66, 129, 255, 0.1);
          color: @primary-color;

          &:hover {
            background-color: rgba(66, 129, 255, 0.16);
          }
        }
      }
    }
  }
}
</style> 