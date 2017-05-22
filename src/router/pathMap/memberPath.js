/**
 * Created by alvin on 17-5-13.
 */
import { getDefaultPath } from '../../common/js/util'
let defaultPath = getDefaultPath(3, window.localStorage.getItem('powers'));
import Address from '../../components/member/right/Address.vue'
import Manage from '../../components/member/right/Manage.vue'
import MembershipLevel from '../../components/member/right/MembershipLevel.vue'

export let memberChildRouter = [
  {path: '', redirect: defaultPath},
  {path: 'address', component: Address, meta: {requirePower: true}},
  {path: 'manage', component: Manage, meta: {requirePower: true}},
  {path: 'membershiplevel', component: MembershipLevel, meta: {requirePower: true}},
];
