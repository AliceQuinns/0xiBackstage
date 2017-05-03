/**
 * Created by alvin on 17-4-26.
 */
import AddUserGroup from '../settings/right/AddUserGroup.vue'
import EditUserGroup from '../settings/right/EditUserGroup.vue'
import DoEdit from '../settings/right/DoEdit.vue'
import AddUser from '../settings/right/AddUser.vue'
export const settingsChildRouter = [
  {path: '', redirect: 'addusergroup'},
  {path: 'addusergroup', component: AddUserGroup},
  {path: 'editusergroup', component: EditUserGroup},
  {path: 'editusergroup/:id', component: DoEdit},
  {path: 'adduser', component: AddUser},
];
