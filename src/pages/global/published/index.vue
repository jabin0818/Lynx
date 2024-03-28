<template>
  <el-container style="background-color: #f6f7f9">
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <el-row class="published-container">
        <el-col :span="24" class="published-contents">
          <div id="published">
            <!-- 发布笔记成功！ -->
            <div class="success-icon">
              <i class="el-icon-success"></i>
            </div>
            <a class="published-title" @click="toDetail">{{ title }}</a>
            <div class="published-thanks">
              发布成功！有了你的分享，Lynx会变得更好！
            </div>
            <a class="rule-link">
              <span>如何玩转Lynx社区？点击了解</span>
              <i class="el-icon-arrow-right"></i>
            </a>
            <div class="published-btn">
              <div class="btn backHome" @click="returnHomePage">返回首页</div>
              <div class="btn ToviewNotes" @click="toCreator">查看稿件</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/header/index";
import SideToolbar from "@/components/sideToolbar/index";

export default {
  name: "Published",
  data() {
    return {};
  },
  props: ["id", "title", "type"],
  components: {
    Header,
    SideToolbar,
  },
  mounted() {
    // if(this.$route.params.id && this.$route.params.title) {
    //     console.log(this.$route.params.id);
    //     console.log(this.$route.params.title);
    // }
  },
  methods: {
    toDetail() {
      let userId = this.$route.query.userId;
      if (this.type === "note") {
        this.$router.push({
          path: `/notes/detail/${this.id}`,
          query: {
            userId: userId,
          },
        });
      } else if (this.type === "video") {
        this.$router.push({
          path: `/video/detail/${this.id}`,
          query: {
            userId: userId,
          },
        });
      }
    },
    returnHomePage() {
      this.$router.push({
        path: "/index",
      });
    },
    toCreator() {
      if (this.type === "note") {
        this.$router.push({
          path: "/creator/content/notes/essays",
        });
      } else if (this.type === "video") {
        this.$router.push({
          path: "/creator/content/video/essays",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-main {
  width: 800px;
  overflow: hidden !important;

  @media screen and (max-width: 1140px) {
    width: 100%;
  }
}

.published-container {
  .published-contents {
  }
}

#published {
  min-height: 600px;
  background-color: #fff;
  margin-bottom: 16px;
  text-align: center;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  .success-icon {
    i {
      font-size: 120px;
      color: #529955;
    }
  }

  .published-title {
    margin-top: 30px;
    line-height: 24px;
    color: #252933;
    font-size: 20px;
    text-align: center;
    display: block;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }
  }

  .published-thanks {
    text-align: center;
    font-size: 14px;
    line-height: 22px;
    margin-top: 8px;
    color: #4e5969;
  }

  .rule-link {
    line-height: 20px;
    font-weight: 400;
    margin-top: 4px;
    display: inline-block;
    color: #8a919f;
    font-size: 0;
    height: 20px;
    font-size: 12px;
    cursor: pointer;
  }

  .published-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    // margin-bottom: 120px;

    .btn {
      font-size: 14px;
      width: 88px;
      height: 32px;
      line-height: 32px;
      color: #fff;
      background-color: @primary-color;
      cursor: pointer;
      border-radius: 4px;
    }

    .backHome {
    }

    .ToviewNotes {
      margin-left: 20px;
    }
  }
}
</style>