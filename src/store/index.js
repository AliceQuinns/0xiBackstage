import Vue from 'vue'
import Vuex from 'vuex'
import { CHANGE_NAVID } from '../common/consts/mutation-types'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    navId: 0,  // 当前主导航的 id
  },
  mutations: {
    [CHANGE_NAVID](state, data) {
      state.navId = data.parentId;
    },
  },
});

export default store;
