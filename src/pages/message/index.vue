<template>
  <el-container id="message-index">
    <el-header>
      <Header />
    </el-header>
    <el-main class="message-main">
      <el-row class="message-nav">
        <el-col :span="24" class="message-headInfo">
          <el-menu
            :router="true"
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            active-text-color="#4281ff"
          >
            <el-menu-item index="/message/comment">评论</el-menu-item>
            <el-menu-item index="/message/like">点赞</el-menu-item>
            <el-menu-item index="/message/follow">关注</el-menu-item>
            <el-menu-item index="/message/chat">私信</el-menu-item>
            <el-menu-item index="/message/system">系统消息</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <el-row class="message-body">
        <el-col :span="24" class="">
          <router-view></router-view>
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
  name: "Message",
  components: {
    Header,
    SideToolbar,
  },
  data() {
    return {
      activeIndex: "/message/comment",
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        // console.log(to);
        // if (to.path.slice(0, 13) === "/message/chat") {
        //   this.activeIndex = "/message/chat";
        //   return;
        // }
        this.activeIndex = to.matched[1].path;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
#message-index {
  .message-main {
    width: 1100px;
    overflow: hidden !important;
    padding: 0 20px 20px;

    @media screen and (max-width: 1140px) {
      width: 100%;
    }
  }

  .message-nav {
    margin-bottom: 20px;
    .message-headInfo {
      .el-menu-demo {
        border-radius: 6px;
      }
    }
  }

  .message-body {
  }
}
</style>