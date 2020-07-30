import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueProgressBar from 'vue-progressbar';
import VModal from 'vue-js-modal';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import datetime from './filter/datetime';
import './validation';

const VueProgressOptions = {
  color: '#ffffff',
  thickness: '3px',
};

Vue.use(VueAxios, axios);
Vue.use(VueProgressBar, VueProgressOptions);
Vue.use(VModal);

Vue.filter('datetime', datetime);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

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
