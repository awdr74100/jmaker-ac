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
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/users`;
      const root = { root: true };
      commit('SKELETONACTIVE', true, root);
      try {
        const { data } = await axios.get(url);
        if (!data.success) {
          dispatch('alert/updateMessage', { message: data.message, status: 'danger' }, root);
          return;
        }
        commit('GETUSERS', data.users);
        commit('SKELETONACTIVE', false, root);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
    async getUser({ commit, dispatch }, { userid }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/users/${userid}`;
      const root = { root: true };
      commit('LOADING', true, root);
      try {
        const { data } = await axios.get(url);
        if (!data.success) {
          commit('LOADING', false, root);
          dispatch('alert/updateMessage', { message: data.message, status: 'danger' }, root);
          return;
        }
        commit('LOADING', false, root);
        commit('GETUSER', data.user);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
    async registerUser({ dispatch }, { id, username, userid }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/users/${id}`;
      const payload = { username, userid };
      const root = { root: true };
      try {
        const { data } = await axios.patch(url, payload);
        if (!data.success) {
          dispatch('alert/updateMessage', { message: data.message, status: 'danger' }, root);
          return;
        }
        dispatch('getUsers');
        dispatch('alert/updateMessage', { message: data.message, status: 'success' }, root);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
    async deleteUser({ dispatch }, { id }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/users/${id}`;
      const root = { root: true };
      try {
        const { data } = await axios.delete(url);
        if (!data.success) {
          dispatch('alert/updateMessage', { message: data.message, status: 'danger' }, root);
          return;
        }
        dispatch('getUsers');
        dispatch('alert/updateMessage', { message: data.message, status: 'success' }, root);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
    async adjustAuth({ dispatch }, { id, auth }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/users/${id}/auth`;
      const payload = { auth };
      const root = { root: true };
      try {
        const { data } = await axios.patch(url, payload);
        if (!data.success) {
          dispatch('alert/updateMessage', { message: data.message, status: 'danger' }, root);
          return;
        }
        dispatch('getUsers');
        dispatch('alert/updateMessage', { message: data.message, status: 'success' }, root);
      } catch (error) {
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
