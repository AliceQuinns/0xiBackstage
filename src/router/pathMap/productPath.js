/**
 * Created by alvin on 17-5-13.
 */
import ProductList from '../../components/product/right/ProductList.vue'
import ProductEvaluation from '../../components/product/right/ProductEvaluation.vue'
import CateManage from '../../components/product/right/CateManage.vue'

export let productChildRouter = [
  {path: '', redirect: 'productlist'},
  {path: 'productlist', component: ProductList},
  {path: 'productevaluation', component: ProductEvaluation},
  {path: 'catemanage', component: CateManage},
];
