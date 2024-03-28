<template>
  <div id="user-favorites">
    <div class="user-favorites-left">
      <div class="uf-left-top" @click="addFavModalVisible = true">
        <i class="el-icon-folder-add"></i>
        <span>新建收藏夹</span>
      </div>
      <div class="uf-left-body">
        <div class="uf-star-list">
          <div
            class="favorite-item"
            v-for="(item, index) in favList"
            :key="item.id"
            :class="{ active: String(item.id) === favId }"
            @click="toOneFavorite(item.id)"
          >
            <div
              class="star-first-word"
              :style="'background-color: ' + item.color"
            >
              <span>{{ item.groupText }}</span>
            </div>
            <div class="star-base-info">
              <div class="name" :title="item.groupName">
                {{ item.groupName }}
              </div>
              <div class="num">
                {{ item.collectionNum ? item.collectionNum : 0 }}个内容
              </div>
            </div>
            <div class="star-more-operate">
              <el-popover placement="right" width="150" trigger="hover">
                <ul class="actions-info-more">
                  <li>
                    <i class="el-icon-rank"></i>
                    <span>移动</span>
                  </li>
                  <li @click="updateFavorites(index)">
                    <i class="el-icon-edit"></i>
                    <span>编辑</span>
                  </li>
                  <li @click="deleteFavorites(item.id)">
                    <i class="el-icon-delete"></i>
                    <span>删除</span>
                  </li>
                  <li @click="openFavDetailModal(index)">
                    <i class="el-icon-folder-opened"></i>
                    <span>查看详细</span>
                  </li>
                </ul>
                <div class="di-header-right" slot="reference">
                  <i class="el-icon-more"></i>
                </div>
              </el-popover>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-favorites-right">
      <div class="sub-header">
        <div class="sub-header-title">
          <el-input
            type="text"
            class="sub-header-search"
            placeholder="搜索收藏夹"
            v-model="search"
          >
            <el-select v-model="select" slot="prepend" @change="selectChange">
              <el-option label="当前收藏夹" value="1"></el-option>
              <el-option label="全部收藏夹" value="2"></el-option>
            </el-select>
          </el-input>
        </div>
        <!-- <div class="sub-type-box">
          <div class="sub-type-sort">
            <el-popover
              placement="bottom-end"
              width="40"
              trigger="click"
              popper-class="st-sort-popover"
            >
              <div id="subtype-sort-wrapper">
                <a class="sub-type active">热门</a>
                <span class="sub-type-line"></span>
                <a class="sub-type">最新</a>
              </div>
              <i class="el-icon-sort" slot="reference"></i>
            </el-popover>
          </div>
          <div class="sub-type-filter">
            <el-dropdown
              trigger="click"
              @command="starFilter"
              placement="bottom-start"
            >
              <span class="el-dropdown-link">
                <i class="iconfont icon-shaixuan1"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
                {{ starFilterCond }}
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="{ label: '黄金糕', value: 1 }"
                  icon="el-icon-plus"
                  >黄金糕</el-dropdown-item
                >
                <el-dropdown-item
                  :command="{ label: '狮子头', value: 2 }"
                  icon="el-icon-circle-plus"
                  >狮子头</el-dropdown-item
                >
                <el-dropdown-item
                  :command="{ label: '螺蛳粉', value: 3 }"
                  icon="el-icon-circle-plus-outline"
                  >螺蛳粉</el-dropdown-item
                >
                <el-dropdown-item
                  :command="{ label: '双皮奶', value: 4 }"
                  icon="el-icon-check"
                  >双皮奶</el-dropdown-item
                >
                <el-dropdown-item
                  :command="{ label: '蚵仔煎', value: 5 }"
                  icon="el-icon-circle-check"
                  >蚵仔煎</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div> -->
      </div>
      <div class="star-list">
        <div class="star-item" v-for="item in contentData" :key="item.collectId">
          <div class="star-item-left">
            <img :src="item.cover" alt="" />
            <div class="mask">
              <span class="duration" v-if="item.type === 3">{{ item.duration }}</span>
            </div>
            <div class="type-tag">
              <span class="type-text">{{ typeView[item.type] }}</span>
            </div>
          </div>
          <div class="star-item-right">
            <div class="star-item-right-title">
              <span>
                {{ item.title }}
              </span>
            </div>
            <div class="star-item-right-playinfo">
              <span class="amount amount-play">
                <i class="el-icon-video-play" v-if="item.type === 3"></i>
                <i class="iconfont icon-good" v-else></i>
                <span class="text">{{ item.type === 3 ? item.views: item.views }}</span>
              </span>
              <span class="amount amount-comment">
                <i class="el-icon-chat-line-round" v-if="item.type === 3"></i>
                <i class="el-icon-star-off" v-else></i>
                <span class="text">{{ item.type === 3 ? item.commentNum : item.commentNum}}</span>
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    <AddFavForm
      :addFavModalVisible="addFavModalVisible"
      @changeVisible="changeVisible"
      :updataFavData="updataFavData"
    />
  </div>
</template> 

<script>
import AddFavForm from "./addFavForm";
import { selectFavorites, deleteFavorites,selectFavContent } from "@/api/star";

export default {
  name: "UserStar",
  components: {
    AddFavForm,
  },
  data() {
    return {
      starFilterCond: "",
      select: "当前",
      search: "",
      addFavModalVisible: false,
      query: {
        page: 1,
        rows: 100,
      },
      favList: [],
      favId: "", //当前收藏夹路径id
      updataFavData: {}, //用于修改收藏夹的回显信息
      contentData: [],
      typeView: ['','笔记','卡片','视频']
    };
  },
  created() {},
  async mounted() {
    if (this.$route.params.favId) {
      this.favId = this.$route.params.favId;
    }
    await this.getFavListData();
    await this.getStarContent();
  },
  methods: {
    async getStarContent() {
      if(this.favId === "") return;
      let res = await selectFavContent(this.favId)
      console.log('获取收藏夹内容接口',res)
      if(res.code === 200) {
        this.contentData = res.data.data
      }
    },
    starFilter(e) {
      this.starFilterCond = e.label;
    },
    selectChange(e) {
      console.log(e);
      if (e === "1") {
        this.select = "当前";
      } else if (e === "2") {
        this.select = "全部";
      }
    },
    changeVisible(e) {
      this.addFavModalVisible = e.isVisible;
      if (e.isRefresh) {
        this.getFavListData();
      }
    },
    async updateFavorites(index) {
      console.log(this.favList[index]);
      this.updataFavData = this.favList[index];
      this.addFavModalVisible = true;
    },
    async deleteFavorites(id) {
      this.$confirm("是否删除该收藏夹?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await deleteFavorites(id);
          console.log("删除视频的接口：", res);
          if (res.code === 200) {
            this.$message.success("删除成功！");
            await this.getFavListData();
          } else {
            this.$message.error("删除失败！");
          }
        })
        .catch(() => {});
    },
    openFavDetailModal(index) {
      this.$store.commit("global/SETFAVORITEDETAILINFO", this.favList[index]);
      this.$store.state.global.favoriteDetailVisible = true;
    },
    async getFavListData() {
      let res = await selectFavorites(this.query.page, this.query.rows);
      console.log("获取收藏夹的接口", res);
      if (res.code === 200) {
        this.favList = res.data.data;
      } else {
        this.$message.error("网络繁忙！");
      }
    },
    async toOneFavorite(id) {
      this.favId = id.toString();
      await this.getStarContent();
      this.$router.push({
        path: `/user/${this.$route.params.id}/star/${id}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
#user-favorites {
  display: flex;
  background-color: #fff;
  border-radius: 6px;
  min-height: 560px;
  .user-favorites-left {
    width: 186px;
    min-height: 560px;
    border-right: 1px solid #d1d1d1;
    .uf-left-top {
      color: #92929d;
      // background-color: #f1f1f5;
      padding: 0 36px;
      height: 48px;
      line-height: 48px;
      border-bottom: 2px solid rgba(230, 230, 231, 0.5);
      transition: color 0.2s;
      cursor: pointer;

      &:hover {
        color: #60606b;
      }
      i {
        font-size: 18px;
        margin-right: 10px;
        font-weight: 600;
      }
      span {
        font-size: 16px;
      }
    }

    .uf-left-body {
      .uf-star-list {
        max-height: 780px;
        overflow: hidden auto;

        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.1);
        }

        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
          border-radius: 8px;
          background-color: #f5f5f5;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
          background-color: #c8c8c8;
        }

        .favorite-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          height: 60px;
          cursor: pointer;
          &:hover {
            background-color: #e3e5e7;
          }

          &.active {
            background-color: #e3e5e7;
          }
          .star-first-word {
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

          .star-base-info {
            width: 78%;

            .name {
              font-size: 14px;
              margin-bottom: 6px;
              color: #000;
              display: -webkit-box;
              text-overflow: ellipsis;
              overflow: hidden;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }

            .num {
              font-size: 12px;
              color: #999;
            }
          }

          .star-more-operate {
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
        }
      }
    }
  }
  .user-favorites-right {
    width: calc(100% - 186px);

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
            border-radius: 0 16px 16px 0;
          }

          /deep/ .el-input__suffix-inner {
            i {
              line-height: 32px;
            }
          }

          /deep/ .el-input-group__prepend {
            border-radius: 16px 0 0 16px;
          }

          /deep/ .el-select .el-input {
            width: 80px;
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

    .star-list {
      display: grid;
      grid-gap: 20px 20px;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      padding: 12px 20px;
      .star-item {
        display: flex;
        justify-content: space-between;
        width: 100%;
        min-width: 100px;
        height: 86px;

        border-radius: 6px;
        border: 1px solid #dcdfe6;
        .star-item-left {
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

        .star-item-right {
          width: 60%;
          padding: 10px 0 10px 6px;
          .star-item-right-title {
            margin-bottom: 8px;
            font-size: 14px;
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

          .star-item-right-playinfo {
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