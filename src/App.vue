<template>
  <div id="app">
    <app-header :path-data="path"></app-header>
    <router-view :sub-nav="subNavData"></router-view>
  </div>
</template>

<script>
  import { CHANGE_NAVID } from './common/consts/mutation-types'
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
          let result = getNameAndPath(data.power);
          this.path = result.path;
          this.subNavData = result.restPower;
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
