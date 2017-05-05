import Level from '../../components/shop/right/Level.vue'

export const shopChildRouter = [
  {path: '', redirect: 'level'},
  {path: 'level', component: Level},
];
