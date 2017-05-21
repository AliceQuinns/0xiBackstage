import Vue from 'vue'
import Vuex from 'vuex'
import { CHANGE_NAVID, UPDATE_SESSIONID, UPDATE_MANAGER_INFO } from '../common/consts/mutation-types'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    navId: 0,  // 当前主导航的 id
    sessionId: '',
    managerInfo: {
      group: '',
      lastIp: '',
      ip: '',
      time: '',
      lastTime: '',
      nums: '',
    },
  },
  mutations: {
    [CHANGE_NAVID](state, data) {
      state.navId = data.parentId;
    },
    [UPDATE_SESSIONID](state, data) {
      state.sessionId = data.sessionId;
    },
    [UPDATE_MANAGER_INFO](state, data) {
      state.managerInfo = data.managerInfo;
    },
  },
});

export default store;
