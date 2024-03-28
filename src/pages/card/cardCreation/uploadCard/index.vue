<template>
  <div id="uploadCardMoudle">
    <el-dialog
      :visible="visible"
      :modal-append-to-body="false"
      :title="title"
      width="640px"
      class="uploadCardMoudle-dialog"
      :center="true"
      @open="open"
      @close="close"
    >
      <div class="uploadCardMoudle-panel">
        <el-form v-model="cardForm" :label-position="'right'" label-width="200">
          <el-form-item label="分类：">
            <el-cascader
              :options="options"
              v-model="cardForm.classification"
              :props="{
                checkStrictly: true,
                value: 'id',
                label: 'name',
                children: 'types',
              }"
              @change="classifyChange"
              clearable
              class="cardForm-classify-input"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="标签：">
            <el-select
              v-model="cardForm.tag"
              value-key=""
              multiple
              :multiple-limit="3"
              filterable
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
              @change="tagsChange"
              class="cardForm-tags-input"
            >
              <el-option
                v-for="item in tagsList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="btn-list-wrapper">
        <div class="cancelupload-btn" @click="submit()">
          <span v-show="!isLoading">确定</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { articleCreate, getNotesType, updateNotes } from "@/api/notes";
import { uploadCardSets, changeCardSetInfo } from "@/api/card";
import { getAllTags } from "@/api/tag";
import { mapState } from "vuex";

export default {
  name: "uploadCard",
  props: {
    visible: { type: Boolean, default: false },
    returnData: { type: Object, default: {} },
    isUpload: { type: Boolean, default: true },
  },
  data() {
    return {
      cardForm: {
        classification: [],
        classificationView: [],
        tag: [],
        tagView: [],
      },
      options: [],
      options2: [],
      loading: false,
      isLoading: false,
      tagsList: [],
    };
  },
  async mounted() {
    await this.getClassifyData();
    await this.getAllTagsData();
  },
  methods: {
    classifyChange(e) {},
    tagsChange(e) {},
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    open() {
      console.log("open");
    },
    close(isPublished) {
      console.log(this.cardForm.classification);
      let firstType;
      this.cardForm.classificationView = this.cardForm.classification.map(
        (item1, index1) => {
          if (index1 === 0) {
            firstType = this.options.find((item2) => {
              return item1 === item2.id;
            });
            return firstType.name;
          } else if (index1 === 1) {
            return firstType.types.find((item2) => {
              return item1 === item2.id;
            }).name;
          }
        }
      );
      this.cardForm.tagView = this.cardForm.tag.map((item1) => {
        return this.tagsList.find((item2) => {
          return item1 === item2.id;
        }).name;
      });
      // this.cardForm.classificationView =
      this.$emit("closeUploadCardModal", { ...this.cardForm, isPublished });
    },
    async submit() {
      if (this.cardForm.classification.length === 0) {
        this.$message.error("卡片分类不能为空！");
        return;
      }
      if (!this.$route.params.id) return;
      let tags = this.cardForm.tag.join(",");
      let classification = this.cardForm.classification.join("-");
      console.log(this.isUpload);
      if (this.isUpload) {
        // 发布卡片集
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        try {
          let result = await uploadCardSets(
            this.$route.params.id,
            tags,
            classification
          );
          console.log("发布卡片集的接口：", result);
          if (result.code === 200) {
            this.$message.success("发布成功");
            this.close(true);
            return;
          } else {
            this.$message.error("发布失败");
          }
        } catch (error) {
          console.log(error);
        } finally {
          loading.close();
        }
        this.close();
      } else {
        let cardSetId = this.$route.params.id;
        // 修改卡片集的标签分类
        try {
          let res = await changeCardSetInfo({
            cardSetId,
            tags,
            typeId: classification,
            uid: this.userInfo.id,
          });
          if (res.code === 200) {
            this.$message.success("修改成功");
          } else {
            this.$message.error("修改失败");
          }
        } finally {
          this.close();
        }
      }
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options2 = this.tagsList.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options2 = [];
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
        this.tagsList = result.data;
      }
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    title() {
      return this.isUpload ? "修改分类/标签" : "发布卡片集";
    },
  },
  watch: {
    returnData: function (newValue) {
      // 回显类型和标签
      if (newValue.cardClassify) {
        this.cardForm.classification = this.returnData.cardClassify;
      }
      if (newValue.cardClassifyView) {
        this.cardForm.classificationView = this.returnData.cardClassifyView;
      }
      if (newValue.cardTag) {
        this.cardForm.tag = this.returnData.cardTag.map((i) => Number(i));
      }
      if (newValue.cardTagView) {
        this.cardForm.tagView = this.returnData.cardTagView;
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
#uploadCardMoudle {
  .uploadCardMoudle-dialog {
    .uploadCardMoudle-panel {
      .cardForm-title-input {
        float: left;
        width: 80%;
      }

      .cardForm-classify-input,
      .cardForm-tags-input {
        width: 80%;
      }
    }
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