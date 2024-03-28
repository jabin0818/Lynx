<template>
  <div id="content-notes">
    <div class="filter-wrap">
      <span
        class="filter-item"
        :class="{ 'active-type': type === 'all' }"
        @click="noteFilter('all')"
      >
        <span>全部</span>
        <span class="total">(2)</span>
      </span>
      <span
        class="filter-item"
        :class="{ 'active-type': type === 'published' }"
        @click="noteFilter('published')"
      >
        <span>已发布</span>
        <span class="total">(2)</span>
      </span>
      <span
        class="filter-item"
        :class="{ 'active-type': type === 'inReview' }"
        @click="noteFilter('inReview')"
      >
        <span>审核中</span>
        <span class="total">(2)</span>
      </span>
      <span
        class="filter-item"
        :class="{ 'active-type': type === 'notPass' }"
        @click="noteFilter('notPass')"
      >
        <span>未通过</span>
        <span class="total">(2)</span>
      </span>
    </div>
    <div class="notes-container">
      <ul class="notes-list">
        <li
          class="notes-item"
          v-for="(item, index) in data"
          :key="index"
          @click="toUserNotesDetail(item.blog_id)"
        >
          <div class="essay-item">
            <div class="first-line">
              <!-- <a class="tag audit-fail">未通过</a> -->
              <a class="tag audit-success">已通过</a>
              <!-- <a class="tag audit-wait">审核中</a> -->
              <span class="title">{{ item.title }}</span>
              <div class="byte-dropdown">
                <el-popover placement="bottom" width="40" trigger="hover">
                  <ul class="actions-info-more">
                    <li @click="toNotesEdit(item.blog_id)">
                      <i class="el-icon-edit"></i>
                      <span>编辑</span>
                    </li>
                    <li @click="deleteNotesById(item.blog_id)">
                      <i class="el-icon-delete"></i>
                      <span>删除</span>
                    </li>
                  </ul>
                  <!-- <el-button >click 激活</el-button> -->
                  <span slot="reference">
                    <i class="el-icon-more"></i>
                  </span>
                </el-popover>
              </div>
            </div>
            <div class="infos">
              <div class="infos-left">
                <span class="read">
                  <i class="el-icon-view"></i>
                  <span>{{ item.views }}</span>
                </span>
                <span class="like">
                  <i class="iconfont icon-good"></i>
                  <span>{{ item.like }}</span>
                </span>
                <span class="comment">
                  <i class="el-icon-chat-dot-square"></i>
                  <span>{{ item.commentNum }}</span>
                </span>
                <span class="star">
                  <i class="el-icon-star-off"></i>
                  <span>0</span>
                </span>
              </div>
              <div class="infos-right">
                <span class="time">{{ $utils.showtime(item.createTime) }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { selectBlogsByUser, deleteOneNotes } from "@/api/notes.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: [],
      type: "all",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      if (this.isLogin) {
        let res = await selectBlogsByUser(this.userInfo.id);
        if (res.code === 200) {
          this.data = res.data;
        }
      }
    },
    noteFilter(classify) {
      this.$router.push(`${this.$route.path}?type=${classify}`);
      this.type = classify;
    },
    toUserNotesDetail(blogId) {
      let routeData = this.$router.resolve({
        path: "/notes/detail/" + blogId,
      });
      window.open(routeData.href, "_blank");
    },
    toNotesEdit(blogId) {
      let routeData = this.$router.resolve({
        path: "/notes/edit/" + blogId,
      });
      window.open(routeData.href, "_blank");
    },
    deleteNotesById(id) {
      this.$confirm("是否确定删除笔记?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await deleteOneNotes(id);
          console.log("删除笔记的接口", res);
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.getData();
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {});
    },
  },
  computed: {
    ...mapState("user", ["isLogin", "userInfo"]),
  },
};
</script>

<style lang="less" scoped>
#content-notes {
  .filter-wrap {
    padding: 0 20px;
    margin-bottom: 16px;

    .filter-item {
      border-right: 1px solid #e5e6eb;
      display: inline-block;
      padding: 0 16px;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: #86909c;
      cursor: pointer;
      &:first-child {
        padding-left: 0 !important;
      }
    }

    .active-type {
      color: @primary-color !important;
    }
  }

  .notes-container {
    .notes-list {
      .notes-item {
        padding: 0 20px;
        cursor: pointer;

        &:hover {
          background: #fafafa;
        }

        .essay-item {
          box-sizing: border-box;
          width: 100%;
          padding: 16px 0;
          border-bottom: 1px solid #e5e6eb;
          .first-line {
            position: relative;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;

            .tag {
              flex: none;
              margin-right: 8px;
              display: inline-block;
              vertical-align: middle;
              box-sizing: border-box;
              padding: 0 4px;
              font-size: 12px;
              font-weight: 400;
              height: 20px;
              line-height: 20px;
              border-radius: 2px;
              white-space: nowrap;
            }

            .audit-fail {
              color: #f56c6c;
              background: #ffece8;
            }
            .audit-success {
              color: #67c23a;
              background: #e7ffdc;
            }
            .audit-wait {
              color: #e6a23c;
              background: #ffeed4;
            }

            .title {
              max-width: calc(100% - 20px);
              font-weight: 400;
              font-size: 16px;
              line-height: 24px;
              color: #1d2129;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              flex: auto;
            }

            .byte-dropdown {
              display: inline-block;
              width: 24px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              cursor: pointer;

              &:hover {
                background: #e5e6eb;
                border-radius: 2px;
              }
              i {
                font-size: 16px;
                color: #4e5969;

                display: inline-block;
                vertical-align: middle;
                line-height: 1;
              }
            }
          }

          .infos {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 400;
            font-size: 14px;
            height: 22px;
            line-height: 22px;
            color: #606266;
            .infos-left {
              display: flex;
              justify-content: space-between;
              align-items: center;
              & > span {
                display: flex;
                align-items: center;
                margin-right: 26px;

                i {
                  margin-right: 2px;
                  font-size: 15px;
                }
              }
            }

            .infos-right {
            }
          }
        }
      }
    }
  }
}
</style>