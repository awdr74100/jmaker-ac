import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

const vm = Vue.prototype;

export default {
  strict: true,
  namespaced: true,
  state: {
    isSignin: false,
  },
  actions: {
    async signin({ dispatch, commit }, { email, password }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/signin`;
      const data = {
        email,
        password,
      };
      const options = { root: true };
      commit('LOADING', true, options);
      try {
        const res = await axios.post(url, data);
        if (!res.data.success) {
          commit('LOADING', false, options);
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        localStorage.setItem('account', JSON.stringify(res.data.admin));
        commit('LOADING', false, options);
        commit('ISSIGNIN', true);
        router.push({ path: '/admin/register' });
        dispatch('alert/updateMessage', { message: '登入成功', status: 'success' }, options);
      } catch (error) {
        commit('LOADING', false, options);
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async signout({ dispatch, commit }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/signout`;
      const options = { root: true };
      try {
        const res = await axios.post(url);
        localStorage.removeItem('account');
        commit('ISSIGNIN', false);
        router.push({ path: '/' });
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, options);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async check({ dispatch, commit }, { from }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/check`;
      const options = { root: true };
      vm.$Progress.start();
      try {
        const res = await axios.post(url);
        if (!res.data.success) {
          localStorage.removeItem('account');
          commit('ISSIGNIN', false);
          if (from.path === '/') {
            dispatch('alert/updateMessage', { message: '請先登入', status: 'danger' }, options);
          } else {
            dispatch('alert/updateMessage', { message: '請重新登入', status: 'danger' }, options);
          }
          return;
        }
        vm.$Progress.finish();
        commit('ISSIGNIN', true);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
  },
  mutations: {
    ISSIGNIN(state, status) {
      state.isSignin = status;
    },
  },
};
