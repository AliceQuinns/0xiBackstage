import Vue from 'vue'
import Vuex from 'vuex'
import { CHANGE_NAVID } from '../common/consts/mutation-types'
import { CHANGE_HEADER_STATUS } from '../common/consts/mutation-types'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    navId: 0,  // 当前主导航的 id
    isShowHeader: true,  // 顶部导航显示状态
  },
  mutations: {
    [CHANGE_NAVID](state, data) {
      state.navId = data.parentId;
    },
    [CHANGE_HEADER_STATUS](state, data) {
      state.isShowHeader = data.status;
    },
  },
});

export default store;
