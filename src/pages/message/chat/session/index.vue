<template>
  <div class="session-panel-warp">
    <div class="session-panel-header">
      <span class="session-name" v-if="info">{{ info.username }}</span>
    </div>
    <div class="session-panel-body" ref="chatWindow">
      <ChatBubble class="message-item" v-for="item, index in msgHistory" :key="index" :data="item" :info="info"/>
      <ChatBubble class="message-item" v-for="item, index in message" :key="'bubble'+index" :data="item" :info="info" v-if="item.to === $route.params.id || item.from === info?.uuid"/>
    </div>
    <!-- 发消息窗口 -->
    <div class="session-panel-footer">
      <div class="session-tool-warp">
        <div class="session-tool">
          <!-- <span class="iconfont icon-expression"></span> -->
          <span class="control-left-span">
            <i class="iconfont icon-emoji"></i>
          </span>
          <span class="control-left-span">
            <i class="el-icon-picture-outline"></i>
          </span>
        </div>
        <!-- <label class="session-tool-item"> -->
        <!-- 上传图片 -->
        <!-- <span class="iconfont icon-img"></span> -->
        <!-- <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            @change="fileChange"
          /> -->
        <!-- </label> -->
        <!-- 表情 -->
        <!-- <transition name="slide">
          <div class="emoji-panel" v-show="isShow">
            <ul class="emoji-list">
              <li
                class="emoji-item"
                v-for="(item, i) in expressions"
                :key="i"
                @click.stop="pickerEmoji(item)"
              >
                <img
                  :src="baseUrl + item.url"
                  alt=""
                  :title="item.title"
                />
              </li>
            </ul>
          </div>
        </transition> -->
      </div>
      <!-- 输入框 -->
      <div class="session-text-warp">
        <!-- <textarea
          class="session-textarea"
          v-model="text"
          @keypress.enter="sendText(text)"
        ></textarea> -->
        <el-input
          type="textarea"
          class="session-textarea"
          :rows="4"
          :autosize="{ minRows: 1, maxRows: 20 }"
          v-model="content"
          maxlength="2000"
          resize="none"
        />
      </div>
      <div class="session-btn-warp">
        <button class="session-send-btn" @click="sendMessageBtn">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import ChatBubble from "./chatBubble";
import { sendMessage } from "@/api/message";
import { getToken, getUserId, setToken, setUserId, clearToken, clearUserId, setMessageById,getMessageById } from '@/utils/localStorage';
import { mapState } from "vuex";
export default {
  name: "Session",
  props:{
    msgHistory:{type: Array},
    info: {type: Object},
    isScrollBottom: {type: Boolean}
  },
  components: {
    ChatBubble,
  },
  data() {
    return {
      content: "",
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() =>{
      this.isNeedScroll()
    })
  },
  methods: {
    //小于10的拼接上0字符串
    addZero(s) {
        return s < 10 ? ('0' + s) : s;
    },
    getNowTime() {
      var date = new Date();
      //年 getFullYear()：四位数字返回年份
      var year = date.getFullYear();  //getFullYear()代替getYear()
      //月 getMonth()：0 ~ 11
      var month = date.getMonth() + 1;
      //日 getDate()：(1 ~ 31)
      var day = date.getDate();
      //时 getHours()：(0 ~ 23)
      var hour = date.getHours();
      //分 getMinutes()： (0 ~ 59)
      var minute = date.getMinutes();
      //秒 getSeconds()：(0 ~ 59)
      var second = date.getSeconds();

      var time = year + '-' + this.addZero(month) + '-' + this.addZero(day) + ' ' + this.addZero(hour) + ':' + this.addZero(minute) + ':' + this.addZero(second);
      return time;
    },
    async sendMessageBtn() {
      if(!this.$route.params.id) {
        this.$message.error("请选择一个好友！")
        return;
      };
      let message = {
        text: this.content,
        to: this.$route.params.id,
      };
      let res = await sendMessage(JSON.stringify(message));
      if (res.code === 200) {
        this.content = ""
        let sendMsg = Object.assign(message, {time: this.getNowTime()})
        this.$store.commit("user/PUSHMESSAGE",sendMsg);
        this.isNeedScroll()
        if((!message.to) || (!this.userInfo.id)) return;
        if(getMessageById(`${message.to}-${this.userInfo.id}`)) {
            console.log('已经有历史记录了，是对方先发的')
            let chat = getMessageById(`${message.to}-${this.userInfo.id}`)
            chat.push(sendMsg)
            setMessageById(`${message.to}-${this.userInfo.id}`,chat)
        } else if (getMessageById(`${this.userInfo.id}-${message.to}`)){
          console.log('已经有历史记录了，是我先发的')
          let chat = getMessageById(`${this.userInfo.id}-${message.to}`)
            chat.push(sendMsg)
            setMessageById(`${this.userInfo.id}-${message.to}`,chat)
        } else{
            console.log('无历史记录')
            setMessageById(`${this.userInfo.id}-${message.to}`,[sendMsg])
        }
      }
    },
    isNeedScroll() {
      let ele = this.$refs.chatWindow
      if(ele?.scrollHeight > ele?.clientHeight) {
        setTimeout(() => {
          //设置滚动条到最底部
          ele.scrollTop = ele.scrollHeight;
          this.$emit("changeIsScrollBottom", false)
        },200);
      } else {
        this.$emit("changeIsScrollBottom", false)
      }
    }
  },
  computed: {
    ...mapState("user",["userInfo", "message"])
  },
  watch: {
    isScrollBottom(newValue) {
      if(newValue) {
        this.$nextTick(() =>{
          this.isNeedScroll()
        })
      }
    }
  },
};
</script>

<style lang="less" scoped>
.session-panel-warp {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 6px;
  //   box-shadow: @element-boxshadow2;
  .session-panel-header {
    position: relative;
    height: 50px;
    padding: 10px 0;
    line-height: 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #d1d1d1;
    margin: 0 10px;
    text-align: center;
    .session-name {
      font-size: 14px;
      color: #333333;
      line-height: 30px;
      margin: 0 5px;
    }
  }

  .session-panel-body {
    width: 100%;
    height: calc(100% - 206px);
    padding: 20px;
    overflow: auto;
    scroll-behavior: smooth;

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
    .message-item {
      margin-top: 14px;
    }
  }

  .session-panel-footer {
    height: 156px;
    box-sizing: border-box;
    padding: 0 20px 10px;

    .session-tool-warp {
      position: relative;
      height: 40px;
      line-height: 40px;
      box-sizing: border-box;
      border-top: 1px solid #d1d1d1;

      .session-tool {
        //   display: block;
        //   float: left;
        //   line-height: 40px;
        //   height: 40px;
        //   margin: 0 3px;
        //   cursor: pointer;
        .control-left-span {
          margin-right: 15px;
          cursor: pointer;
          i {
            font-size: 24px;
            color: #92929d;

            &:hover {
              color: @main-text-color;
            }
          }
        }
      }
    }

    .session-text-warp {
      height: 80px;
      box-sizing: border-box;

      .session-textarea {
        line-height: 20px;
        height: 80px;
        overflow-y: auto;
        resize: none;
        width: 100%;
        outline: none;
        box-sizing: border-box;

        /deep/ .el-textarea__inner {
          border: none;
          font-size: 16px;
          color: #666666;
          padding: 0;
          background-color: transparent;

          font-family: "Microsoft YaHei", "Microsoft Sans Serif",
            "Microsoft SanSerf", "微软雅黑";
        }
      }
    }

    .session-btn-warp {
      height: 26px;
      text-align: right;

      .session-send-btn {
        display: inline-block;
        height: 26px;
        line-height: 24px;
        border-radius: 4px;
        font-size: 12px;
        border: 1px solid #d1d1d1;
        color: #606266;
        outline: none;
        width: 80px;
        text-align: center;
        background-color: #ffffff;
        cursor: pointer;
      }
    }
  }
}

.session-tool-item span.iconfont {
  font-size: 25px;
  color: #606266;
}
.session-tool-item input[type="file"] {
  display: none;
}

.emoji-panel {
  padding: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  position: absolute;
  bottom: 100%;
  width: 420px;
  box-shadow: 0 0 3px #d1dbe5;
  margin-bottom: 5px;
  left: -40px;
}
.emoji-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.emoji-list:after {
  display: block;
  clear: both;
  content: "";
}
.emoji-item {
  float: left;
  width: 26px;
  height: 26px;
  padding: 2px;
  box-sizing: content-box;
  cursor: pointer;
  border-radius: 2px;
  user-select: none;
}
.emoji-item:hover {
  background-color: #f2f2f2;
}
.emoji-item img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>