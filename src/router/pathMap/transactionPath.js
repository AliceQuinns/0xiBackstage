/**
 * Created by alvin on 17-6-10.
 */
import { getDefaultPath } from '../../common/js/util'
let defaultPath = getDefaultPath(5, window.localStorage.getItem('powers'));
import Order from '../../components/transaction/right/Order.vue'

export const transactionChildRouter = [
  {path: '', redirect: defaultPath},
  {path: 'order', component: Order, meta: {requirePower: true}},
];
