/**
 * Created by alvin on 17-4-26.
 */
import { getDefaultPath } from '../../common/js/util'
let defaultPath = getDefaultPath(1, window.localStorage.getItem('subPowers'));
import AddUserGroup from '../../components/settings/right/AddUserGroup.vue'
import EditUserGroup from '../../components/settings/right/EditUserGroup.vue'
import DoEdit from '../../components/settings/right/DoEdit.vue'
import AddUser from '../../components/settings/right/AddUser.vue'
import UserList from '../../components/settings/right/UserList.vue'
import EditUser from '../../components/settings/right/EditUser.vue'
import Logs from '../../components/settings/right/Logs.vue'
import HotKeywords from '../../components/settings/right/HotKeywords.vue'
import Content from '../../components/settings/right/Content.vue'
export const settingsChildRouter = [
  {path: '', redirect: defaultPath},
  {path: 'addusergroup', component: AddUserGroup},
  {path: 'editusergroup', component: EditUserGroup},
  {path: 'editusergroup/:id', component: DoEdit},
  {path: 'adduser', component: AddUser},
  {path: 'userlist', component: UserList},
  {path: 'userlist/:id', component: EditUser},
  {path: 'logs', component: Logs},
  {path: 'hotkeywords', component: HotKeywords},
  {path: 'content', component: Content},
];
