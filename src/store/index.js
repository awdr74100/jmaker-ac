import Vue from 'vue';
import Vuex from 'vuex';
import admin from './modules/admin';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openSidebar: !(window.innerWidth < 768),
  },
  mutations: {
    SIDEBARTOGGLE(state, status) {
      state.openSidebar = status;
    },
  },
  actions: {},
  modules: {
    admin,
  },
});
