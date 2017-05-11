<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>店铺</h3>
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> 管理</span>
              <search @change-condition="changeCondition"></search>
              <table-list :table-data="tableData" :total="total" @change-page="changePage"></table-list>
            </el-tab-pane>
            <el-tab-pane :disabled="isDisabled">
              <span slot="label"><i class="el-icon-edit"></i> 修改</span>
              修改
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Search from './Search.vue'
  import TableList from './TableList.vue'
  import Info from './Info.vue'
  import { getAllShopInfo } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  export default {
    data() {
      return {
        tableData: [],
        total: 10,
        isDisabled: true,
        search: '',
      }
    },
    methods: {
      fetchData(search) {
        getAllShopInfo(this.axios, search)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.tableData = result.data.data;
              this.total = result.data.total;
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
      changePage(page) {
        console.log(page);
      },
      changeCondition(condition) {
        console.log(condition);
      },
    },
    created() {
      this.fetchData(this.search);
    },
    components: {
      Search,
      TableList,
      Info,
    }
  };
</script>

<style lang="sass" scoped>

</style>
