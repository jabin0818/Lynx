<template>
  <el-container id="user-tag" style="background-color: #f6f7f9">
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <el-row class="userTag-nav">
        <el-col :span="24" class="userTag-headInfo">
          <el-menu
            :router="true"
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#4281ff"
          >
            <el-menu-item index="/tags/all">全部</el-menu-item>
            <el-menu-item index="/tags/my" v-if="isLogin">已关注</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <el-row class="userTag-body">
        <el-col :span="24" class="">
          <router-view></router-view>
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import Header from "@/components/header/index";
import SideToolbar from "@/components/sideToolbar/index";
import { selectTags } from "@/api/tag.js";
import { mapState } from "vuex";

export default {
  name: "Tag",
  components: {
    Header,
    SideToolbar,
  },
  data() {
    return {
      activeIndex: "/tags/all",
      tagData: [],
    };
  },
  mounted() {
    // this.getData()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === "/tags/my") {
        this.activeIndex = "/tags/all";
      }
    },
    // async getData(name) {
    //     let res = await selectTags(name, this.userInfo.id)
    //     console.log(res);
    //     if(res.code === 200) {
    //         this.tagData = res.data
    //     }
    // }
  },
  watch: {
    $route: {
      // $route可以用引号，也可以不用引号
      handler(to, from) {
        // console.log(to);
        // console.log(from);
        // if (to.path === "/tags/my") {
        //   this.activeIndex = "/tags/my";
        // } else if (to.path === "/tags/all") {
        //   this.activeIndex = "/tags/all";
        // }
        this.activeIndex = to.path;
      },
      // deep: true, // 深度监听
      immediate: true, // 第一次初始化渲染就可以监听到
    },
  },
  computed: {
    ...mapState("user", ["isLogin"]),
  },
};
</script>

<style lang="less">
#user-tag {
  .el-main {
    width: 1100px;
    overflow: hidden !important;
    padding: 0 20px 20px;

    @media screen and (max-width: 1140px) {
      width: 100%;
    }

    .userTag-nav {
      .userTag-headInfo {
        .el-menu-demo {
          border-radius: 6px;
        }
      }
    }
  }
}
</style>