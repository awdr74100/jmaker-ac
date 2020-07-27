import Vue from 'vue';

const vm = Vue.prototype;

export default {
  strict: true,
  namespaced: true,
  state: {
    user: {},
  },
  actions: {
    openModal({ commit }, { modal, user }) {
      vm.$modal.show(modal);
      commit('OPENMODAL', user);
    },
    closeModal({ commit }, modal) {
      vm.$modal.hide(modal);
      commit('CLOSEMODAL');
    },
  },
  mutations: {
    OPENMODAL(state, user) {
      state.user = user;
    },
    CLOSEMODAL(state) {
      state.user = {};
    },
  },
};
