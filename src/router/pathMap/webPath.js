/**
 * Created by alvin on 17-6-7.
 */
import { getDefaultPath } from '../../common/js/util'
let defaultPath = getDefaultPath(7, window.localStorage.getItem('powers'));
import Bulletin from '../../components/web/right/Bulletin.vue'

export let webChildRouter = [
  {path: '', redirect: defaultPath},
  {path: 'bulletin', component: Bulletin, meta: {requirePower: true}},
];
