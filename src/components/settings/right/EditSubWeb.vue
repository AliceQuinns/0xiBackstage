<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>分站管理</h3>
          <el-tabs type="border-card" v-model="currentTab">
            <el-tab-pane name="list">
              <span slot="label"><i class="el-icon-date"></i> 分站列表</span>
              <el-table :data="tableData" border>
                <el-table-column label="域名">
                  <template scope="scope">{{ 'http://' + scope.row.domain + '.0xi.com.cn' }}</template>
                </el-table-column>
                <el-table-column label="内容">
                  <template scope="scope">{{ scope.row.con + scope.row.con2 + scope.row.con3 }}</template>
                </el-table-column>
                <el-table-column label="操作">
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-switch
                      @change="(val) => {changeStatus(val, scope.row)}"
                      v-model="scope.row.isopen"
                      on-color="#13ce66"
                      off-color="#ff4949">
                    </el-switch>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px;" class="clearfix">
                <el-pagination
                  class="pagination"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="10"
                  layout="prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="增加分站" name="addItem">
              <subweb-form :web-info="webInfo" @change="handleChange" :is-show="isShowProvince"></subweb-form>
            </el-tab-pane>
            <el-tab-pane label="编辑分站" name="editItem" :disabled="isDisabled">
              <subweb-form :web-info="webInfo1" @change="handleChange" :is-show="isShowProvince1"
                           @edit="changeEdit"></subweb-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  let SubwebForm = require('./Subweb-form.vue');
  import NProgress from 'nprogress'
  import {getAllSubs, changeSubStatus, deleteSub, getSubInfo} from '../../../api/index'
  import {STATUS_SUCCESS} from '../../../common/consts/index'
  let defaultContent = {
    isopen: false,
    province: '',
    city: '',
    area: '',
    domain: '',
    webTitle: '',
    webKeyword: '',
    webDes: '',
    des: '',
    copyright: '',
  };
  export default {
    data() {
      return {
        tableData: [],
        currentPage: 1,
        total: 10,
        webInfo: {
          isopen: false,
          province: '',
          city: '',
          area: '',
          domain: '',
          webTitle: '',
          webKeyword: '',
          webDes: '',
          des: '',
          copyright: '',
        },
        webInfo1: {
          isopen: false,
          province: '',
          city: '',
          area: '',
          domain: '',
          webTitle: '',
          webKeyword: '',
          webDes: '',
          des: '',
          copyright: '',
        },
        currentTab: 'list',
        isDisabled: true,
        isShowProvince: false,
        isShowProvince1: false,
      }
    },
    methods: {
      fetchData(page) {
        NProgress.start();
        getAllSubs(this.axios, page)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.tableData = result.data.data.map(v => {
                if (v.isopen === 1) {
                  v.isopen = true;
                  return v;
                } else {
                  v.isopen = false;
                  return v;
                }
              });
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
      changeStatus(val, row) {
        NProgress.start();
        changeSubStatus(this.axios, {
          id: row.id,
          isopen: val ? 1 : 0
        })
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.$message({
                message: '更改成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '更改失败，请重试',
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
      handleEdit(index, row) {
        NProgress.start();
        getSubInfo(this.axios, row.id)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.isDisabled = false;
              this.currentTab = 'editItem';
              result.data.isopen = result.data.isopen === 1;
              Object.assign(this.webInfo1, result.data);
              this.isShowProvince1 = true;
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
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该分站, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          deleteSub(this.axios, {id: row.id})
            .then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.fetchData(this.currentPage);
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
        this.currentPage = val;
        this.fetchData(val);
      },
      handleChange() {
        this.currentTab = 'list';
        this.isDisabled = true;
        this.webInfo = defaultContent;
        if (this.currentPage === 1) {
          this.fetchData(1);
        } else {
          this.currentPage = 1;
        }
      },
      changeEdit() {
        this.isShowProvince1 = false;
      }
    },
    components: {
      SubwebForm
    },
    created() {
      this.fetchData(1);
    },
  };
</script>

<style lang="sass" scoped>

</style>
