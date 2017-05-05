<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container clearfix">
          <h3>管理员列表</h3>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              label="ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="user"
              label="账户"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="用户名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="groupName"
              label="会员组">
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <router-link :to="`/settings/userlist/${scope.row.id}`">
                  <el-button
                    icon="edit"
                    size="small">编辑</el-button></router-link>
                <el-button
                  icon="delete"
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { deleteUser, getUserList } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  import NProgress from 'nprogress'
  export default {
    data() {
      return {
        tableData: [],
        currentPage: 1,
        total: 10,
      }
    },
    methods: {
      handleDelete(index, row) {
        // TODO 将这类的功能封装为公共的函数
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          deleteUser(this.axios, { id: Number(row.id) })
            .then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.tableData.splice(index, 1);
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
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
      },
      handleCurrentChange(val) {
        NProgress.start();
        getUserList(this.axios, val)
          .then(response => {
            let userList = response.data;
            if (userList.statusCode === STATUS_SUCCESS) {
              this.tableData = userList.data.data;
              this.total = Number(userList.data.total);
              NProgress.done();
            } else {
              NProgress.done();
            }
          })
          .catch(e => {
            NProgress.done();
          });
      },
    },
    created() {
      NProgress.start();
      getUserList(this.axios, 1)
        .then(response => {
          let userList = response.data;
          if (userList.statusCode === STATUS_SUCCESS) {
            this.tableData = userList.data.data;
            this.total = Number(userList.data.total);
            NProgress.done();
          } else {
            NProgress.done();
          }
        })
        .catch(e => {
          NProgress.done();
        });
    },
  }
</script>

<style lang="sass" scoped>
  .pagination
    float: right
    margin-top: 10px
</style>
