<template>
  <div id="all-tag">
    <div class="allTag-header">
      <div class="header-search">
        <el-input
          placeholder="搜索标签"
          suffix-icon="el-icon-search"
          v-model="keyWord"
          @keyup.enter.native="searchTag"
          class="search-input-container"
        >
        </el-input>
      </div>
      <div class="header-screen">
        <div ref="hottestBtn" class="btn hot btn-outline" @click="showHottest">
          最热
        </div>
        <div ref="newestBtn" class="btn new" @click="showNewest">最新</div>
      </div>
    </div>
    <div class="allTag">
      <div class="allTag-list">
        <div class="allTag-item" v-for="(item, index) in data" :key="item.id">
          <div class="info-box">
            <router-link
              :to="{
                path: `/tags/detail/${item.id}/${item.name}`,
              }"
              class=""
            >
              <img :src="item.photo" alt="" />
              <div class="title">{{ item.name }}</div>
            </router-link>
            <div class="meta-box">
              <div class="meta subscribe">{{ item.userNum }} 关注</div>
            </div>
            <div class="meta-box">
              <div class="meta article">{{ item.blogNum }} 笔记</div>
              <div class="meta card">{{ item.blogNum }} 卡片</div>
              <div class="meta video">{{ item.blogNum }} 视频</div>
            </div>
          </div>
          <div class="action-box">
            <div
              @click="item.isSelect ? '' : followTag(item.id, index)"
              :class="
                item.isSelect ? 'subscribe-btn subscribed' : 'subscribe-btn'
              "
            >
              <span>{{ item.isSelect ? "已关注" : "关注" }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { selectTags, insertTags } from "@/api/tag.js";
export default {
  name: "AllTag",
  props: {
    // tagData: {type: Array}
  },
  data() {
    return {
      keyWord: "",
      data: [],
    };
  },
  mounted() {
    // console.log(this.$route.query.sort);
    this.getData();
  },
  methods: {
    showHottest() {
      // this.$refs.newestBtn.classList.remove('btn-outline')
      // this.$refs.hottestBtn.classList.add('btn-outline')
      this.$router.push({
        path: "/tags/all",
        query: {
          sort: "hottest",
        },
      });
    },
    showNewest() {
      // this.$refs.hottestBtn.classList.remove('btn-outline')
      // this.$refs.newestBtn.classList.add('btn-outline')
      this.$router.push({
        path: "/tags/all",
        query: {
          sort: "newest",
        },
      });
    },
    searchTag() {
      this.getData();
    },
    async getData() {
      let res = await selectTags(this.keyWord, this.userInfo.id);
      if (res.code === 200) {
        this.data = res.data;
      }
    },
    async followTag(tagId, index) {
      if (this.isLogin) {
        let res = await insertTags(this.userInfo.id, tagId);
        if (res.code === 200) {
          this.data[index].isSelect = 1;
          this.$message.success("关注成功！");
        } else {
          this.$message.error("关注失败！");
        }
      } else {
        this.$message.error("未登录！");
        console.log("没登录");
      }
    },
  },
  computed: {
    ...mapState("user", ["isLogin", "userInfo"]),
  },
  watch: {
    $route: {
      // $route可以用引号，也可以不用引号
      handler(to, from) {
        // console.log(to);
        // console.log(from);
        if (to.query.sort === "hottest") {
          // console.log('热');
          this.$nextTick(() => {
            this.$refs.newestBtn.classList.remove("btn-outline");
            this.$refs.hottestBtn.classList.add("btn-outline");
          });
        } else if (to.query.sort === "newest") {
          // console.log('新');
          this.$nextTick(() => {
            this.$refs.hottestBtn.classList.remove("btn-outline");
            this.$refs.newestBtn.classList.add("btn-outline");
          });
        }
      },
      // deep: true, // 深度监听
      immediate: true, // 第一次初始化渲染就可以监听到
    },
  },
};
</script>

<style lang="less">
#all-tag {
  padding-top: 20px;

  .allTag-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 12px;

    .header-search {
      .search-input-container {
        .el-input__inner {
          border-radius: 6px;
        }
      }
    }

    .header-screen {
      display: flex;
      align-items: center;
      text-align: center;

      .btn {
        padding: 6px 12px;
        font-size: 16px;
        border-radius: 6px;
        user-select: none;
        cursor: pointer;
        border: 1px solid @primary-color;
        color: @primary-color;
        line-height: 16px;
      }

      .hot {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .new {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }

      .btn-outline {
        color: #fff;
        background-color: @primary-color;
        border-color: @primary-color;
      }
    }
  }

  .allTag {
    .allTag-list {
      display: grid;
      grid-template-columns: repeat(4, 25%);
      flex-wrap: wrap;

      .allTag-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 209px;
        margin: 0 10px 10px 0;
        background-color: #fff;
        border-radius: 6px;
        padding: 12px 0;

        &:nth-child(4n) {
          margin: 0 0 10px 0;
        }

        .info-box {
          a {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 4px;

            img {
              object-fit: contain;
              width: 50px;
              height: 50px;
              margin: 4px auto;
              border-radius: 6px;
              border: 1px solid #f1f1f5;
            }

            .title {
              font-size: 18px;
              line-height: 24px;
              color: #333;
            }
          }

          .meta-box {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #909090;
            .meta {
              line-height: 24px;
            }
            .subscribe {
            }
            .card,
            .video {
              margin-left: 10px;
            }
          }
        }

        .action-box {
          .subscribe-btn {
            margin: 14px auto;
            font-size: 14px;
            padding: 6px 12px;
            border-radius: 4px;
            border: 1px solid @primary-color;
            color: @primary-color;
            cursor: pointer;
          }
          .subscribed {
            background-color: @primary-color;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>