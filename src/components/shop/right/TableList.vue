<template>
  <div class="table">
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
        v-if="isShowIndex"
        label="排名指数"
        width="120">
        <template scope="scope">
          <el-input :value="scope.row.index" type="number"></el-input>
        </template>
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
        prop="shscShopGrade.name"
        label="店铺等级"
        width="120">
      </el-table-column>
      <el-table-column
        prop="productCount"
        label="商品数量"
        width="120">
      </el-table-column>
      <el-table-column
        label="保证金"
        width="120">
        <template scope="scope">{{ scope.row.earnest | formatMoney }}</template>
      </el-table-column>
      <el-table-column
        label="pos押金"
        width="120">
        <template scope="scope">{{ scope.row.pos_deposit | formatMoney }}</template>
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
            icon="edit"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            icon="search" :disabled="true">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px" class="clearfix">
      <el-button @click="deleteItem" type="danger">删除</el-button>
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
</template>

<script>
  import { formatDate } from '../../../common/js/util'
  import { deleteShop } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  export default {
    name: 'tableList',
    props: {
      tableData: {
        type: Array,
      },
      total: {
        type: Number,
      },
    },
    data() {
      return {
        multipleSelection: [],
        currentPage: 1,
        isShowIndex: false,
      }
    },
    methods: {
      deleteItem() {
        if (this.multipleSelection.length <= 0) {
          this.$message({
            message: '请选择要删除的项目',
            type: 'info'
          });
        } else {
          let idArr = [];
          this.multipleSelection.forEach(v => {
            idArr.push(v.userid);
          });
          this.$confirm('此操作将永久删除该管理员, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            NProgress.start();
            deleteShop(this.axios, {userid: idArr.join(',')})
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.multipleSelection.forEach(v => {
                    for (let i = 0; i < this.tableData.length; i++) {
                      if (v.userid === this.tableData[i].userid) {
                        this.tableData.splice(i, 1);
                        break;
                      }
                    }
                  });
                  this.$message({
                    message: '成功',
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(val) {
        this.$emit('change-page', val);
      },
      handleEdit(index, row) {
        this.$emit('edit', row.userid, row.shop_type);
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
      formatMoney(val) {  // 格式化钱数
        return val.toFixed(2);
      },
    },
  }
</script>

<style lang="sass" scoped>

</style>
