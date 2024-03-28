<template>
  <div class="cardModal">
    <el-dialog
      :visible="visible"
      :modal-append-to-body="false"
      width="720px"
      class="cardModal-dialog"
      :center="true"
      @open="open"
      @close="close"
    >
      <div class="card-type-select" slot="title">
        <div class="select-btn" @click="showChangeType()">
          <span class="select-icon">
            <i
              :class="
                cardType === 1
                  ? 'el-icon-s-order'
                  : cardType === 2
                  ? 'iconfont icon-V'
                  : 'el-icon-s-finance'
              "
            ></i>
          </span>
          <span class="select-text">{{ cardTypeName[cardType] }}</span>
          <span class="select-arrow">
            <i class="el-icon-caret-bottom"></i>
          </span>
        </div>
        <div class="dropdown-menu-container" v-show="showTypeMenu">
          <div class="select-panel">
            <div
              :class="
                cardType === 1
                  ? 'type-select-item current-selected'
                  : 'type-select-item'
              "
              @click="changeCardType($event, 1)"
            >
              <div class="type-item-icon">
                <i class="el-icon-s-order"></i>
              </div>
              <div class="type-item-detail">
                <div class="type-title">笔记卡片</div>
                <div class="type-desc">摘录、灵感、读书笔记等</div>
              </div>
            </div>
            <div
              :class="
                cardType === 2
                  ? 'type-select-item current-selected'
                  : 'type-select-item'
              "
              @click="changeCardType($event, 2)"
            >
              <div class="type-item-icon">
                <i class="iconfont icon-V"></i>
              </div>
              <div class="type-item-detail">
                <div class="type-title">问答卡片</div>
                <div class="type-desc">问答类型的知识点、语言词条等</div>
              </div>
            </div>
            <div
              :class="
                cardType === 3
                  ? 'type-select-item current-selected'
                  : 'type-select-item'
              "
              @click="changeCardType($event, 3)"
            >
              <div class="type-item-icon">
                <i class="el-icon-s-finance"></i>
              </div>
              <div class="type-item-detail">
                <div class="type-title">主题卡片</div>
                <div class="type-desc">概念介绍、名词解释等</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-wrapper">
        <div class="form-wrapper">
          <div class="notes-wrapper" v-show="cardType === 1">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="width: 100%; height: 500px; overflow-y: hidden"
              v-model="html"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
          <div class="Qas-wrapper" v-show="cardType === 2">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor1"
              :defaultConfig="toolbarConfig1"
              :mode="mode1"
            />
            <Editor
              style="width: 100%; height: 250px; overflow-y: hidden"
              v-model="html1"
              :defaultConfig="editorConfig1"
              :mode="mode1"
              @onCreated="onCreated1"
            />
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor2"
              :defaultConfig="toolbarConfig2"
              :mode="mode2"
            />
            <Editor
              style="width: 100%; height: 246px; overflow-y: hidden"
              v-model="html2"
              :defaultConfig="editorConfig2"
              :mode="mode2"
              @onCreated="onCreated2"
            />
          </div>
          <div class="theme-wrapper" v-show="cardType === 3">
            <el-input
              class="title"
              placeholder="请输入标题"
              v-model="themeTitle"
              show-word-limit
              maxlength="100"
            />
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor3"
              :defaultConfig="toolbarConfig3"
              :mode="mode3"
            />
            <Editor
              style="width: 100%; height: 475px; overflow-y: hidden"
              v-model="html3"
              :defaultConfig="editorConfig3"
              :mode="mode3"
              @onCreated="onCreated3"
            />
          </div>
        </div>
        <div slot="footer" class="btn-wrapper">
          <div class="card-btn" @click="saveCard">
            <span v-show="!isLoading1">保存</span>
            <i class="el-icon-loading" v-show="isLoading1"></i>
          </div>
          <div class="btn-segmentation"></div>
          <div class="card-btn" @click="finishCard">
            <span v-show="!isLoading2">完成</span>
            <i class="el-icon-loading" v-show="isLoading2"></i>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// import { DomEditor } from '@wangeditor/editor'
import { insertStudyCard } from "@/api/card";

export default {
  name: "CardModal",
  components: { Editor, Toolbar },
  props: {
    visible: { type: Boolean, default: false },
    cardData: { type: Object },
  },
  data() {
    return {
      isCreation: false, //是否是新建卡片
      isLoading1: false,
      isLoading2: false,
      showTypeMenu: false,
      cardType: 1,
      cardTypeName: [, "笔记卡片", "问答卡片", "主题卡片"],
      themeTitle: "",
      editor: null,
      editor1: null,
      editor2: null,
      editor3: null,
      html: "<p>请输入笔记内容</p>",
      html1: "<p>请输入问题</p>", //问题
      html2: "<p>请输入回答</p>", //回答
      html3: "<p>请输入解释内容</p>", //回答
      toolbarConfig: {
        // toolbarKeys:[
        //  'headerSelect',

        //  // 分割线
        //  '|',

        //  // 菜单 key
        //  'bold', 'italic',
        //  {
        //      key: 'group-more-style', // 必填，要以 group 开头
        //      title: '更多样式', // 必填
        //      iconSvg: '<svg>....</svg>', // 可选
        //      menuKeys: ["through", "code", "clearStyle"] // 下级菜单 key ，必填
        //  },
        // ],
        excludeKeys: [
          "group-video",
          "fullScreen",
          "todo",
          // 排除菜单组，写菜单组 key 的值即可
        ],
      },
      toolbarConfig1: {
        excludeKeys: [
          "clearStyle",
          "group-video",
          "fullScreen",
          "todo",
          "insertLink",
          "group-indent",
          "insertTable",
          "insertVideo",
          "justifyLeft",
          "justifyRight",
          "justifyCenter",
          "undo",
          "redo",
        ],
      },
      toolbarConfig2: {
        excludeKeys: [
          "clearStyle",
          "headerSelect",
          "group-video",
          "fullScreen",
          "todo",
          "insertLink",
          "group-justify",
          "insertTable",
          "insertVideo",
          "justifyLeft",
          "justifyRight",
          "justifyCenter",
          "undo",
          "redo",
        ],
      },
      toolbarConfig3: {
        excludeKeys: [
          "clearStyle",
          "headerSelect",
          "group-video",
          "fullScreen",
          "todo",
          "insertLink",
          "group-justify",
          "insertTable",
          "insertVideo",
          "justifyLeft",
          "justifyRight",
          "justifyCenter",
          "undo",
          "redo",
        ],
      },
      editorConfig: { placeholder: "请输入内容..." },
      editorConfig1: { placeholder: "请输入问题..." },
      editorConfig2: { placeholder: "请输入答案..." },
      editorConfig3: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
      mode1: "simple", // or 'simple'
      mode2: "simple", // or 'simple'
      mode3: "simple", // or 'simple'
    };
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
    //   // console.log(this.editor);
    //   // const toolbar = DomEditor.getToolbar(this.editor1)
    //   // const curToolbarConfig = toolbar.getConfig()
    //   // console.log( curToolbarConfig.toolbarKeys )
    // }, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  methods: {
    clearData() {
      console.log(this.isCreation);
      if (this.isCreation) {
        this.cardType = 1;
        this.html = "<p></p>";
        this.html1 = "<p></p>"; //问题
        this.html2 = "<p></p>"; //回答
        this.html3 = "<p></p>"; //回答
      }
    },
    open() {
      if (this.cardData) {
        this.isCreation = false;
        this.cardType = this.cardData.type;
        if (this.cardData.type === 1) {
          this.html = this.cardData.content;
        } else if (this.cardData.type === 2) {
          this.html1 = this.cardData.title;
          this.html2 = this.cardData.content;
        } else if (this.cardData.type === 3) {
          this.themeTitle = this.cardData.title;
          this.html3 = this.cardData.content;
        }
      } else {
        this.isCreation = true;
        this.clearData();
      }
    },
    close() {
      this.showTypeMenu = false;
      this.clearData();
      this.$emit("closeCardModal");
    },
    showChangeType() {
      this.showTypeMenu = !this.showTypeMenu;
    },
    changeCardType(event, cardType) {
      if (event && cardType) {
        let dom = document.querySelector(".current-selected");
        if (dom) {
          dom.classList.remove("current-selected");
        }
        event.currentTarget.classList.add("current-selected");
        this.cardType = cardType;
        this.showTypeMenu = !this.showTypeMenu;

        if (this.isCreation === false) {
          if (cardType === 1) {
            this.html = this.cardData.content;
          } else if (cardType === 2) {
            this.html1 = this.cardData.title;
            this.html2 = this.cardData.content;
          } else if (cardType === 3) {
            this.themeTitle = this.cardData.title;
            this.html3 = this.cardData.content;
          }
        }
      }
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    onCreated1(editor) {
      this.editor1 = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    onCreated2(editor) {
      this.editor2 = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    onCreated3(editor) {
      this.editor3 = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    saveCard() {
      let title = "";
      let content = "";
      if (this.cardType === 1) {
        title = "";
        content = this.html;
      } else if (this.cardType === 2) {
        title = this.html1;
        content = this.html2;
      } else if (this.cardType === 3) {
        title = this.themeTitle;
        content = this.html3;
      }
      if (this.isCreation) {
        console.log("是新建");
        this.$emit("cardCreation", {
          type: this.cardType,
          title: title,
          content: content,
          isCreation: true,
        });
      } else {
        console.log("是编辑");
        this.$emit("cardCreation", {
          type: this.cardType,
          title: title,
          content: content,
          isCreation: false,
        });
      }
      this.isCreation = false;
    },
    finishCard() {
      this.saveCard();
      this.close();
      this.isCreation = true;
    },
  },
};
</script>

<style lang="less">
.cardModal-dialog {
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

.cardModal {
  .card-type-select {
    position: relative;
    width: 300px;
    margin: 0 auto;
    .select-btn {
      width: 142px;
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

    .dropdown-menu-container {
      position: absolute;
      padding: 6px 0;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 0 0 1px rgb(15 15 15 / 5%), 0 3px 6px rgb(15 15 15 / 10%);
      z-index: 999;

      .select-panel {
        display: flex;
        flex-direction: column;
        padding: 0 12px 12px;

        .type-select-item {
          display: flex;
          align-items: center;
          background: #f0f0f0;
          margin-top: 12px;
          border-radius: 4px;
          padding: 12px;
          cursor: pointer;
          border: 1px solid transparent;

          &.current-selected {
            background: rgba(66, 129, 255, 0.1);
            border: 1px solid #b9daef;
          }

          .type-item-icon {
            i {
              font-size: 18px;
            }
          }

          .type-item-detail {
            margin-left: 8px;
            .type-title {
              font-weight: 500;
              font-size: 16px;
              text-align: left;
            }

            .type-desc {
              font-size: 14px;
              margin-top: 4px;
              color: #5f5f64;
            }
          }
        }
      }
    }
  }

  .card-wrapper {
    // width: 400px;

    .form-wrapper {
      // margin-top: 30px;

      .notes-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        border-radius: 4px;
        overflow: hidden;
      }

      .Qas-wrapper {
      }

      .theme-wrapper {
        input {
          width: 100%;
          display: inline-block;
          white-space: pre-wrap;
          overflow-wrap: break-word;
          height: 64px;
          font-size: 30px;
          line-height: 1.45em;
          min-height: 1.45em;
          border: 0;
          outline: none;
          position: relative;
        }
      }
    }

    .btn-wrapper {
      width: 100%;
      display: flex;
      margin-top: 20px;
      justify-content: center;

      .card-btn {
        box-sizing: border-box;
        width: 140px;
        height: 40px;
        border-radius: 8px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        background-color: @primary-color;
        color: #fff;

        @media screen and (max-width: 424px) {
          width: 100px;
        }

        @media screen and (max-width: 320px) {
          width: 60px;
        }
      }
      .btn-segmentation {
        width: 60px;
      }
    }
  }
}
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
