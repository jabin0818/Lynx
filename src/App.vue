<template>
  <div id="app">
    <!-- <Index/> -->
    <router-view />
    <!-- <Login/> -->
  </div>
</template>

<script>
import Index from "./pages/index/index.vue";
import Login from "./pages/login/index.vue";

import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Index,
    Login,
  },
  mounted() {
    this.webSocketInit();
  },
  methods: {
    ...mapActions("user", ["webSocketInit"]),
  },
};
</script>

<style>
#app {
  height: 100%;
  /* 元素要给定高度 添加滚动事件才会生效 */
  overflow: auto;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
