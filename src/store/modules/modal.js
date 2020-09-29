export default {
  strict: true,
  namespaced: true,
  state: {
    user: {},
  },
  mutations: {
    OPENMODAL(state, { modal, user = {} }) {
      this._vm.$modal.show(modal);
      state.user = user;
    },
    CLOSEMODAL(state, { modal }) {
      this._vm.$modal.hide(modal);
      state.user = {};
    },
  },
};
