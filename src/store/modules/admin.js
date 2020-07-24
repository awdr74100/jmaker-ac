import axios from 'axios';
import router from '@/router';
import Vue from 'vue';

export default {
  strict: true,
  namespaced: true,
  state: {
    isLogin: false,
  },
  actions: {
    async login({ dispatch }, admin) {
      const url = `${process.env.VUE_APP_APIURL}/admin/login`;
      const data = { email: admin.email, password: admin.password };
      const options = { root: true };
      Vue.prototype.$Progress.start();
      try {
        const res = await axios.post(url, data);
        if (!res.data.success) {
          Vue.prototype.$Progress.fail();
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        localStorage.setItem('admin', JSON.stringify(res.data.admin));
        router.push({ path: '/admin' });
        Vue.prototype.$Progress.finish();
        dispatch('alert/updateMessage', { message: '登入成功', status: 'success' }, options);
      } catch (error) {
        Vue.prototype.$Progress.fail();
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async logout({ dispatch, commit }) {
      const url = `${process.env.VUE_APP_APIURL}/admin/logout`;
      const options = { root: true };
      Vue.prototype.$Progress.start();
      try {
        const res = await axios.post(url);
        localStorage.removeItem('admin');
        router.push({ path: '/' });
        Vue.prototype.$Progress.finish();
        commit('LOGINTOGGLE', false);
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, options);
      } catch (error) {
        Vue.prototype.$Progress.fail();
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async check({ dispatch, commit }) {
      const url = `${process.env.VUE_APP_APIURL}/admin/check`;
      const options = { root: true };
      try {
        const res = await axios.post(url);
        if (!res.data.success) {
          localStorage.removeItem('admin');
          commit('LOGINTOGGLE', res.data.success);
          dispatch('alert/updateMessage', { message: '請重新登入', status: 'danger' }, options);
          return;
        }
        commit('LOGINTOGGLE', res.data.success);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
  },
  mutations: {
    LOGINTOGGLE(state, status) {
      state.isLogin = status;
    },
  },
};
