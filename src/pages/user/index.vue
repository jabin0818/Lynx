<template>
  <el-container id="user-center" style="background-color: #f6f7f9">
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <el-row class="userProfile-head">
        <el-col :span="24" class="userProfile-headInfo">
          <UserProfile :userData="userData" @changeIsSub="receiveStatus" />
        </el-col>
      </el-row>
      <el-row class="userProfile-body">
        <el-col :span="18" class="">
          <UserTab />
        </el-col>
        <el-col :span="6">
          <Follow
            :numFoll="userData.numFoll"
            :fans="userData.fans"
            :numPub="userData.numPub"
          />
          <Achieve />
          <Level />
          <Creation />
          <MyTag />
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
    <FavoriteDetail />
  </el-container>
</template>

<script>
import Header from "@/components/header/index";
import SideToolbar from "@/components/sideToolbar/index";
import UserProfile from "./userProfile/index";
import UserTab from "./userTab/index";
import Follow from "./right/follow/index";
import Achieve from "./right/achieve/index";
import Level from "./right/level/index";
import Creation from "./right/creation/index";
import MyTag from "./right/myTag/index";
import FavoriteDetail from "@/components/favoriteDetail";
import { obtainUserInfo } from "@/api/user";
import { mapState } from "vuex";
export default {
  name: "User",
  components: {
    Header,
    SideToolbar,
    UserTab,
    Follow,
    UserProfile,
    Achieve,
    Level,
    Creation,
    MyTag,
    FavoriteDetail,
  },
  data() {
    return {
      userId: "",
      userData: {},
    };
  },
  async created() {
    this.userId = this.$route.params.id;
    await this.getUserData(this.userId);
  },
  methods: {
    async getUserData(id) {
      let result = await obtainUserInfo({
        id: id,
        touserId: this.userInfo.uuid,
      });
      if (result.code === 200) {
        this.userData = result.data;
      }
    },
    receiveStatus(isSub) {
      this.userData.sub = isSub;
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
#user-center {
  .el-main {
    width: 1100px;
    overflow: hidden !important;

    @media screen and (max-width: 1140px) {
      width: 100%;
    }
  }

  .userProfile-head {
    .userProfile-headInfo {
      margin: 0 auto;
    }
    // .backPanel{
    //     width: 100%;
    //     height: 260px;
    // }
  }

  .userProfile-body {
  }
}
</style>