<template>
  <div id="app">
    <app-header :path-data="path" :user-name="username"></app-header>
    <router-view :sub-nav="subNavData"></router-view>
  </div>
</template>

<script>
  import { UPDATE_SESSIONID } from './common/consts/mutation-types'
  import { getNameAndPath } from './common/js/util'
  import { STATUS_SUCCESS } from './common/consts/index'
  import { getPowers2 } from './api/index'
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
      getPowers2(this.axios).then(response => {
        let data = response.data;
        if (data.statusCode === STATUS_SUCCESS) {
          /*let powers =
            '6a992d5529f459a44fee58c733255e86,b7da23e66d9ebb5737340005de050cf0,58982afbd60ca68e3aabd6d244b88a09,9c70933aff6b2a6d08c687a6cbb6b765,c14fa7060160a20fdab310c998202af0';*/
//          let result = getNameAndPath(powers.split(','));
          let result = getNameAndPath(data.power);
          this.path = result.path;
          this.subNavData = result.restPower;
          let sessionId = '32yjfhdsjgh32945346tghe';
          this.username = 'alvin';
          this.$store.commit(UPDATE_SESSIONID, {sessionId: sessionId});
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
