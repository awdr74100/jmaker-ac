import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login/Layout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    component: () => import('@/views/Dashboard/Layout.vue'),
    children: [
      {
        path: '',
        name: 'RegisterUser',
        meta: { requiresAuth: true },
        component: () => import('@/components/Dashboard/RegisterUser.vue'),
      },
      {
        path: 'adjust',
        name: 'AdjustUser',
        meta: { requiresAuth: true },
        component: () => import('@/components/Dashboard/AdjustUser.vue'),
      },
      {
        path: 'mail',
        name: 'MailSend',
        meta: { requiresAuth: true },
        component: () => import('@/components/Dashboard/MailSend.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    await router.app.$options.store.dispatch('admin/check');
    if (router.app.$options.store.state.admin.isLogin) next();
    else next('/');
  } else {
    next();
  }
});

export default router;
