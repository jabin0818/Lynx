<template>
  <div id="notes-detail">
    <template v-if="finish">
      <div class="notes-title">
        <span>笔记</span>
        <h1>{{ data.title }}</h1>
        <!-- 待审核 -->
        <!-- <span class="iconfont icon-pendingReview" v-if="data.state === -1" style="color: #faad14; font-size: 38px;"></span> -->
        <!-- 审核拒绝 -->
        <!-- <span class="iconfont icon-reviewRejected" v-if="data.state === 0" style="color: red; font-size: 38px;"></span> -->
      </div>
      <div class="notes-read-panel">
        <div class="notes-read-info">
          <span class="publish-text">
            <i class="el-icon-time publish-text-icon"></i>
            <span>{{ data.createTime }}</span>
          </span>
          <span>{{ data.views }}阅读</span> · <span>37点赞</span> ·
          <span>{{ data.commentNum }}评论</span>
          <span
            v-if="data.userId === userInfo.id"
            class="update-text"
            @click="toNotesEdit"
            >编辑</span
          >
        </div>
      </div>
      <!-- <div class="notes-user">
        <div class="author-info-box">
          <span class="avatar">
            <img
              :src="
                data.avatar
                  ? data.avatar
                  : require('@/assets/img/user/default_avatar.jpg')
              "
            />
          </span>
          <div class="author-name-meta" style="padding-left: 10px">
            <div class="author-name">
              <a target="_blank" class="username">
                <span class="name">{{ data.username }}</span>
              </a>
            </div>
            <div class="meta-box" style="color: #8a919f">
              <span class="fans">粉丝：</span>
              <span class="fans-num">{{ data.fans }}</span>
              <span class="view">笔记：</span>
              <span class="view-num">{{ data.blogNum }}</span>
            </div>
          </div>
        </div>
        <div class="follow-box">
          <div class="follow">
            <div class="follow-btn following-btn">已关注</div>
          </div>
        </div>
      </div> -->
      <div
        class="notes-desc"
        v-show="data.description && data.description !== ''"
      >
        {{ data.description }}
      </div>
      <div class="notes-titleMap" v-if="data.firstImg">
        <img :src="data.firstImg" style="width: 100%" />
      </div>
      <div class="notes-content" style="width: 100%">
        <mavon-editor
          :value="data.content"
          :subfield="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
          boxShadowStyle="0"
          previewBackground="#fff"
          codeStyle="obsidian"
        ></mavon-editor>
      </div>
      <div class="notes-end">
        <div class="tag-list-box">
          <div class="tag-list" v-if="data.types">
            <div class="tag-list-title">分类：</div>
            <a
              class="category-item"
              v-for="(item, index) in data.types.split(',')"
              :key="index"
              ><span>{{ item }}</span></a
            >
          </div>
          <div class="tag-list label-list" v-if="data.tag">
            <div class="tag-list-title">标签：</div>
            <a
              class="category-item"
              v-for="(item, index) in data.tag.split(',')"
              :key="index"
              ><span>{{ item }}</span></a
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getNotesDetail } from "@/api/notes.js";
import { mapState } from "vuex";

export default {
  name: "NotesDetail",
  data() {
    return {
      finish: false,
      data: {},
    };
  },
  async mounted() {
    await this.getNotesDetailById();
  },
  methods: {
    async getNotesDetailById() {
      this.finish = false;
      let userId = this.$route.query.userId;
      let notesId = this.$route.params.id;
      try {
        let result = await getNotesDetail(notesId, userId);
        console.log(result);
        if (result.code === 200) {
          this.finish = true;
          this.data = result.data;
          this.$emit("initTypeIds", {
            typeId: result.data.typeId,
            authorId: result.data.userId,
            notesToc: this.$utils.toToc(result.data.htmlContent),
            noteId: result.data.blogId,
            isLike: result.data.thumbs,
            isStar: result.data.collect,
            likeNum: result.data.likeNum,
            commentNum: result.data.comNum,
            starNum: result.data.starNum,
            shareNum: result.data.share,
          });
          this.$store.commit("global/SETSHAREDETAILINFO", {
            typeOf: 1,
            author: this.data.username,
            avatar: this.data.avatar,
            cover: this.data.firstImg,
            title: this.data.title,
            desc: this.data.description || this.data.content?.slice(0, 50),
            likeNum: this.data.blogNum,
            commentNum: this.data.comment,
            starNum: null,
            viewNum: this.data.views,
            videoTime: null,
            linkId: this.data.blogId,
          });
        } else {
          this.$message.error("网络繁忙！");
          this.$router.push({
            path: "/index",
          });
        }
      } catch (error) {
        this.$message.error("网络繁忙！");
        this.$router.push({
          path: "/index",
        });
      }
    },
    // 路由到文章编辑页面
    toNotesEdit() {
      this.$router.push({
        path: "/notes/edit/" + this.data.blogId,
        query: {
          userId: this.$route.query.userId,
        },
      });
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
#notes-detail {
  padding: 20px;
  background-color: #fff;
  border-radius: 6px;

  .notes-title {
    display: flex;
    margin-bottom: 16px;
    align-items: center;

    span {
      width: 50px;
      height: 24px;
      border: 1px solid @primary-color;
      color: @primary-color;
      line-height: 24px;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      margin-right: 10px;
      border-radius: 6px;
    }

    h1 {
      font-size: 32px;
      font-weight: 700;
      line-height: 1.31;
      color: #252933;
    }

    h2 {
      font-weight: 700;
    }
  }

  .notes-read-panel {
    margin-bottom: 20px;
    color: #999;

    .notes-read-info {
      font-weight: 400;
      font-size: 13px;

      & > span {
        margin: 0 3px;
        color: #999;
        transition: 0.3s;
      }

      .publish-text {
        display: inline-block;
        margin-right: 14px;

        .publish-text-icon {
          margin-right: 5px;
        }
      }

      .update-text {
        color: @primary-color;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }

  .notes-user {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .author-info-box {
      display: flex;
      align-items: center;

      .avatar {
        width: 46px;
        height: 46px;
        line-height: 46px;
        font-size: 18px;
        cursor: pointer;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .author-name-meta {
        .author-name {
          font-size: 18px;

          .username {
            .name {
              font-size: 16px;
              color: @main-text-color;
            }
          }
        }

        .meta-box {
          color: @general-text-color;
          font-size: 14px;

          .fans-num {
            margin-right: 16px;
          }
        }
      }
    }

    .follow-box {
      .follow {
        .follow-btn {
          width: 76px;
          height: 26px;
          border-radius: 4px;
          background-color: @primary-color;
          color: #fff;
          text-align: center;
          font-size: 14px;
          line-height: 26px;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color: rgba(66, 129, 255, 0.8);
          }

          &.following-btn {
            background-color: #e3e5e7;
            color: #9499a0;
            &:hover {
              background-color: #f1f2f3;
            }
          }
        }
      }
    }
  }

  .notes-desc {
    font-size: 14px;
    padding: 10px;
    background-color: #f1f2f3;
    color: #252933;
    border-radius: 6px;
  }

  .notes-titleMap {
    padding-top: 20px;
  }

  .notes-content {
    padding-top: 20px;
  }

  .notes-end {
    padding-top: 10px;
    border-radius: 0 0 4px 4px;
    padding-bottom: 20px;

    .tag-list-box {
      margin-bottom: -12px;

      .tag-list {
        display: flex;
        font-size: 16px;
        margin-right: 30px;
        flex-shrink: 0;
        line-height: 36px;

        .tag-list-title {
          flex-shrink: 0;
          margin-right: 8px;
          font-size: 14px;
          color: #515767;
        }

        .category-item {
          background-color: #f2f3f5;
          color: #515767;
          display: flex;
          align-items: center;
          margin: 0 14px 14px 0;
          padding: 0 14px;
          border-radius: 4px;
          transition: background-color 0.15s linear;
          cursor: pointer;

          &:hover {
            background-color: #e4e6eb;
          }

          span {
            white-space: nowrap;
            line-height: 36px;
          }
        }
      }

      .label-list {
        .category-item {
          background-color: rgba(66, 129, 255, 0.1);
          color: @primary-color;

          &:hover {
            background-color: rgba(66, 129, 255, 0.16);
          }
        }
      }
    }
  }
}

/* 代码高亮部分设置样式--start */
#notes-detail .markdown-body .highlight pre,
.markdown-body pre {
  padding: 0 !important;
}

#notes-detail .hljs {
  padding: 10px;
}

/* 代码高亮部分设置样式--end */

/* mavon-editor整体样式--start */
#notes-detail .v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  padding: 0;
}
#notes-detail .v-note-wrapper {
  z-index: 900;
}
/* 设置mavon-editor的最小高度 */
#notes-detail .v-note-wrapper.markdown-body.shadow {
  min-height: 0;
}
/* mavon-editor整体样式--end */
</style>