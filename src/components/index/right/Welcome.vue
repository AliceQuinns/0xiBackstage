<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col :span="12" :offset="5">
        <div class="container">
          <h3>个人信息</h3>
          <ul>
            <li>所属管理组： {{ userInfo.group }}</li>
            <li class="highlight">上次登录IP： {{ userInfo.lastIp }}</li>
            <li>本地登录IP： {{ userInfo.ip }}</li>
            <li>服务器时间： {{ userInfo.time | fomatTime }}</li>
            <li class="highlight">上次登录时间： {{ userInfo.lastTime | fomatTime }}</li>
            <li>后台登录次数： {{ userInfo.nums }}</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { formatDate } from '../../../common/js/util'
  export default {
    name: 'welcome',
    data() {
      return {
        userInfo: {},
      }
    },
    created() {
//      this.userInfo = this.$store.state.managerInfo;
      this.userInfo = JSON.parse(window.localStorage.getItem('managerInfo'));
    },
    filters: {
      fomatTime(ms) {
        if (!ms) { return '' }
        return formatDate(new Date(ms*1000), 'yyyy-MM-dd hh-mm-ss');
      },
    },
  }
</script>

<style lang="sass" scoped>
  .el-col
    .container
      ul
        list-style-type: none
        li
          padding: 5px 0
          &.highlight
            color: #8492A6
</style>
