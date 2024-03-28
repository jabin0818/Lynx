<template>
  <el-container id="upload-video">
    <el-header class="upload-header">
      <div class="editor-header">
        <div class="link-box" @click="backHome">
          <i class="el-icon-arrow-left"></i>
          <span class="back">返回首页</span>
        </div>
        <div class="right-box">
          <!-- <el-input placeholder="输入笔记标题..." v-model="notesTitle" show-word-limit maxlength="100" /> -->
        </div>
        <div class="user-box">
          <div class="btn-save">保存草稿</div>
          <div class="btn-save btn-publish">
            {{ isExist ? "修改" : "完成" }}
          </div>
          <!-- <el-popover
                    placement="bottom"
                    width="130"
                    height="60"
                    :close-delay="100"
                    trigger="hover">
                        <p class="editor-switcher-panel"> 切换为富文本编辑器 </p>
                        <div class="editor-switcher" slot="reference">
                            <i class="el-icon-sort"></i>
                        </div>
                </el-popover> -->
          <div class="user-avatar">
            <img :src="userInfo.avatar" />
          </div>
        </div>
      </div>
    </el-header>
    <el-main class="upload-main">
      <el-form ref="form" :model="videoForm" label-width="120px">
        <el-form-item label="视频" required>
          <el-upload
            class="upload-video-controls"
            drag
            action="' '"
            :limit="1"
            :auto-upload="false"
            :on-change="videoFileChange"
            :on-remove="videoFileRemove"
          >
            <video
              v-if="videoUrl"
              ref="videoWrapper"
              :src="videoUrl"
              class="upload-video-echo"
              controls
            ></video>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将视频拖到此处，或<em>点击上传</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="封面" required>
          <el-upload
            class="video-cover-uploader"
            action="' '"
            :show-file-list="false"
            :on-preview="preview"
            :on-change="coverFileChange"
            :on-remove="coverFileRemove"
            :auto-upload="false"
            :limit="1"
            ref="coverUpload"
            :disabled="showdeleteBtn"
          >
            <img
              v-show="videoCoverUrl"
              ref="image"
              :src="videoCoverUrl"
              class="cover"
            />
            <i
              v-show="!videoCoverUrl"
              class="el-icon-plus cover-uploader-icon"
            ></i>
            <div
              class="deleteCoverBtn"
              v-if="videoCoverUrl"
              @click="clearCoverFile"
            >
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="标题" required>
          <el-input
            v-model="videoForm.title"
            placeholder="请输入视频标题"
            show-word-limit
            maxlength="80"
          />
        </el-form-item>
        <el-form-item label="分类" required>
          <el-cascader
            :options="options"
            v-model="videoForm.classification"
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
        <el-form-item label="标签" required>
          <el-select
            v-model="videoForm.tag"
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
        <el-form-item label="是否打开评论" required>
          <el-radio v-model="videoForm.isComment" :label="0">是</el-radio>
          <el-radio v-model="videoForm.isComment" :label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            type="textarea"
            :rows="4"
            :autosize="{ minRows: 3, maxRows: 20 }"
            v-model="videoForm.desc"
            placeholder="请输入简介..."
            show-word-limit
            maxlength="1000"
          />
        </el-form-item>
        <el-form-item label="链接笔记：">
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
        </el-form-item>
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
        <el-form-item>
          <el-button
            type="primary"
            @click="isUpdate ? updateVideoBtn(0) : uploadVideoBtn(0)"
            >{{ isUpdate ? "修改" : "立即投稿" }}</el-button
          >
          <el-button v-if="!isUpdate">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import { articleCreate, getNotesType, updateNotes } from "@/api/notes";
import { getAllTags } from "@/api/tag";
import { uploadVideo, getVideoDetail, updateVideo } from "@/api/video";

export default {
  name: "VideoCreation",
  data() {
    return {
      options: [],
      options2: [],
      videoForm: {
        title: "",
        classification: [],
        tag: [],
        isComment: 0,
        desc: "",
        duration: "",
      },
      showdeleteBtn: false,
      loading: false,
      list: [],
      isExist: false,
      videoUrl: "", //视频路径
      videoFile: null, //视频
      videoCoverUrl: "", //视频封面路径
      videoCoverFile: null, //视频封面
      isSelfSelect: false, //用户先上传封面再选择视频时不要选用第一帧

      restaurants: [],
      state: "",

      isUpdate: false,
      videoId: "",
      isLoading: false,
    };
  },
  async mounted() {
    await this.getClassifyData();
    await this.getAllTagsData();
    if (this.$route.params.id) {
      console.log("编辑视频");
      this.isUpdate = true;
      this.videoId = this.$route.params.id;
      await this.getVideoDataById();
    }
    this.isLoading = true;
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
    clearCoverFile() {
      this.$refs.coverUpload.clearFiles();
      this.videoCoverFile = null;
      this.videoCoverUrl = "";
      setTimeout(() => {
        this.showdeleteBtn = false;
      }, 200);
    },
    //格式化视频时长
    formatDuraton(time) {
      if (time > -1) {
        let hour = Math.floor(time / 3600);
        let min = Math.floor(time / 60) % 60;
        let sec = time % 60;
        if (hour < 10) {
          time = "0" + hour + ":";
        } else {
          time = hour + ":";
        }

        if (min < 10) {
          time += "0";
        }
        time += min + ":";

        if (sec < 10) {
          time += "0";
        }
        time += sec;
      }
      return time;
    },
    //将base64转换为blob
    dataURLtoBlob(dataurl) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    //将blob转换为file
    blobToFile(theBlob, fileName) {
      theBlob.lastModifiedDate = new Date();
      theBlob.name = fileName;
      return theBlob;
    },
    //获取视频时长
    getTimes(url) {
      return new Promise((resolve, reject) => {
        let element = new Audio(url);
        element.addEventListener("loadedmetadata", () => {
          // const time = Math.round(element.duration * 100) / 100
          // resolve(time)
          console.log(element);
          console.log(element.duration);
          this.videoForm.duration = this.formatDuraton(
            parseInt(element.duration)
          );
          console.log("视频时长:", this.videoForm.duration);
          resolve(this.videoForm.duration);
        });
        element.addEventListener("error", () => resolve(0));
      });
    },
    async videoFileChange(file, fileList) {
      const format =
        file.raw.type === "video/mp4" ||
        file.raw.type === "video/flv" ||
        file.raw.type === "video/mov" ||
        file.raw.type === "video/mkv" ||
        file.raw.type === "video/avi";
      const isLt5M = file.raw.size / 1024 / 1024 < 500;
      if (fileList.length > 0) {
        if (!format) {
          this.$message.error("视频格式错误!");
          return false;
        } else if (!isLt5M) {
          this.$message.error("图片大小不能超过 500MB!");
          return false;
        } else {
          console.log("ok");
          console.log(file.raw);
          this.videoUrl = URL.createObjectURL(file.raw);
          this.videoFile = file.raw; //待上传视频
          if (this.isSelfSelect === false) {
            this.drawCover(file.name);
          }
          await this.getTimes(this.videoUrl);
        }
      }
    },
    videoFileRemove(file, fileList) {
      this.videoUrl = "";
      this.videoFile = null;
    },
    drawCover(name) {
      var canvas = document.createElement("canvas");
      this.$nextTick(() => {
        let imgDom = this.$refs.image;
        let video = this.$refs.videoWrapper;
        video.currentTime = 1; // 选取视频第一帧
        video.setAttribute("crossOrigin", "anonymous"); // 跨域
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        video.onloadeddata = () => {
          canvas
            .getContext("2d")
            .drawImage(video, 0, 0, canvas.width, canvas.height);
          let dataURL = canvas.toDataURL("image/png");
          this.showdeleteBtn = true;
          this.videoCoverUrl = dataURL;
          let blob = this.dataURLtoBlob(dataURL); // dataURL-> blob
          let timeStamp = +new Date();
          this.videoCoverFile = this.blobToFile(blob, timeStamp + ".png"); // blob -> file
        };
      });
    },
    async coverFileChange(file, fileList) {
      const format =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/jpg" ||
        file.raw.type === "image/png" ||
        file.raw.type === "image/gif";
      const isLt5M = file.raw.size / 1024 / 1024 < 5;
      if (fileList.length > 0) {
        if (!format) {
          this.$message.error("上传封面只能是JPG、PNG、GIF格式!");
          return false;
        } else if (!isLt5M) {
          this.$message.error("上传封面大小不能超过 5MB!");
          return false;
        } else {
          this.isSelfSelect = true;
          this.videoCoverUrl = URL.createObjectURL(file.raw);
          this.videoCoverFile = file.raw; //待上传图片的url
          this.showdeleteBtn = true;
        }
      }
    },
    coverFileRemove() {
      this.videoCoverUrl = "";
      this.videoCoverFile = null;
    },
    preview(file) {
      console.log("preview:", file);
    },
    remoteMethod(query) {
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
    backHome() {
      this.$router.push({
        path: "/index",
      });
    },
    async updateVideoBtn(published) {
      if (!this.isLoading && this.isUpdate) return;

      if (this.videoForm.title === 0) {
        this.$message.warning("标题不能为空！");
        return;
      }

      if (this.videoForm.classification.length === 0) {
        this.$message.warning("分类不能为空！");
        return;
      }

      if (this.videoUrl === "") {
        this.$message.warning("请上传视频！");
        return;
      }

      if (this.videoCoverUrl === "") {
        this.$message.warning("请上传视频封面！");
        return;
      }

      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      let classification = this.videoForm.classification.join("-");
      let tags = this.videoForm.tag.join(",");
      const data = new FormData();

      data.append("id", this.videoId);
      data.append("userId", this.userInfo.id);
      data.append("userName", this.userInfo.username);
      data.append("summary", this.videoForm.desc);
      data.append("title", this.videoForm.title);
      data.append("typeId", classification);
      if (this.videoCoverFile) {
        data.append("photo", this.videoCoverFile, this.videoCoverFile.name);
      }
      if (this.videoFile) {
        data.append("videoFile", this.videoFile);
      }
      data.append("tags", tags);
      data.append("comment_bol", this.videoForm.isComment); //是否开启评论
      data.append("published", published); //是否为草稿

      try {
        let result = await updateVideo(data);
        console.log("修改视频的接口：", result);
        if (result.code === 200) {
          loading.close();
          this.$router.push({
            name: "published",
            params: {
              id: result.data,
              title: this.videoForm.title,
              type: "video",
            },
            query: {
              userId: this.userInfo.id,
            },
          });
        } else {
          this.$message.error("发布视频失败");
          loading.close();
        }
      } catch (error) {
        this.$message.error("网络繁忙");
        loading.close();
      }
    },
    async uploadVideoBtn(published) {
      if (!this.isLoading) return;

      if (this.videoForm.title === 0) {
        this.$message.warning("标题不能为空！");
        return;
      }

      if (this.videoForm.classification.length === 0) {
        this.$message.warning("分类不能为空！");
        return;
      }

      if (!this.videoFile) {
        this.$message.warning("请上传视频！");
        return;
      }

      if (!this.videoCoverFile) {
        this.$message.warning("请上传视频封面！");
        return;
      }

      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      let classification = this.videoForm.classification.join("-");
      // let tags = this.videoForm.tag.join(",");
      let tags = this.videoForm.tag;
      const data = new FormData();
      data.append("userId", this.userInfo.id);
      data.append("userName", this.userInfo.username);
      data.append("summary", this.videoForm.desc);
      data.append("title", this.videoForm.title);
      data.append("typeId", classification);
      data.append("photo", this.videoCoverFile, this.videoCoverFile.name);
      data.append("videoFile", this.videoFile);
      data.append("tags", tags);
      data.append("comment_bol", this.videoForm.isComment); //是否开启评论
      data.append("published", published); //是否为草稿
      data.append("duration", this.videoForm.duration);

      try {
        let result = await uploadVideo(data);
        console.log("上传视频的接口：", result);
        if (result.code === 200) {
          loading.close();
          this.$router.push({
            name: "published",
            params: {
              id: result.data,
              title: this.videoForm.title,
              type: "video",
            },
            query: {
              userId: this.userInfo.id,
            },
          });
        } else {
          this.$message.error("发布视频失败");
          loading.close();
        }
      } catch (error) {
        this.$message.error("网络繁忙");
        loading.close();
      }
    },
    async getVideoDataById() {
      let videoId = this.$route.params.id;
      let res = await getVideoDetail(videoId, this.userInfo.id);
      console.log(res);
      if (res.code === 200) {
        this.videoForm.title = res.data.videoInfo.title;
        this.videoForm.classification = res.data.videoInfo.typeId.split("-");
        this.videoForm.tag = res.data.videoInfo.types.split(",");
        this.videoForm.isComment = res.data.videoInfo.commentBol;
        this.videoForm.desc = res.data.videoInfo.summary;
        this.videoCoverUrl = res.data.videoInfo.cover;
        this.videoUrl = res.data.videoInfo.address;
      } else {
        this.$message.error("网络繁忙！");
      }
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
#upload-video {
  font-size: 18px;
  .upload-header {
    .editor-header {
      display: flex;
      align-items: center;
      padding: 0 27px;
      height: 64px;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      z-index: 100;

      .link-box {
        cursor: pointer;
      }

      .right-box {
        flex: 1 1 auto;
        height: 100%;
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
          border-radius: 6px;
          cursor: pointer;
          color: @primary-color;
          background-color: #fff;
          box-sizing: border-box;
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
          border-radius: 50%;
          background-color: #eee;
          cursor: pointer;
          margin-left: 20px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .upload-main {
    width: 1180px;
    background-color: #fff;

    /deep/ .upload-video-controls {
      .upload-video-echo {
        width: 100%;
        height: 100%;
      }
    }

    /deep/ .video-cover-uploader {
      .cover {
        width: 358px;
        height: 178px;
        display: block;
      }
      .el-upload {
        position: relative;
        width: 358px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;

        &:hover {
          border-color: #409eff;
        }

        .cover-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
      }

      .deleteCoverBtn {
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
    }

    /deep/ .el-select {
      width: 500px;
    }
    /deep/ .el-cascader .el-input {
      cursor: pointer;
      width: 500px;
    }
  }
}
</style>