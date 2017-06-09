<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>公告</h3>
          <el-tabs type="border-card" v-model="editableTabsValue">
            <el-tab-pane name="list">
              <span slot="label"><i class="el-icon-date"></i> 列表</span>
              <el-table :data="tableData" border tooltip-effect="dark" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column label="显示顺序" width="120px">
                  <template scope="scope">
                    <el-input
                      type="number"
                      size="small"
                      v-model="scope.row.displayorder"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="状态" width="120px">
                  <template scope="scope">{{ scope.row.status | sematicSatus }}</template>
                </el-table-column>
                <el-table-column label="发布时间" show-overflow-tooltip>
                  <template scope="scope">{{ scope.row.createTime | formatTime }}</template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
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
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px;">
                <el-button type="primary" @click="changeDisplayOrder">提交</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="增加" name="addItem">
              <bulletin-form @change="handleChange" :bulletin-form="bulletinForm"></bulletin-form>
            </el-tab-pane>
            <el-tab-pane label="编辑" name="editItem" :disabled="isDisabled">
              <bulletin-form :bulletin-form="bulletinForm1" @change="handleChange"></bulletin-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import NProgress from 'nprogress'
  import {getBulletinList, deleteBulletin, modifyBulletinOrder} from '../../../api/index'
  import {STATUS_SUCCESS} from '../../../common/consts/index'
  import {formatDate} from '../../../common/js/util'
  let BulletinForm = require('./Bulletin-form.vue');
  let defaultContent = {
    title: '',
    url: '',
    content: '',
    status: false,
    createTime: '',
  };
  export default {
    data() {
      return {
        tableData: [],
        currentPage: 1,
        total: 10,
        multipleSelection: [],
        editableTabsValue: 'list',
        bulletinForm: {
          title: '',
          url: '',
          content: '',
          status: false,
          createTime: '',
        },
        bulletinForm1: {
          title: '',
          url: '',
          content: '',
          status: false,
          createTime: '',
        },
        isDisabled: true,
      }
    },
    methods: {
      fetchData() {
        NProgress.start();
        getBulletinList(this.axios)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.tableData = result.data;
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
      handleEdit(index, row) {
        Object.assign(this.bulletinForm1, row);
        this.bulletinForm1.createTime = new Date(this.bulletinForm1.createTime * 1000);
        this.isDisabled = false;
        this.editableTabsValue = 'editItem';
      },
      handleDelete(index, row) {
        let id = row.id;
        this.$confirm('此操作将永久删除该公告, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          deleteBulletin(this.axios, {id})
            .then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.fetchData();
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      changeDisplayOrder() {
        if (this.multipleSelection.length > 0) {
          this.$confirm('此操作将修改公告的展示顺序，是否继续？', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            NProgress.start();
            let dataArr = [];
            this.multipleSelection.forEach(v => {
              let item = `${v.id}:${v.displayorder}`;
              dataArr.push(item);
            });
            modifyBulletinOrder(this.axios, {param: dataArr.join(',')})
              .then(response => {
                let data = response.data;
                if (data.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.fetchData();
                } else {
                  this.$message({
                    message: '修改失败',
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
              message: '已取消'
            });
          });
        } else {
          this.$message({
            message: '请选择要操作的对象',
            type: 'info'
          });
        }
      },
      handleChange() {
        this.editableTabsValue = 'list';
        this.bulletinForm = defaultContent;
        this.isDisabled = true;
        this.fetchData();
      },
    },
    filters: {
      sematicSatus(val) {
        return val ? '开启' : '关闭'
      },
      formatTime(val) {
        return formatDate(new Date(val * 1000), 'yyyy-MM-dd hh:mm:ss');
      },
    },
    components: {
      BulletinForm
    },
    created() {
      this.fetchData();
    },
  };
</script>

<style lang="sass" scoped>

</style>
