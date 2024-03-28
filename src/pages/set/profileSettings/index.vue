<template>
  <div id="profile-settings">
    <div class="profile-settings-title">
      <span></span>
      <span>我的信息</span>
    </div>
    <div class="profile-settings-body">
      <el-row>
        <el-col :span="17">
          <el-form
            :model="profileForm"
            :rules="rules"
            ref="profileForm"
            label-width="80px"
            class="demo-profileForm"
            hide-required-asterisk
          >
            <el-form-item label="昵称" prop="username">
              <el-input
                v-model="profileForm.username"
                maxlength="20"
                show-word-limit
                placeholder="请填写你的昵称"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="profileForm.gender">
                <el-radio label="男" value="男"></el-radio>
                <el-radio label="女" value="女"></el-radio>
                <el-radio label="保密" value=""></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="学历" prop="education">
              <el-select
                v-model="profileForm.degree"
                placeholder="请选择你的学历"
              >
                <el-option label="高中及以下" value="高中及以下"></el-option>
                <el-option label="大专" value="大专"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="博士及以上" value="博士及以上"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="职位" prop="identity">
              <el-input v-model="profileForm.identity" placeholder="请填写你的职位身份"></el-input>
            </el-form-item> -->
            <el-form-item label="生日" required>
              <el-col :span="11">
                <el-form-item prop="birthday">
                  <el-date-picker
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择你的生日"
                    v-model="profileForm.birthday"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="地区" prop="region">
              <el-cascader
                v-model="profileForm.city"
                :options="options"
                @change="handleChange"
                placeholder="请选择你所在的地区"
                :props="{ checkStrictly: true }"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="简介" prop="desc">
              <el-input
                type="textarea"
                v-model="profileForm.resume"
                placeholder="请填写你的简介"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="关注标签" prop="userTag">
              <el-checkbox-group v-model="profileForm.userTag">
                <el-checkbox label="美食/餐厅线上活动" name="userTag1"></el-checkbox>
                <el-checkbox label="地推活动" name="userTag2"></el-checkbox>
                <el-checkbox label="线下主题活动" name="userTag3"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="userTag4"></el-checkbox>
              </el-checkbox-group>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('profileForm')"
                >保存</el-button
              >
              <!-- <el-button @click="resetForm('profileForm')">重置</el-button> -->
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="7" class="ps-body-right">
          <el-upload
            class="avatar-uploader"
            action="/user/avatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
            :before-upload="beforeAvatarUpload"
            :data="{ id: userInfo.id, account: userInfo.account }"
            :headers="importHeaders"
            :on-change="handleChange"
            v-loading="loading"
          >
            <div class="avatar-wrapper">
              <i class="el-icon-circle-plus-outline" />
              <span>点击修改头像</span>
            </div>
            <img
              v-if="userInfo.avatar"
              :src="profileForm.avatar"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              支持 jpg/jpeg/png 格式，大小不要超过 2MB 图片尺寸
              1:1，推荐分辨率：256*256px
            </div>
          </el-upload>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import cityOptions from "@/assets/js/city_data.js";
import { updateUserInfo } from "@/api/user";
import { getToken } from "@/utils/localStorage";

export default {
  name: "ProfileSettings",
  data() {
    return {
      profileForm: {},
      rules: {
        username: [
          { required: true, message: "请输入你的昵称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        gender: [
          { required: true, message: "请选择你的性别", trigger: "change" },
        ],
        education: [
          // { required: true, message: '请选择你的学历', trigger: 'change' }
        ],
        identity: [
          // { required: true, message: '请输入你的职位身份', trigger: 'blur' },
          {
            min: 0,
            max: 30,
            message: "长度在 0 到 30 个字符",
            trigger: "blur",
          },
        ],
        birthday: [
          // { type: 'date', required: true, message: '请选择你的生日', trigger: 'change' }
        ],
        region: [
          // { required: true, message: '请选择你所在的地区', trigger: 'change' }
        ],
        desc: [
          // { required: true, message: '请输入你的简介', trigger: 'blur' }
        ],
      },
      imageUrl: require("@/assets/img/user/default_avatar.jpg"),
      options: cityOptions,
      // uploadAvatar: {
      //   id: '',
      //   account: ''
      // },
      importHeaders: { Authorization: getToken() },
      loading: false,
    };
  },
  mounted() {
    // console.log(this.userInfo.city[1]);
    if (this.userInfo) {
      this.profileForm = this.deepClone(this.userInfo);
      if (this.userInfo.city.length) {
        let city = String(this.profileForm.city);
        this.profileForm.city = city.split("-");
      }
    }
  },
  methods: {
    //深拷贝
    deepClone(obj) {
      let objClone = JSON.parse(JSON.stringify(obj));
      return objClone;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let city = this.profileForm.city.join("-");
          let res = await updateUserInfo(
            this.userInfo.id,
            this.profileForm.username,
            this.profileForm.birthday,
            city,
            this.profileForm.gender,
            this.profileForm.resume,
            this.profileForm.degree,
            this.userInfo.uuid,
            this.userInfo.avatar
          );
          if (res.code === 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            // 更新用户信息
            await this.$store.dispatch("user/getUserInfo");
          } else {
            this.$message({
              message: res.msg,
              type: "error",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    async handleAvatarSuccess(res, file) {
      this.loading = false;
      if (res.code === 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.profileForm.avatar = res.data;
        await this.$store.dispatch("user/getUserInfo");
      }
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarError(err, file, fileList) {
      this.$message.error("上传头像失败！");
      this.loading = false;
    },
    beforeAvatarUpload(file) {
      this.loading = true;
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleChange(file, fileList) {
      //实现单个文件上传，css样式就是取消更换时要上传文件时的过渡动画
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]; // 这一步，是 展示最后一次选择的文件
      }
    },
    handleChange(value) {
      // console.log(value);
      // this.profileForm.city = value.join('-')
    },
    updateUserAvatar() {
      console.log("123");
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

#profile-settings {
  background: #fff;
  border-radius: 6px;
  .profile-settings-title {
    display: flex;
    align-items: center;
    height: 48px;
    padding-left: 30px;
    border-bottom: 2px solid #f6f6f6;

    span {
      &:nth-child(1) {
        width: 4px;
        height: 16px;
        background-color: @primary-color;
        border-radius: 4px;
        margin-right: 6px;
      }

      &:nth-child(2) {
        color: @primary-color;
        font-size: 14px;
        cursor: default;
      }
    }
  }

  .profile-settings-body {
    padding: 20px 20px 0;
    position: relative;

    .ps-body-right {
      display: flex;
      justify-content: center;

      .avatar-uploader {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .el-upload {
          position: relative;
          width: 100px;
          height: 100px;
          border: 1px dashed #d9d9d9;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border-radius: 50%;

          &:hover {
            border-color: #409eff;
          }

          .avatar-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            background-color: rgba(29, 33, 41, 0.5);
            z-index: 2;
            visibility: hidden;
            opacity: 0;
            transition: all 0.25s;

            i {
              font-size: 28px;
            }

            span {
              font-size: 12px;
              margin-top: 7px;
              line-height: 17px;
              font-weight: 400;
            }
          }

          &:hover .avatar-wrapper {
            opacity: 1;
            visibility: visible;
          }

          .avatar {
            width: 100px;
            height: 100px;
            display: block;
          }
        }

        .el-upload__tip {
          max-width: 135px;
          text-align: center;
        }
      }
    }

    .el-cascader .el-input .el-input__inner {
      text-overflow: ellipsis;
      width: 245px;
    }

    .el-select {
      position: relative;
      width: 245px;
    }
  }
}
</style>