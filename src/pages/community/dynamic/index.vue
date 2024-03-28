<template>
  <div id="dynamic-container">
    <div class="dynamic-upload">
      <div class="dynamic-upload-header">
        <span>发表动态</span>
      </div>
      <div class="dynamic-upload-textare">
        <div class="textare">
          <div class="textare-left">
            <img
              class="my-avatar"
              :src="userInfo.avatar ? userInfo.avatar : ''"
            />
          </div>
          <div class="textare-right" ref="textarea">
            <el-input
              type="textarea"
              :rows="4"
              :autosize="{ minRows: 1, maxRows: 20 }"
              v-model="dynamic"
              placeholder="和好友分享学习心得吧!"
              maxlength="2000"
              resize="none"
            />
          </div>
        </div>
        <div class="picture" v-show="fileList.length">
          <el-upload
            action="#"
            :list-type="'picture-card'"
            :show-file-list="true"
            :auto-upload="false"
            :on-change="fileChange"
            ref="upload"
            :limit="6"
            multiple
            :on-exceed="handleExceed"
          >
            <!-- <i slot="default" class="el-icon-plus"></i> -->
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemoves(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
        </div>
        <div class="control">
          <div class="control-left">
            <span class="control-left-span" @click="selectPictures">
              <i class="el-icon-picture-outline"></i>
            </span>
            <span class="control-left-span">
              <i class="iconfont icon-emoji"></i>
            </span>
          </div>
          <div class="control-right">
            <div class="sub-btn" @click="uploadDynamic">发布</div>
          </div>
        </div>
      </div>
    </div>
    <div class="dynamic-content">
      <div class="dynamic-content-header">
        <ul class="dynamic-tabbar">
          <li
            class="dynamic-tabbar-item"
            :class="{ active: tab === 'all' }"
            @click="toDynamic('all')"
          >
            <span>全部</span>
          </li>
          <li
            class="dynamic-tabbar-item"
            :class="{ active: tab === 'note' }"
            @click="toDynamic('note')"
          >
            <span>笔记</span>
          </li>
          <li
            class="dynamic-tabbar-item"
            :class="{ active: tab === 'card' }"
            @click="toDynamic('card')"
          >
            <span>卡片</span>
          </li>
          <li
            class="dynamic-tabbar-item"
            :class="{ active: tab === 'video' }"
            @click="toDynamic('video')"
          >
            <span>视频</span>
          </li>
        </ul>
      </div>
      <div class="dynamic-content-main" v-if="dynamicData && dynamicData.length">
        <!-- 视频 -->
        <div
          class="dynamic-item"
          v-for="(item, index) in dynamicData"
          :key="item.id"
        >
          <div class="dynamic-item-header">
            <div class="di-header-left">
              <div class="dih-left-avatar">
                <img :src="item.userAvatar" />
              </div>
              <div class="dih-left-info">
                <div class="username">{{ item.userName }}</div>
                <div class="time">{{ item.publishTime }}</div>
              </div>
            </div>
            <el-popover placement="right" width="200" trigger="hover">
              <ul class="actions-info-more" v-if="userInfo.id !== item.userId">
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>取消关注</span>
                </li>
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>举报</span>
                </li>
                <li>
                  <i class="iconfont icon-buganxingqu1"></i>
                  <span>不感兴趣</span>
                </li>
              </ul>
              <ul class="actions-info-more" v-else>
                <li>
                  <i class="el-icon-edit"></i>
                  <span>重新编辑</span>
                </li>
                <li @click="deleteDynamic(item.id)">
                  <i class="el-icon-delete"></i>
                  <span>删除</span>
                </li>
              </ul>

              <div class="di-header-right" slot="reference">
                <i class="el-icon-more"></i>
              </div>
            </el-popover>
          </div>
          <div :class="'dynamic-item-content dynamicCom' + index">
            <v-clamp
              class="di-content-wrapper"
              :autoresize="true"
              :max-lines="3"
              :tag="'div'"
              :max-height="120"
              :expanded="item.contentIsFold"
              :ellipsis="'...'"
              @clampchange="clampchange"
            >
              {{ item.content }}
              <template slot="after">
                <!-- :style="'display: ' + isShowSwitchBtn(index)" -->
                <span
                  class="switch-btn"
                  ref="switch"
                  @click="foldContent(item, index)"
                >
                  切换
                  <i class="el-icon-arrow-right"></i>
                </span>
              </template>
            </v-clamp>
          </div>
          <div class="dynamic-item-box">
            <div
              class="dynamic-type-normal more-than-one"
              v-if="item.dynamicType === 4"
            >
              <el-image
                v-for="url in JSON.parse(item.contentUrl)"
                :key="url"
                :src="url"
                lazy
                :preview-src-list="JSON.parse(item.contentUrl)"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="dynamic-type-special" v-else>
              <div class="special-left">
                <img :src="item.contentUrl" alt="" />
                <div class="mask" v-if="item.dynamicType === 3">
                  <span class="duration">16:43</span>
                </div>
                <div class="type-tag">
                  <span class="type-text">{{
                    dynamicTypeView[item.dynamicType - 1]
                  }}</span>
                </div>
              </div>
              <div class="special-right">
                <div class="special-right-title">
                  <span>
                    {{ item.title }}
                  </span>
                </div>
                <div class="special-right-intro">
                  <span>{{
                    item.description ? item.description : item.content
                  }}</span>
                </div>
                <div class="special-right-playinfo" v-if="!item.original">
                  <span class="amount amount-play">
                    <i class="el-icon-video-play"></i>
                    <!-- <i class="iconfont icon-good"></i> -->
                    <span class="text">123</span>
                  </span>
                  <span class="amount amount-comment">
                    <i class="el-icon-chat-line-round"></i>
                    <!-- <i class="el-icon-star-off"></i> -->
                    <span class="text">231</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="dynamic-item-active">
            <span class="share">
              <i class="iconfont icon-fenxiang"></i>
              <span>{{ item.repostNum === 0 ? "转发" : item.repostNum }}</span>
            </span>
            <!-- <span class="bad">
                   踩 
                      <i class="el-icon-chat-dot-square"></i>
                      <span>12</span>
                  </span> -->
            <!-- 讨论 -->
            <span class="discuss" @click="dynamicComment($event, item, index)">
              <i class="el-icon-chat-dot-square"></i>
              <span>{{ item.commentNum }}</span>
            </span>
            <span
              class="praise"
              :class="{ isLike: item.thumbs }"
              @click="dynamicLike($event, item, index)"
            >
              <!-- 赞 -->
              <i class="iconfont icon-good"></i>
              <span>{{ item.thumbsNum }}</span>
            </span>
          </div>
          <div
            class="dynamic-item-comment"
            v-if="item.dynamicType === 4"
            v-show="item.isShowComment"
          >
            <div class="dynamic-comment-form">
              <div class="comment-avatar">
                <img :src="userInfo.avatar" />
              </div>
              <div class="comment-textare">
                <div class="comment-textare-left">
                  <el-input
                    type="textarea"
                    :rows="1"
                    placeholder="轻轻地你来了，正如你轻轻地走~"
                    v-model="comment"
                    :autosize="{ minRows: 1, maxRows: 8 }"
                    resize="none"
                  >
                  </el-input>
                </div>
                <div class="comment-textare-right">
                  <span class="control-left-span">
                    <i class="el-icon-check"></i>
                  </span>
                  <span class="control-left-span">
                    <i class="el-icon-picture-outline"></i>
                  </span>
                  <span class="control-left-span">
                    <i class="iconfont icon-emoji"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="comment-splitLine"></div>
            <div class="dynamic-comment-list">
              <div class="comment-list" v-if="finish">
                <div
                  class="comment-item"
                  v-for="item in comments"
                  :key="item.commentId"
                >
                  <div class="comment-avatar">
                    <a class="user-link">
                      <img
                        :src="
                          item.commentAvatar
                            ? item.commentAvatar
                            : require('@/assets/img/user/default_avatar.jpg')
                        "
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="content-box">
                    <div class="comment-main">
                      <div class="user-box">
                        <div class="user-name">
                          <a class="username">
                            <span class="name">{{ item.commentUsername }}</span>
                            <i class="el-icon-male gender"></i>
                            <!-- <i class="el-icon-female gender"></i> -->
                            <i class="iconfont icon-1 level"></i>
                          </a>
                        </div>
                        <time
                          datetime="1662797738000"
                          :title="item.commentCreateTime"
                          class="time"
                          >{{
                            new Date(
                              item.commentCreateTime
                            ).toLocaleDateString()
                          }}</time
                        >
                      </div>
                      <div class="content">
                        <div class="wrapper">
                          <input id="exp1" class="exp" type="checkbox" />
                          <div class="text">
                            <label class="btn" for="exp1"></label>
                            {{ item.commentContent }}
                          </div>
                        </div>
                      </div>
                      <div class="comment-warpper">
                        <div class="comment-action">
                          <div class="comment-action-left">
                            <!-- 赞 -->
                            <span class="praise">
                              <i class="iconfont icon-good"></i>
                              <span>{{ item.likes }}</span>
                            </span>
                            <!-- 踩 -->
                            <span class="disagree">
                              <i class="iconfont icon-bad"></i>
                              <span>0</span>
                            </span>
                            <span @click="replyBtn($event)">
                              <i class="el-icon-chat-dot-square"></i>
                              <span v-if="item.childrenComment">{{ item.childrenComment.length }}</span>
                            </span>
                          </div>
                          <div class="comment-action-right">
                            <el-popover
                              placement="right"
                              width="140"
                              trigger="hover"
                            >
                              <ul class="actions-info-more">
                                <template
                                  v-if="
                                    item.commentAccount !== userInfo.account
                                  "
                                >
                                  <li>
                                    <i class="el-icon-warning-outline"></i>
                                    <span>加入黑名单</span>
                                  </li>
                                  <li>
                                    <i class="el-icon-warning-outline"></i>
                                    <span>举报</span>
                                  </li>
                                </template>
                                <template v-else>
                                  <li @click="deleteCommentBtn(item.commentId)">
                                    <i class="el-icon-delete"></i>
                                    <span>删除</span>
                                  </li>
                                </template>
                              </ul>
                              <span slot="reference" class="ca-right-more">
                                <i class="el-icon-more"></i>
                              </span>
                            </el-popover>
                          </div>
                        </div>
                        <div class="focused-reply">
                          <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="轻轻地你来了，正如你轻轻地走~"
                            v-model="reply"
                            :autosize="{ minRows: 3, maxRows: 8 }"
                            resize="none"
                          >
                          </el-input>
                          <div class="action-box">
                            <div class="comment-emoji">
                              <i class="iconfont icon-emoji"></i>
                              <span>表情</span>
                            </div>
                            <div
                              class="submit"
                              @click="submitReply(item.commentId)"
                            >
                              <span>发布</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="subcomment-wrapper"
                      v-if="item.childrenComment && item.childrenComment.length"
                    >
                      <div class="sub-comment-list">
                        <div>
                          <div
                            class="sub-comment-item"
                            v-for="item2 in item.childrenComment"
                            :key="item2.commentId"
                          >
                            <div class="subcomment-avatar">
                              <a>
                                <img
                                  :src="
                                    item2.commentAvatar
                                      ? item2.commentAvatar
                                      : require('@/assets/img/user/default_avatar.jpg')
                                  "
                                  alt=""
                                />
                              </a>
                            </div>
                            <div class="subcomment-content">
                              <div class="content-wrapper">
                                <div class="user-box">
                                  <div class="user-name">
                                    <a class="username">
                                      <span class="name">{{
                                        item2.commentUsername
                                      }}</span>
                                    </a>
                                  </div>
                                  <div
                                    class="rely-box"
                                    v-if="item2.parentCommentId"
                                  >
                                    <span>回复</span>
                                    <div class="user-popover">
                                      <a
                                        class="repliedname"
                                        style="max-width: 10em"
                                      >
                                        {{
                                          findReplyUsername(
                                            item2.parentCommentId,
                                            item
                                          )
                                        }}
                                      </a>
                                    </div>
                                  </div>
                                  <time
                                    datetime="1662797738000"
                                    :title="item2.commentCreateTime"
                                    class="time"
                                    >{{
                                      new Date(
                                        item2.commentCreateTime
                                      ).toLocaleDateString()
                                    }}</time
                                  >
                                </div>
                                <div class="content">
                                  <div class="wrapper">
                                    <input
                                      id="exp2"
                                      class="exp"
                                      type="checkbox"
                                    />
                                    <div class="text">
                                      <label class="btn" for="exp2"></label>
                                      {{ item2.commentContent }}
                                    </div>
                                  </div>
                                </div>
                                <div class="comment-warpper">
                                  <div class="comment-action">
                                    <div class="comment-action-left">
                                      <!-- 赞 -->
                                      <span class="praise">
                                        <i class="iconfont icon-good"></i>
                                        <span>{{ item2.likes }}</span>
                                      </span>
                                      <!-- 踩 -->
                                      <span class="disagree">
                                        <i class="iconfont icon-bad"></i>
                                        <span>0</span>
                                      </span>
                                      <span @click="replyBtn($event)">
                                        <i class="el-icon-chat-dot-square"></i>
                                        <!-- <span>12</span> -->
                                      </span>
                                    </div>
                                    <div
                                      class="comment-action-right reply-more"
                                    >
                                      <el-popover
                                        placement="left"
                                        width="200"
                                        trigger="hover"
                                      >
                                        <ul class="actions-info-more">
                                          <li>
                                            <i
                                              class="el-icon-warning-outline"
                                            ></i>
                                            <span>加入黑名单</span>
                                          </li>
                                          <li>
                                            <i
                                              class="el-icon-warning-outline"
                                            ></i>
                                            <span>举报</span>
                                          </li>
                                          <li
                                            v-if="
                                              item.commentAccount ===
                                              userInfo.account
                                            "
                                            @click="
                                              deleteCommentBtn(item.commentId)
                                            "
                                          >
                                            删除
                                          </li>
                                        </ul>
                                        <span
                                          slot="reference"
                                          class="ca-right-more"
                                        >
                                          <i class="el-icon-more"></i>
                                        </span>
                                      </el-popover>
                                    </div>
                                  </div>
                                  <div class="focused-reply">
                                    <el-input
                                      type="textarea"
                                      :rows="4"
                                      placeholder="轻轻地你来了，正如你轻轻地走~"
                                      v-model="reply"
                                      :autosize="{ minRows: 3, maxRows: 8 }"
                                      resize="none"
                                    >
                                    </el-input>
                                    <div class="action-box">
                                      <div class="comment-emoji">
                                        <i class="iconfont icon-emoji"></i>
                                        <span>表情</span>
                                      </div>
                                      <div
                                        class="submit"
                                        @click="
                                          submitReply(
                                            item.commentId,
                                            item2.commentId
                                          )
                                        "
                                      >
                                        <span>发布</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="comment-list-more"
                v-if="isHasNextPage"
                @click="toDynamicDetails"
              >
                <span> 查看全部 {{ total }} 条回复 </span>
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="data-loading-more" @click="loadMore">
          <i class="el-icon-loading" v-show="!finish"></i>
          <span class="listLoading-more-btn-text" v-show="finish">{{
            hasNext ? "加载更多" : "暂无更多数据"
          }}</span>
        </div>
      </div>
      <el-empty description="暂无动态数据" v-else></el-empty>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VClamp from "@boyuai/vue-clamp";
import { getNotesComment } from "@/api/comment.js";
import { uploadPicture } from "@/api/notes.js";
import {
  uploadDynamic,
  getAllDynamics,
  deleteDynamics,
  likeDynamic,
} from "@/api/dynamic.js";

export default {
  name: "Dynamic",
  components: {
    VClamp,
  },
  data() {
    return {
      dynamic: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [
        // {
        //   name: "food.jpeg",
        //   url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        // },
      ],
      urls: [],
      tab: "all",
      comment: "",
      finish: true,
      reply: "",
      isFocus: false,
      query: {
        sortTimeOrTrending: true,
        page: 1,
        rows: 5,
      },
      comments: [],
      isHasNextPage: false,
      total: 0,
      isShowReplyTextarea: false,
      replyTextAreaDom: null,
      queryDn: {
        page: 1,
        rows: 10,
      }, //动态的分页
      dynamicCount: 0, //动态的总数
      dynamicData: [],
      dynamicTypeView: ["笔记", "卡片", "视频", "动态"],
      contentUrl: [],
      hasNext: true,
      finish: false,
      heightMap: {}, // 评论高度信息
    };
  },
  async created() {},
  async mounted() {
    window.addEventListener("click", this.otherHidden);
    window.addEventListener("click", this.hiddenReplyTextArea);
    await this.getCommentData(false);
    await this.getDynamciData(false);

    this.isShowSwitchInit();
  },
  beforeDestroy() {
    /* 组件销毁的时候要移除侦听器 */
    window.removeEventListener("click", this.otherHidden);
  },
  methods: {
    isShowSwitchInit() {
      setTimeout(() => {
        this.$nextTick(() => {
          for (let index = 0; index < this.comments.length; index++) {
            //判断文本末尾...的方法
            let str = document.querySelector(`.dynamicCom${index}`)?.children[0]
              .children[0].children[0].innerText;
            if (str?.substring(str.length - 3) === "...") {
              //显示
              this.$refs.switch[index].style.display = "initial";
            } else {
              //隐藏
            }
            //判断高度的方法，不好
            // this.heightMap[index] = document.querySelector(
            //   `.dynamicCom${index}`
            // ).offsetHeight;
            // if (this.heightMap[index] > 60) {
            //   this.$refs.switch[index].style.display = "initial";
            // }
          }
        });
      }, 0);
    },
    dynamicComment(e, item, index) {
      if (item.dynamicType !== 4) return;
      if (item.isShowComment) {
        e.currentTarget.classList.remove("discuss-active");
        this.$set(this.dynamicData[index], "isShowComment", false);
      } else {
        e.currentTarget.classList.add("discuss-active");
        this.$set(this.dynamicData[index], "isShowComment", true);
      }
    },
    async dynamicLike(e, item, index) {
      if (item.dynamicType === 1) {
        //笔记点赞
        
      } else if (item.dynamicType === 2) {
        //卡片点赞
      } else if (item.dynamicType === 3) {
        //视频点赞
      } else if (item.dynamicType === 4) {
        //动态点赞
        let res = await likeDynamic(item.id);
        console.log("动态点赞的接口", res);
        if (res.code === 200) {
          console.log("成功");
        }
      }
    },
    handleRemoves(file) {
      this.$refs.upload.handleRemove(file);
      let newFileList = this.fileList.filter((item) => {
        return item.uid !== file.uid;
      });
      this.fileList = newFileList;
    },
    handleExceed(files, fileList) {
      //   this.$message.warning(
      //     `当前限制选择 8 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
      //       files.length + fileList.length
      //     } 个文件`
      //   );
      this.$message.warning(`只能选择6张图片`);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
        if (!format) {
          this.$message.error("上传图片只能是JPG、PNG、GIF格式!");
          return false;
        } else if (!isLt5M) {
          this.$message.error("上传图片大小不能超过 5MB!");
          return false;
        } else {
          let fileList = {
            uid: file.uid,
            url: file.raw,
            name: file.raw.name,
          };
          this.fileList.push(fileList);
          const formData = new FormData();
          formData.append("img", file.raw);
          formData.append("userId", this.userInfo.id);
          uploadPicture(formData)
            .then((res) => {
              console.log(res);
              this.contentUrl.push(res.data);
            })
            .catch((err) => {
              this.$message.error("上传图片失败");
            });
        }
      }
    },
    selectPictures() {
      this.$refs["upload"].$refs["upload-inner"].handleClick();
    },
    toDynamic(dynamic) {
      this.$router.push(`${this.$route.path}?tab=${dynamic}`);
    },
    clampchange(clamped) {
      // console.log(clamped);
    },
    foldContent(item, index) {
      if (!item.contentIsFold) {
        this.$set(this.dynamicData[index], "contentIsFold", true);
      } else {
        this.$set(this.dynamicData[index], "contentIsFold", false);
      }
    },
    otherHidden(e) {
      if (this.finish) {
        if (!this.$refs.textarea.contains(e.target)) this.isFocus = false;
      }
    },
    hiddenReplyTextArea(e) {
      if (this.replyTextAreaDom) {
        if (this.isShowReplyTextarea) {
          if (this.reply === "") {
            if (!this.replyTextAreaDom.contains(e.target))
              this.replyTextAreaDom.lastElementChild.classList.remove("show");
          }
        }
      }
    },
    async getCommentData(isLoadMore) {
      if (!isLoadMore) {
        this.query.page = 1;
        this.finish = false;
      }
      let userId = this.$route.query.userId;
      // let notesId = this.$route.params.id;
      let notesId = "261127997";
      // console.log(userId);
      // console.log(notesId);
      // let reslut = await getNotesComment(notesId, this.query.sortTimeOrTrending, this.query.page, this.query.rows)
      getNotesComment(
        notesId,
        this.query.sortTimeOrTrending,
        this.query.page,
        this.query.rows
      )
        .then((res) => {
          if (isLoadMore) {
            this.comments = this.comments.concat(res.data.list);
          } else {
            this.comments = res.data.list;
          }
          this.finish = true;
          this.total = res.data.total;
          this.isHasNextPage = res.data.hasNextPage;
        })
        .catch((err) => {
          console.log(err);
          // this.$message.error(err.msg);
        });
    },
    async nextPage() {
      this.query.page++;
      await this.getCommentData(true);
    },
    replyBtn(event) {
      this.reply = "";
      let dom =
        event.currentTarget.parentElement.parentElement.nextElementSibling;
      let dom2 = event.currentTarget.parentElement.parentElement.parentElement;
      this.replyTextAreaDom = dom2;
      let dom3 = document.querySelector(".show");
      if (dom3) {
        dom3.classList.remove("show");
      }
      dom.classList.add("show");
      this.isShowReplyTextarea = true;
    },
    toDynamicDetails() {
      this.$router.push({
        path: `/community/detail/${1}`,
      });
    },
    async uploadDynamic() {
      let formData = {
        userId: this.userInfo.id,
        userName: this.userInfo.username,
        userAvatar: this.userInfo.avatar,
        content: this.dynamic,
        dynamicType: 4,
        isOriginal: 1,
      };
      if (this.contentUrl.length !== 0) {
        formData = Object.assign(formData, {
          contentUrl: JSON.stringify(this.contentUrl),
        });
      }
      let res = await uploadDynamic(formData);
      if (res.code === 200) {
        this.$message.success("发表成功！");
        this.fileList = []
        this.contentUrl = []
        this.dynamic = ""
        this.getDynamciData(false);
        this.isShowSwitchInit();
      }
    },
    async getDynamciData(isLoadMore) {
      if (!isLoadMore) {
        this.queryDn.page = 1;
      }
      this.finish = false;

      let res = await getAllDynamics(
        this.userInfo.id,
        this.queryDn.page,
        this.queryDn.rows
      );
      console.log("动态的接口：", res);
      if (res.code === 200) {
        if (isLoadMore) {
          this.dynamicData = this.dynamicData.concat(res.data.data);
        } else {
          this.dynamicData = res.data.data;
        }
        this.dynamicCount = res.data.count;
        this.finish = true;
        if (res.data.count !== 0) {
          this.hasNext = true;
        } else {
          this.hasNext = false;
        }
      } else {
        this.$message.error("网络繁忙！");
      }
    },
    async deleteDynamic(id) {
      this.$confirm("是否确定删除动态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await deleteDynamics(id);
          console.log(res);

          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getDynamciData();
          } else {
            this.$message.success("删除失败");
          }
        })
        .catch(() => {});
    },
    loadMore() {
      // 加载更多
      if (this.hasNext && this.finish) {
        this.queryDn.page++;
        this.getDynamciData(true);
        this.isShowSwitchInit();
      }
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.query.tab) {
          this.tab = to.query.tab;
        }
      },
      // immediate: true,
    },
    reply: {
      handler(newValue) {
        if (newValue != "") {
          this.replyTextAreaDom.lastElementChild.lastElementChild.lastElementChild.classList.add(
            "notNull"
          );
        } else {
          this.replyTextAreaDom.lastElementChild.lastElementChild.lastElementChild.classList.remove(
            "notNull"
          );
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
#dynamic-container {
  .dynamic-upload {
    border-radius: 6px;
    background-color: #fff;
    margin-bottom: 10px;
    .dynamic-upload-header {
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      border-bottom: 1px solid #dcdfe6;
    }

    .dynamic-upload-textare {
      padding: 0 20px 10px;

      .textare {
        display: flex;
        padding: 10px 0;
        .textare-left {
          width: 38px;
          height: 38px;
          //   margin-right: 5px;
          .my-avatar {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        .textare-right {
          width: 96%;

          /deep/ .el-textarea__inner {
            border: none;
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
      }

      .picture {
        padding: 10px 0;

        margin: 0;
        vertical-align: top;

        & > div {
          /deep/ .el-upload.el-upload--picture-card {
            display: none;
          }
        }
      }

      .control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 10px;
        border-top: 1px solid #efefef;
        .control-left {
          display: flex;
          align-items: center;
          .control-left-span {
            margin-right: 15px;
            cursor: pointer;
            i {
              font-size: 24px;
              color: #92929d;

              &:hover {
                color: @main-text-color;
              }
            }
          }
        }

        .control-right {
          .sub-btn {
            width: 90px;
            height: 32px;
            color: #fff;
            background-color: @primary-color;
            line-height: 35px;
            text-align: center;
            font-size: 15px;
            border-radius: 6px;
            cursor: pointer;

            &:hover {
              opacity: 0.7;
            }
          }
        }
      }
    }
  }

  .dynamic-content {
    .dynamic-content-header {
      border-radius: 6px;
      background-color: #fff;
      margin-bottom: 10px;
      .dynamic-tabbar {
        display: flex;
        align-items: center;
        height: 50px;
        max-width: 960px;
        white-space: nowrap;
        position: relative;
        margin: 0 auto;

        .dynamic-tabbar-item {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 72px;
          height: 100%;
          span {
            font-size: 16px;
            font-weight: 400;
            color: #515767;
            cursor: pointer;
          }
          &.active {
            span {
              color: @primary-color;
            }
            &::after {
              content: "";
              position: absolute;
              width: 16px;
              height: 3px;
              border-radius: 50px;
              left: 50%;
              bottom: 0;
              transform: translateX(-50%);
              z-index: 10;
              background-color: @primary-color;
            }
          }
        }
      }
    }

    .dynamic-content-main {
      .dynamic-item {
        padding: 20px;
        border-radius: 6px;
        background-color: #fff;
        margin-bottom: 10px;

        & + & {
          margin-bottom: 10px;
        }

        .dynamic-item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          .di-header-left {
            display: flex;

            .dih-left-avatar {
              width: 40px;
              height: 40px;
              margin-right: 10px;

              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

            .dih-left-info {
              .username {
                color: #171725;
                font-size: 14px;
                margin-bottom: 4px;
              }

              .time {
                color: #92929d;
                font-size: 12px;
              }
            }
          }

          .di-header-right {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 34px;
            height: 14px;
            border-radius: 6px;
            cursor: pointer;

            i {
              color: #92929d;
              font-size: 16px;
            }

            &:hover {
              background-color: #f1f1f5;
            }
          }
        }

        .dynamic-item-content {
          margin-bottom: 10px;
          .di-content-wrapper {
            font-size: 15px;
            line-height: 24px;
            .switch-btn {
              display: none;
              color: #666;
              height: 24px;
              font-size: 13px;
              padding: 0 6px;
              box-sizing: border-box;
              border-radius: 100px;
              cursor: pointer;
              &:hover {
                color: @primary-color;
                // border: 1px solid @primary-color;
              }
            }
          }
        }

        .dynamic-item-box {
          .dynamic-type-normal {
            display: flex;
            align-items: center;
            width: 80%;
            min-width: 108px;

            &.more-than-one {
              .el-image {
                height: 100px;
              }
              .el-image + .el-image {
                margin-left: 14px;
              }
            }

            img {
              width: auto;
              height: auto;
              max-width: 100%;
              max-height: 100%;
              object-fit: cover;
            }
          }

          .dynamic-type-special {
            display: flex;
            justify-content: space-between;
            width: 80%;
            min-width: 100px;
            height: 128px;

            border-radius: 6px;
            border: 1px solid #dcdfe6;
            .special-left {
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

            .special-right {
              width: 60%;
              padding: 10px;
              .special-right-title {
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

              .special-right-intro {
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

              .special-right-playinfo {
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

        .dynamic-item-active {
          display: flex;
          align-items: center;
          padding: 10px 0;
          & > span {
            display: flex;
            align-items: center;
            margin-right: 40px;
            color: #606266;
            cursor: pointer;
            i {
              margin-right: 3px;
              font-size: 15px;
            }

            span {
              font-size: 14px;
            }
          }

          .discuss {
            &.discuss-active {
              color: @primary-color;
            }
          }
          .praise {
            &.isLike {
              color: @primary-color;
            }
          }
        }

        .dynamic-item-comment {
          margin-top: 18px;
          .dynamic-comment-form {
            display: flex;

            .comment-avatar {
              width: 40px;
              height: 40px;
              margin-right: 8px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }

            .comment-textare {
              width: calc(100% - 40px);
              min-height: 46px;
              border: 1px solid #f1f1f5;
              background-color: #fafafb;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-radius: 14px;
              .comment-textare-left {
                width: 96%;

                /deep/ .el-textarea__inner {
                  border: none;
                  font-size: 16px;
                  color: #92929d;
                  background-color: transparent;
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

              .comment-textare-right {
                display: flex;
                align-items: center;
                margin-top: 10px;
                .control-left-span {
                  margin-right: 15px;
                  cursor: pointer;
                  i {
                    font-size: 24px;
                    color: #92929d;

                    &:hover {
                      color: @main-text-color;
                    }
                  }
                }
              }
            }
          }

          .comment-splitLine {
            height: 1px;
            width: 100%;
            margin: 30px 0;
            background-color: #e5e9ef;
          }

          .dynamic-comment-list {
            .comment-list {
              .comment-item {
                display: flex;
                padding: 16px 0;

                .comment-avatar {
                  display: flex;
                  align-items: unset;
                  height: 33px;

                  .user-link {
                    flex: 0 0 auto;

                    img {
                      width: 40px;
                      height: 40px;
                      border-radius: 50%;
                      font-size: 12px;
                    }
                  }
                }

                .content-box {
                  flex: 1 1 auto;
                  margin-left: 16px;

                  .comment-main,
                  .content-wrapper {
                    position: relative;

                    .user-box {
                      display: flex;
                      align-items: center;

                      .user-name {
                        .username {
                          display: flex;
                          align-items: center;
                          font-size: 18px;
                          font-weight: 600;
                          color: #252933;

                          span {
                            max-width: 128px;
                            font-weight: 500;
                            font-size: 15px;
                            color: #252933;
                            max-width: 90px;
                            line-height: 26px;
                          }

                          .name {
                            display: inline-block;
                            vertical-align: top;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                          }

                          .gender {
                            width: 17px;
                            height: 17px;
                            border-radius: 50%;
                            color: #fff;
                            text-align: center;
                            line-height: 17px;
                            font-size: 12px;
                            margin: 0 5px;
                          }

                          .el-icon-male {
                            background-color: @primary-color;
                          }

                          .el-icon-female {
                            background-color: @danger-color;
                          }

                          .level {
                            font-size: 28px;
                            font-weight: 500;
                          }
                        }
                      }

                      .rely-box {
                        display: flex;
                        align-items: center;

                        span {
                          padding: 0 12px;
                          font-size: 14px;
                          line-height: 22px;
                          color: #8a919f;
                        }

                        .user-popover {
                          // align-items: unset;

                          .repliedname {
                            font-weight: 500;
                            font-size: 15px;
                            color: #252933;
                            line-height: 26px;
                            display: block;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            word-break: break-all;
                          }
                        }
                      }

                      .time {
                        margin-left: auto;
                        color: #99a2aa;
                        font-size: 14px;
                      }
                    }

                    .content {
                      display: -webkit-box;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      -webkit-box-orient: vertical;
                      font-weight: 400;
                      font-size: 14px;
                      line-height: 24px;
                      color: #515767;
                      margin-top: 8px;
                      // -webkit-line-clamp: 6;

                      .wrapper {
                        display: flex;
                        overflow: hidden;
                        border-radius: 8px;
                      }
                      .text {
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: justify;
                        display: -webkit-box;
                        -webkit-line-clamp: 6;
                        -webkit-box-orient: vertical;
                        position: relative;
                      }
                      .text::before {
                        content: "";
                        height: calc(100% - 24px);
                        float: right;
                      }
                      .text::after {
                        content: "";
                        // width: 999vw;
                        // height: 999vw;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        box-shadow: inset calc(100px - 999vw) calc(30px - 999vw)
                          0 0 #fff;
                        // margin-left: -100px;
                      }
                      .replytext::after {
                        content: "";
                        // width: 999vw;
                        // height: 999vw;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        box-shadow: inset calc(100px - 999vw) calc(30px - 999vw)
                          0 0 #f9fafb;
                        // margin-left: -100px;
                      }
                      .btn {
                        float: right;
                        clear: both;
                        margin-left: 10px;
                        font-size: 14px;
                        padding: 0 8px;
                        // background: #fff;
                        line-height: 24px;
                        border-radius: 4px;
                        color: @primary-color;
                        cursor: pointer;
                        /* margin-top: -30px; */
                      }
                      .btn::before {
                        content: "展开";
                      }
                      .exp {
                        display: none;
                      }
                      .exp:checked + .text {
                        -webkit-line-clamp: 999;
                      }
                      .exp:checked + .text::after {
                        visibility: hidden;
                      }
                      .exp:checked + .text .btn::before {
                        content: "收起";
                      }
                    }

                    .comment-warpper {
                      .comment-action {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 10px;
                        font-size: 18px;

                        .comment-action-left {
                          display: flex;
                          align-items: center;

                          & > span {
                            margin-right: 22px;
                            line-height: 22px;
                            font-size: 14px;
                            cursor: pointer;
                            color: #8a919f;

                            i {
                              margin-right: 5px;
                              font-size: 16px;
                            }

                            &:hover {
                              color: @primary-color;
                            }
                          }
                        }

                        .comment-action-right {
                          .ca-right-more {
                            color: #8a919f;
                            font-size: 16px;
                            cursor: pointer;
                          }
                        }
                      }

                      .focused-reply {
                        display: none;
                        width: 92%;
                        margin-top: 16px;
                        margin-bottom: 24px;

                        &.show {
                          display: block !important;
                        }

                        .action-box {
                          display: flex;
                          align-items: center;
                          margin-top: 8px;

                          .comment-emoji {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            width: 68px;
                            height: 30px;
                            cursor: pointer;
                            border-radius: 6px;
                            transition: box-shadow 0.2s;
                            border: 1px solid #e5e9ef;

                            &:hover {
                              box-shadow: @element-boxshadow2;
                            }

                            i {
                              background-repeat: no-repeat;
                              background-size: cover;
                              margin-right: 4px;
                              transition: fill 0.3s;
                              font-size: 18px;
                              color: #4e5969;
                            }

                            span {
                              color: #4e5969;
                              font-size: 14px;
                              line-height: 22px;
                              transition: color 0.3s;
                            }
                          }

                          .submit {
                            margin-left: auto;
                            width: 92px;
                            text-align: center;
                            font-size: 14px;
                            line-height: 36px;
                            background: #abcdff;
                            border-radius: 4px;
                            color: #fff;
                            padding: 0;
                            cursor: pointer;

                            &.notNull {
                              background: @primary-color;
                            }
                          }
                        }
                      }

                      .show {
                        display: block !important;
                      }
                    }
                  }

                  .subcomment-wrapper {
                    .sub-comment-list {
                      margin-top: 16px;
                      padding: 16px;
                      background: #f9fafb;
                      border-radius: 4px;

                      & > div {
                        .sub-comment-item {
                          display: flex;

                          &:not(:first-child) {
                            margin-top: 24px;
                          }

                          .reply-more {
                            display: none;
                          }

                          &:hover .reply-more {
                            display: block;
                          }

                          .subcomment-avatar {
                            a {
                              flex: 0 0 auto;

                              img {
                                display: inline-block;
                                position: relative;
                                background-position: 50%;
                                background-size: cover;
                                background-repeat: no-repeat;
                                width: 24px;
                                height: 24px;
                                border-radius: 50%;
                              }
                            }
                          }

                          .subcomment-content {
                            flex: 1 1 auto;
                            margin-left: 12px;

                            .content-wrapper {
                              .content {
                                .text::after {
                                  content: "";
                                  width: 100%;
                                  height: 100%;
                                  position: absolute;
                                  box-shadow: inset calc(100px - 999vw)
                                    calc(30px - 999vw) 0 0 #f9fafb;
                                  background-color: #f9fafb;
                                }
                              }

                              .comment-action {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                margin-top: 10px;
                                font-size: 18px;

                                .comment-action-left {
                                  display: flex;
                                  align-items: center;

                                  & > span {
                                    margin-right: 22px;
                                    line-height: 22px;
                                    font-size: 14px;
                                    cursor: pointer;
                                    color: #8a919f;

                                    i {
                                      margin-right: 5px;
                                      font-size: 16px;
                                    }

                                    &:hover {
                                      color: @primary-color;
                                    }
                                  }
                                }

                                .comment-action-right {
                                  .ca-right-more {
                                    color: #8a919f;
                                    font-size: 16px;
                                    cursor: pointer;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }

                      .fetch-more {
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        color: #252933;
                        line-height: 22px;
                        box-sizing: border-box;
                        font-size: 14px;
                        cursor: pointer;
                        margin: 0;
                        margin-left: 36px;
                        margin-top: 24px;

                        i {
                          margin-left: 4px;
                        }
                      }
                    }
                  }
                }
              }
            }
            .comment-list-more {
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #252933;
              font-size: 15px;
              height: 52px;
              cursor: pointer;
              margin: 36px 0 0;
              font-weight: 500;
              background-color: rgba(66, 129, 255, 0.04);

              &:hover {
                background-color: rgba(66, 129, 255, 0.1);
              }
              i {
                margin-left: 8px;
              }
            }
          }
        }
      }
    }
  }
}
</style>