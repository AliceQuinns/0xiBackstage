/**
 * Created by alvin on 17-4-26.
 */
import AddUserGroup from '../settings/right/AddUserGroup.vue'
import EditUserGroup from '../settings/right/EditUserGroup.vue'
import AddUser from '../settings/right/AddUser.vue'
export const settingsChildRouter = [
  {path: '', redirect: 'addusergroup'},
  {path: 'addusergroup', component: AddUserGroup},
  {path: 'editusergroup', component: EditUserGroup},
  {path: 'editusergroup/:id', component: AddUserGroup},
  {path: 'adduser', component: AddUser},
];
