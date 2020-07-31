import axios from 'axios';

export default {
  strict: true,
  namespaced: true,
  actions: {
    async mailSend({ dispatch }, payload) {
      const url = `${process.env.VUE_APP_BASE_URL}/mail`;
      const data = {
        nickname: payload.nickname,
        email: payload.email,
        subject: payload.subject,
        imgUrl: payload.imgUrl,
        content: payload.content,
      };
      const options = { root: true };
      try {
        const res = await axios.post(url, data);
        if (!res.data.success) {
          dispatch('alert/updateMessage', { message: res.data.message, status: 'danger' }, options);
          return;
        }
        dispatch('alert/updateMessage', { message: res.data.message, status: 'success' }, options);
      } catch (error) {
        dispatch('alert/updateMessage', { message: error.message, status: 'danger' }, options);
      }
    },
  },
};
