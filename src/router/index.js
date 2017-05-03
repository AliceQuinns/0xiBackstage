import Vue from 'vue'
import VueRouter from 'vue-router'
import * as childrenPath from '../components/pathMap/index'
import Index from '@/components/index/Index'
import Settings from '@/components/settings/Settings'
import Product from '@/components/product/Product'

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/index'},
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
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router
