import { createRouter, createWebHashHistory } from 'vue-router';
import UserLayout from '@/views/user/LayoutView.vue';
import HomeView from '@/views/user/HomeView.vue';
import UserProductsView from '@/views/user/ProductsView.vue';
import UserProductItemView from '@/views/user/ProductItemView.vue';
import UserCartLayout from '@/views/user/CartLayout.vue';
import UserCartView from '@/views/user/CartList.vue';
import UserOrderContactView from '@/views/user/OrderContact.vue';
import UserOrderCompleteView from '@/views/user/OrderComplete.vue';

import AdminLayout from '@/views/admin/LayoutView.vue';
import AdminLoginView from '@/views/admin/LoginView.vue';
import AdminProductsView from '@/views/admin/ProductsView.vue';
import AdminCouponsView from '@/views/admin/CouponsView.vue';
import AdminOrdersView from '@/views/admin/OrdersView.vue';

const webName = '果時';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: UserLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: HomeView,
          meta: {
            title: `${webName} - 享受無盡的果汁時光`,
          },
        },
        {
          path: 'products',
          name: 'products',
          component: UserProductsView,
          meta: {
            title: `${webName} - 查看菜單`,
          },
        },
        {
          path: 'products/:id',
          component: UserProductsView,
          meta: {
            title: `${webName} - 查看菜單`,
          },
        },
        {
          path: 'product/:id',
          component: UserProductItemView,
          meta: {
            title: `${webName} - 產品細節`,
          },
        },
        {
          path: 'user/cart',
          component: UserCartLayout,
          meta: {
            title: `${webName} - 結帳`,
          },
          children: [
            {
              path: '',
              name: 'cart',
              component: UserCartView,
            },
            {
              path: 'contact',
              name: 'orderContact',
              component: UserOrderContactView,
            },
            {
              path: 'complete/:id',
              name: 'orderComplete',
              component: UserOrderCompleteView,
            },
          ],
        },
      ],
    },
    {
      path: '/admin',
      component: AdminLayout,
      redirect: {
        name: 'adminLogin',
      },
      children: [
        {
          path: 'login',
          name: 'adminLogin',
          component: AdminLoginView,
          meta: {
            title: `${webName} - 後台登入`,
          },
        },
        {
          path: 'products',
          name: 'adminProducts',
          component: AdminProductsView,
          meta: {
            title: `${webName}/後台 - 產品管理`,
          },
        },
        {
          path: 'coupons',
          name: 'adminCoupons',
          component: AdminCouponsView,
          meta: {
            title: `${webName}/後台 - 優惠卷管理`,
          },
        },
        {
          path: 'orders',
          name: 'adminOrders',
          component: AdminOrdersView,
          meta: {
            title: `${webName}/後台 - 訂單管理`,
          },
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
