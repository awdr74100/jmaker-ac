import Vue from 'vue';
import Vuex from 'vuex';
import admin from './modules/admin';
import alert from './modules/alert';
import users from './modules/users';
import modal from './modules/modal';
import image from './modules/image';
import mail from './modules/mail';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openSidebar: !(window.innerWidth < 768),
    skeletonActive: false,
    isLoading: false,
  },
  mutations: {
    SIDEBARTOGGLE(state, status) {
      state.openSidebar = status;
    },
    SKELETONACTIVE(state, status) {
      state.skeletonActive = status;
    },
    LOADING(state, status) {
      state.isLoading = status;
    },
  },
  modules: {
    admin,
    alert,
    users,
    modal,
    image,
    mail,
  },
});
