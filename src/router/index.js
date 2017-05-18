import Vue from 'vue'
import VueRouter from 'vue-router'
import * as childrenPath from './pathMap/index'
import Index from '@/components/index/Index'
import Settings from '@/components/settings/Settings'
import Product from '@/components/product/Product'
import Shop from '@/components/shop/Shop'
import Member from '@/components/member/Member'
import NotFound from '@/components/404/404'

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/index'},
  { path: '/404', component: NotFound },
  {
    path: '/index',
    component: Index,
    children: childrenPath.indexChildRouter
  },
  {
    path: '/settings',
    component: Settings,
    children: childrenPath.settingsChildRouter,
  },
  {
    path: '/product',
    component: Product,
    children: childrenPath.productChildRouter,
  },
  {
    path: '/member',
    component: Member,
    children: childrenPath.memberChildRouter,
  },
  {
    path: '/shop',
    component: Shop,
    children: childrenPath.shopChildRouter,
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requirePower)) {
    // TODO 判断是否有权限
    console.log(to);
    next();
    /*if (!auth.loggedIn()) {
      next({
        path: '/404',
      })
    } else {
      next()
    }*/
  } else {
    next() // 确保一定要调用 next()
  }
});

export default router
