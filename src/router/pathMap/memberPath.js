/**
 * Created by alvin on 17-5-13.
 */
import Address from '../../components/member/right/Address.vue'

export let memberChildRouter = [
  {path: '', redirect: 'address'},
  {path: 'address', component: Address},
];
