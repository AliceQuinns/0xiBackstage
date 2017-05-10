import Level from '../../components/shop/right/Level.vue'
import Cate from '../../components/shop/right/Cate.vue'
import Template from '../../components/shop/right/Template.vue'
import Mtemplate from '../../components/shop/right/Mtemplate.vue'

export const shopChildRouter = [
  {path: '', redirect: 'level'},
  {path: 'level', component: Level},
  {path: 'cate', component: Cate},
  {path: 'template', component: Template},
  {path: 'mtemplate', component: Mtemplate},
];
