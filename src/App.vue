<template>
  <div id="app">
    <app-header :path-data="path" :user-name="username"></app-header>
    <router-view :sub-nav="subNavData"></router-view>
  </div>
</template>

<script>
  import { UPDATE_SESSIONID, UPDATE_MANAGER_INFO } from './common/consts/mutation-types'
  import { getNameAndPath } from './common/js/util'
  import { STATUS_SUCCESS } from './common/consts/index'
  import { getManagerInfo } from './api/index'
  import Header from './components/header/Header'

  let NProgress = require('nprogress');
  export default {
    name: 'app',
    data() {
      return {
        path: [],
        subNavData: [],
        username: '',
      }
    },
    components: {
      'app-header': Header,
    },
    created() {
      // 获取用户权限并分组
      NProgress.start();
      getManagerInfo(this.axios).then(response => {
        let data = response.data;
        if (data.statusCode === STATUS_SUCCESS) {
          let ultraData = data.data;
          let result = getNameAndPath(ultraData.groupParam.split(','));
          this.path = result.path;
          this.subNavData = result.restPower;
          let sessionId = ultraData.sessionId;
          this.username = ultraData.name;
          this.$store.commit(UPDATE_SESSIONID, {sessionId: sessionId});
          this.$store.commit(UPDATE_MANAGER_INFO, {managerInfo: {
            group: ultraData.groupName,
            lastIp: ultraData.logoip,
            ip: ultraData.currentLogoIp,
            time: new Date().getTime(),
            lastTime: ultraData.lastlogotime,
            nums: ultraData.logonums,
          }});
          window.localStorage.setItem('sessionId', sessionId);
          window.localStorage.setItem('subPowers', result.restPower);
        }
        NProgress.done();
      });
    },
  }
</script>

<style lang="sass" scoped>
  #app
    height: 100%
    position: relative
</style>
