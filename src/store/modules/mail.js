import axios from 'axios';

export default {
  strict: true,
  namespaced: true,
  actions: {
    async mailSend({ commit, dispatch }, { mailData }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/admin/mail`;
      const payload = {
        nickname: mailData.nickname,
        email: mailData.email,
        subject: mailData.subject,
        imgUrl: mailData.imgUrl,
        content: mailData.content,
      };
      const root = { root: true };
      try {
        const { data } = await axios.post(url, payload);
        if (!data.success) {
          dispatch('alert/updateMessage', { message: data.message, status: 'danger' }, root);
          commit('LOADING', false, root);
          return;
        }
        commit('LOADING', false, root);
        dispatch('alert/updateMessage', { message: data.message, status: 'success' }, root);
      } catch (error) {
        commit('LOADING', false, root);
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, root);
      }
    },
  },
};
