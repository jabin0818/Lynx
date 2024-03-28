<template>
  <div class="addFavFormModal">
    <el-dialog
      :visible="addFavModalVisible"
      width="446px"
      class="addFavFormModal-dialog"
      :center="true"
      @open="open"
      @close="close"
      :title="isUpdate ? '编辑收藏夹' : '新建收藏夹'"
    >
      <div class="addFavFormModal-wrapper">
        <div class="form-wrapper">
          <el-form
            ref="addFavForm"
            :model="formModel"
            :rules="rules"
            label-width="100"
          >
            <el-form-item prop="favName" label="收藏夹名称">
              <el-input
                width="200"
                v-model="formModel.favName"
                placeholder="请输入收藏夹名称"
                maxlength="12"
                autofocus
                validate-event
              >
              </el-input>
            </el-form-item>
            <el-form-item prop="favDesc" label="简介">
              <el-input
                width="200"
                type="textarea"
                :rows="4"
                :autosize="{ minRows: 3, maxRows: 8 }"
                v-model="formModel.favDesc"
                placeholder="请输入简介"
                maxlength="12"
                validate-event
              >
              </el-input>
            </el-form-item>
            <div class="preview-view">
              <div class="preview-view-text">预览</div>
              <div
                class="preview-view-word"
                :style="'background-color:' + color[colorIndex].code"
              >
                {{ formModel.favFirstWord }}
              </div>
            </div>
            <el-form-item prop="favColor" label="颜色">
              <div class="color-list">
                <div
                  class="color-item"
                  :class="{ 'color-item-select': index === colorIndex }"
                  v-for="(item, index) in color"
                  :key="index"
                  @click="selectColor(index)"
                >
                  <span :style="'background-color: ' + item.code"></span>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="favFirstWord" label="文本">
              <el-input
                width="200"
                v-model="formModel.favFirstWord"
                placeholder="用于快速找到收藏夹"
                maxlength="12"
                validate-event
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="submitBtn-wrapper">
          <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="submitFormBtn">{{
              isUpdate ? "修 改" : "提 交"
            }}</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { insertCollect, changeFavorites } from "@/api/star";

export default {
  name: "AddFavForm",
  props: {
    addFavModalVisible: {
      type: Boolean,
      default: false,
    },
    updataFavData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      formModel: {
        favId: null,
        favName: "",
        favDesc: "",
        favColor: "",
        favFirstWord: "",
      },
      rules: {
        favName: [
          {
            type: "string",
            required: true,
            message: "请输入收藏夹名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur",
          },
        ],
        favDesc: [
          {
            min: 0,
            max: 200,
            message: "长度在 0 到 200 个字符",
            trigger: "blur",
          },
        ],
        favFirstWord: [
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
      },
      color: [
        {
          code: "#4281ff",
          name: "主题蓝",
        },
        {
          code: "#67C23A",
          name: "绿",
        },
        {
          code: "#E6A23C",
          name: "黄",
        },
        {
          code: "#f97d1c",
          name: "橙",
        },
        {
          code: "#4b1e2f",
          name: " 紫",
        },
        {
          code: "#efafad",
          name: "粉",
        },
        {
          code: "#F56C6C",
          name: "红",
        },
        {
          code: "#909399",
          name: "灰",
        },
      ],
      colorIndex: 1,
      isUpdate: false,
    };
  },
  methods: {
    open() {
      console.log("open");
    },
    close(isRefresh) {
      console.log("close");
      this.$emit("changeVisible", {
        isVisible: false,
        isRefresh: isRefresh,
      });
    },
    async submitFormBtn() {
      if (this.isUpdate) {
        console.log("修改");
        this.formModel.favColor = this.color[this.colorIndex].code;
        let res = await changeFavorites(
          this.formModel.favName,
          this.formModel.favDesc,
          this.formModel.favColor,
          this.formModel.favId
        );
        console.log("修改收藏夹的接口", res);
        if (res.code === 200) {
          this.$message.success("修改成功！");
          this.close(true);
        }
      } else {
        this.formModel.favColor = this.color[this.colorIndex].code;
        let res = await insertCollect({
          groupName: this.formModel.favName,
          groupDescription: this.formModel.favDesc,
          color: this.formModel.favColor,
          groupText: this.formModel.favFirstWord,
        });
        // console.log("创建收藏夹的接口", res);
        if (res.code === 200) {
          this.$message.success("创建成功！");
          this.close(true);
        }
      }
    },
    selectColor(index) {
      this.colorIndex = index;
    },
  },
  watch: {
    "formModel.favName": function (newValue) {
      if (newValue && newValue.length > 0) {
        this.formModel.favFirstWord = newValue.slice(0, 1);
      } else if (newValue.length === 0) {
        this.formModel.favFirstWord = newValue;
      }
    },
    updataFavData(newValue) {
      if (JSON.stringify(newValue) !== "{}") {
        this.isUpdate = true;
        console.log(newValue);
        this.formModel.favId = newValue.id;
        this.formModel.favName = newValue.groupName;
        this.formModel.favDesc = newValue.groupDescription;
        this.formModel.favColor = newValue.color;
        this.colorIndex = this.color.findIndex((item, index) => {
          return item.code === newValue.color;
        });
        this.formModel.favFirstWord = newValue.groupText;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.addFavFormModal {
  .addFavFormModal-dialog {
    .addFavFormModal-wrapper {
      .form-wrapper {
        margin-bottom: 20px;
        .color-list {
          display: flex;
          align-items: center;
          height: 40px;

          .color-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 23px;
            height: 23px;
            border-radius: 50%;
            margin-left: 8px;
            cursor: pointer;

            &.color-item-select {
              background-color: rgba(0, 0, 0, 0.6);
              border: 1px solid rgba(0, 0, 0, 0.8);
              opacity: 0.9;
            }
            span {
              width: 17px;
              height: 17px;
              border-radius: 50%;
              line-height: 17px;
              text-align: center;
            }
          }
        }
        .preview-view {
          display: flex;
          margin-bottom: 22px;
          .preview-view-text {
            text-align: right;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #606266;
            line-height: 40px;
            padding: 0 12px 0 0;
            box-sizing: border-box;
          }
          .preview-view-word {
            width: 40px;
            height: 40px;
            min-width: 40px;
            margin-right: 8px;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            color: #fff;
            font-size: 18px;
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