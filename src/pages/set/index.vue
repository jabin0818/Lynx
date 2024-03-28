<template>
  <el-container id="user-settings" style="background-color: #f6f7f9">
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <el-row class="userSettings">
        <el-col :span="5" class="left-setMenu">
          <SetMenu />
        </el-col>
        <el-col :span="19" class="right-routerView">
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
import SetMenu from "./setMenu/index";
import AccountSettings from "./accountSettings/index";
import ProfileSettings from "./profileSettings/index";

export default {
  name: "Set",
  components: {
    Header,
    SideToolbar,
    SetMenu,
    AccountSettings,
    ProfileSettings,
  },
};
</script>

<style lang="less">
#user-settings {
  .el-main {
    width: 1200px;
    overflow: hidden !important;

    @media screen and (max-width: 1200px) {
      width: 100%;
    }
  }

  .userSettings {
    .left-setMenu {
    }

    .right-routerView {
      padding-left: 10px;
    }
  }
}
</style>