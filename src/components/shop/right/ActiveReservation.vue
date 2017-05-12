<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>最新活动用户预约</h3>

          <!-- 表格 -->
          <el-table
            :data="tableData.shscActivityList"
            scopeone="scope"
            border
            ref="multipleTable"
            style="width: 100%"
            @selection-change="handleSelectionChange">

            <!--批量删除-->
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>

            <!--活动名称-->
            <el-table-column
              prop="activityName"
              label="活动名称">
            </el-table-column>

            <!--活动商家-->
            <el-table-column
              prop="shopName"
              label="活动商家">
            </el-table-column>

            <!--活动商家电话-->
            <el-table-column
              prop="shopIphone"
              label="活动商家电话">
            </el-table-column>

            <!--预约用户名称-->
            <el-table-column
              prop="name"
              label="预约用户名称">
            </el-table-column>

            <!--预约用户电话-->
            <el-table-column
              prop="iphone"
              label="预约用户电话">
            </el-table-column>

            <!--预约会员-->
            <el-table-column
              prop="username"
              label="预约会员">
            </el-table-column>

            <!--添加时间-->
            <el-table-column
              prop="mobile"
              label="添加时间">
            </el-table-column>

            <!--操作-->
            <el-table-column
              label="操作"
              width="100">
              <template
                scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, scope.row)"
                  type="danger"
                  icon="delete"
                  size="small"
                  class="deletone">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 批量删除按钮 -->
          <div style="margin-top: 20px;">
            <el-button
              type="danger"
              :plain="true"
              icon="delete"
              @click="deleteItem()">
              删除
            </el-button>
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
  /* 接口 */
  import NProgress from 'nprogress'
  import { reservedUser,deletereservedUser, } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'

  export default {
    data() {
      return {
        total: 10,/* 每页显示 */
        tableData: [],/* 全部表格数据 */
        tableDataPage: [],/* 逻辑分页后表格*/
        multipleSelection: [],/* 批量删除复选框 */
        currentPage: 1,/* 分页默认显示页码 */
      }
    },
    methods: {
      fetchData(page) {
        /* 查询店铺发货地址 */
        NProgress.start();
        reservedUser(this.axios , page)
          .then(
            response => {
              let groups = response.data;
              if (groups.statusCode === STATUS_SUCCESS) {
                this.total = groups.total;
                this.tableData = groups.data;
                /*for (let i = 0; i<this.tableData.data.length;i++) {
                  var text = this.tableData.data[i].area+this.tableData.data[i].addr;
                  this.tableData.data[i].areaaddr = text;
                  this.total = Number(groups.data.total);
                };*/
                console.log(this.tableData);
              }
              NProgress.done();
            })
          .catch(e => {
            this.$message({
              message: '获取数据出错，请重新尝试',
              type: 'error'
            });
            console.log(e);
            NProgress.done();
          });
      },
      /* 获取复选框 */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      /* 单条删除发货地址 */
      deleteRow(index, row) {
        this.$confirm('此操作将永久删除该店铺发货地址, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          deletereservedUser(this.axios, {id: Number(row.id)})
            .then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.tableData.shscActivityList.splice(index, 1);
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

      /* 批量删除 */
      deleteItem() {
        /*判断是否有选中*/
        if (this.multipleSelection.length <= 0) {
          this.$message({
            message: '请选择要删除的项目',
            type: 'info'
          });
        } else {
          /*遍历出选中的id*/
          var selectGroup = [];
          var i;
          for(i = 0; i<this.multipleSelection.length; i++) {
            var select= this.multipleSelection[i].id;
            selectGroup.push(select);
          }
          this.$confirm('此操作将永久删除该店铺发货地址, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            NProgress.start();
            deletereservedUser(this.axios, {id: selectGroup.join(',')})
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  /* 前端删除 */
                  this.multipleSelection.forEach(v => {
                    for (let i = 0; i < this.tableData.shscActivityList.length; i++) {
                      if (v.id === this.tableData.shscActivityList[i].id) {
                        this.tableData.shscActivityList.splice(i, 1);
                        break;
                      }
                    }
                  });
                  this.$message({
                    message: '删除成功',
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

      /* 分页 */
      handleCurrentChange(val) {
        this.fetchData(val);
      },
    },
    created() {
      this.fetchData(1);
    },
  }
</script>

<style lang="sass" scoped>

</style>
