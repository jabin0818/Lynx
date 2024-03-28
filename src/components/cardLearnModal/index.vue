<template>
  <div class="cardLearnModal">
    <el-dialog
      :visible="visible"
      :modal-append-to-body="false"
      width="600px"
      class="cardLearnModal-dialog"
      :center="true"
      @open="open"
      @close="close"
    >
      <div class="learn-header-container" slot="title">
        <div class="learn-setting">
          <span class="setting-btn" @click="showSettingOption">
            <i class="el-icon-setting"></i>
          </span>
        </div>
        <div class="learn-progress">
          <div class="learn-title">
            <span class="select-icon">
              <i
                :class="
                  currentCardItem?.type === 1
                    ? 'el-icon-s-order'
                    : currentCardItem?.type === 2
                    ? 'el-icon-s-order'
                    : 'el-icon-s-finance'
                "
              ></i>
            </span>
            <span class="select-text">{{
              currentCardItem?.type ? cardTypeName[currentCardItem.type] : ""
            }}</span>
          </div>
          <div class="learn-progress-num">
            {{ learnCardIndex ? learnCardIndex + 1 : "1" }} /
            {{ cardList ? cardList.length : "" }}
          </div>
          <div class="learn-proficiency">
            <el-tooltip
              :content="
                currentCardItem ? statusView[currentCardItem.status] : ''
              "
              placement="bottom"
            >
              <div class="choice-skilled">
                <div class="stripes" ref="stripes">
                  <div
                    class="stripe"
                    :class="{ one: currentCardItem?.status >= 1 }"
                  ></div>
                  <div
                    class="stripe"
                    :class="{ two: currentCardItem?.status >= 2 }"
                  ></div>
                  <div
                    class="stripe"
                    :class="{ three: currentCardItem?.status >= 3 }"
                  ></div>
                  <div
                    class="stripe"
                    :class="{ four: currentCardItem?.status >= 4 }"
                  ></div>
                  <div
                    class="stripe"
                    :class="{ five: currentCardItem?.status >= 5 }"
                  ></div>
                </div>
              </div>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="learn-view-body" v-if="currentCardItem">
        <div class="rich-text-wrapper">
          <div class="front-editor-container" v-show="!isNotesCard">
            <Editor
              style="width: 100%; overflow-y: hidden"
              v-model="currentCardItem.title"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
          <div class="back-editor-container" v-show="isShowContent">
            <div class="card-edit-box">
              <Editor
                style="width: 100%; overflow-y: hidden"
                v-model="currentCardItem.content"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
              />
            </div>
            <div class="card-edit-empty">无内容</div>
            <div
              class="cover-button-wrapper"
              @click="!isNotesCard && hiddenContent()"
              v-show="!isNotesCard"
            >
              <div class="hide-content-btn">
                <i class="el-icon-thumb"></i>
                隐藏内容
              </div>
            </div>
          </div>
          <div class="card-info-container" v-if="currentCardItem.stuNum">
            <div class="card-info-item">
              已学习
              <div>{{ currentCardItem.stuNum }}次</div>
            </div>
            <div class="card-info-item">
              上次学习
              <div>{{ currentCardItem.lastTime }}</div>
            </div>
            <div class="card-info-item">
              需复习
              <div class="card-expired">{{ currentCardItem.reviewTime }}</div>
            </div>
          </div>
        </div>
        <div slot="footer" class="learn-footer-container">
          <template v-if="currentCardItem.stuNum !== 5">
            <div
              class="cardLearn-btn learn-footer-mastered"
              @click="remember"
              v-show="isShowContent"
            >
              <div class="footer-btn-content">
                <div class="learn-footer-ico">
                  <i class="el-icon-circle-check"></i>
                </div>
                <div class="learn-btn-text">
                  <div class="btn-title">学会了</div>
                  <div class="btn-desc">卡片已学习</div>
                </div>
              </div>
            </div>
            <div class="btn-segmentation" v-show="isShowContent"></div>
            <div
              class="cardLearn-btn learn-footer-keep"
              @click="forget"
              v-show="isShowContent"
            >
              <div class="footer-btn-content">
                <div class="learn-footer-ico">
                  <i class="el-icon-circle-close"></i>
                </div>
                <div class="learn-btn-text">
                  <div class="btn-title">还不会</div>
                  <div class="btn-desc">下次重新学习</div>
                </div>
              </div>
            </div>
            <div
              class="learn-footer-show-back"
              @click="showContent"
              v-show="!isShowContent"
            >
              <div class="show-answer">显示答案</div>
            </div>
          </template>
          <template v-else>
            <div class="learn-footer-show-back" @click="restart">
              <div class="show-answer">重新开始</div>
            </div>
          </template>
          <div
            class="learn-footer-edit"
            v-if="isMyself"
            @click="fromlearnToEditor()"
          >
            <div class="learn-footer-ico">
              <i class="el-icon-edit-outline"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="learn-view-pager">
        <div class="learn-pager learn-pager-pre" @click="lastCard()">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div class="learn-pager learn-pager-next" @click="nextCard()">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Editor } from "@wangeditor/editor-for-vue";
import { setUserCardInfo, restartCard } from "@/api/card";
import { mapState } from "vuex";
export default {
  name: "cardLearnModal",
  components: { Editor },
  props: {
    visible: { type: Boolean, default: false },
    cardList: { type: Array, default: [] },
    cardId: { type: Number, default: 0 },
    isMyself: { type: Boolean, default: true },
  },
  data() {
    return {
      isNotesCard: false, //是否是笔记卡片
      isShowContent: false,
      cardTypeName: [, "笔记卡片", "问答卡片", "主题卡片"],
      themeTitle: "",
      editor: null,
      mode: "default",
      editorConfig: { placeholder: "请输入内容...", readOnly: true },
      learnCardIndex: null,
      flag: true,
      statusView: {
        0: "没见过的新内容!",
        1: "需要多练练!",
        2: "需要多熟悉!",
        3: "要学会了!",
        4: "唾手可得!",
        5: "记忆满点!",
      },
    };
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  methods: {
    hiddenContent() {
      this.isShowContent = false;
    },
    showContent() {
      this.isShowContent = true;
    },
    //恢复
    restore() {
      this.isShowContent = false;
      this.isNotesCard = false;
    },
    init() {
      if (this.cardList) {
        if (this.cardList[this.learnCardIndex].type === 1) {
          this.isShowContent = true;
          this.isNotesCard = true;
        }
      }
    },
    open() {
      if (this.cardList) {
        let index = this.cardList.findIndex((item) => {
          return item.id === this.cardId;
        });
        if (index === -1) return;
        this.learnCardIndex = index;
        this.init();
      }
    },
    reset() {
      this.learnCardIndex = 0;
    },
    close() {
      console.log("close");
      this.restore();
      this.$emit("closeCardLearnModal");
    },
    showSettingOption() {
      this.$emit("showCardLearnMode");
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    fromlearnToEditor() {
      this.$emit("toEditorCardModal", this.cardList[this.learnCardIndex].id);
      this.close();
    },
    lastCard() {
      if (this.learnCardIndex !== 0) {
        this.restore();
        this.learnCardIndex--;
        this.init(this.learnCardIndex);
      }
    },
    nextCard() {
      if (this.learnCardIndex !== this.cardList.length - 1) {
        this.restore();
        this.learnCardIndex++;
        this.init(this.learnCardIndex);
      } else {
        this.$confirm("已学习完毕, 是否关闭?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.close();
          })
          .catch(() => {});
      }
    },
    async remember() {
      if (!this.isLogin) return;
      if (this.flag) {
        this.flag = false;
        let res = await setUserCardInfo(
          this.userInfo.id,
          this.cardList[this.learnCardIndex].id
        );
        if (res.code === 200) {
          this.flag = true;
          this.cardList[this.learnCardIndex].status++;
        }
        this.nextCard();
      }
    },
    forget() {
      this.nextCard();
    },
    async restart() {
      let res = await restartCard(
        this.userInfo.id,
        this.cardList[this.learnCardIndex].id
      );
      if (res.code === 200) {
        this.cardList[this.learnCardIndex].stuNum = 0;
        this.cardList[this.learnCardIndex].status = 0;
      }
    },
  },
  computed: {
    ...mapState("user", ["token", "isLogin", "userInfo"]),
    currentCardItem() {
      return this.cardList[this.learnCardIndex];
    },
  },
};
</script>

<style lang="less">
.cardLearnModal-dialog {
  .el-dialog {
    background-color: #f3f3f3;
    @media screen and (max-width: 424px) {
      width: 14rem !important;
      .el-dialog__body {
        padding: 10px 0 20px;
      }
    }

    .el-dialog__body {
      text-align: initial;
      padding: 5px 25px 30px;
    }
  }
}

.cardLearnModal {
  position: relative;

  .learn-header-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .learn-setting {
      position: absolute;
      left: 0;
      width: 44px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 50%;
      box-sizing: border-box;

      .setting-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;

        i {
          font-size: 24px;
          color: #585858;
        }

        &:hover {
          background: #e4e4e4;
        }
      }
    }

    .learn-progress {
      display: flex;
      flex-direction: column;
      align-items: center;
      .learn-title {
        display: flex;
        height: 34px;
        align-items: center;
        cursor: pointer;
        border-radius: 17px;
        padding: 0 14px 0 16px;
        margin: 0 auto;
        color: #535558;
        transition: all 0.3s;

        &:hover {
          background-color: #e4e4e4;
        }
        .select-icon {
          font-size: 18px;
        }

        .select-text {
          font-size: 16px;
          margin: 0 6px;
        }

        .select-arrow {
          font-size: 18px;
        }
      }

      .learn-progress-num {
        font-size: 14px;
        color: #5f5f64;
        text-align: center;
      }

      .learn-proficiency {
        margin-top: 8px;
        .choice-skilled {
          position: relative;
          float: left;
          height: 100%;
          width: 100px;
          padding: 4px 0;
          background-color: #fff;
          border-radius: 12px;
          // transition: all 0.5s;
          cursor: pointer;

          // &:hover {
          //   background-color: #f7f7f7;
          // }
          .stripes {
            float: left;
            display: flex;
            padding-right: 4px;
            & > .stripe {
              width: 16px;
              height: 4px;
              background: #ececec;
              border-radius: 2px;
              margin: 0 2px;
            }
            & > .one {
              background-color: #68aeb8;
            }
            & > .two {
              background-color: #43d281;
            }
            & > .three {
              background-color: #ff934d;
            }
            & > .four {
              background-color: #037889;
            }
            & > .five {
              background-color: #4281ff;
            }
          }
        }
      }
    }
  }

  .learn-view-body {
    position: relative;

    .rich-text-wrapper {
      background-color: #fff;
      border-radius: 6px;
      overflow: auto;
      min-height: 400px;
      max-height: 600px;

      .front-editor-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        overflow: hidden;
        border-bottom: 1px solid #eeeff0;
        padding-bottom: 10px;
      }

      .back-editor-container {
        .card-edit-box {
          border-radius: 0;

          padding-top: 10px;
        }

        .card-edit-empty {
          display: none;
          justify-content: center;
          align-items: center;
          height: 100%;
          font-size: 0.88em;
          color: #a5a5a7;
        }

        .cover-button-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          font-size: 0.88em;
          color: #a5a5a7;
          cursor: pointer;
          border-radius: 6px;
          // margin-top: 20px;
          margin: 20px 20px 0 20px;
          transition: background-color 0.25s;
          &:hover {
            background-color: #f8f8f8;
          }
          .hide-content-btn {
            position: relative;
            display: flex;
            align-items: center;
            font-size: 14px;
            i {
              font-size: 18px;
              margin-right: 5px;
            }
          }
        }
      }

      .card-info-container {
        display: flex;
        padding: 0 10px;
        color: #a5a5a7;
        font-size: 14px;
        margin: 20px;
        justify-content: space-around;
        .card-info-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;

          & > div {
            color: #5f5f64;
            margin-top: 2px;
          }

          .card-expired {
            color: #e56b4d;
          }
        }
      }
    }

    .learn-footer-container {
      width: 100%;
      display: flex;
      margin-top: 20px;
      justify-content: center;

      .cardLearn-btn {
        cursor: pointer;
        position: relative;
        background: #fff;
        border-radius: 8px;
        height: 56px;
        width: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;

        @media screen and (max-width: 424px) {
          width: 100px;
        }

        @media screen and (max-width: 320px) {
          width: 60px;
        }

        .footer-btn-content {
          display: flex;
          align-items: center;

          .learn-footer-ico {
            height: 36px;
            width: 36px;
            box-sizing: border-box;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
              color: @success-color;
              font-size: 32px;
            }
          }

          .learn-btn-text {
            margin-left: 10px;
            .btn-title {
              font-size: 16px;
              font-weight: 500;
              display: flex;
              align-items: center;
            }

            .btn-desc {
              font-size: 13px;
              color: #a5a5a7;
            }
          }
        }
      }
      .btn-segmentation {
        width: 60px;
      }
      .learn-footer-mastered {
        border: 1px solid @success-color;
        transition: opacity 0.2s;
        &:hover {
          opacity: 0.8;
        }
      }

      .learn-footer-keep {
        border: 1px solid @danger-color;
        transition: opacity 0.2s;
        &:hover {
          opacity: 0.8;
        }
        .footer-btn-content {
          .learn-footer-ico {
            i {
              color: @danger-color;
            }
          }
        }
      }

      .learn-footer-show-back {
        cursor: pointer;
        position: relative;
        // background: #fff;
        border-radius: 8px;
        // height: 56px;
        // width: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        .show-answer {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 140px;
          height: 40px;
          font-size: 16px;
          font-weight: 500;
          padding: 0 25px;
          box-sizing: border-box;
          border-radius: 4px;
          cursor: pointer;
          background: @primary-color;
          color: #fff;
          text-decoration: none;
          user-select: none;
          border: none;
          outline: none;
        }
      }

      .learn-footer-edit {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        width: 40px;
        height: 40px;
        cursor: pointer;
        background: #fff;
        border-radius: 8px;
        user-select: none;

        .learn-footer-ico {
          height: 36px;
          width: 36px;
          box-sizing: border-box;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #585858;
          cursor: pointer;
          i {
            font-size: 22px;
          }
        }
      }
    }
  }

  .learn-view-pager {
    .learn-pager {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #d5d5d5;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.4);
      }

      i {
        font-size: 24px;
      }
    }

    .learn-pager-pre {
      left: -76px;
    }

    .learn-pager-next {
      right: -76px;
    }
  }
}
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
