/**
 * Created by alvin on 17-4-11.
 */

/*
  index 导航下的二级导航
 */
import Welcome from '../../components/index/right/Welcome.vue'

export const indexChildRouter = [
  { path: '', redirect: 'welcome' },
  { path: 'welcome', component: Welcome}
];
