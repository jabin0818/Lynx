<template>
  <div id="friends-container">
    <div class="frineds-title">
      <span>关注列表</span>
    </div>
    <div class="friends-main">
      <div class="friends-list">
        <div class="friends-plus">
          <div class="friends-plus-left">
            <i class="el-icon-plus"></i>
          </div>
          <div class="friends-plus-right">
            <div class="friends-pr-text">
              <span>添加更多好友</span>
            </div>
            <div class="friends-pr-message">
              <span>快来发现更多好友吧！</span>
            </div>
          </div>
        </div>
        <div class="friends-item" v-for="item in userList" :key="item.id">
          <div class="friends-img">
            <img :src="item.avatar" alt="" />
            <span class="friends-status online"></span>
          </div>
          <div class="friends-info">
            <div class="friends-name">
              <span>{{ item.username }}</span>
            </div>
            <div class="friends-message">
              <span>
                {{ this?.message?.length ? this.message[this.message.length - 1].text  : historyInfo(item.uuid,'text')}}
              </span>
            </div>
          </div>
          <div class="friends-messageNum" :ref="'msgNum'+ index" v-if="newMsgCount(item.uuid)">
            <span>{{ newMsgCount(item.uuid) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="friends-more">
      <span>查看全部</span>
    </div>
  </div>
</template>

<script>
import { getUserFollow } from "@/api/user.js";
import { mapState } from "vuex";
import { setMessageById,getMessageById } from '@/utils/localStorage';

export default {
  name: "Friends",
  data() {
    return {
      userList: []
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      if (!this.isLogin) return;
      let followRes = await getUserFollow(this.userInfo.id);
      console.log(followRes)
      if(followRes.code === 200) {
        this.userList = followRes.data.data.slice(0,5);
      }
    },
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
    ...mapState("user", ["isLogin", "userInfo","message"]),
  },
};
</script>

<style lang="less" scoped>
#friends-container {
  border-radius: 6px;
  background-color: #fff;
  margin-bottom: 10px;
  .frineds-title {
    padding: 10px;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #dcdfe6;
  }

  .friends-main {
    padding: 5px 10px 10px 10px;
    .friends-list {
      .friends-plus {
        display: flex;
        align-items: center;
        padding: 10px 10px;
        height: 66px;
        cursor: pointer;
        border-radius: 6px;

        &:hover .friends-plus-left {
          border: 1px solid @primary-color;
        }
        &:hover .friends-plus-right .friends-pr-text,
        &:hover .friends-plus-right .friends-pr-message {
          color: @primary-color;
        }
        .friends-plus-left {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #f1f1f5;
          margin-right: 8px;
          transition: border 0.1s;
          i {
            font-size: 28px;
            color: @primary-color;
          }
        }

        .friends-plus-right {
          width: 78%;
          .friends-pr-text {
            font-size: 14px;
            margin-bottom: 6px;
            color: #000;
            transition: color 0.1s;
          }

          .friends-pr-message {
            font-size: 12px;
            color: #999;
            transition: color 0.1s;
          }
        }
      }
      .friends-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px;
        height: 66px;
        cursor: pointer;
        border-radius: 6px;
        &:hover {
          background-color: #e3e5e7;
        }

        .friends-img {
          position: relative;
          width: 40px;
          height: 40px;
          min-width: 40px;
          margin-right: 8px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }

          .friends-status {
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

        .friends-info {
          width: 78%;
          .friends-name {
            font-size: 14px;
            margin-bottom: 6px;
            color: #000;
            font-weight: 600;
          }

          .friends-message {
            font-size: 12px;
            color: #999;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }

        .friends-messageNum {
          width: 22px;
          height: 20px;
          padding: 0 4px;
          border-radius: 50%;
          background-color: @danger-color;
          text-align: center;
          line-height: 18px;
          transform: scale(0.8);
          span {
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
  }

  .friends-more {
    width: 100%;
    height: 46px;
    text-align: center;
    font-size: 14px;
    color: @primary-color;
    background-color: rgba(66, 129, 255, 0.1);
    line-height: 46px;
    cursor: pointer;
    border-radius: 0 0 10px 10px;
    transition: background-color 0.2s;
    &:hover {
      background-color: rgba(66, 129, 255, 0.2);
    }
  }
}
</style>