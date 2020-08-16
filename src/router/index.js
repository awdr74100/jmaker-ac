import Vue from 'vue';
import VueRouter from 'vue-router';
import Signin from '@/views/Signin/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/admin',
    redirect: '/admin/register',
    component: () => import('@/views/Dashboard/index.vue'),
    children: [
      {
        path: 'register',
        name: 'Register',
        meta: { requiresAuth: true },
        component: () => import('@/views/Dashboard/Register.vue'),
      },
      {
        path: 'adjust',
        name: 'Adjust',
        meta: { requiresAuth: true },
        component: () => import('@/views/Dashboard/Adjust.vue'),
      },
      {
        path: 'send',
        name: 'Send',
        meta: { requiresAuth: true },
        component: () => import('@/views/Dashboard/Send.vue'),
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
    await router.app.$options.store.dispatch('admin/check', { from });
    if (router.app.$options.store.state.admin.isSignin) next();
    else next('/');
  } else {
    next();
  }
});

export default router;
