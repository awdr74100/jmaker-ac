import axios from 'axios';
import router from '@/router';

const actions = {
  async login(context, admin) {
    const url = `${process.env.VUE_APP_APIURL}/admin/login`;
    const data = { email: admin.email, password: admin.password };
    try {
      const res = await axios.post(url, data);
      if (!res.data.success) return console.log(res.data);
      return router.push('admin');
    } catch (error) {
      return console.log(error);
    }
  },
};

export default {
  strict: true,
  namespaced: true,
  actions,
};
