<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>发货地址</h3>
          <!-- 表格 -->
          <el-table
            :model="tableData"
            :data="tableData.data"
            scopeone="scope"
            style="width: 100%">

            <!--批量删除-->
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>

            <!--店铺ID-->
            <el-table-column
              prop="userid"
              label="店铺ID">
            </el-table-column>

            <!--店主用户名-->
            <el-table-column
              prop="user"
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
              prop="area"
              label="所在地址">
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
              width="150">
              <template
                scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, scope.row)"
                  type="danger"
                  icon="delete"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 提交增加按钮 -->
          <div class="btn-group">
            <el-button
              type="primary"
              @click="addRecommend">
              <i class="el-icon-star-on"></i>
              添加
            </el-button>
            <el-button
              type="success"
              icon="upload2"
              @click="submitRecommend(tableData.data)">
              提交
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /* 接口 */
  import NProgress from 'nprogress'
  import { goodsAddress,removeGetStoreNews,addgetStoreNews, } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'

  export default {
    data() {
      return {
        tableData: [],
      }
    },
    methods: {
      /* 新闻推荐位单条删除 */
      deleteRow(index, row) {
        this.$confirm('此操作将永久删除该店铺新闻推荐位, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          /* 用户删除 已新增 但未提交的推荐位时 */
          if (row.id == null) {
            NProgress.done();
            this.tableData.data.splice(index, 1);
          }
          removeGetStoreNews(this.axios, {id: Number(row.id)})
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
      /* 添加新闻推荐位 */
      addRecommend() {
        console.log(this.tableData.data);
        this.tableData.data.push({
          id: null,
          name: '请输入推荐位名称',
        })
      },
      /* 提交增加或修改的新闻推荐位 */
      submitRecommend(formName) {
        this.$confirm('确认提交您的操作? , 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          var formNameText = [];/* 父数组 */
          for(let i = 0;i < formName.length;i++) {
            var formId = formName[i].id;
            var formNameTextChild = [];/* 子数组 */
            if(formId == null){
              formId = '0';
            }
            formNameTextChild.push(formId);
            formNameTextChild.push(formName[i].name.toString());
            var a = formNameTextChild.join(':');
            formNameText.push(a);
          }
          var param = formNameText.join(',');
          addgetStoreNews(this.axios,{param})
            .then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '提交失败',
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
            message: '已取消提交'
          });
          NProgress.done();
        });
      },
    },
    created() {
      /* 查询店铺新闻推荐位列表 */
      NProgress.start();
      goodsAddress(this.axios)
        .then(
          response => {
            let groups =
              response.data;
            if (groups.statusCode === STATUS_SUCCESS) {
              this.tableData = groups.data;/*
              for (let i = 0; i<this.tableData.data.length;i++) {
                var i = this.tableData.data[i];
                var areaaddr = i.area + i.addr;
                i.push(areaaddr);
                console.log(i);
              }*/
              console.log(typeof this.tableData.data[0]);
              console.log(this.tableData.data.length);
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
      margin-top: 1em
</style>
