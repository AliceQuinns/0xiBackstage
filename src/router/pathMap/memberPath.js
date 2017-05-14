/**
 * Created by alvin on 17-5-13.
 */
import Address from '../../components/member/right/Address.vue'
import Manage from '../../components/member/right/Manage.vue'
import MembershipLevel from '../../components/member/right/MembershipLevel.vue'

export let memberChildRouter = [
  {path: '', redirect: 'address'},
  {path: 'address', component: Address},
  {path: 'manage', component: Manage},
  {path: 'membershiplevel', component: MembershipLevel},
];
