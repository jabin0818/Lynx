<template>
  <div id="uploadNotesMoudle">
    <el-dialog
      :visible="visible"
      :modal-append-to-body="false"
      title="发布笔记"
      width="640px"
      class="uploadNotesMoudle-dialog"
      :center="true"
      @open="open"
      @close="close"
    >
      <div class="uploadNotesMoudle-panel">
        <el-form v-model="notesForm">
          <el-form-item label="分类：">
            <el-cascader
              :options="options"
              v-model="notesForm.classification"
              :props="{
                checkStrictly: true,
                value: 'id',
                label: 'name',
                children: 'types',
              }"
              clearable
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="标签：">
            <el-select
              v-model="notesForm.tag"
              multiple
              :multiple-limit="3"
              filterable
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="封面：" class="coverImg">
            <el-upload
              class="avatar-uploader"
              :action="' '"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-change="fileChange"
              :auto-upload="false"
              :limit="1"
              :on-preview="preview"
              ref="upload"
              :disabled="showdeleteBtn"
            >
              <img v-if="imageUrl" :src="imageUrl" class="uploadAvatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div class="deleteBtn" v-if="imageUrl" @click="clearFile">
                <i class="el-icon-delete-solid"></i>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型：">
            <el-radio-group v-model="notesForm.notesType">
              <el-radio :label="1">原创</el-radio>
              <el-radio :label="2">转载</el-radio>
              <el-radio :label="3">翻译</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="摘要：">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="编辑笔记摘要"
              v-model="notesForm.textarea"
              :autosize="{ minRows: 3, maxRows: 6 }"
              show-word-limit
              maxlength="160"
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item label="权限：">
            <el-radio-group v-model="notesForm.permissions">
              <el-radio :label="1">全部可见</el-radio>
              <el-radio :label="2">仅我可见</el-radio>
              <el-radio :label="3">粉丝可见</el-radio>
              <el-radio :label="4">会员可见</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="链接笔记：">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="state"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            >
              <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick"
              >
              </i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.date }}</span>
              </template>
            </el-autocomplete>
          </el-form-item> -->
          <!-- <el-form-item label="链接视频：">
            <el-autocomplete
              popper-class="my-autocomplete"
              v-model="state"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            >
              <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick"
              >
              </i>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.date }}</span>
              </template>
            </el-autocomplete>
          </el-form-item> -->
        </el-form>
      </div>
      <div slot="footer" class="btn-list-wrapper">
        <div class="cancelupload-btn" @click="cancelUploadBtn()">
          <span v-show="!isLoading">取消</span>
        </div>
        <div class="cancelupload-btn" @click="saveAsDraftBtn()">
          <span v-show="!isLoading">保存为草稿</span>
          <i class="el-icon-loading" v-show="isLoading"></i>
        </div>
        <div
          class="cancelupload-btn uploadNotes-btn"
          @click="isUpdate ? updateNotesBtn(0) : uploadNotesBtn(0)"
        >
          <span v-show="!isLoading">发布笔记</span>
          <i class="el-icon-loading" v-show="isLoading"></i>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { articleCreate, getNotesType, updateNotes } from "@/api/notes";
import { getAllTags } from "@/api/tag";
import { mapState } from "vuex";

export default {
  name: "uploadNotes",
  props: {
    // articleTitleMap: {type: String, default: ""},
    // 笔记标题
    notesTitle: { type: String, default: "" },
    // 笔记内容
    markdownCode: { type: String, default: "" },
    htmlCode: { type: String, default: "" },
    visible: { type: Boolean, default: false },
    returnData: { type: Object, default: {} },
  },
  data() {
    return {
      options: [],
      uploadNotesForm: {},
      options2: [],
      value: [],
      list: [],
      loading: false,
      states: [],
      imageUrl: "",
      showdeleteBtn: false,
      isLoading: false,
      notesForm: {
        notesType: 0,
        permissions: 0,
        textarea: "",
        classification: [],
        tag: [],
      },
      //题图
      notesFile: null,
      isUpdate: false,
      restaurants: [], // 链接
      state: "",
    };
  },
  async mounted() {
    await this.getClassifyData();
    await this.getAllTagsData();

    this.restaurants = this.loadAll();
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "语文笔记", date: "2020-1-2" },
        { value: "数字笔记", date: "2020-1-2" },
        { value: "英语笔记", date: "2020-1-2" },
        { value: "政治笔记", date: "2020-1-2" },
        { value: "历史笔记", date: "2020-1-2" },
        { value: "化学笔记", date: "2020-1-2" },
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    open() {
      console.log("open");
    },
    close() {
      this.$emit("closeUploadModal");
    },
    remoteMethod(query) {
      console.log(query);
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options2 = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options2 = [];
      }
    },
    preview(file) {
      console.log(file);
    },
    handleAvatarSuccess(res, file) {
      //没用
      console.log("上传成功", res);
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl);
    },
    clearFile() {
      this.$refs.upload.clearFiles();
      this.notesFile = null;
      this.imageUrl = "";
      setTimeout(() => {
        this.showdeleteBtn = false;
      }, 200);
    },
    beforeAvatarUpload(file) {
      //没用
      console.log(file);
      // const isJPG = file.type === 'image/jpeg';
      // const isLt5M = file.size / 1024 / 1024 < 5;
      // // if (!isJPG) {
      // // this.$message.error('上传头像图片只能是 JPG 格式!');
      // // }
      // if (!isLt5M) {
      // this.$message.error('上传头像图片大小不能超过 5MB!');
      // }
      // return isJPG && isLt5M;
    },
    cancelUploadBtn() {
      this.close();
    },
    saveAsDraftBtn() {},
    async uploadNotesBtn(published) {
      // console.log(this.notesForm);
      let userId = this.$route.query.userId;
      if (this.notesTitle.length === 0) {
        this.$message.warning("标题不能为空");
        return;
      }

      if (this.htmlCode.length === 0 || this.markdownCode.length === 0) {
        this.$message.warning("内容不能为空");
        return;
      }

      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let classification = this.notesForm.classification.join("-");
      let tags = this.notesForm.tag.join(",");
      const data = new FormData();
      data.append("avatar", this.notesFile);
      data.append("title", this.notesTitle);
      data.append("content", this.markdownCode);
      data.append("description", this.notesForm.textarea);
      data.append("comment", 1); //是否开启评论
      data.append("permission", this.notesForm.permissions);
      data.append("published", published); //是否为草稿
      data.append("userId", this.userInfo.id);
      data.append("typeId", classification);
      data.append("share", this.notesForm.notesType);
      data.append("tags", tags);
      data.append("htmlContent", this.htmlCode);
      try {
        let result = await articleCreate(data);
        if (result.code === 200) {
          loading.close();
          this.close();
          this.$router.push({
            name: "published",
            params: {
              id: result.data,
              title: this.notesTitle,
              type: "note",
            },
            query: {
              userId: userId,
            },
          });
        } else {
          this.$message.error("发布笔记失败");
          loading.close();
        }
      } catch (error) {
        this.$message.error("网络繁忙");
        loading.close();
      }
    },
    async updateNotesBtn(published) {
      if (this.returnData.isMyself === false) {
        //不是用户发布的，不能随便修改
        this.$message.error("网络繁忙！");
        return;
      }
      if (this.notesTitle.length === 0) {
        this.$message.warning("标题不能为空");
        return;
      }

      if (this.htmlCode.length === 0 || this.markdownCode.length === 0) {
        this.$message.warning("内容不能为空");
        return;
      }

      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let userId = this.$route.query.userId;
      let classification = this.notesForm.classification.join("-");
      let tags = this.notesForm.tag.join(",");
      let blogId = this.$route.params.id;
      const data = new FormData();
      data.append("blogId", blogId);
      if (this.notesFile) {
        data.append("avatar", this.notesFile);
      }
      data.append("title", this.notesTitle);
      data.append("content", this.markdownCode);
      data.append("description", this.notesForm.textarea);
      data.append("comment", 1); //是否开启评论
      data.append("permission", this.notesForm.permissions);
      data.append("published", published); //是否为草稿
      data.append("userId", this.userInfo.id);
      data.append("typeId", classification);
      data.append("share", this.notesForm.notesType);
      data.append("tags", tags);
      let result = await updateNotes(data);
      if (result.code === 200) {
        console.log("成功");
        loading.close();
        this.close();
        this.$router.push({
          name: "published",
          params: {
            notesId: result.data.blogId,
            notesTitle: this.notesTitle,
          },
          query: {
            userId: userId,
          },
        });
      }
    },
    fileChange(file, fileList) {
      const format =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/jpg" ||
        file.raw.type === "image/png" ||
        file.raw.type === "image/gif";
      const isLt5M = file.raw.size / 1024 / 1024 < 5;
      if (fileList.length > 0) {
        //单个覆盖上传
        // this.HFfileList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的csv文件
        if (!format) {
          console.log("格式");
          this.$message.error("上传图片只能是JPG、PNG、GIF格式!");
          return false;
        } else if (!isLt5M) {
          console.log("大小");
          this.$message.error("上传图片大小不能超过 5MB!");
          // this.HFfileList = []
          return false;
        } else {
          console.log("ok");
          console.log(file.raw);
          this.imageUrl = URL.createObjectURL(file.raw);
          this.notesFile = file.raw; //待上传图片的url
          this.showdeleteBtn = true;
        }
      }
    },
    async getClassifyData() {
      let result = await getNotesType();
      if (result.code === 200) {
        this.options = result.data;
      }
    },
    async getAllTagsData() {
      let result = await getAllTags();
      if (result.code === 200) {
        this.list = result.data.map((item) => {
          return { value: `${item.id}`, label: `${item.name}` };
        });
        // this.options2 = result.data
      }
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  watch: {
    "returnData.flag": function (newValue) {
      console.log("flag", newValue);
      if (newValue === true) {
        // 修改笔记
        this.isUpdate = true;

        this.imageUrl = this.returnData.notesTitleMap;

        this.notesForm.notesType = this.returnData.notesType;

        this.notesForm.permissions = this.returnData.notesPermissions;

        this.notesForm.textarea = this.returnData.textarea;

        this.notesForm.classification = this.returnData.classification;

        this.notesForm.tag = this.returnData.tag;
      } else {
        // 是发布笔记
      }
    },
  },
};
</script>

<style lang="less" scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

/deep/ .coverImg {
  & > .el-form-item__content {
    line-height: 0px;
  }
}

.el-select {
  width: 500px;
}
.el-cascader .el-input {
  cursor: pointer;
  width: 500px;
}
/deep/ .el-textarea {
  width: 500px;
  .el-input__count {
    color: #909399;
    /* background: #FFF; */
    position: absolute;
    font-size: 12px;
    bottom: 3px;
    right: 9px;
    line-height: 20px;
  }
}
/deep/ .avatar-uploader .el-upload {
  width: 164px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.deleteBtn {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  line-height: 20px;
  background: hsla(0, 0%, 8%, 0.52);
  color: #fff;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  // width: 134px;
  line-height: 100px;
  text-align: center;
}
.uploadAvatar {
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  position: absolute;
  // width: 134px;
  // height: 82px;
  display: block;
}

#uploadNotesMoudle {
  .uploadNotesMoudle-dialog {
    .btn-list-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-top: 0;

      .cancelupload-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        height: 32px;
        background: #fff;
        border: 1px solid #e8e8ed;
        border-radius: 23px;
        font-size: 14px;
        font-weight: 500;
        color: #555666;
        margin-left: 20px;
        cursor: pointer;

        &:hover {
          border: 1px solid #555666;
        }
        span {
        }
        i {
        }
      }
      .uploadNotes-btn {
        background: @primary-color;
        border: none;
        color: #fff;

        &:hover {
          background: #2e70f4;
          border: none;
        }
        span {
        }
        i {
        }
      }
    }

    /deep/ .el-dialog__footer {
      padding: 0 20px 20px;
    }

    /deep/ .el-dialog--center .el-dialog__body {
      padding: 25px 25px 0;
    }

    /deep/ .el-dialog--center {
      margin-top: 9vh !important;
    }
  }
}
</style>