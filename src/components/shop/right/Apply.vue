<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>开店申请</h3>
          <el-form :inline="true" :model="searchForm">
            <el-form-item label="店铺名称">
              <el-input v-model="searchForm.company" placeholder="请输入店铺名称"></el-input>
            </el-form-item>
            <el-form-item label="店铺状态">
              <el-select v-model="searchForm.status" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="goSearch">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="user"
              label="店主用户名"
              width="140">
            </el-table-column>
            <el-table-column
              prop="company"
              label="商铺名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="productCount"
              label="店铺分类"
              width="120">
            </el-table-column>
            <el-table-column
              prop="shscShopGrade.name"
              label="店铺等级"
              width="120">
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              label="创店时间">
              <template scope="scope">{{ scope.row.create_time | formatTime }}</template>
            </el-table-column>
            <el-table-column
              width="120"
              label="状态">
              <template scope="scope">{{scope.row.shop_statu | getStatus}}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  icon="search" :disabled="true">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px" class="clearfix">
            <el-button @click="pass" type="info">通过</el-button>
            <el-button @click="next" type="info">不通过</el-button>
            <el-pagination
              class="pagination"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { formatDate } from '../../../common/js/util'
  import { getAllApplyInfo } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  export default {
    data() {
      return {
        searchForm: {
          company: '',
          status: '',
        },
        options: [
          {id: 0, name: '卖家店铺不通过'},
          {id: 1, name: '卖家店铺待审核'},
        ],
        tableData: [],
        currentPage: 1,
        total: 10,
      }
    },
    methods: {
      fetchData(search) {
        getAllApplyInfo(this.axios, search)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {

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
      goSearch() {

      },
      handleCurrentChange(val) {

      },
      pass() {},
      next() {},
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
    filters: {
      formatTime(val) {  // 格式化时间
        let date = new Date(val*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      },
      getStatus(code) {  // 格式化店铺状态
        switch (code) {
          case -1:
            return '卖家店铺关闭';
            break;
          case 1:
            return '卖家店铺开启';
            break;
          case -4 || -6:
            return '分销店铺关闭';
            break;
          case -3:
            return '分销店铺开启';
            break;
        }
      },
    },
  };
</script>

<style lang="sass" scoped>

</style>
