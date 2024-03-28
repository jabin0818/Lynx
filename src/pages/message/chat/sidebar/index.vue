<template>
  <div class="chat-sidebar-panel">
    <div class="sidebar-search">
      <el-input
        placeholder="搜索"
        suffix-icon="el-icon-search"
        v-model="keyWord"
        @keyup.enter.native="searchUser"
        class="sidebar-search-input"
      >
      </el-input>
    </div>
    <div class="sidebar-userList">
      <div
        class="user-item-warp"
        v-for="item, index in data"
        :key="item.id"
        :class="{active:$route.params.id === String(item.uuid)}"
        @click="toUserChatSession(item.uuid, index)"
      >
        <div class="user-avatar-warp">
          <img :src="item.avatar" alt="" class="avatar-img" />
          <span class="status online"></span>
        </div>
        <div class="user-info-warp">
          <div class="user-name-warp">
            <div class="user-name-text">{{ item.username }}</div>
            <div class="message-time">
              <span>{{ this?.message?.length ? $utils.showtime(this.message[this.message.length - 1].time) : $utils.showtime(historyInfo(item.uuid,'time'))}}</span>
            </div>
          </div>
          <div class="latest-message">
            <div class="latest-message-text">
              <!-- <UiEmojiText
                  :text="message.content"
                  v-if="message.type === 'text'"
                ></UiEmojiText> -->
              <!-- <template v-if="message.type === 'image'">
                  <span class="iconfont icon-img"></span>
                </template> -->
                {{ this?.message?.length ? this.message[this.message.length - 1].text  : historyInfo(item.uuid,'text')}}
            </div>
            <div class="user-unread-num" :ref="'msgNum'+ index" v-if="newMsgCount(item.uuid)">
              <span>{{ newMsgCount(item.uuid) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setMessageById,getMessageById } from '@/utils/localStorage';

export default {
  name: "Sidebar",
  props: {
    data: { type: Array },
  },
  data() {
    return {
      keyWord: "",
    };
  },
  mounted(){
    if(this.$route.params.id) {
      this.$emit("receiveId", this.$route.params.id)
    }
  },
  methods: {
    historyInfo(where,what) {
      let messageOne = getMessageById(`${where}-${this.userInfo.id}`)
      let messageTwo = getMessageById(`${this.userInfo.id}-${where}`)
      if(messageOne && messageOne.length) {
        return messageOne[messageOne.length - 1][what]
      }
      if(messageTwo && messageTwo.length) {
        return messageTwo[messageTwo.length - 1][what]
      }
    },
    searchUser(e) {
      console.log(e);
    },
    toUserChatSession(e,index) {
      if(this.$refs['msgNum'+ index]) {
        console.log(this.$refs['msgNum'+ index])
        this.$refs['msgNum'+ index][0].style.display = 'none'
      }
      this.$emit("receiveId", e)
      if(e !== this.$route.params.id) {
        this.$router.push({
        path: `/message/chat/${e}`,
      });
      }
      
    },
    newMsgCount(id) {
      let count = 0;
      if(!this?.message?.length) return
      for (let index = 0; index < this.message.length; index++) {
        if(this.message[index].from === id) {
          count++;
        }
      }
      return count > 99 ? "99+" : count
    },
  },
  computed: {
    ...mapState("user", ["userInfo" , "message"]),
  },
  watch: {
  }
};
</script>

<style lang="less" scoped>
.chat-sidebar-panel {
  width: 100%;
  height: 100%;
  position: relative;
  //   border-right: 1px solid #d1d1d1;
  background-color: #fff;
  border-radius: 6px;
  box-sizing: border-box;

  .sidebar-search {
    box-sizing: border-box;
    padding: 10px;
    position: relative;

    .sidebar-search-input {
      /deep/ .el-input__inner {
        height: 32px;
        line-height: 32px;
        border-radius: 20px !important;
      }

      /deep/ .el-input__icon {
        line-height: 32px;
      }
    }
  }

  .sidebar-userList {
    height: 484px;
    padding: 0 10px 10px 10px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.1);
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
      border-radius: 8px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
      background-color: #c8c8c8;
    }
    .user-item-warp {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 20px 0;
      padding: 10px 10px;
      height: 66px;
      cursor: pointer;
      border-radius: 6px;

      &.active{
        background-color: #e3e5e7;
      }

      &:first-child {
        margin-top: 0;
      }

      &:not(:last-child)::after {
        position: absolute;
        bottom: -11px;
        content: "";
        width: 90%;
        height: 1px;
        background-color: #e5e9ef;
      }
      &:hover {
        background-color: #e3e5e7;
      }
      .user-avatar-warp {
        position: relative;
        width: 42px;
        height: 42px;
        min-width: 42px;
        margin-right: 8px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .status {
          display: block;
          position: absolute;
          bottom: 0px;
          right: -1px;
          width: 8px;
          height: 8px;
          border-radius: 50%;

          &.online {
            background-color: @success-color;
          }

          &.offline {
            background-color: @info-color;
          }
        }
      }

      .user-info-warp {
        width: 78%;
        .user-name-warp {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          .user-name-text {
            width: 60%;
            font-size: 14px;
            color: #000;
            font-weight: 600;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }

          .message-time {
            font-size: 12px;
            color: #999;
          }
        }

        .latest-message {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .latest-message-text {
            width: 80%;
            font-size: 12px;
            color: #999;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }

          .user-unread-num {
            width: 20px;
            height: 20px;
            padding: 0 4px;
            border-radius: 50%;
            background-color: @danger-color;
            text-align: center;
            line-height: 18px;
            transform: scale(0.9);
            span {
              font-size: 12px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>