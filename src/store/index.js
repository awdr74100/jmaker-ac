import Vue from 'vue';
import Vuex from 'vuex';
import admin from './modules/admin';
import alert from './modules/alert';
import users from './modules/users';
import modal from './modules/modal';

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
    alert,
    users,
    modal,
  },
});
