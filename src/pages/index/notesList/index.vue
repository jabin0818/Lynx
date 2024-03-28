<template>
  <div class="note-container">
    <div class="fixed-wrapper">
      <div class="notes-title">
        <span class="title">笔记</span>
      </div>
      <div class="notes-nav">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in classifyData"
            :key="item.id"
            :label="item.name"
            class="testcolor"
            :name="'' + index"
            @click.native="changeTag()"
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="tags" ref="tags">
      <!-- <button class="tags-item is-activity">编程</button> -->
      <button
        class="tags-item"
        v-for="item in types"
        :key="item.id"
        @click="changeType($event, item.id)"
      >
        {{ item.name }}
      </button>
      <div class="tags-item arrow-icon" @click="foldTags" v-if="fristRowNum">
        <span>{{ tagIsFold ? "展开" : "收起" }}</span>
        <i class="el-icon-arrow-up" v-show="!tagIsFold"></i>
        <i class="el-icon-arrow-down" v-show="tagIsFold"></i>
      </div>
    </div>
    <div class="noteList">
      <!-- <NotesList :data="notesListData" /> -->
      <div id="main-note-content">
        <ul class="notesList" v-if="notesListData.length">
          <li
            class="notesItem"
            v-for="(item, index) in notesListData"
            :key="item.blogId"
          >
            <!-- 标签/标题 -->
            <div class="note-header">
              <span class="note-header-tag">笔记</span>
              <a class="note-header-title" @click="toNotesDetail(item.blogId)">
                <span>{{ item.title }}</span>
              </a>
            </div>
            <!-- 题图/内容 -->
            <div class="note-content">
              <div class="note-content-img" @click="toNotesDetail(item.blogId)">
                <a>
                  <img
                    style="padding-top: 10px"
                    :src="
                      item.firstImg
                        ? item.firstImg
                        : require('@/assets/img/notes/test.png')
                    "
                  />
                </a>
              </div>
              <div class="note-content-text">
                <!--  <div class="note-uploader">
                        <span class="note-uploader-icon">UP</span>
                        <a class="note-uploader-name">name</a>
                      </div> -->
                <a class="note-deputy-text" @click="toNotesDetail(item.blogId)">
                  <span class="note-content-desc">{{
                    item.description ? item.description : item.content
                  }}</span>
                </a>
                <div class="note-content-label">
                  <span
                    v-for="(item2, index2) in tagName(index)"
                    :key="index2"
                    >{{ item2 }}</span
                  >
                </div>
                <!-- 浏览量/点赞/评论 -->
                <div class="actions-info">
                  <span class="collectLikeComment">
                    <span class="views">
                      <i class="el-icon-view"></i>
                      <span>{{ item.views }}</span>
                    </span>
                    <span class="praise">
                      <!-- 赞 -->
                      <i class="iconfont icon-good"></i>
                      <span>21</span>
                    </span>
                    <!-- <span class="bad">
                   踩 
                      <i class="el-icon-chat-dot-square"></i>
                      <span>12</span>
                  </span> -->
                    <!-- 讨论 -->
                    <span class="discuss">
                      <i class="el-icon-chat-dot-square"></i>
                      <span>{{ item.comment }}</span>
                    </span>
                    <!-- 收藏 -->
                    <span class="collection">
                      <i class="el-icon-star-off"></i>
                      <span>9</span>
                    </span>
                    <el-popover placement="right" width="200" trigger="hover">
                      <ul class="actions-info-more">
                        <li>
                          <i class="el-icon-warning-outline"></i>
                          <span>举报</span>
                        </li>
                        <li>
                          <i class="iconfont icon-buganxingqu1"></i>
                          <span>不感兴趣</span>
                        </li>
                      </ul>
                      <span slot="reference">
                        <i class="el-icon-more"></i>
                      </span>
                    </el-popover>
                  </span>
                  <span class="actions-info-date">
                    {{ $utils.showtime(item.createTime) }}
                  </span>
                </div>
              </div>
            </div>
          </li>
          <div class="data-loading-more" @click="loadMore">
            <i class="el-icon-loading" v-show="!finish"></i>
            <span class="listLoading-more-btn-text" v-show="finish">{{
              hasNext ? "加载更多" : "暂无更多数据"
            }}</span>
          </div>
        </ul>
        <el-empty description="暂无笔记数据" v-else></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import { getNotesType, getNotesListByType } from "@/api/notes";

export default {
  props: {},
  data() {
    return {
      activeName: "0",
      tagIsFold: false,
      fristRowNum: 0,
      allTagNum: 0,
      classifyData: [],
      params: { currentPage: 1, pageSize: 10 },
      typeId: "",
      notesListData: [],
      hasNext: false,
      dataLength: 0, //用于判断link是否吸顶
      count: 0,
      finish: false,
    };
  },
  async mounted() {
    //分类标签tag初始化
    await this.getClassifyData();
    this.tagInitialize();
    if (this.classifyData[0].id) {
      this.typeId = this.classifyData[0].id;
    }
  },
  methods: {
    tagInitialize() {
      let tagsNum = this.$refs.tags.children.length;
      let tagsWidth = this.$refs.tags.offsetWidth;
      this.allTagNum = tagsNum;
      let firstRowWidth = 0;
      let secondRowIndex;
      for (let index = 0; index < tagsNum; index++) {
        if (firstRowWidth >= tagsWidth) {
          //超过了
          secondRowIndex = index - 1;
          break;
        }
        firstRowWidth += this.$refs.tags.children[index].offsetWidth;
        firstRowWidth += 16;
      }
      this.fristRowNum = secondRowIndex;
    },
    handleClick(tab, event) {
      let index = this.activeName;
      this.typeId = this.classifyData[index].id;
      this.tagIsFold = false;
      this.fristRowNum = 0;
      this.allTagNum = 0;
      this.$nextTick(() => {
        this.tagInitialize();
      });
    },
    changeType(event, id) {
      // console.log(event.currentTarget);
      let dom = document.querySelector(".is-activity");
      if (dom) {
        dom.classList.remove("is-activity");
      }
      event.currentTarget.classList.add("is-activity");
      if (id) {
        let typeIdAry = this.typeId.split("-");
        if (typeIdAry.length >= 2) {
          this.typeId = typeIdAry[0];
        }
        this.typeId = this.typeId + "-" + id;
      }
    },
    foldTags() {
      if (this.tagIsFold) {
        for (let index = 0; index < this.$refs.tags.children.length; index++) {
          this.$refs.tags.children[index].style.display = "block";
        }
        this.tagIsFold = false;
      } else {
        let tagsNum = this.allTagNum;
        let secondRowIndex = this.fristRowNum - 1;
        let i = 1;
        for (secondRowIndex; secondRowIndex < tagsNum; secondRowIndex++) {
          this.$refs.tags.children[secondRowIndex].style.display = "none";
          i++;
        }
        this.tagIsFold = true;
      }
    },
    toNotesDetail(blogId) {
      let routeData = this.$router.resolve({
        path: "/notes/detail/" + blogId,
      });
      window.open(routeData.href, "_blank");
    },
    tagName(index) {
      if (this.notesListData) {
        if (this.notesListData[index]?.tagName) {
          return this.notesListData[index].tagName.split("-");
        }
      }
    },
    load() {},
    async getClassifyData() {
      let result = await getNotesType();
      if (result.code === 200) {
        this.classifyData = result.data;
      }
    },
    async getNotesListData(isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      let page = String(this.params.currentPage);
      let row = String(this.params.pageSize);
      let result = await getNotesListByType(this.typeId, page, row);
      if (result.code === 200) {
        if (isLoadMore) {
          this.notesListData = this.notesListData.concat(result.data.data);
        } else {
          this.notesListData = result.data.data;
        }
        this.count = result.data.count;
        this.finish = true;
        this.dataLength = result.data.count;
        this.$emit("tranDataLen", this.dataLength); //传递dataLength给父组件
        if (this.count > this.notesListData.length) {
          this.hasNext = true;
        } else {
          this.hasNext = false;
        }
      } else {
        this.$message.error("网络繁忙！");
      }
    },
    changeTag(id) {
      this.tagIsFold = false;
      this.fristRowNum = 0;
      this.allTagNum = 0;
      this.$nextTick(() => {
        this.tagInitialize();
      });

      this.typeId = id;
    },
    refresh() {
      this.params = { currentPage: 1, pageSize: 13 };
      this.getNotesListData(true);
    },
    loadMore(e) {
      if (this.hasNext && this.finish) {
        this.params.currentPage++;
        this.getNotesListData(true);
      } else {
      }
    },
  },
  computed: {
    types() {
      let index = Number(this.activeName);
      let types = Object.assign({}, this.classifyData[index]).types;
      return types;
    },
  },
  watch: {
    typeId(newValue) {
      if (newValue) {
        this.getNotesListData(false);
      }
    },
  },
};
</script>

<style lang="less">
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
.note-container {
  .fixed-wrapper {
    display: flex;
    align-items: center;

    .notes-title {
      width: 56px;
      height: 54px;
      line-height: 40px;
      margin-right: 25px;
      font-size: 28px;

      @media screen and (max-width: 840px) {
        // margin-right: 0.446rem;
        display: none;
        font-size: 0.5rem;
        width: 1.2rem;
        margin-right: 0.446rem;
      }

      @media screen and (max-width: 480px) {
        // margin-right: 0.446rem;
        font-size: 18px;
        width: 40px;
      }

      .title {
        display: block;
        color: #000;
      }
    }
    .notes-nav {
      .el-tabs__nav-wrap {
        font-size: 18px;
      }

      .el-tabs__item {
        height: 40px;
        font-size: 16px;
        font-weight: 500;
        color: @general-text-color;

        @media screen and (max-width: 420px) {
          font-size: 14px;
          padding: 0 0.625rem;
        }

        @media screen and (max-width: 320px) {
          font-size: 13px;
        }
      }

      .el-tabs__item.is-active {
        color: @primary-color;
      }

      .el-tabs__active-bar {
        background: @primary-color;
      }

      .el-tabs__nav-wrap::after {
        background-color: transparent !important;
      }
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    // margin: 0 -16px;
    position: relative;

    .tags-item {
      margin-bottom: 16px;
      margin-right: 16px;
      height: 30px;
      line-height: 30px;
      // min-width: 96px;
      padding: 0 20px;
      border: 1px solid @levelOne-border-color;
      color: @main-text-color;
      cursor: pointer;
      border-radius: 22px;
      text-align: center;
      font-size: 13px;
      background: #fff;

      @media screen and (max-width: 840px) {
        margin-bottom: 0.28rem;
        margin-right: 0.28rem;
        font-size: 0.23rem;
        padding: 0 0.37rem;
      }
    }

    .arrow-icon {
      color: @primary-color;
      // border: 1px solid @primary-color;

      i {
        margin-left: 5px;
        font-weight: bolder;
      }
    }

    .is-activity {
      background: @primary-color;
      color: #fff;
      border-color: @primary-color;
    }
  }

  .noteList {
  }
}

#main-note-content {
  background-color: #fff;
  .notesList {
    // padding: 10px;
    // height: 100vh;
    // overflow-y: auto;

    .notesItem {
      border-bottom: 1px solid @levelOne-border-color;
      padding: 16px 10px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #fafafa;
      }

      .note-header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        .note-header-tag {
          min-width: 16px;
          width: 50px;
          height: 20px;
          line-height: 21px;
          text-align: center;
          border-radius: 6px;
          background-color: @primary-color;
          color: #fff;
          font-size: 12px;
          margin-right: 4px;
          transform: scale(0.9);
        }

        .note-header-title {
          font-size: 16px;
          color: @main-text-color;
          font-weight: 600;
          overflow: hidden;
          white-space: normal;
          word-break: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          cursor: pointer;

          @media screen and (max-width: 720px) {
            font-size: 0.375rem;
          }
          @media screen and (max-width: 540px) {
            font-size: 16px;
          }

          // &:hover{
          //   text-decoration: underline;
          // }
        }
      }

      .note-content {
        display: flex;
        justify-content: space-between;

        .note-content-img {
          min-width: 90px;
          min-height: 56px;
          width: 134px;
          height: 84px;
          margin-right: 16px;
          display: flex;
          -webkit-box-align: start;
          align-items: flex-start;
          padding-top: 2px;

          @media screen and (max-width: 720px) {
            width: 2.79rem;
            height: 1.75rem;
            margin-right: 0.33rem;
          }

          // @media screen and (max-width: 720px) {
          //   width: 90px;
          //   height: 56px;
          //   margin-right: 10px;
          // }

          @media screen and (max-width: 340px) {
            display: none;
          }

          a {
            position: relative;
            border-radius: 2px;
            width: 100%;
            height: 100%;
            display: inline-block;
            background-size: cover;
            background-position: 50%;
            border: 1px solid #f5f6f7;
            overflow: hidden;
            background: #f5f6f7;

            img {
              width: 100%;
              left: 50%;
              top: 50%;
              -webkit-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              height: auto;
              position: absolute;
            }
          }
        }

        .note-content-text {
          font-size: 14px;
          color: @general-text-color;
          -webkit-box-flex: 1;
          flex: 1;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;

          .note-uploader {
            display: flex;
            align-items: center;

            &:hover .note-uploader-icon {
              color: @primary-color;
              border: 2px solid @primary-color;
            }

            &:hover .note-uploader-name {
              color: @primary-color;
            }

            .note-uploader-icon {
              display: block;
              width: 21px;
              height: 13px;
              border-radius: 4px;
              border: 2px solid #9499a0;
              text-align: center;
              line-height: 11px;
              font-size: 10px;
              margin-right: 5px;
              color: #9499a0;
              font-weight: 600;
              transition: all 0.25s;
            }

            .note-uploader-name {
              font-size: 12px;
              color: #9499a0;
              cursor: pointer;
              font-family: "PingFang SC";
              font-weight: 600;
              transition: all 0.25s;
            }
          }

          .note-deputy-text {
            margin-top: 5px;

            .note-content-desc {
              font-size: 14px;
              font-weight: 400;
              color: #666;
              // 7d8085
              overflow: hidden;
              white-space: normal;
              word-break: break-word;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;

              @media screen and (max-width: 720px) {
                font-size: 0.29rem;
              }
            }
          }

          .note-content-label {
            display: flex;
            align-items: center;

            span {
              position: relative;
              flex-shrink: 0;
              font-size: 13px;
              line-height: 22px;
              padding: 0 8px;
              color: #666;
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

          .actions-info {
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            justify-content: space-between;

            .collectLikeComment {
              display: flex;
              align-items: center;

              & > span {
                display: flex;
                align-items: center;
                margin-right: 30px;

                i {
                  margin-right: 2px;
                  font-size: 15px;
                }
              }

              @media screen and (max-width: 640px) {
                .collection {
                  display: none;
                }
                & > span {
                  margin-right: 0.53rem;

                  i {
                    font-size: 0.267rem;
                  }
                }
              }

              // @media screen and (max-width: 540px) {
              //   .discuss{
              //     display: none;
              //   }
              // }

              // @media screen and (max-width: 480px) {
              //   .praise{
              //     display: none;
              //   }
              // }

              // @media screen and (max-width: 424px) {
              //   .views{
              //     display: none;
              //   }
              // }
            }

            .actions-info-date {
              font-size: 14px;
              color: @minor-text-color;
              word-break: keep-all;
              white-space: nowrap;

              @media screen and (max-width: 480px) {
                font-size: 0.43rem;
              }
            }
          }
        }
      }
    }
  }
}

.el-popover {
  padding: 5px !important;
}

.actions-info-more {
  li {
    padding: 0 16px !important;
    height: 36px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
      background: #f0f0f5;
    }

    i {
      font-size: 18px;
      color: @general-text-color;
      margin-right: 10px;
    }
  }
}

#main-note-content .username {
  display: flex;
  justify-content: space-between;

  .left {
    display: flex;
    align-items: baseline;
  }
}

#main-note-content .ant-list-item-meta-description {
  font-weight: 700;
  font-size: 16px;
  color: #1d2129;
  line-height: 22px;
}

#main-note-content .ant-list-item-meta-description,
.article-content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

#main-note-content li.ant-list-item {
  padding: 20px;
}

#main-note-content li.ant-list-item:hover {
  background: #f4f5f57a;
}

@media screen and (max-width: 576px) {
  .ant-list-vertical .ant-list-item-extra {
    margin: 0 auto 16px;
  }
}
</style>