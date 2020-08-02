import axios from 'axios';

export default {
  strict: true,
  namespaced: true,
  state: {
    users: [],
    user: {},
  },
  actions: {
    async getUsers({ commit, dispatch }) {
      const url = `${process.env.VUE_APP_BASE_URL}/users`;
      const root = { root: true };
      commit('SKELETONACTIVE', true, root);
      try {
        const res = await axios.get(url);
        if (!res.data.success) {
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, root);
          return;
        }
        commit('GETUSERS', res.data.users);
        commit('SKELETONACTIVE', false, root);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
    async getUser({ commit, dispatch }, { userid }) {
      const url = `${process.env.VUE_APP_BASE_URL}/users/${userid}`;
      const root = { root: true };
      commit('LOADING', true, root);
      try {
        const res = await axios.get(url);
        if (!res.data.success) {
          commit('LOADING', false, root);
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, root);
          return;
        }
        commit('LOADING', false, root);
        commit('GETUSER', res.data.user);
      } catch (error) {
        commit('LOADING', false, root);
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
    async registerUser({ commit, dispatch }, { id, username, userid }) {
      const url = `${process.env.VUE_APP_BASE_URL}/users/${id}`;
      const data = {
        username,
        userid,
      };
      const root = { root: true };
      commit('LOADING', true, root);
      try {
        const res = await axios.patch(url, data);
        if (!res.data.success) {
          commit('LOADING', false, root);
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, root);
          return;
        }
        commit('LOADING', false, root);
        dispatch('getUsers');
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, root);
      } catch (error) {
        commit('LOADING', false, root);
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
    async deleteUser({ commit, dispatch }, { id }) {
      const url = `${process.env.VUE_APP_BASE_URL}/users/${id}`;
      const root = { root: true };
      commit('LOADING', true, root);
      try {
        const res = await axios.delete(url);
        if (!res.data.success) {
          commit('LOADING', false, root);
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, root);
          return;
        }
        commit('LOADING', false, root);
        dispatch('getUsers');
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, root);
      } catch (error) {
        commit('LOADING', false, root);
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
    async adjustAuth({ commit, dispatch }, { id, auth }) {
      const url = `${process.env.VUE_APP_BASE_URL}/users/${id}/auth`;
      const data = {
        auth,
      };
      const root = { root: true };
      commit('LOADING', true, root);
      try {
        const res = await axios.patch(url, data);
        if (!res.data.success) {
          commit('LOADING', false, root);
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, root);
          return;
        }
        commit('LOADING', false, root);
        dispatch('getUsers');
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, root);
      } catch (error) {
        commit('LOADING', false, root);
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
  },
  mutations: {
    GETUSERS(state, users) {
      state.users = users;
    },
    GETUSER(state, user) {
      state.user = user;
    },
  },
};
