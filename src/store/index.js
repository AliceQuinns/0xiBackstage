import Vue from 'vue'
import Vuex from 'vuex'
import { CHANGE_NAVID } from '../common/consts/mutation-types'
import { UPDATE_SESSIONID } from '../common/consts/mutation-types'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    navId: 0,  // 当前主导航的 id
    sessionId: '',
  },
  mutations: {
    [CHANGE_NAVID](state, data) {
      state.navId = data.parentId;
    },
    [UPDATE_SESSIONID](state, data) {
      state.sessionId = data.sessionId;
    },
  },
});

export default store;
