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
    component: () => import(/* webpackChunkName: "admin" */ '@/views/Dashboard/Layout.vue'),
    children: [
      {
        path: '',
        name: 'RegisterUser',
        component: () => import(/* webpackChunkName: "registeruser" */ '@/components/Dashboard/RegisterUser.vue'),
      },
      {
        path: 'adjust',
        name: 'AdjustUser',
        component: () => import(/* webpackChunkName: "adjustuser" */ '@/components/Dashboard/AdjustUser.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
