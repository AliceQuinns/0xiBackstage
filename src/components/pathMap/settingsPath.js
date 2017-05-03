/**
 * Created by alvin on 17-4-26.
 */
import AddUserGroup from '../settings/right/AddUserGroup.vue'
import EditUserGroup from '../settings/right/EditUserGroup.vue'
export const settingsChildRouter = [
  {path: '', redirect: 'addusergroup'},
  {path: 'addusergroup', component: AddUserGroup},
  {path: 'editusergroup', component: EditUserGroup},
  {path: 'editusergroup/:id', component: AddUserGroup},
];
