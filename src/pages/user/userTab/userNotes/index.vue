<template>
  <div id="user-notes">
    <div class="sub-header">
      <div class="sub-header-title">
        <el-input
          type="text"
          class="sub-header-search"
          placeholder="搜索笔记"
          suffix-icon="el-icon-search"
          v-model="query.search"
          @keyup.enter.native="searchKeyWord()"
        >
        </el-input>
      </div>
      <div class="sub-type-box">
        <div class="sub-type-sort">
          <el-popover
            placement="bottom-end"
            width="40"
            trigger="click"
            popper-class="st-sort-popover"
          >
            <div id="subtype-sort-wrapper">
              <a class="sub-type active" ref="timeBtn" @click="dataSort('time')">最新</a>
              <span class="sub-type-line"></span>
              <a class="sub-type" ref="hotBtn" @click="dataSort('hot')">热门</a>
            </div>
            <i class="el-icon-sort" slot="reference"></i>
          </el-popover>
        </div>
        <div class="sub-type-filter">
          <el-dropdown
            trigger="click"
            @command="notesFilter"
            placement="bottom-start"
          >
            <span class="el-dropdown-link">
              <i class="iconfont icon-shaixuan1"></i>
              <i class="el-icon-arrow-down el-icon--right"></i>
              {{ notesFilterCond }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="{ label: '全部', value: 'all' }"
                icon="el-icon-plus"
                >全部</el-dropdown-item
              >
              <el-dropdown-item
                v-for="item in classifyData"
                :key="item.id"
                :command="{ label: item.name, value: item.id }"
                icon="el-icon-plus"
                >{{item.name}}</el-dropdown-item
              >
              
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <ul class="entry-list" v-if="userNotes.length">
      <li class="entry-item" v-for="item in userNotes" :key="item.blogId" @click="toNotesDetail(item.blogId, item.userId)">
        <div class="entry">
          <div class="title-row">
            <!-- <div class="audit-tag">审核中</div> -->
            <div class="title">{{ item.title }}</div>
          </div>
          <div class="abstract">
            <span>
              {{ item.description }}</span
            >
          </div>
          <!-- <div class="label">
            <span>前端</span>
            <span>后端</span>
            <span>javasript</span>
          </div> -->
          <div class="action-list">
            <div class="action-item">
              <i class="el-icon-view"></i>
              <span>{{ item.views }}</span>
            </div>
            <div class="action-item">
              <i class="iconfont icon-good"></i>
              <span>6</span>
            </div>
            <div class="action-item">
              <i class="el-icon-chat-dot-square"></i>
              <span>13</span>
            </div>
            <div class="action-item">
              <i class="el-icon-star-off"></i>
              <span>{{ item.comment }}</span>
            </div>
            <el-popover placement="right" width="110" trigger="hover">
              <ul class="actions-info-more">
                <li>
                  <i class="el-icon-edit"></i>
                  <span>编辑</span>
                </li>
                <li>
                  <i class="el-icon-delete"></i>
                  <span>删除</span>
                </li>
              </ul>
              <div class="action-item" slot="reference">
                <i class="el-icon-more"></i>
              </div>
            </el-popover>

            <div class="action-item">
              <span>{{ item.createTime }}</span>
            </div>
          </div>
        </div>
      </li>
      <li class="data-loading-more" @click="loadMore">
        <i class="el-icon-loading" v-show="!finish"></i>
        <span v-show="finish">{{
          hasNext ? "加载更多" : "暂无更多数据"
        }}</span>
      </li>
    </ul>
    <el-empty description="暂无笔记数据" v-else></el-empty>
  </div>
</template>

<script>
import { selectUserBlogs } from "@/api/user";
import { getNotesType } from "@/api/notes";
import { mapState } from "vuex";
export default {
  name: "UserNotes",
  data() {
    return {
      notesFilterCond: "",
      userNotes: [],
      query: {
        page: 1,
        rows: 5,
        search: null,
        sort: 0,//0：时间 1：观看数排序
      },
      finish: false,
      hasNext: false,
      count: 0,
      typeId: null,
      classifyData: [],
    };
  },
  mounted() {
    this.getUserNotes(false)
    this.getClassifyData()
  },
  methods: {
    toNotesDetail(blogId, userId) {
      let routeData = this.$router.resolve({
        path: "/notes/detail/" + blogId,
        query: {
          userId: userId,
        },
      });
      window.open(routeData.href, "_blank");
    },
    searchKeyWord(e) {
      this.getUserNotes(false)
    },
    dataSort(type) {
      if(type === 'time') {
        this.query.sort= 0
        this.$refs.hotBtn.classList.remove("active")
        this.$refs.timeBtn.classList.add("active")
      } else if(type === 'hot'){
        this.query.sort= 1
        this.$refs.timeBtn.classList.remove('active')
        this.$refs.hotBtn.classList.add('active')
      }
      this.getUserNotes(false)
    },
    notesFilter(e) {
      if(e.value === 'all') {
        this.typeId = null
        this.notesFilterCond = e.label;
        this.getUserNotes(false)
        return;
      }
      this.notesFilterCond = e.label;
      this.typeId = e.value;
      this.getUserNotes(false)
    },
    async getUserNotes(isLoadMore) {
      if (!isLoadMore) {
        this.query.page = 1;
      }
      try {
        let res = await selectUserBlogs(this.userInfo.id,this.query.page, this.query.rows,this.query.search,this.query.sort,this.typeId);
      console.log("获取个人的博客",res)
      if(res.code === 200) {
        if (isLoadMore) {
          this.userNotes = this.userNotes.concat(res.data.data);
        } else {
          this.userNotes = res.data.data;
        }
        this.count = res.data.count;
        this.finish = true;
        if (this.count > this.userNotes.length) {
          this.hasNext = true;
        } else {
          this.hasNext = false;
        }
      }
      } catch (error) {
        this.userNotes = []
      }
      
    },
    loadMore() {
      if (this.hasNext && this.finish) {
        this.query.page++;
        this.getUserNotes(true);
      }
    },
    async getClassifyData() {
      let result = await getNotesType();
      if (result.code === 200) {
        this.classifyData = result.data;
      }
    },
  },
  computed: {
    ...mapState("user",["userInfo"])
  }
};
</script>

<style lang="less" scoped>
#user-notes {
  background-color: #fff;
  border-radius: 6px;
  padding-bottom: 4px;
  .sub-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 28px;
    height: 48px;
    white-space: nowrap;
    border-bottom: 2px solid rgba(230, 230, 231, 0.5);

    .sub-header-title {
      // margin-right: 12px;
      // font-size: 16px;
      // font-weight: 600;
      // color: #000;
      .sub-header-search {
        /deep/ .el-input__inner {
          height: 32px;
          border-radius: 16px;
        }

        /deep/ .el-input__suffix-inner {
          i {
            line-height: 32px;
          }
        }
      }
    }

    .sub-type-box {
      display: flex;
      align-items: center;
      margin-left: auto;

      i {
        color: #000;
        font-size: 16px;
        margin-left: 20px;
        cursor: pointer;
      }
      .sub-type-filter {
        position: relative;
        i {
          &:last-child {
            margin-left: 0;
            font-size: 12px;
          }
        }
      }
    }
  }

  .entry-list {
    width: 100%;
    background-color: #fff;
    position: relative;

    .entry-item {
      position: relative;
      background: #fff;
      padding: 12px 20px 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      cursor: pointer;

      .entry {
        padding-bottom: 12px;
        border-bottom: 1px solid #e5e6eb;
        margin-top: 10px;
        width: 100%;

        .title-row {
          display: flex;
          margin-bottom: 8px;

          .audit-tag {
            display: inline-block;
            box-sizing: border-box;
            padding: 3px 8px;
            border-radius: 5px;
            opacity: 0.8;
            font-size: 12px;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            transform: none;
            margin-right: 4px;
            color: #ff7d00;
            background: #fff7e8;
          }

          .title {
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: #1d2129;
            width: 100%;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }

        .abstract {
          margin-bottom: 10px;

          span {
            color: #86909c;
            font-size: 13px;
            line-height: 22px;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }

        .label {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          span {
            position: relative;
            flex-shrink: 0;
            font-size: 13px;
            line-height: 22px;
            padding: 0 8px;
            color: #86909c;
            border-right: 1px solid #ddd;

            &:nth-child(1) {
              padding: 0 8px 0 0;
            }

            &:last-child {
              border-right: none;
            }

            &:hover {
              color: @primary-color;
            }
          }
        }

        .action-list {
          display: flex;
          align-items: center;

          .action-item {
            display: flex;
            align-items: center;
            position: relative;
            margin-right: 20px;
            font-size: 13px;
            line-height: 20px;
            color: #4e5969;
            flex-shrink: 0;
            i {
              font-size: 16px;
            }

            span {
              margin-left: 4px;
            }

            &:last-child {
              margin-left: auto;
              margin-right: 0;
            }
          }
        }
      }
    }

    .data-loading-more {
      width: 100px;
      height: 46px;
      margin: 10px auto;
      text-align: center;
      font-size: 14px;
      color: #4281ff;
      background-color: rgba(66, 129, 255, 0.04);
      line-height: 46px;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(66, 129, 255, 0.1);
      }
      i {
      }
      .listLoading-more-btn-text {
      }
    }
  }
}

#subtype-sort-wrapper {
  // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  // border-radius: 4px;
  //   border: 1px solid #EBEEF5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 6px;
  .sub-type {
    position: relative;
    font-size: 14px;
    color: #72777b;
    cursor: pointer;
    &.active {
      color: @primary-color;
    }
  }

  .sub-type-line {
    width: 1px;
    height: 12px;
    background-color: #b2bac2;
    opacity: 0.5;
  }
}
</style>