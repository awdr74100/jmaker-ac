import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VModal from 'vue-js-modal';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { Skeleton } from 'vue-loading-skeleton';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import datetime from './filter/datetime';
import './validation';

Vue.use(VueAxios, axios);
Vue.use(VModal);

Vue.filter('datetime', datetime);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('Loading', Loading);
Vue.component('Skeleton', Skeleton);

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
