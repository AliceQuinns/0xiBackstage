/**
 * Created by alvin on 17-5-13.
 */
import ProductList from '../../components/product/right/ProductList.vue'
import ProductEvaluation from '../../components/product/right/ProductEvaluation.vue'

export let productChildRouter = [
  {path: '', redirect: 'productlist'},
  {path: 'productlist', component: ProductList},
  {path: 'productevaluation', component: ProductEvaluation},
];
