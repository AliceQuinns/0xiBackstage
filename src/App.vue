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
    // 直接从localstorage读数据
    created() {
      // 获取用户权限并分组
      NProgress.start();
      getManagerInfo(this.axios).then(response => {
        throw new Error('报错');
        let data = response.data;
        if (data.statusCode === STATUS_SUCCESS) {
          let ultraData = data.data;
          let result = getNameAndPath(ultraData.groupParam.split(','));
          this.path = result.path;
          this.subNavData = result.restPower;
          // let sessionId = ultraData.sessionId;
          this.username = ultraData.name;
          // this.$store.commit(UPDATE_SESSIONID, {sessionId: sessionId});
          /*let managerInfo = {
            group: ultraData.groupName,
            lastIp: ultraData.logoip,
            ip: ultraData.currentLogoIp,
            time: ultraData.latLoginTime,
            lastTime: ultraData.lastlogotime,
            nums: ultraData.logonums,
          };*/
          /*this.$store.commit(UPDATE_MANAGER_INFO, {managerInfo: {
            group: ultraData.groupName,
            lastIp: ultraData.logoip,
            ip: ultraData.currentLogoIp,
            time: ultraData.latLoginTime,
            lastTime: ultraData.lastlogotime,
            nums: ultraData.logonums,
          }});*/
          // window.localStorage.setItem('managerInfo', JSON.stringify(managerInfo));
          // window.localStorage.setItem('sessionId', sessionId);
          // window.localStorage.setItem('subPowers', result.restPower);
        }
        NProgress.done();
      })
        .catch(e => {
          let data = {
            "success":true,"msg":"返回session成功","statusCode":1,"data":{"id":215,"user":"xxy","name":"xxy","password":null,"groupId":1,"logonums":83,"lastlogotime":1495439088,"logoip":"127.0.0.1","province":null,"city":null,"area":null,"type":null,"lang":"cn","street":null,"provinceid":null,"cityid":null,"areaid":null,"streetid":null,"desc":null,"groupName":null,"currentLogoIp":"192.168.1.117","groupParam":"6a992d5529f459a44fee58c733255e86,58982afbd60ca68e3aabd6d244b88a09,69df506c87cb8bc6b93f8fe8e090b68c,714c2566c2ade418b3cb8a25c7b15378,35c6502bf32b69ee8d8590dc2a80ff1a,a9b7d430ba669ea4c061ef3273138d85,839897f123de0fffab760aa8f6fafe89,d7c229fd7ff46e2e37dc9ddb9759a4e5,4ce2d8df977e2f465bd3dee2e4314f6f,2a555be1b05f83f1b7e8cfca1dab74f5,2b8954084b1393ef69a2e6594224e799,b7da23e66d9ebb5737340005de050cf0,c14fa7060160a20fdab310c998202af0,c8bc2faacd8fd61ad74274c15f93c534,9c70933aff6b2a6d08c687a6cbb6b765,e5ebad24d4218cba59aa66a19fbdd02a,fd23c29a0bf3c41d0eb6848a21cc58a1,f5bf48aa40cad7891eb709fcf1fde128,525417bac7e611ba3391b5b0afd2a84d,d66e885a6f5e2c0d9150fbb6d5ca8d3e,e6bcc51caf1e591829e52af2808e24f7,e3e8c2dfce7753b9caf46eb357f0ea1a,2a6b0f310ec2d9c879a6fb1c7391842d,5a598c864ab8aafb529990b6d4ad17d3,aa08769cdcb26674c6706093503ff0a3,64b111d06314317e0d65524cb41476ce,c6480c1a3fe8c1a339ac23fcdc05d97d,75101dcdfc88455bcafc9e53e0b06689,fb54f3c5992b96d001bb16e8e92d968d,a2edbf6ac0fc24f76cf67669ff7477a1,f0e70573dee79e0f217e47dd394993f3,401d198ab7ffc0097c64dff27f3ee5b6,883b6502314ae3201e05972bede37ccd,1b06b31d58c898a54f2378a13276787d,4a2368a4153653cd03c40b55b21fbd9c,2ba4c418aa716c8a7f24054f1fc510ae,d1befa03c79ca0b84ecc488dea96bc68,f994e4b7219a93575e6e8dbe70b328ad,6df94b14b4abb38b4154504e8186ba48,fe40a51cbf1f02665a4ee3e4c516b3b2,dc3ce19728ae0b9ae8d0908bdc4256dc,b21dec6c6821d6053ae2f069de1a4d6c,de505f8633f0f8acd7d5115dcfac3f8c","sessionId":"18D8D91389CC8EDF836252AE27652308"}
          };
          let ultraData = data.data;
          let result = getNameAndPath(ultraData.groupParam.split(','));
          this.path = result.path;
          this.subNavData = result.restPower;
          let sessionId = ultraData.sessionId;
          this.username = ultraData.name;
          this.$store.commit(UPDATE_SESSIONID, {sessionId: sessionId});
          let managerInfo = {
            user: ultraData.user,
            group: ultraData.groupName,
            lastIp: ultraData.logoip,
            ip: ultraData.currentLogoIp,
            time: ultraData.latLoginTime,
            lastTime: ultraData.lastlogotime,
            nums: ultraData.logonums,
          };
          window.localStorage.setItem('managerInfo', JSON.stringify(managerInfo));
          window.localStorage.setItem('sessionId', sessionId);
          window.localStorage.setItem('subPowers', result.restPower);
          NProgress.done();
          this.$message({
            message: '获取数据失败',
            type: 'error'
          });
        });
    },
  }
</script>

<style lang="sass" scoped>
  #app
    height: 100%
    position: relative
</style>
