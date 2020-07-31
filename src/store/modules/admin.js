import axios from 'axios';
import router from '@/router';

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
      try {
        const res = await axios.post(url, data);
        if (!res.data.success) {
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        localStorage.setItem('account', JSON.stringify(res.data.admin));
        commit('ISLOGIN', true);
        router.push({ path: '/admin' });
        dispatch('alert/updateMessage', { message: '登入成功', status: 'success' }, options);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
    async logout({ dispatch, commit }) {
      const url = `${process.env.VUE_APP_BASE_URL}/admin/logout`;
      const options = { root: true };
      try {
        const res = await axios.post(url);
        localStorage.removeItem('account');
        commit('ISLOGIN', false);
        router.push({ path: '/' });
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, options);
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
          commit('ISLOGIN', false);
          dispatch('alert/updateMessage', { message: '請重新登入', status: 'danger' }, options);
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
