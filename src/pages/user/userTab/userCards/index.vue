<template>
  <div id="user-cards">
    <div class="sub-header">
      <div class="sub-header-title">
        <el-input
          type="text"
          class="sub-header-search"
          placeholder="搜索卡片"
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
              <a class="sub-type active" ref="timeBtn" @click="dataSort('time')"
                >最新</a
              >
              <span class="sub-type-line"></span>
              <a class="sub-type" ref="hotBtn" @click="dataSort('hot')">热门</a>
            </div>
            <i class="el-icon-sort" slot="reference"></i>
          </el-popover>
        </div>
        <div class="sub-type-filter">
          <el-dropdown
            trigger="click"
            @command="cardsFilter"
            placement="bottom-start"
          >
            <span class="el-dropdown-link">
              <i class="iconfont icon-shaixuan1"></i>
              <i class="el-icon-arrow-down el-icon--right"></i>
              {{ cardsFilterCond }}
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
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="card-list">
      <div
        class="card-item"
        v-for="item in userCards"
        :key="item.cardSetId"
        @click="toCardDetail(item.cardSetId)"
      >
        <div class="card-item-info">
          <div class="set-item-title">
            <span class="title-text">{{ item.title }}</span>
          </div>
          <div class="set-detail">
            <span class="analytics">
              <span class="like" title="点赞数量">
                <i class="iconfont icon-good"></i>
                {{ item.thumbsUpNum }}
              </span>
              <span class="" title="收藏数量">
                <i class="el-icon-star-off"></i>
                {{ item.thumbsUpNum }}
              </span>
              <span class="" title="卡片数量">
                <i class="el-icon-postcard"></i>
                {{ item.cardsNum }}
              </span>
            </span>
          </div>
        </div>
        <div class="card-item-progress">
          <span class="card-level-all">
            <div class="progress-top">
              <span class="level-txt"> 待学习 {{ item.studyNum }} </span>
              <span class="level-number">
                <span>已熟练</span>
                <i class="now-num">{{ item.graspNum }}</i>
                <i class="num-icon">/</i>
                <i class="max-num">{{ item.cardsNum }}</i>
              </span>
            </div>
            <div class="progress-wrap">
              <div class="progress-level-up">
                <span
                  class="ht-level-upgo"
                  :style="
                    'width:' + (item.graspNum / item.cardsNum) * 100 + '%'
                  "
                  title="已熟练"
                ></span>
                <span
                  class="unskilled"
                  :style="
                    'width:' +
                    ((item.cardsNum - item.graspNum) / item.cardsNum) * 100 +
                    '%'
                  "
                  title="需复习"
                ></span>
              </div>
              <span class="progress-level-mask"></span>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectUserCardSets } from "@/api/user";
import { getNotesType } from "@/api/notes";
import { mapState } from "vuex";
export default {
  name: "UserCards",
  data() {
    return {
      cardsFilterCond: "",
      userCards: [],
      query: {
        page: 1,
        rows: 5,
        search: null,
        sort: 0, //0：时间 1：观看数排序
      },
      finish: false,
      hasNext: false,
      count: 0,
      typeId: null,
      classifyData: [],
    };
  },
  mounted() {
    this.getUserCards(false);
    this.getClassifyData();
  },
  methods: {
    toCardDetail(id) {
      let routeData = this.$router.resolve("/card/detail/" + id);
      window.open(routeData.href, "_blank");
    },
    searchKeyWord(e) {
      this.getUserCards(false);
    },
    dataSort(type) {
      if (type === "time") {
        this.query.sort = 0;
        this.$refs.hotBtn.classList.remove("active");
        this.$refs.timeBtn.classList.add("active");
      } else if (type === "hot") {
        this.query.sort = 1;
        this.$refs.timeBtn.classList.remove("active");
        this.$refs.hotBtn.classList.add("active");
      }
      this.getUserCards(false);
    },
    cardsFilter(e) {
      console.log(e);
      if (e.value === "all") {
        this.typeId = null;
        this.cardsFilterCond = e.label;
        this.getUserCards(false);
        return;
      }
      this.cardsFilterCond = e.label;
      this.typeId = e.value;
      this.getUserCards(false);
    },
    async getUserCards(isLoadMore) {
      if (!isLoadMore) {
        this.query.page = 1;
      }
      try {
        let res = await selectUserCardSets(
          this.userInfo.id,
          this.query.page,
          this.query.rows,
          this.query.search,
          this.query.sort,
          this.typeId
        );
        console.log("获取个人的卡片", res);
        if (res.code === 200) {
          if (isLoadMore) {
            this.userCards = this.userCards.concat(res.data.data);
          } else {
            this.userCards = res.data.data;
          }
          this.count = res.data.count;
          this.finish = true;
          if (this.count > this.userCards.length) {
            this.hasNext = true;
          } else {
            this.hasNext = false;
          }
        }
      } catch (error) {
        this.userCards = [];
      }
    },
    loadMore() {
      if (this.hasNext && this.finish) {
        this.query.page++;
        this.getuserCards(true);
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
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
#user-cards {
  background-color: #fff;
  border-radius: 6px;
  .sub-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 28px;
    height: 48px;
    white-space: nowrap;
    border-bottom: 2px solid rgba(230, 230, 231, 0.5);

    .sub-header-title {
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

  .card-list {
    display: grid;
    grid-gap: 20px 20px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: 12px 20px;
    .card-item {
      color: #303032;
      display: flex;
      flex-direction: column;
      min-width: 180px;
      border: 1px solid #e5e9ef;
      cursor: pointer;
      transition: all 0.25s;
      overflow: hidden;
      border-radius: 6px;
      &:hover {
        box-shadow: inset 0 0 0 1px rgb(0 0 0 / 5%), 0 1px 15px rgb(0 1 3 / 8%);
      }

      .card-item-info {
        padding: 10px;
        background-color: #fff;
        transition: 0.3s ease-in-out;
        z-index: 10;
        .set-item-title {
          padding-bottom: 2px;
          box-sizing: border-box;
          position: relative;
          width: 100%;
          .title-text {
            width: 100%;
            height: 1.5em;
            line-height: 1.5em;
            font-size: 15px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
          }
        }

        .set-detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          height: 24px;

          .analytics {
            display: flex;
            align-items: center;
            color: #404042;
            font-size: 13px;

            .like {
              i {
                font-size: 13px;
              }
            }

            & > span {
              display: flex;
              flex-wrap: nowrap;
              align-items: center;
              margin-right: 15px;

              i {
                margin-right: 4px;
              }
            }
          }
        }
      }

      .card-item-progress {
        position: relative;
        background-color: rgba(66, 129, 255, 0.05);
        padding: 4px 8px;
        border-radius: 4px;

        .card-level-all {
          display: inline-block;
          width: 100%;

          .progress-wrap {
            display: flex;
            position: relative;
            width: 100%;

            .progress-level-up {
              width: 100%;
              height: 8px;
              line-height: 8px;
              // background-color: rgba(66, 129, 255, 0.2);
              background-color: #dfe1e3;
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
              display: inline-block;
              position: relative;
              text-indent: -9999px;
              text-align: center;

              .ht-level-upgo {
                position: absolute;
                top: 0;
                left: 0;
                background-color: @primary-color;
                width: 0;
                height: 8px;
                transition: all 0.3s ease-in-out;
                transition-delay: 0.3s;
                border-radius: 4px;
                z-index: 10;
                &:hover {
                  background-color: @success-color;
                }
              }

              .unskilled {
                position: absolute;
                top: 0;
                left: 0;
                background-color: rgba(66, 129, 255, 0.5);
                width: 0;
                height: 8px;
                transition: all 0.3s ease-in-out;
                transition-delay: 0.3s;
                border-radius: 4px;
                &:hover {
                  background-color: @warning-color;
                }
                z-index: 1;
              }
            }
          }
          .progress-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 4px;

            .level-txt {
              background-position: -264px -852px;
              height: 20px;
              font-weight: 700;
              color: @primary-color;
              text-align: center;
              font-size: 12px;
              cursor: default;
              display: inline-block;
              border-radius: 4px 0 0 4px;
            }

            .level-number {
              display: block;
              height: 20px;
              color: rgba(66, 129, 255, 0.8);
              margin-left: 8px;
              margin-bottom: 4px;
              font-size: 12px;
              line-height: 20px;
              cursor: default;

              & > span {
                color: rgba(66, 129, 255, 1);
                margin-right: 3px;
              }

              .now-num {
                color: rgba(66, 129, 255, 1);
                font-size: 13px;
              }

              .num-icon {
                margin: 0 2px;
              }

              .max-num {
              }
            }
          }
        }
      }
    }
  }
}

#subtype-sort-wrapper {
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