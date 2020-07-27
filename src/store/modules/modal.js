import Vue from 'vue';

const vm = Vue.prototype;

export default {
  strict: true,
  namespaced: true,
  state: {
    id: '',
  },
  actions: {
    openModal({ commit }, { modal, id }) {
      vm.$modal.show(modal);
      commit('OPENMODAL', id);
    },
    closeModal({ commit }, modal) {
      vm.$modal.hide(modal);
      commit('CLOSEMODAL');
    },
  },
  mutations: {
    OPENMODAL(state, id) {
      state.id = id;
    },
    CLOSEMODAL(state) {
      state.id = '';
    },
  },
};
