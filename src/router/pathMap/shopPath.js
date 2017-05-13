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
  {path: '', redirect: 'level'},
  {path: 'level', component: Level},
  {path: 'cate', component: Cate},
  {path: 'template', component: Template},
  {path: 'manage', component: Manage},
  {path: 'mtemplate', component: Mtemplate},
  {path: 'newsrecommendation', component: NewsRecommendation},
  {path: 'distribution', component: Distribution},
  {path: 'goodsaddress', component: GoodsAddress},
  {path: 'normal', component: Normal},
  {path: 'closed', component: Closed},
  {path: 'activereservation', component: ActiveReservation},
  {path: 'apply', component: Apply},
  {path: 'verify', component: Verify},
  {path: 'storenews', component: StoreNews},
];
