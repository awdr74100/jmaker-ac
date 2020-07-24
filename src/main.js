import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueProgressBar from 'vue-progressbar';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import datetime from './filter/datetime';

const VueProgressOptions = {
  color: '#47ae74',
  thickness: '3px',
};

Vue.use(VueAxios, axios);
Vue.use(VueProgressBar, VueProgressOptions);

Vue.filter('datetime', datetime);

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

router.beforeEach(async (to, form, next) => {
  if (to.meta.requiresAuth) {
    await store.dispatch('admin/check');
    if (!store.state.admin.isLogin) return next('/');
    next();
  }
  return next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
