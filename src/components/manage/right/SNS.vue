<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>SNS</h3>
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
              label="图片"
              width="120">
              <template scope="scope">
                <img :src="scope.row.img" alt="">
              </template>
            </el-table-column>
            <el-table-column
              prop="memberName"
              label="姓名"
              width="150">
            </el-table-column>
            <el-table-column
              prop="title"
              label="详情"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="时间"
              width="300">
              <template scope="scope">{{ scope.row.createTime | formatTime }}</template>
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getAllSNS, deleteSNS } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  import { formatDate } from '../../../common/js/util'
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
        total: 10,
      }
    },
    methods: {
      fetchData(page) {
        NProgress.start();
        getAllSNS(this.axios, page)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              let data = result.data;
              this.tableData = data.data;
              this.total = data.total;
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.fetchData(val);
      },
      deleteItem() {
        if (this.multipleSelection.length > 0) {
          this.$confirm('此操作将永久删除所选项目, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            NProgress.start();
            let idArr = [];
            this.multipleSelection.forEach(v => {
              idArr.push(v.id);
            });
            deleteSNS(this.axios, {id: idArr.join(',')})
              .then(response => {
                let data = response.data;
                if (data.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  if (this.currentPage === 1) {
                    this.fetchData(1);
                  } else {
                    this.currentPage = 1;
                  }
                } else {
                  this.$message({
                    message: '删除失败',
                    type: 'error'
                  });
                }
                NProgress.done();
              })
              .catch(e => {
                this.$message({
                  message: '出现未知错误，请重试',
                  type: 'error'
                });
                console.log(e);
                NProgress.done();
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message({
            message: '请选择要删除的项目',
            type: 'info'
          });
        }
      },
    },
    filters: {
      formatTime(val) {
        return formatDate(new Date(val*1000), 'yyyy-MM-dd hh:mm:ss')
      },
    },
    created() {
      this.fetchData(1);
    },
  };
</script>

<style lang="sass" scoped>

</style>
