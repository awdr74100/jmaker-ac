import Vue from 'vue';

const vm = Vue.prototype;

export default {
  strict: true,
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    OPENMODAL(state, { modal, user = {} }) {
      vm.$modal.show(modal);
      state.user = user;
    },
    CLOSEMODAL(state, modal) {
      vm.$modal.hide(modal);
      state.user = {};
    },
  },
};
