/**
 * Created by alvin on 17-5-13.
 */
import ProductList from '../../components/product/right/ProductList.vue'
import ProductEvaluation from '../../components/product/right/ProductEvaluation.vue'
import Consultation from '../../components/product/right/Consultation.vue'
import CateManage from '../../components/product/right/CateManage.vue'
import Brand from '../../components/product/right/Brand.vue'

export let productChildRouter = [
  {path: '', redirect: 'productlist'},
  {path: 'productlist', component: ProductList},
  {path: 'productevaluation', component: ProductEvaluation},
  {path: 'consultation', component: Consultation},
  {path: 'catemanage', component: CateManage},
  {path: 'brand', component: Brand},
];
