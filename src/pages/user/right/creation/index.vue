<template>
  <div id="user-creation" v-if="$route.params.id === userInfo.id">
    <div class="user-creation-headers">
      <div class="uc-headers-left">
        <i type=""></i>
        <span>创作中心</span>
      </div>
      <div class="uc-headers-right">
        草稿箱
        <span>(13)</span>
      </div>
    </div>
    <div class="user-creation-body">
      <div class="user-creation-write">
        <div class="uc-write-navTop">
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
          <div class="write-navTop-item write-dynamic" @click="toDynamicUpload">
            <div class="item-navIcon">
              <i class="iconfont icon-dongtai1"></i>
            </div>
            <div class="item-navTitle">发动态</div>
          </div>
        </div>
      </div>
      <div class="enter-creation-center" @click="toCreator">
        <span>进入创作中心</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Creation",
  data() {
    return {};
  },
  methods: {
    getRands(length = 5) {
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let rands = arr
        .sort(() => Math.random() - 0.5)
        .slice(0, length)
        .join("");
      return Number(rands);
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
    toCreator() {
      this.$router.push(`/creator/home`);
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
#user-creation {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);

  .user-creation-headers {
    display: flex;
    height: 40px;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    border-bottom: 1px solid #f6f6f6;

    .uc-headers-left {
      font-synthesis: style;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;

      i {
      }

      span {
      }
    }
    .uc-headers-right {
      color: rgb(133, 144, 166);
      font-size: 12px;
      cursor: pointer;

      span {
        color: rgb(68, 68, 68);
      }
    }
  }

  .user-creation-body {
    padding: 12px 0;

    .user-creation-write {
      .uc-write-navTop {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        position: relative;
        padding: 8px 0 20px;

        .write-navTop-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 50px;
          cursor: pointer;

          .item-navIcon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-bottom: 6px;
            transition: all 0.2s;

            i {
              font-size: 20px;
            }
          }

          &:nth-child(1) .item-navIcon {
            background-color: rgba(66, 129, 255, 0.2);

            &:hover {
              background-color: rgba(66, 129, 255, 0.4);
            }

            i {
              color: @primary-color;
            }
          }

          &:nth-child(2) .item-navIcon {
            background-color: rgba(103, 194, 58, 0.2);

            &:hover {
              background-color: rgba(103, 194, 58, 0.4);
            }

            i {
              color: @success-color;
            }
          }

          &:nth-child(3) .item-navIcon {
            background-color: rgba(230, 162, 60, 0.2);

            &:hover {
              background-color: rgba(230, 162, 60, 0.4);
            }

            i {
              color: @warning-color;
            }
          }

          &:nth-child(4) .item-navIcon {
            background-color: rgba(245, 108, 108, 0.2);

            &:hover {
              background-color: rgba(245, 108, 108, 0.4);
            }

            i {
              color: @danger-color;
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

    .enter-creation-center {
      margin: 0px 12px 6px;
      min-width: 0px;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      display: flex;
      border: 1px solid rgba(5, 109, 232, 0.5);
      color: #fff;
      background-color: @primary-color;
      border-radius: 4px;
      cursor: pointer;
      height: 40px;
      font-size: 15px;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.7;
      }
      span {
      }

      i {
      }
    }
  }
}
</style>