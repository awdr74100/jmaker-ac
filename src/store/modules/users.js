import axios from 'axios';
// import Vue from 'vue';

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
      const options = { root: true };
      try {
        const res = await axios.get(url);
        if (!res.data.success) {
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        commit('GETUSERS', res.data.users);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async getUser({ commit, dispatch }, userid) {
      const url = `${process.env.VUE_APP_BASE_URL}/users/${userid}`;
      const options = { root: true };
      try {
        const res = await axios.get(url);
        if (!res.data.success) {
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        commit('GETUSER', res.data.user);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async deleteUser({ dispatch }, id) {
      const url = `${process.env.VUE_APP_BASE_URL}/users/${id}`;
      const options = { root: true };
      try {
        const res = await axios.delete(url);
        if (!res.data.success) {
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        dispatch('getUsers');
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, options);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async registerUser({ dispatch }, { id, username, userid }) {
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
        dispatch('getUsers');
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, options);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async adjustAuth({ dispatch }, { id, auth }) {
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
