import axios from 'axios';
import router from '@/router';

export default {
  strict: true,
  namespaced: true,
  state: {
    isSignin: false,
  },
  actions: {
    async signin({ dispatch, commit }, { email, password }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/signin`;
      const payload = { email, password };
      const root = { root: true };
      commit('LOADING', true, root);
      try {
        const { data } = await axios.post(url, payload);
        if (!data.success) {
          commit('LOADING', false, root);
          dispatch('alert/updateMessage', { message: data.message, status: 'danger' }, root);
          return;
        }
        localStorage.setItem('account', JSON.stringify(data.admin));
        commit('LOADING', false, root);
        commit('ISSIGNIN', true);
        router.push({ path: '/admin/register' });
        dispatch('alert/updateMessage', { message: '登入成功', status: 'success' }, root);
      } catch (error) {
        commit('LOADING', false, root);
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
    async signout({ dispatch, commit }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/signout`;
      const root = { root: true };
      try {
        const { data } = await axios.post(url);
        localStorage.removeItem('account');
        commit('ISSIGNIN', false);
        router.push({ path: '/' });
        dispatch('alert/updateMessage', { message: data.message, status: 'success' }, root);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
    async check({ dispatch, commit }, { from }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/check`;
      const root = { root: true };
      this._vm.$Progress.start();
      try {
        const { data } = await axios.post(url);
        if (!data.success) {
          localStorage.removeItem('account');
          commit('ISSIGNIN', false);
          if (from.path === '/') {
            dispatch('alert/updateMessage', { message: '請先登入', status: 'danger' }, root);
          } else {
            dispatch('alert/updateMessage', { message: '請重新登入', status: 'danger' }, root);
          }
          return;
        }
        this._vm.$Progress.finish();
        commit('ISSIGNIN', true);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
  },
  mutations: {
    ISSIGNIN(state, status) {
      state.isSignin = status;
    },
  },
};
