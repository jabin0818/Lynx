<template>
  <el-container id="message-chat-index">
    <el-aside width="260px" class="message-chat-left">
      <div class="sidebar">
        <Sidebar :data="userList" @receiveId="getMessage" />
      </div>
    </el-aside>
    <el-main class="message-chat-right">
      <div class="session-wrapper">
        <Session :msgHistory="message" :info="info" :isScrollBottom="isScrollBottom" @changeIsScrollBottom="resumeIsScrollBottom" />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Sidebar from "./sidebar";
import Session from "./session";
import { mapState } from "vuex";
import { getUserFollow, getUserFans } from "@/api/user.js";
import { setMessageById,getMessageById } from '@/utils/localStorage';

export default {
  name: "Chat",
  components: {
    Sidebar,
    Session,
  },
  data() {
    return {
      userList: [],
      message: [],
      info: {
        // id: "",
        // username: "",
        // avatar: ""
      },
      isScrollBottom: false,
    };
  },
  async mounted() {
    await this.getData();
    if(this.$route.params.id) {
      this.info = this.userList.find((item,index) => {
        return item.uuid === this.$route.params.id
      })
    }
  },
  methods: {
    async getData() {
      if (!this.isLogin) return;
      let fansRes = await getUserFans(this.userInfo.id);
      let followRes = await getUserFollow(this.userInfo.id);
      if (fansRes.code === 200) {
        this.userList = fansRes.data.data;
      }
      if(followRes.code === 200) {
        this.userList = [...this.userList,...followRes.data.data];
        //去重
        let forData = [];
        this.userList.forEach(item => {
          if (!forData.some(e => e.id == item.id)) forData.push(item);
        })
        this.userList = forData
      }
    },
    getMessage(id) {
      this.message = getMessageById(`${id}-${this.userInfo.id}`) || getMessageById(`${this.userInfo.id}-${id}`)
    },
    resumeIsScrollBottom(e) {
      setTimeout(() => {
        this.isScrollBottom = e
      },400)
    }
  },
  computed: {
    ...mapState("user", ["isLogin", "userInfo"]),
  },
  watch: {
    $route: {
      handler(to, from) {
        if(to?.params?.id && from?.params?.id !== to?.params?.id) {
          this.info = this.userList.find((item,index) => {
            return item.uuid === to.params.id
          })
          this.isScrollBottom = true;
        }
      },
      immediate: true,
    },
  }
};
</script>

<style lang="less" scoped>
#message-chat-index {
  .message-chat-left {
    margin-right: 10px;
  }

  .message-chat-right {
    padding: 0;
    .session-wrapper {
      height: 536px;
    }
  }
}
</style>