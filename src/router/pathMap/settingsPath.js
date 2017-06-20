/**
 * Created by alvin on 17-4-26.
 */
import { getDefaultPath } from '../../common/js/util'
let defaultPath = getDefaultPath(1, window.localStorage.getItem('powers'));

import AddUserGroup from '../../components/settings/right/AddUserGroup.vue'
import EditUserGroup from '../../components/settings/right/EditUserGroup.vue'
import DoEdit from '../../components/settings/right/DoEdit.vue'
import AddUser from '../../components/settings/right/AddUser.vue'
import UserList from '../../components/settings/right/UserList.vue'
import EditUser from '../../components/settings/right/EditUser.vue'
import Logs from '../../components/settings/right/Logs.vue'
import HotKeywords from '../../components/settings/right/HotKeywords.vue'
import Content from '../../components/settings/right/Content.vue'
import EditSubWeb from '../../components/settings/right/EditSubWeb.vue'
import ChangePwd from '../../components/settings/right/ChangePwd.vue'

export const settingsChildRouter = [
  {path: '', redirect: defaultPath},
  {path: 'addusergroup', component: AddUserGroup, meta: {requirePower: true}},
  {path: 'editusergroup', component: EditUserGroup, meta: {requirePower: true}},
  {path: 'editusergroup/:id', component: DoEdit, meta: {requirePower: true}},
  {path: 'adduser', component: AddUser, meta: {requirePower: true}},
  {path: 'userlist', component: UserList, meta: {requirePower: true}},
  {path: 'userlist/:id', component: EditUser, meta: {requirePower: true}},
  {path: 'hotkeywords', component: HotKeywords, meta: {requirePower: true}},
  {path: 'content', component: Content, meta: {requirePower: true}},
  {path: 'editsubweb', component: EditSubWeb, meta: {requirePower: true}},
  {path: 'changepwd', component: ChangePwd, meta: {requirePower: true}},
];
