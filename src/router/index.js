import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/user/HomeView.vue';
import LayoutView from '../views/dashboard/LayoutView.vue';
import LoginView from '../views/dashboard/LoginView.vue';
import ProductListView from '../views/dashboard/ProductListView.vue';

const webName = 'Vegetable Shop';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboardLayout',
      component: LayoutView,
      redirect: {
        name: 'login',
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginView,
          meta: {
            title: `${webName} - 後台登入`,
          },
        },
        {
          path: 'productList',
          name: 'productList',
          component: ProductListView,
        },
      ],
    },
  ],
  linkActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
