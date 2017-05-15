<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>热门搜索词</h3>
          <el-form :model="searchForm" label-width="80px" :inline="true" style="float: left;">
            <el-form-item label="关键词">
              <el-input v-model="searchForm.keyword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="goSearch">查询</el-button>
            </el-form-item>
          </el-form>
          <el-form :model="addForm" label-width="80px" :inline="true" class="addForm">
            <el-form-item label="关键词">
              <el-input v-model="addForm.keyword" placeholder="填加词，多个词用英文,号分隔"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleAdd">增加</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="keyword"
              label="关键词">
            </el-table-column>
            <el-table-column
              prop="nums"
              label="搜索次数">
            </el-table-column>
            <el-table-column
              label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px" class="clearfix">
            <el-button type="danger" @click="deleteSelected">删除</el-button>
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
  import { getHotKeywords, addHotKeyword, deleteHotKeyword } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        searchForm: {
          keyword: '',
        },
        addForm: {
          keyword: '',
        },
        currentPage: 1,
        total: 10,
        myCurrentPage: 1,
        search: '',
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该热门关键词, 是否继续?', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              NProgress.start();
              deleteHotKeyword(this.axios, { id: row.id })
                .then(response => {
                  let data = response.data;
                  if (data.statusCode === STATUS_SUCCESS) {
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                    this.handleCurrentChange(this.myCurrentPage);
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
      fetchData(search) {
        NProgress.start();
        getHotKeywords(this.axios, search)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.tableData = result.data.data;
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
      handleCurrentChange(val) {
        this.myCurrentPage = val;
        if (this.search) {
          this.fetchData(this.search + '&page=' + val);
        } else {
          this.fetchData(`?page=${val}`);
        }
      },
      goSearch() {
        if (this.searchForm.keyword) {
          this.search = `?keyword=${this.searchForm.keyword}`;
          this.fetchData(this.search);
        } else {
          this.$message({
            message: '请输入要搜索的关键词',
            type: 'info'
          });
        }
      },
      handleAdd() {
        if (this.addForm.keyword) {
          if (this.addForm.keyword.indexOf('，') !== -1) {
            this.$message({
              message: '请使用英文逗号分割',
              type: 'warning'
            });
            return;
          }
          addHotKeyword(this.axios, {keyword: this.addForm.keyword})
            .then(response => {
              let result = response.data;
              if (result.statusCode === STATUS_SUCCESS) {
                this.$message({
                  message: '成功',
                  type: 'success'
                });
                this.addForm.keyword = '';
                this.handleCurrentChange(this.myCurrentPage);
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
        } else {
          this.$message({
            message: '请输入要添加的关键词',
            type: 'info'
          });
        }
      },
      deleteSelected() {
        if (this.multipleSelection.length <= 0) {
          this.$message({
            message: '请选择要删除的对象',
            type: 'info'
          });
        } else {
          let idArr = [];
          this.multipleSelection.forEach(v => {
            idArr.push(v.id);
          });
          this.$confirm('此操作将永久删除所选的热门关键词, 是否继续?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                NProgress.start();
                deleteHotKeyword(this.axios, { id: idArr.join(',') })
                  .then(response => {
                    let data = response.data;
                    if (data.statusCode === STATUS_SUCCESS) {
                      this.$message({
                        message: '删除成功',
                        type: 'success'
                      });
                      this.handleCurrentChange(this.myCurrentPage);
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
    },
    created() {
      this.fetchData('');
    },
  };
</script>

<style lang="sass" scoped>
  .addForm
    float: right
    .el-input
      width: 220px
</style>
