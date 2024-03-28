<template>
  <el-container id="communityIndex">
    <el-header>
      <Header />
    </el-header>
    <el-main class="community-main">
      <el-row :gutter="20">
        <el-col :span="17">
          <Dynamic />
        </el-col>
        <el-col :span="7">
          <UserBlock />
          <Friends :class="{ 'friends-isfixed': isFixed }" ref="friendsCom" />
          <!-- <AuthorsList class="community-mainRight-authorsList" /> -->
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
  </el-container>
</template>

<script>
import Header from "@/components/header/index";
import SideToolbar from "@/components/sideToolbar/index";
import Dynamic from "./dynamic";
import UserBlock from "./userBlock";
import Friends from "./friends";
import AuthorsList from "@/components/right/authorsList";
import { mapState } from "vuex";
export default {
  name: "CommunityIndex",
  components: {
    Header,
    SideToolbar,
    Dynamic,
    UserBlock,
    Friends,
    AuthorsList,
  },
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    this.handleScroll.call(this);
  },
  methods: {
    handleScroll() {
      window.addEventListener(
        "scroll",
        () => {
          var scrollTop =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;
          if (scrollTop > 240) {
            this.isFixed = true;
          } else {
            this.isFixed = false;
          }
        },
        true
      );
    },
  },
  computed: {
    ...mapState("user", ["isLogin", "userInfo"]),
  },
  watch: {
    isLogin(newValue) {
      if (newValue === false) {
        this.$router.push("/index");
      }
    },
  },
};
</script>

<style lang="less" scoped>
#communityIndex {
  .community-main {
    width: 1140px;
    overflow: hidden !important;

    @media screen and (max-width: 1140px) {
      width: 100%;
    }

    .community-mainRight-authorBlock {
      padding: 20px;
      border-radius: 6px;
    }

    .friends-isfixed {
      position: fixed;
      top: 10px;
      min-width: 306px;
    }

    // .community-mainRight-authorsList {
    //   border-radius: 6px;
    //   border: none;
    // }
  }
}
</style>