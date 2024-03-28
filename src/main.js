import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
import store from '@/store'

import utils from "./utils/utils"

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import "@/assets/css/main.css"
import "@/assets/css/main.css"
import "@/assets/css/media.css"
import 'element-ui/lib/theme-chalk/display.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import './assets/iconfont/iconfont.css';

import VueDPlayer from 'vue-dplayer'
import "vue-dplayer/dist/vue-dplayer.css"



Vue.config.productionTip = false

Vue.prototype.$utils = utils

Vue.use(Element);
Vue.use(mavonEditor)
Vue.use(VueDPlayer);

new Vue({
  mode: 'hash',
  router,
  render: h => h(App),
  store
}).$mount('#app')
