import axios from 'axios';

export default {
  strict: true,
  namespaced: true,
  state: {
    users: [],
    user: {},
  },
  actions: {
    async getUsers({ commit, dispatch, rootState }) {
      if (!rootState.refresh) return;
      const url = `${process.env.VUE_APP_BASE_URL}/users`;
      const options = { root: true };
      commit('REFRESH', false, options);
      commit('SKELETONACTIVE', true, options);
      try {
        const res = await axios.get(url);
        if (!res.data.success) {
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        commit('GETUSERS', res.data.users);
        commit('SKELETONACTIVE', false, options);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async getUser({ commit, dispatch }, { userid }) {
      const url = `${process.env.VUE_APP_BASE_URL}/users/${userid}`;
      const options = { root: true };
      commit('LOADING', true, options);
      try {
        const res = await axios.get(url);
        if (!res.data.success) {
          commit('LOADING', false, options);
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        commit('GETUSER', res.data.user);
        commit('LOADING', false, options);
      } catch (error) {
        commit('LOADING', false, options);
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async registerUser({ commit, dispatch }, { id, username, userid }) {
      const url = `${process.env.VUE_APP_BASE_URL}/users/${id}`;
      const data = {
        username,
        userid,
      };
      const options = { root: true };
      try {
        const res = await axios.patch(url, data);
        if (!res.data.success) {
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        commit('REFRESH', true, options);
        dispatch('getUsers');
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, options);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async deleteUser({ commit, dispatch }, { id }) {
      const url = `${process.env.VUE_APP_BASE_URL}/users/${id}`;
      const options = { root: true };
      try {
        const res = await axios.delete(url);
        if (!res.data.success) {
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        commit('REFRESH', true, options);
        dispatch('getUsers');
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, options);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async adjustAuth({ commit, dispatch }, { id, auth }) {
      const url = `${process.env.VUE_APP_BASE_URL}/users/${id}/auth`;
      const data = {
        auth,
      };
      const options = { root: true };
      try {
        const res = await axios.patch(url, data);
        if (!res.data.success) {
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        commit('REFRESH', true, options);
        dispatch('getUsers');
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, options);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
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
