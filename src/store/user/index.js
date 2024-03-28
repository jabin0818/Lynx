import { sendCode, register, login } from "@/api/login";
import { obtainUserInfo } from "@/api/user";
import { getToken, getUserId, setToken, setUserId, clearToken, clearUserId, setMessageById, getMessageById, clearUserPsd } from '@/utils/localStorage';


//用户模块仓库
const state = {

  token: getToken() || '',
  userId: getUserId() || '',
  userInfo: {},
  isLogin: false,
  isRemember: false,
  socket: null,//websocket实例
  lockReconnect: false, //是否真正建立连接
  timeout: 15000, //15秒一次心跳
  timeoutObj: null, //心跳心跳倒计时
  serverTimeoutObj: null, //心跳倒计时
  timeoutnum: null, //断开 重连倒计时
  message: null,//聊天接收到的信息
  newMessage: null,//登录
  dynamciMsgNum: null
}

const mutations = {

  PUSHMESSAGE(state, message) {
    let messageCopy = JSON.parse(JSON.stringify(state.message)) || []
    messageCopy.push(message);
    state.message = messageCopy
  },

  //登录成功立马保存token
  SAVETOKEN(state, token) {
    state.token = token;
  },

  //存储用户信息
  SAVEUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
    state.isLogin = true
  },

  // 退出登录
  USERLOGOUT(state) {
    state.token = '';
    state.userInfo = {};
    state.isLogin = false
    state.socket.onclose()
    clearToken();
    clearUserId();
    clearUserPsd();
  },
  //开启心跳
  HEAETSTART(state) {
    var self = this;
    state.timeoutObj &&
      clearTimeout(state.timeoutObj);
    state.serverTimeoutObj &&
      clearTimeout(state.serverTimeoutObj);
    // //console.log('开启心跳')
    state.timeoutObj = setTimeout(() => {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      // //console.log(state.socket.readyState, '是否为1')
      // state.socket.send("ping");
      if (state.socket.readyState === 1) {
        //如果连接正常
        //console.log('连接正常')
        state.socket.send("ping");
      } else {
        //否则重连
        //console.log('重连')
        self.commit('user/RECONNECT');
      }
      state.serverTimeoutObj = setTimeout(function () {
        //超时关闭
        //console.log('超时关闭')
        state.socket.close();
      }, state.timeout);
    }, state.timeout);
  },
  //初始化ws 用户登录后调用
  WEBSOCKETINIT(state, token) {
    //console.log('初始化websocket', state.isLogin)
    let that = this
    //this 创建一个state.socket对象【发送、接收、关闭socket都由这个对象操作】
    let id = token || state.token
    if (!id) {
      //console.log('没登录，不建立连接')
      return;
    }
    state.socket = new WebSocket(`ws://localhost:8088/dynamic/${id}`);

    state.socket.onopen = function (res) {
      //console.log("Connection success...");
      /**
       * 启动心跳检测
       */
      that.commit("user/HEAETSTART");
    }
    state.socket.onmessage = function (res) {
      console.log('接受到消息', res)
      let message = JSON.parse(res.data)
      if (message.data === "ping") {
        // 收到服务器信息，心跳重置
        that.commit("user/RESET");
      } else {
        if (res.type === "message") {
          console.log('接受到消息！message', res)
          let msgData = JSON.parse(res.data)
          that.commit("user/PUSHMESSAGE", msgData);
          if ((!state.userInfo.id) || (!msgData.from)) {
            console.log('其中一个为null')
            return;
          };
          if (getMessageById(`${state.userInfo.id}-${msgData.from}`)) {
            // console.log('有历史记录')
            let chat = getMessageById(`${state.userInfo.id}-${msgData.from}`)
            chat.push(msgData)
            setMessageById(`${state.userInfo.id}-${msgData.from}`, chat)
          }
          else if (getMessageById(`${msgData.from}-${state.userInfo.id}`)) {
            // console.log('有历史记录')
            let chat = getMessageById(`${msgData.from}-${state.userInfo.id}`)
            chat.push(msgData)
            setMessageById(`${msgData.from}-${state.userInfo.id}`, chat)
          } else {
            // console.log('无历史记录')
            setMessageById(`${msgData.from}-${state.userInfo.id}`, [msgData])

          }
        } else if (res.type === "saveMessages") {
          console.log('接受到消息！saveMessages')
        } else if (res.type === "newDynamics") {
          console.log('接受到消息！newDynamics')
          state.dynamciMsgNum = res.data
        }
      }
    }
    state.socket.onclose = function (res) {
      console.log("连接关闭...");
      //重连
      // that.commit('user/RECONNECT');
    }
    state.socket.onerror = function (e) {
      console.log("连接出现错误...");
      //console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
      //重连
      // that.commit('user/RECONNECT');
    }

  },
  //重新连接
  RECONNECT(state) {
    //console.log('为什么会一直重新连接？')
    let that = this;
    if (state.lockReconnect) {
      return;
    }
    state.lockReconnect = true;
    //没连接上会一直重连,30秒重试请求重连，设置延迟避免请求过多
    state.timeoutnum &&
      clearTimeout(state.timeoutnum);
    state.timeoutnum = setTimeout(() => {
      //新连接
      that.commit('user/WEBSOCKETINIT')
      state.lockReconnect = false;
    }, 5000);
  },
  //重置心跳
  RESET(state) {
    console.log('重置心跳')
    let that = this;
    //清除时间
    clearTimeout(state.timeoutObj);
    clearTimeout(state.serverTimeoutObj);
    //重启心跳
    that.commit('user/HEAETSTART')
  },
}

const actions = {

  //用户登录
  async userLogin({ commit }, { email, password }) {

    let result = await login(email, password)

    if (result.code === 200) {
      commit("SAVEUSERINFO", result.data[0]);
      let userId = result.data[0].id
      setUserId(userId)
      commit("WEBSOCKETINIT")
      return 'ok'
    } else {
      return result
    }
  },

  //用户退出登录
  async userLogout({ commit }) {
    commit("USERLOGOUT");
  },

  //获取用户信息
  async getUserInfo({ commit, state }) {
    if (state.token) {
      let result = await obtainUserInfo({ touserId: state.userId });
      console.log("获取用户信息的接口：", result)
      if (result.code === 200) {
        commit("SAVEUSERINFO", result.data);
        return 'ok';
      } else {
        return Promise.reject(new Error('faile'));
      }
    }
  },

  webSocketInit({ commit }) {
    commit('WEBSOCKETINIT')
  },
  webSocketSend({ commit, state }, message) {
    state.socket.send(message)
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}