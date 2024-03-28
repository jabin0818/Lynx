<template>
  <div id="video-comment">
    <template>
      <div class="comment-head">
        <span class="c-head-t">评论</span>
        <span class="results">{{ total }}</span>
      </div>
      <div class="comment-form">
        <div class="avatar-box">
          <img
            :src="
              userInfo.avatar
                ? userInfo.avatar
                : require('@/assets/img/user/default_avatar.jpg')
            "
          />
        </div>
        <div class="textarea-box" ref="textarea" @click="focus">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="轻轻地你来了，正如你轻轻地走~"
            v-model="textarea"
            :autosize="{ minRows: 3, maxRows: 8 }"
            resize="none"
          >
          </el-input>
          <div class="action-box" v-show="isFocus">
            <div class="comment-emoji">
              <i class="iconfont icon-emoji"></i>
              <span>表情</span>
            </div>
            <div class="submit" @click="submitComment">
              <span>发表评论</span>
            </div>
          </div>
        </div>
      </div>
      <template v-if="comments.length">
        <div class="comment-splitLine"></div>
        <div class="comment-list-wrapper">
          <div class="comment-list-title">
            <div class="comment-lt-right">
              <span>全部评论</span>
              <!-- <span>2</span> -->
            </div>
            <div class="comment-lt-left">
              <div class="solt-item active" ref="latestBtn" @click="latestBtn">
                <i class="el-icon-time"></i>
                <span>最新</span>
              </div>
              <div class="solt-item" ref="hottestBtn" @click="hottestBtn">
                <i class="el-icon-hot-water"></i>
                <span>最热</span>
              </div>
              <!-- <div class="background-active"></div> -->
            </div>
          </div>
          <div class="comment-list" v-if="finish">
            <div
              class="comment-item"
              v-for="(item, index1) in comments"
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
                    <!-- new Date(item.commentCreateTime).toLocaleDateString() -->
                    <time
                      datetime=""
                      :title="$utils.showtime(item.commentCreateTime)"
                      class="time"
                      >{{ item.commentCreateTime }}</time
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
                        <span
                          class="praise"
                          @click="likeCommentBtn(item.commentId, index1)"
                        >
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
                          <span>{{ item.childrenComment.length }}</span>
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
                              v-if="item.commentAccount !== userInfo.account"
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
                              <li
                                @click="deleteVideoCommentBtn(item.commentId)"
                              >
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
                  v-if="item.childrenComment.length"
                >
                  <div class="sub-comment-list">
                    <div>
                      <div
                        class="sub-comment-item"
                        v-for="(item2, index2) in item.childrenComment"
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
                                datetime=""
                                :title="
                                  $utils.showtime(item2.commentCreateTime)
                                "
                                class="time"
                              >
                                {{ item2.commentCreateTime }}
                              </time>
                            </div>
                            <div class="content">
                              <div class="wrapper">
                                <input id="exp2" class="exp" type="checkbox" />
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
                                  <span
                                    class="praise"
                                    @click="
                                      likeCommentBtn(
                                        item2.commentId,
                                        index2,
                                        index1
                                      )
                                    "
                                  >
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
                                <div class="comment-action-right reply-more">
                                  <el-popover
                                    placement="left"
                                    width="200"
                                    trigger="hover"
                                  >
                                    <ul class="actions-info-more">
                                      <template
                                        v-if="
                                          item2.commentAccount !==
                                          userInfo.account
                                        "
                                      >
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
                                      </template>
                                      <template v-else>
                                        <li
                                          @click="
                                            deleteVideoCommentBtn(
                                              item2.commentId
                                            )
                                          "
                                        >
                                          删除
                                        </li>
                                      </template>
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
                    <!-- <div class="fetch-more">
                              <span> 查看更多回复  </span>
                              <i class="el-icon-arrow-down"></i>    
                          </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="comment-list-more" v-if="isHasNextPage" @click="nextPage">
            <span> 查看全部 {{ total }} 条回复 </span>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
      </template>
      <el-empty v-else description="暂无评论"></el-empty>
    </template>
  </div>
</template>

<script>
import {
  getVideoComment,
  insertVideoComment,
  deleteVideoComment,
  likeVideoComment,
} from "@/api/comment.js";
import { mapState } from "vuex";

export default {
  name: "VideoComment",
  data() {
    return {
      finish: false,
      textarea: "",
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
    };
  },
  async mounted() {
    window.addEventListener("click", this.otherHidden);
    window.addEventListener("click", this.hiddenReplyTextArea);
    await this.getCommentData(false);
  },
  beforeDestroy() {
    /* 组件销毁的时候要移除侦听器 */
    window.removeEventListener("click", this.otherHidden);
  },
  methods: {
    async latestBtn() {
      this.$refs.hottestBtn.classList.remove("active");
      this.$refs.latestBtn.classList.add("active");
      this.query.sortTimeOrTrending = true;
      await this.getCommentData(false);
    },
    async hottestBtn() {
      this.$refs.latestBtn.classList.remove("active");
      this.$refs.hottestBtn.classList.add("active");
      this.query.sortTimeOrTrending = false;
      await this.getCommentData(false);
    },
    focus() {
      this.isFocus = true;
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
      // let userId = this.$route.query.userId;
      let videoId = this.$route.params.id;
      getVideoComment(
        videoId,
        this.query.sortTimeOrTrending,
        this.query.page,
        this.query.rows,
        this.userInfo?.id
      )
        .then((res) => {
          if (isLoadMore) {
            this.comments = this.comments.concat(res.data.list);
          } else {
            this.comments = res.data.list;
          }
          this.finish = true;
          console.log("总数为：", res.data.total);
          this.total = res.data.total ? res.data.total : 0;
          this.isHasNextPage = res.data.hasNextPage;
        })
        .catch((err) => {
          console.log(err);
          this.total = 0;
        });
    },
    async submitComment() {
      if (this.isLogin) {
        let userId = this.$route.query.userId;
        let videoId = Number(this.$route.params.id);
        let commentContent = this.textarea;
        let commentAdmin = 0;
        if (userId === this.userInfo.id) {
          commentAdmin = 1;
        }
        let res = await insertVideoComment(
          this.userInfo.id,
          this.userInfo.account,
          this.userInfo.username,
          videoId,
          commentAdmin,
          commentContent,
          this.userInfo.avatar
        );
        if (res.code === 200) {
          this.$message.success("发表成功！");
          this.textarea = "";
          await this.getCommentData(false);
        } else {
          this.$message.error("发表失败，请稍后重试！");
        }
      } else {
        this.$message.error("登录后即可发表评论！");
        this.$store.state.global.loginRegVisible = true;
      }
    },
    async submitReply(firstParentId, parentCommentId) {
      if (this.isLogin) {
        let userId = this.$route.query.userId;
        let videoId = Number(this.$route.params.id);
        let commentContent = this.reply;
        let commentAdmin = 0;
        if (userId === this.userInfo.id) {
          commentAdmin = 1;
        }
        let res;
        if (parentCommentId) {
          res = await insertVideoComment(
            this.userInfo.id,
            this.userInfo.account,
            this.userInfo.username,
            videoId,
            commentAdmin,
            commentContent,
            this.userInfo.avatar,
            firstParentId,
            parentCommentId
          );
        } else {
          res = await insertVideoComment(
            this.userInfo.id,
            this.userInfo.account,
            this.userInfo.username,
            videoId,
            commentAdmin,
            commentContent,
            this.userInfo.avatar,
            firstParentId
          );
        }
        if (res.code === 200) {
          this.$message.success("发表成功！");
          this.reply = "";
          await this.getCommentData(false);
        } else {
          this.$message.error("发表失败，请稍后重试！");
        }
      } else {
        this.$message.error("登录后即可发表评论！");
        this.$store.state.global.loginRegVisible = true;
      }
    },
    async likeCommentBtn(id, index, fatIndex) {
      let res = await likeVideoComment(id);
      console.log("点赞的接口", res);
      if (res.code === 200) {
        if (fatIndex === undefined) {
          // this.comments[index].videoCommentLike =
        } else {
          // this.comments[fatIndex].childrenComment[index].videoCommentLike =
        }
      }
    },
    deleteVideoCommentBtn(id) {
      this.$confirm("是否删除该评论?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await deleteVideoComment(id);
          if (result.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            await this.getCommentData(false);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    likeRand() {
      return Math.floor(Math.random() * (100 - 0)) + 0;
    },
    againstRand() {
      return Math.floor(Math.random() * (10 - 0)) + 0;
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
    findReplyUsername(id, item) {
      let res = item.childrenComment.find((item) => {
        return item.commentId === id;
      });
      return res.commentUsername;
    },
  },
  computed: {
    ...mapState("user", ["isLogin", "userInfo"]),
  },
  watch: {
    reply(newValue) {
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
    "$route.params.id": async function (newVal, oldVal) {
      await this.getCommentData(false);
    },
  },
};
</script>

<style lang="less" scoped>
#video-comment {
  background-color: #fff;

  .comment-head {
    font-size: 18px;
    line-height: 24px;
    color: #222;
    margin: 0 0 20px;

    .c-head-t {
      margin-right: 10px;
    }

    .results {
      margin-right: 10px;
    }
  }

  .comment-form {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .avatar-box {
      margin-right: 16px;
      overflow: hidden;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #ccc;
      }
    }

    .textarea-box {
      width: 92%;

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
          background: @primary-color;
          border-radius: 4px;
          color: #fff;
          padding: 0;
          cursor: pointer;
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

  .comment-list-wrapper {
    padding-bottom: 16px;

    .comment-list-title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .comment-lt-right {
        position: relative;
        line-height: 30px;
        padding-bottom: 8px;

        span:nth-child(1) {
          font-size: 18px;
          color: #222;
        }
      }

      .comment-lt-left {
        position: relative;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #4e5969;
        font-weight: 400;
        cursor: pointer;
        background: #f2f3f5;
        border-radius: 4px;
        padding: 3px;

        .solt-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px 12px;
          line-height: 22px;
          color: #8a919f;
          background: transparent;
          border: none;

          i {
            font-size: 16px;
            margin-right: 4px;
          }

          span {
            font-size: 14px;
          }
        }

        .active {
          border-radius: 4px;
          background: #fff;
          color: @primary-color;
        }
      }
    }

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
                width: 100%;
                height: 100%;
                position: absolute;
                box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0
                  #fff;
              }
              .replytext::after {
                content: "";
                width: 100%;
                height: 100%;
                position: absolute;
                box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0
                  #f9fafb;
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
      &:hover i {
        animation: mobile-animation 1s ease 0.3s infinite;
      }
      @keyframes mobile-animation {
        0% {
          transform: translateY(0px);
        }
        20% {
          transform: rotate(2px);
        }

        40% {
          transform: translateY(0px);
        }

        80% {
          transform: translateY(2px);
        }

        100% {
          transform: translateY(0px);
        }
      }
      i {
        margin-left: 8px;
        transition: all 0.2s;
      }
    }
  }
}
</style>