import Vue from 'vue';
import axios from 'axios';
import router from '@/router';

const vm = Vue.prototype;

export default {
  strict: true,
  namespaced: true,
  state: {
    isLogin: false,
  },
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      const url = `${process.env.VUE_APP_BASE_URL}/admin/login`;
      const data = {
        email,
        password,
      };
      const options = { root: true };
      vm.$Progress.start();
      try {
        const res = await axios.post(url, data);
        if (!res.data.success) {
          vm.$Progress.fail();
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        vm.$Progress.finish();
        localStorage.setItem('account', JSON.stringify(res.data.admin));
        dispatch('alert/updateMessage', { message: '登入成功', status: 'success' }, options);
        commit('ISLOGIN', true);
        router.push({ path: '/admin' });
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async logout({ dispatch, commit }) {
      const url = `${process.env.VUE_APP_BASE_URL}/admin/logout`;
      const options = { root: true };
      vm.$Progress.start();
      try {
        const res = await axios.post(url);
        vm.$Progress.finish();
        localStorage.removeItem('account');
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, options);
        commit('ISLOGIN', false);
        router.push({ path: '/' });
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async check({ dispatch, commit }) {
      const url = `${process.env.VUE_APP_BASE_URL}/admin/check`;
      const options = { root: true };
      try {
        const res = await axios.post(url);
        if (!res.data.success) {
          localStorage.removeItem('account');
          dispatch('alert/updateMessage', { message: '請重新登入', status: 'danger' }, options);
          commit('ISLOGIN', false);
          return;
        }
        commit('ISLOGIN', true);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
  },
  mutations: {
    ISLOGIN(state, status) {
      state.isLogin = status;
    },
  },
};
