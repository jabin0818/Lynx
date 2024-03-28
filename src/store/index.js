import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

import global from './global'
import user from './user'

export default new Vuex.Store({
    modules: {
        global,
        user
    }
})