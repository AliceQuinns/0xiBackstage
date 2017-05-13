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
              width="180">
            </el-table-column>
            <el-table-column
              prop="company"
              label="商铺名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="shscShopCat.name"
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
              width="180"
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
            <el-button @click="pass($event, 1)" type="info">通过</el-button>
            <el-button @click="pass($event, -2)" type="info">不通过</el-button>
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
  import { getAllApplyInfo, editApplyStatus } from '../../../api/index'
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
          {id: -2, name: '卖家店铺不通过'},
          {id: 0, name: '卖家店铺待审核'},
        ],
        tableData: [],
        currentPage: 1,
        total: 10,
        search: '',
        multipleSelection: [],
      }
    },
    methods: {
      fetchData(search) {
        getAllApplyInfo(this.axios, search)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.total = result.data.total;
              this.tableData = result.data.shopList;
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
        this.search = `?company=${this.searchForm.company}&shop_statu=${this.searchForm.status}`;
        this.fetchData(this.search);
      },
      handleCurrentChange(val) {
        if (!this.search) {
          this.fetchData(`?page=${val}`);
        } else {
          this.fetchData(this.search + '&page=' + val);
        }
      },
      pass(event, status) {
        let idArr = [];
        this.multipleSelection.forEach(v => {
          idArr.push(v.userid);
        });
        editApplyStatus(this.axios, {
          userid: idArr.join(','),
          shop_statu: status
        })
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.$message({
                message: '修改已生效',
                type: 'success'
              });
              this.fetchData('');
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
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
    created() {
      this.fetchData(this.search);
    },
    filters: {
      formatTime(val) {  // 格式化时间
        let date = new Date(val*1000);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      },
      getStatus(code) {  // 格式化店铺状态
        switch (code) {
          case -2:
            return '卖家店铺审核不通过';
            break;
          case 0:
            return '卖家店铺待审核';
            break;
        }
      },
    },
  };
</script>

<style lang="sass" scoped>

</style>
