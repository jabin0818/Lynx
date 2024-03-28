<template>
  <el-container id="cardIndex">
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <el-row class="userCard-container" v-if="isLogin">
        <el-col :span="24">
          <UserCardsList />
        </el-col>
      </el-row>
      <el-row class="card-container">
        <el-col :span="24">
          <div class="fixed-wrapper">
            <div class="cards-title">
              <span class="title">卡片</span>
            </div>
            <div class="cards-nav">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  v-for="(item, index) in classifyData"
                  :key="item.id"
                  :label="item.name"
                  class="testcolor"
                  :name="'' + index"
                  @click.native="changeTag()"
                >
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="card-tag">
            <v-clamp
              class="cardTags"
              :autoresize="true"
              :max-lines="1"
              :tag="'div'"
              :max-height="30"
              :expanded="tagIsFold"
              @clampchange="clampchange"
            >
              <button
                class="cardTags-item"
                style="padding: 0 20px; margin-right: 16px"
                v-for="item in types"
                :key="item.id"
                @click="changeType($event, item.id)"
              >
                {{ item.name }}
              </button>
              <template slot="after">
                <button
                  class="cardTags-item arrow-icon"
                  style="padding: 0 20px; margin-right: 16px"
                  @click="foldcardTags()"
                >
                  <!-- <span>{{ tagIsFold ? "收起" : "展开" }}</span> -->
                  <span>切换</span>
                  <i class="el-icon-arrow-right"></i>
                </button>
              </template>
            </v-clamp>
          </div>
          <div class="cardList">
            <CardsList
              :data="cardList"
              @getMoreItem="loadMore"
              :finish="finish"
              :hasNext="hasNext"
            />
          </div>
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
  </el-container>
</template>

<script>
import VClamp from "@boyuai/vue-clamp";
import Header from "@/components/header";
import SideToolbar from "@/components/sideToolbar";
import CardsList from "./cardsList";
import UserCardsList from "./userCardsList";
import { getNotesType } from "@/api/notes";
import { getCardsByType } from "@/api/card";
import { mapState } from "vuex";

export default {
  name: "CardIndex",
  components: {
    Header,
    SideToolbar,
    CardsList,
    UserCardsList,
    VClamp,
  },
  data() {
    return {
      activeName: "0",
      tagIsFold: false,
      classifyData: [],
      params: { currentPage: 1, pageSize: 8 },
      typeId: "",
      cardList: [],
      finish: false,
      count: 0,
      hasNext: false,
      height: 0,
    };
  },
  created() {},
  async mounted() {
    //分类标签tag初始化
    await this.getClassifyData();

    if (this.classifyData[0].id) {
      this.typeId = this.classifyData[0].id;
    }
  },
  methods: {
    handleClick(tab, event) {
      let index = this.activeName;
      this.typeId = this.classifyData[index].id;
    },
    changeType(event, id) {
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
    foldcardTags() {
      this.tagIsFold = !this.tagIsFold;
    },
    clampchange(clamped) {},
    async getClassifyData() {
      let result = await getNotesType();
      if (result.code === 200) {
        this.classifyData = result.data;
      }
    },
    async getCardListData(isLoadMore) {
      if (!isLoadMore) {
        this.params.currentPage = 1;
      }
      this.finish = false;
      let page = String(this.params.currentPage);
      let row = String(this.params.pageSize);
      let result = await getCardsByType(this.typeId, row, page);
      if (result.code === 200) {
        // 获取卡片列表成功
        if (isLoadMore) {
          this.cardList = this.cardList.concat(result.data.data);
        } else {
          this.cardList = result.data.data;
        }
        this.count = result.data.count;
        this.finish = true;

        if (this.count > this.cardList.length) {
          this.hasNext = true;
        } else {
          this.hasNext = false;
        }
      } else {
        //无数据
        this.$message.success("网络繁忙！");
      }
    },
    loadMore() {
      // 加载更多
      if (this.hasNext && this.finish) {
        this.params.currentPage++;
        this.getCardListData(true);
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
    ...mapState("user", ["isLogin"]),
  },
  watch: {
    typeId(newValue) {
      if (newValue) {
        this.getCardListData(false);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#cardIndex {
  background-color: #fff;
  min-height: 100vh;
  .el-main {
    width: 1300px;
    overflow: hidden !important;

    @media screen and (max-width: 1300px) {
      width: 1200px;
    }

    @media screen and (max-width: 1200px) {
      width: 1100px;
    }

    @media screen and (max-width: 1100px) {
      width: 100%;
    }
  }

  .userCard-container {
    margin-bottom: 40px;
  }

  .fixed-wrapper {
    display: flex;
    align-items: center;

    .cards-title {
      height: 54px;
      line-height: 40px;
      margin-right: 25px;
      font-size: 28px;

      @media screen and (max-width: 840px) {
        font-size: 0.5rem;
        width: 1.2rem;
        margin-right: 0.446rem;
      }

      @media screen and (max-width: 480px) {
        font-size: 18px;
        width: 40px;
      }

      .title {
        display: block;
        color: #000;
      }
    }
    .cards-nav {
      /deep/ .el-tabs__item {
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

      /deep/ .el-tabs__nav-wrap::after {
        background-color: transparent !important;
      }
    }
  }
  .card-tag {
    margin-bottom: 40px;

    .cardTags {
      .cardTags-item {
        margin-bottom: 16px;
        height: 30px;
        line-height: 30px;
        padding: 0 0.625rem;
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
        margin-bottom: 0;

        i {
          margin-left: 5px;
          font-weight: bolder;
        }
      }

      .is-activity {
        background: @primary-color;
        color: #fff;
        border: none;
      }
    }
  }
}

/deep/ .el-tabs__nav-wrap {
  font-size: 18px;
}
</style>