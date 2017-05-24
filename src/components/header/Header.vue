<template>
  <div class="header">
    <h1 class="title el-col-4">
      <a href="/index">
        <img src="./logo.png" alt="" width="100%" height="100%">
      </a>
    </h1>
    <div class="container">
      <el-menu :default-active="activeIndex" mode="horizontal" :key="new Date()">
        <el-menu-item v-for="(path, index) in pathData"
                      :index="String(index)" :key="index"
                      @click="goSub(path.id)">
          <router-link :to="path.pathName">{{ path.name }}</router-link>
        </el-menu-item>
        <div class="user">
          <div class="info">您好：{{ userName }} | <span class="logout" @click="logout">退出</span></div>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import {NAVID} from '../../common/consts/index'
  import {CHANGE_NAVID} from '../../common/consts/mutation-types'
  import { logout } from '../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../common/consts/index'
  export default {
    name: 'header',
    props: {
      pathData: {  // 主导航的数据
        type: Array,
      },
      userName: {
        type: String
      },
    },
    data() {
      return {}
    },
    computed: {
      activeIndex() {
        // 更改当前导航的ID
        let path = this.$route.path;
        let navName = path.split('/')[1];
        let nav = ['index', 'settings', 'products', 'member', 'shop', 'transaction', 'manage', 'web', 'tool'];
        let idx = nav.indexOf(navName);
        this.$store.commit(CHANGE_NAVID, {parentId: idx});

        // 导航默认选中的id
        for (let i = 0; i < this.pathData.length; i++) {
          if (this.pathData[i].pathName === `/${navName}`) {
            return i.toString();
          }
        }
      },
    },
    methods: {
      goSub(id) {
        // 点击主导航后改变 parentId 以渲染对应的侧边栏
        let parentId = NAVID.indexOf(id);
        this.$store.commit(CHANGE_NAVID, {parentId});
      },
      logout() {
        /*let sessionId = window.localStorage.getItem('sessionId');
        if (sessionId) {
          NProgress.start();
          logout(this.axios, {sessionId})
            .then(response => {
              let result = response.data;
              if (result.statusCode === STATUS_SUCCESS) {
                this.$message({
                  message: '退出成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '失败，请重试',
                  type: 'info'
                });
              }
              NProgress.done();
            })
            .catch(e => {
              NProgress.done();
              this.$message({
                message: '出现未知错误，请重试',
                type: 'error'
              });
            });
        }*/
        NProgress.start();
        logout(this.axios)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.$message({
                message: '退出成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '获取数据出错，请重新尝试',
                type: 'error'
              });
            }
            NProgress.done();
          })
          .catch(e => {
            NProgress.done();
            this.$message({
              message: '获取数据出错，请重新尝试',
              type: 'error'
            });
          });
      },
    },
  }
</script>

<style lang="sass" scoped>
  .header
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 60px
    z-index: 1
    .title
      height: 60px
      line-height: 60px
    .container
      margin-left: 16.66667%
      .el-menu-item
        padding: 0
        a
          padding: 0 20px
          box-sizing: border-box
      .user
        float: right
        margin-right: 100px
        .info
          height: 60px
          line-height: 60px
          .logout
            cursor: pointer
</style>
