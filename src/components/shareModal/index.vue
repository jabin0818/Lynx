<template>
  <div class="shareModal" v-if="conditions(shareDetailInfo)">
    <el-dialog
      :visible="shareVisible"
      width="560px"
      class="shareModal-dialog"
      :center="true"
      @open="open"
      @close="close"
      title="分享到我的动态"
    >
      <div class="shareModal-wrapper">
        <div class="body-wrapper">
          <div class="textare">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="写段文字和朋友讨论一下吧！"
              v-model="shareContent"
              :autosize="{ minRows: 3, maxRows: 14 }"
              resize="none"
              class="share-textarea-wrapper"
            />
            <div class="emoji-container">
              <i class="iconfont icon-emoji"></i>
            </div>
          </div>
          <div class="shareContent">
            <div class="shareContent-author">
              <div class="img">
                <img :src="shareDetailInfo.avatar" alt="" />
              </div>
              <div class="name">{{ shareDetailInfo.author }}</div>
              <div class="type">的投稿卡片</div>
            </div>
            <div class="shareContent-container">
              <div class="shareContent-left">
                <img :src="shareDetailInfo.cover" alt="" />
                <div class="mask">
                  <span class="duration" v-if="shareDetailInfo.videoTime">{{ shareDetailInfo.videoTime }}</span>
                </div>
                <div class="type-tag">
                  <span class="type-text">{{ typeView[shareDetailInfo.typeOf] }}</span>
                </div>
              </div>
              <div class="shareContent-right">
                <div class="shareContent-right-title">
                  <span>
                    {{ shareDetailInfo.title }}
                  </span>
                </div>
                <div class="shareContent-right-intro">
                  <span
                    >{{ shareDetailInfo.desc }}</span
                  >
                </div>
                <div class="shareContent-right-playinfo">
                  <span class="amount amount-play">
                    <i class="el-icon-video-play" v-if="shareDetailInfo.typeOf === 3"></i>
                    <i class="iconfont icon-good" v-else></i>
                    <span class="text">{{ shareDetailInfo.typeOf === 3 ? shareDetailInfo.viewNum: shareDetailInfo.likeNum}}</span>
                  </span>
                  <span class="amount amount-comment">
                    <i class="el-icon-chat-line-round" v-if="shareDetailInfo.typeOf === 3"></i>
                    <i class="el-icon-star-off" v-else></i>
                    <span class="text">{{ shareDetailInfo.typeOf === 3 ? shareDetailInfo.commentNum: shareDetailInfo.starNum }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="submitBtn-wrapper">
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormBtn">发 布</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {shareDynamic} from "@/api/dynamic"
export default {
  name: "ShareModal",
  data() {
    return {
      shareContent: "",
      typeView: ['','笔记','卡片','视频']
    };
  },
  methods: {
    open() {},
    close() {
      this.$store.state.global.shareVisible = false;
    },
    async submitFormBtn() {
      if(!this.isLogin) return;
      let res = await shareDynamic(this.userInfo.id,this.userInfo.username,this.userInfo.avatar,this.shareContent,null,this.shareDetailInfo.typeOf,this.shareDetailInfo.linkId)
      if(res.code === 200) {
        this.$message.success("分享成功！")
        this.shareContent = ""
        this.close()
      } else {
        this.$message.error("分享失败！")
      }
    },
    conditions(data) {
      return JSON.stringify(data) !== "{}" 
    }
  },
  computed: {
    ...mapState("global", ["shareVisible", "shareDetailInfo"]),
    ...mapState("user", ["isLogin","userInfo",]),
    
  },
};
</script>

<style lang="less" scoped>
.shareModal {
  .shareModal-dialog {
    .shareModal-wrapper {
      .body-wrapper {
        margin-bottom: 20px;

        .textare {
          .share-textarea-wrapper {
            /deep/ .el-textarea__inner {
              font-size: 16px;
              &::-webkit-scrollbar {
                width: 6px;
                height: 6px;
                border-radius: 8px;
                background-color: rgba(255, 255, 255, 0.1);
              }

              /*定义滚动条轨道 内阴影+圆角*/
              &::-webkit-scrollbar-track {
                box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
                border-radius: 8px;
                background-color: #f5f5f5;
              }

              /*定义滑块 内阴影+圆角*/
              &::-webkit-scrollbar-thumb {
                border-radius: 8px;
                box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
                background-color: #c8c8c8;
              }
            }
          }
          .emoji-container {
            cursor: pointer;
            padding: 10px 0;
            i {
              font-size: 24px;
              color: #92929d;
              &:hover {
                color: #303133;
              }
            }
          }
        }

        .shareContent {
          background-color: #f4f5f7;
          border-radius: 6px;
          padding: 10px;

          .shareContent-author {
            display: flex;
            align-items: center;
            padding-bottom: 10px;
            .img {
              width: 35px;
              height: 35px;
              margin-right: 6px;

              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

            .name {
              color: #020202;
              font-size: 14px;
              margin-right: 6px;
            }

            .type {
              font-size: 12px;
              color: #999;
            }
          }

          .shareContent-container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            min-width: 100px;
            height: 128px;
            background-color: #fff;
            border-radius: 6px;
            border: 1px solid #dcdfe6;
            .shareContent-left {
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
                  // display: inline-block;
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

            .shareContent-right {
              width: 60%;
              padding: 10px;
              .shareContent-right-title {
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

              .shareContent-right-intro {
                font-size: 14px;
                color: #666;
                margin-bottom: 6px;
                overflow: hidden;
                white-space: normal;
                word-break: break-word;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }

              .shareContent-right-playinfo {
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

      .submitBtn-wrapper {
        text-align: center;
      }
    }
  }
}
</style>