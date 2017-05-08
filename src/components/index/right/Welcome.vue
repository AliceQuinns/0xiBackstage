<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col :span="12" :offset="5">
        <div class="container">
          <h3>个人信息</h3>
          <ul>
            <li>所属管理组： {{ userInfo.user }}</li>
            <li class="highlight">上次登录IP： {{ userInfo.lastLogip }}</li>
            <li>本地登录IP： {{ userInfo.thisLogip }}</li>
            <li>服务器时间： {{ userInfo.serverTime | fomatTime }}</li>
            <li class="highlight">上次登录时间： {{ userInfo.lastLogtime | fomatTime }}</li>
            <li>后台登录次数： {{ userInfo.lognums }}</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getIndexInfo } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  import { formatDate } from '../../../common/js/util'
  export default {
    name: 'welcome',
    data() {
      return {
        userInfo: {},
      }
    },
    created() {
      getIndexInfo(this.axios).then(response => {
        let data = response.data;
        if (data.statusCode === STATUS_SUCCESS) {
          this.userInfo = data.userInfo;
        }
      });
    },
    filters: {
      fomatTime(ms) {
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
