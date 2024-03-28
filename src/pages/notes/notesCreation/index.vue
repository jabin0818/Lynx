<template>
  <el-container id="write-notes">
    <el-header class="write-notes-header">
      <div class="editor-header">
        <!-- <div class="link-box">
                        <i class="el-icon-arrow-left"></i>
                        <span class="back">返回</span>
                    </div> -->
        <div class="input-box">
          <el-input
            placeholder="输入笔记标题..."
            v-model="notesTitle"
            show-word-limit
            maxlength="100"
          />
        </div>
        <div class="user-box">
          <div class="btn-save">
            {{ returnShowForm.flag ? "更新" : "保存" }}草稿
          </div>
          <div class="btn-save btn-publish" @click="uploadNotes">
            {{ returnShowForm.flag ? "更新" : "发布" }}
          </div>
          <el-popover
            placement="bottom"
            width="130"
            height="60"
            :close-delay="100"
            trigger="hover"
          >
            <p class="editor-switcher-panel">切换为富文本编辑器</p>
            <div class="editor-switcher" slot="reference">
              <i class="el-icon-sort"></i>
            </div>
          </el-popover>
          <div class="user-avatar" @click="toUserCenter">
            <img :src="userInfo.avatar" />
          </div>
        </div>
      </div>
    </el-header>
    <el-main class="write-notes-main">
      <mavon-editor
        ref="md"
        @imgAdd="imgAdd"
        @change="markdownChange"
        v-model="markdownCode"
        :toolbars="toolbars"
        toolbarsBackground="#f4f4f4"
        codeStyle="obsidian"
        boxShadowStyle=""
        :placeholder="'开始编辑你的笔记吧！'"
      ></mavon-editor>
      <SideToolbar />
    </el-main>
    <UploadNotes
      :visible="uploadNotesVisible"
      :htmlCode="htmlCode"
      :markdownCode="markdownCode"
      :notesTitle="notesTitle"
      :returnData="returnShowForm"
      @closeUploadModal="() => (uploadNotesVisible = false)"
    />
  </el-container>
</template>

<script>
import UploadNotes from "./uploadNotes/index.vue";
import { uploadPicture, getNotesDetail } from "@/api/notes.js";
import { mapState } from "vuex";
import SideToolbar from "@/components/sideToolbar/index";

export default {
  name: "WriteNotes",
  components: {
    UploadNotes,
    SideToolbar,
  },

  data() {
    return {
      uploadNotesVisible: false,
      //笔记标题
      notesTitle: "",
      //笔记内容
      htmlCode: "",
      markdownCode: "",
      toolbars: {
        // 粗体
        bold: true,
        // 斜体
        italic: true,
        // 标题
        header: true,
        // 下划线
        underline: true,
        // 中划线
        strikethrough: true,
        // 标记
        mark: true,
        // 上角标
        superscript: true,
        // 下角标
        subscript: true,
        // 引用
        quote: true,
        // 有序列表
        ol: true,
        // 无序列表
        ul: true,
        // 链接
        link: true,
        // 图片链接
        imagelink: true,
        // code
        code: true,
        // 表格
        table: true,
        // 全屏编辑
        fullscreen: true,
        // 沉浸式阅读
        readmodel: true,
        // 展示html源码
        htmlcode: true,
        // 帮助
        help: true,
        /* 1.3.5 */
        // 上一步
        undo: true,
        // 下一步
        redo: true,
        // 清空
        trash: true,
        // 保存（触发events中的save事件）
        save: false,
        /* 1.4.2 */
        // 导航目录
        navigation: true,
        /* 2.1.8 */
        // 左对齐
        alignleft: true,
        // 居中
        aligncenter: true,
        // 右对齐
        alignright: true,
        /* 2.2.1 */
        // 单双栏模式
        subfield: false,
        // 预览
        preview: true,
      },
      //回显表单
      returnShowForm: {
        notesTitleMap: "", //题图，用于编辑时回显
        notesType: "", //类型 原创 转载 翻译
        notesPermissions: 0, //权限
        textarea: "", //简介
        classification: [], //分类
        tag: [], //标签
        flag: false,
        publish: 0,
        share: 0,
        isMyself: null, //是否是用户发布的笔记
      },
    };
  },
  created() {},
  async mounted() {
    if (this.$route.params.id) {
      console.log("编辑笔记");
      await this.getNotesById();
    }
  },
  methods: {
    imgAdd(pos, $file) {
      // 校验图片大小（不能超过5M）
      if ($file.size > 5 * 1024 * 1024) {
        this.$message.warning("请选择 5M 以下的图片");
        this.$refs.md.$img2Url(pos, null);
        return;
      }
      // 第一步.将图片上传到服务器.
      const formData = new FormData();
      console.log($file);
      formData.append("img", $file);
      formData.append("userId", this.userInfo.id);
      uploadPicture(formData)
        .then((res) => {
          /**
           * $vm指为mavonEditor实例，可以通过如下两种方式获取
           * 1、通过引入对象获取: import {mavonEditor} from ... 等方式引入后，此时$vm即为mavonEditor
           * 2、通过$refs获取: html声明ref : <mavon-editor ref=md ></mavon-editor>， 此时$vm为 this.$refs.md`（我使用$vm反正是不行的）
           */
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          // console.log(res);
          this.$refs.md.$img2Url(pos, res.data);
        })
        .catch((err) => {
          this.$message.error("上传图片失败");
        });
    },
    uploadNotes() {
      this.uploadNotesVisible = true;
    },
    async getNotesById() {
      let userId = this.$route.query.userId;
      let notesId = this.$route.params.id;
      let res = await getNotesDetail(notesId, userId);
      if (res.code === 200) {
        if (res.data.userId !== this.userInfo.id) {
          //路径上的笔记id 不是 当前登录的用户发布的，不能修改
          this.returnShowForm.flag = true;
          this.returnShowForm.isMyself = false;
        } else {
          this.publish = res.data.published;
          // 标题
          this.notesTitle = res.data.title;
          // 内容
          this.markdownCode = res.data.content;
          // 题图
          this.returnShowForm.notesTitleMap = res.data.firstImg;
          // 类型
          this.returnShowForm.notesType = res.data.share;
          // 权限
          this.returnShowForm.notesPermissions = res.data.permission;
          // 简介
          this.returnShowForm.textarea = res.data.description;
          // 分类
          this.returnShowForm.classification = res.data.typeId.split("-");
          // 标签
          this.returnShowForm.tag = res.data.tag.split(",");

          this.returnShowForm.flag = true; //用于判断是否是回显

          this.returnShowForm.isMyself = true;
          // 标签
          // res.data.labelDTOS.forEach((item) => {
          // this.articleLabel.push(item.id);
          // })
        }
      }
    },
    // markdown编辑改变事件
    markdownChange() {
      this.htmlCode = this.$refs.md.d_render;
      // this.markdownCode = this.$refs.md.d_value;
    },
    toUserCenter() {
      this.$router.push(`/user/${this.userInfo.id}`);
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
.editor-switcher-panel {
  text-align: center;
  padding: 8px 0;
}
#write-notes {
  width: 100%;
  height: 100vh;
  font-size: 18px;
  .write-notes-header {
    .editor-header {
      display: flex;
      align-items: center;
      padding: 0 27px;
      height: 64px;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      z-index: 100;

      .link-box {
      }

      .input-box {
        flex: 1 1 auto;
        height: 100%;

        .el-input {
          height: 100%;

          input {
            height: 100%;
            margin: 0;
            padding: 0;
            font-size: 24px;
            font-weight: 500;
            color: #1d2129;
            border: none;
            outline: none;
          }
        }
      }

      .user-box {
        display: flex;
        -webkit-box-align: center;
        align-items: center;

        .btn-save {
          height: 32px;
          margin-left: 8px;
          margin-right: 8px;
          padding: 2px 16px;
          font-size: 14px;
          line-height: 28px;
          border: 1px solid @primary-color;
          border-radius: 2px;
          cursor: pointer;
          color: @primary-color;
          background-color: #fff;
          box-sizing: border-box;
          border-radius: 6px;
        }

        .btn-publish {
          color: #fff;
          background-color: @primary-color;
        }

        .editor-switcher {
          margin-left: 8px;
          margin-right: 8px;
          font-size: 20px;
          line-height: 1;
          vertical-align: middle;
          color: #909090;
          cursor: pointer;
          border-radius: 2px;
          padding: 4px;
          transition: background-color 0.25s;

          &:hover {
            background-color: #e5e6eb;
          }

          i {
            transform: rotate(-90deg);
          }
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .el-main {
    padding: 0;
  }

  .write-notes-main {
    width: 100%;
    height: 100%;

    .v-note-wrapper.shadow {
      height: 100%;
    }
  }
}
</style>