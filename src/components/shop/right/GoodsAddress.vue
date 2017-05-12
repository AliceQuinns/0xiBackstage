<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>发货地址</h3>

          <!-- 表格 -->
          <el-table
            :data="tableDataPage"
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

            <!--店铺ID-->
            <el-table-column
              prop="userid"
              label="店铺ID"
              width="80">
            </el-table-column>

            <!--店主用户名-->
            <el-table-column
              prop="shscMember.user"
              label="店主用户名">
            </el-table-column>

            <!--店铺名称-->
            <el-table-column
              prop="company"
              label="店铺名称">
            </el-table-column>

            <!--收货人-->
            <el-table-column
              prop="name"
              label="收货人">
            </el-table-column>

            <!--所在地址-->
            <el-table-column
              prop="areaaddr"
              label="所在地址"
              width="300">
            </el-table-column>

            <!--电话-->
            <el-table-column
              prop="tel"
              label="电话">
            </el-table-column>

            <!--手机-->
            <el-table-column
              prop="mobile"
              label="手机">
            </el-table-column>

            <!--邮编-->
            <el-table-column
              prop="post"
              label="邮编">
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
          <div class="btn-group">
            <el-button
              type="danger"
              :plain="true"
              icon="delete"
              @click="deleteItem()">
              删除
            </el-button>
          </div>

          <!-- 分页 -->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="tableData.total">
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
  import { goodsAddress,deletegoodsAddress, } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'

  export default {
    data() {
      return {
        pageSize: 10,/* 每页显示 */
        tableData: [],/* 全部表格数据 */
        tableDataPage: [],/* 逻辑分页后表格*/
        multipleSelection: [],/* 批量删除复选框 */
        currentPage3: 1,/* 分页默认显示页码 */
      }
    },
    methods: {
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
          console.log(this.tableData.data);
          deletegoodsAddress(this.axios, {id: Number(row.id)})
            .then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.tableData.data.splice(index, 1);
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
          console.log(selectGroup.join(','));
          this.$confirm('此操作将永久删除该店铺发货地址, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            NProgress.start();
            deletegoodsAddress(this.axios, {id: selectGroup.join(',')})
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  /* 前端删除 */
                  this.multipleSelection.forEach(v => {
                    for (let i = 0; i < this.tableData.data.length; i++) {
                      if (v.id === this.tableData.data[i].id) {
                        this.tableData.data.splice(i, 1);
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        var pageA = val - 1;
        var pageB = val + 9;
        this.tableDataPage = this.tableData.data.slice(pageA,pageB);
      },
    },
    created() {
      /* 查询店铺发货地址 */
      NProgress.start();
      goodsAddress(this.axios)
        .then(
          response => {
            let groups = response.data;
            if (groups.statusCode === STATUS_SUCCESS) {
              this.tableData = groups.data;
              for (let i = 0; i<this.tableData.data.length;i++) {
                var text = this.tableData.data[i].area+this.tableData.data[i].addr;
                this.tableData.data[i].areaaddr = text;
              };
              this.tableDataPage = this.tableData.data.slice(0,10);/* 第一次加载拿10条 */
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
  }
</script>

<style lang="sass" scoped>
  .nameInput
    margin: 0.5em
    max-width: 20em
  .btn-group
    display: inline-block
    margin-top: 1em
  .deletone
    margin-top: 0.5em
    margin-bottom: 0.5em
  .block
    display: inline-block
    float: right
    margin-top: 1em
</style>
