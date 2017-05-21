/**
 * Created by alvin on 17-5-13.
 */
import { getDefaultPath } from '../../common/js/util'
let defaultPath = getDefaultPath(2, window.localStorage.getItem('subPowers'));
import ProductList from '../../components/product/right/ProductList.vue'
import ProductEvaluation from '../../components/product/right/ProductEvaluation.vue'
import Consultation from '../../components/product/right/Consultation.vue'
import CateManage from '../../components/product/right/CateManage.vue'

export let productChildRouter = [
  {path: '', redirect: defaultPath},
  {path: 'productlist', component: ProductList, meta: {requirePower: true}},
  {path: 'productevaluation', component: ProductEvaluation, meta: {requirePower: true}},
  {path: 'consultation', component: Consultation, meta: {requirePower: true}},
  {path: 'catemanage', component: CateManage, meta: {requirePower: true}},
];
