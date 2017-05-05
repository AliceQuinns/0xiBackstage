<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>管理权限组</h3>
          <el-table
            :data="tableData"
            border
            class="table"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              prop="groupId"
              label="ID"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="groupName"
              label="权限组"
              width="180">
            </el-table-column>
            <el-table-column
              prop="groupDesc"
              label="描述">
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <router-link :to="`/settings/editusergroup/${scope.row.groupId}`">
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
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getGroupList, deleteGroup } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  import NProgress from 'nprogress'
  export default {
    data() {
      return {
        tableData: [],
      }
    },
    methods: {
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该权限组, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          deleteGroup(this.axios, { groupId: Number(row.groupId) })
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
      }
    },
    created() {
      NProgress.start();
      getGroupList(this.axios)
        .then(response => {
          let groups = response.data;
          if (groups.statusCode === STATUS_SUCCESS) {
            this.tableData = groups.data;
          }
          NProgress.done();
        })
        .catch(e => {
          this.$message({
            message: '获取数据出错，请从新尝试',
            type: 'error'
          });
          console.log(e);
          NProgress.done();
        });
    },
  }
</script>

<style lang="sass" scoped>

</style>
