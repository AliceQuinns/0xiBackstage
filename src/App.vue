<template>
  <div id="app">
    <app-header :path-data="path" v-if="isShowHeader"></app-header>
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
    computed: {
      isShowHeader() {
        return this.$store.state.isShowHeader;
      },
    },
    created() {
      // 获取用户权限并分组
      /*NProgress.start();
      getPowers2(this.axios).then(response => {
        let data = response.data;
        if (data.statusCode === STATUS_SUCCESS) {
          let result = getNameAndPath(data.power);
          this.path = result.path;
          this.subNavData = result.restPower;
        }
        NProgress.done();
      });*/
      let timer = setInterval(() => {
        console.log(12345);
        if (this.$store.state.powers) {
          let result = getNameAndPath(this.$store.state.powers.split(','));
          this.path = result.path;
          this.subNavData = result.restPower;
          clearInterval(timer);
        }
      }, 0);
    },
  }
</script>

<style lang="sass" scoped>
  #app
    height: 100%
    position: relative
</style>
