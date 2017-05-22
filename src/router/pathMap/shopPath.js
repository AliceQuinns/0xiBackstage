import { getDefaultPath } from '../../common/js/util'
let defaultPath = getDefaultPath(4, window.localStorage.getItem('powers'));
import Level from '../../components/shop/right/Level.vue'
import Cate from '../../components/shop/right/Cate.vue'
import Template from '../../components/shop/right/Template.vue'
import Mtemplate from '../../components/shop/right/Mtemplate.vue'
import Manage from '../../components/shop/right/Manage.vue'
import NewsRecommendation from '../../components/shop/right/NewsRecommendation.vue'
import Distribution from '../../components/shop/right/Distribution.vue'
import GoodsAddress from '../../components/shop/right/GoodsAddress.vue'
import Normal from '../../components/shop/right/Normal.vue'
import Closed from '../../components/shop/right/Closed.vue'
import ActiveReservation from '../../components/shop/right/ActiveReservation.vue'
import Apply from '../../components/shop/right/Apply.vue'
import Verify from '../../components/shop/right/Verify.vue'
import StoreNews from '../../components/shop/right/StoreNews.vue'

export const shopChildRouter = [
  {path: '', redirect: defaultPath},
  {path: 'level', component: Level, meta: {requirePower: true}},
  {path: 'cate', component: Cate, meta: {requirePower: true}},
  {path: 'template', component: Template, meta: {requirePower: true}},
  {path: 'manage', component: Manage, meta: {requirePower: true}},
  {path: 'mtemplate', component: Mtemplate, meta: {requirePower: true}},
  {path: 'newsrecommendation', component: NewsRecommendation, meta: {requirePower: true}},
  {path: 'distribution', component: Distribution, meta: {requirePower: true}},
  {path: 'goodsaddress', component: GoodsAddress, meta: {requirePower: true}},
  {path: 'normal', component: Normal, meta: {requirePower: true}},
  {path: 'closed', component: Closed, meta: {requirePower: true}},
  {path: 'activereservation', component: ActiveReservation, meta: {requirePower: true}},
  {path: 'apply', component: Apply, meta: {requirePower: true}},
  {path: 'verify', component: Verify, meta: {requirePower: true}},
  {path: 'storenews', component: StoreNews, meta: {requirePower: true}},
];
