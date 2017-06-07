/**
 * Created by alvin on 17-6-7.
 */
import { getDefaultPath } from '../../common/js/util'
let defaultPath = getDefaultPath(6, window.localStorage.getItem('powers'));

export let manageChildRouter = [
  {path: '', redirect: defaultPath},
];
