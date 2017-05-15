<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>会员管理</h3>
          <el-tabs type="border-card" :value="currentTab" @tab-click="clickTab">
            <el-tab-pane name="list">
              <span slot="label"><i class="el-icon-date"></i> 管理</span>
              <el-form :inline="true" :model="searchForm">
                <el-form-item label="关键字">
                  <el-input placeholder="请输入内容" v-model="searchForm.input" style="width: 250px">
                    <el-select v-model="searchForm.type" slot="prepend" placeholder="请选择" style="width: 100px;">
                      <el-option label="用户名" value="1"></el-option>
                      <el-option label="昵称" value="2"></el-option>
                      <el-option label="手机" value="3"></el-option>
                    </el-select>
                  </el-input>
                </el-form-item>
                <el-form-item label="注册时间段">
                  <el-date-picker
                    v-model="searchForm.time"
                    type="daterange"
                    align="right"
                    placeholder="选择日期范围"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="searchForm.status" placeholder="选择状态" clearable>
                    <el-option label="已审核" value="2"></el-option>
                    <el-option label="待审核" value="1"></el-option>
                    <el-option label="禁止访问" value="-2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="changeCondition">查询</el-button>
                </el-form-item>
              </el-form>
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
                  prop="user"
                  label="会员"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="registerTime"
                  show-overflow-tooltip
                  label="注册时间">
                </el-table-column>
                <el-table-column
                  prop="qq"
                  label="QQ"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="联系人"
                  width="120">
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="email"
                  label="邮箱"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  label="手机"
                  width="140">
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  label="最后登录时间">
                  <template scope="scope">{{ scope.row.lastLoginTime | formatTime }}</template>
                </el-table-column>
                <el-table-column
                  prop="point"
                  label="积分"
                  width="90">
                </el-table-column>
                <el-table-column
                  label="登录"
                  width="100">
                  <template scope="scope">{{ scope.row.statu | getStatus }}</template>
                </el-table-column>
                <el-table-column label="操作" width="250">
                  <template scope="scope">
                    <el-button
                      size="small"
                      icon="search"
                      @click="handleEdit(scope.$index, scope.row)">查看详细信息</el-button>
                    <el-button
                      size="small"
                      icon="edit"
                      type="danger"
                      @click="handleMobile(scope.$index, scope.row)">修改手机</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px">
                <el-button @click="handlePass" type="info">审核通过</el-button>
                <el-button @click="handleUnpass" type="info">待审核</el-button>
                <el-button @click="handleBlock" type="danger">禁止访问</el-button>
                <el-button @click="handleDelete" type="danger">删除</el-button>
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
            <el-tab-pane label="详细信息" :disabled="isDisabledInfo" name="info">详细信息</el-tab-pane>
            <el-tab-pane label="修改绑定手机号" :disabled="isDisabledMobile" name="mobile">
              <el-form :model="mobileForm" label-width="120px" :rules="mobileRules" ref="mobile">
                <el-form-item label="注册用户名称">
                  <el-col :span="7">
                    <el-input v-model="mobileForm.name" disabled></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="绑定手机号">
                  <el-col :span="7">
                    <el-input v-model="mobileForm.iphone" disabled></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item prop="newIphone" label="修改绑定手机">
                  <el-col :span="7">
                    <el-input v-model.number="mobileForm.newIphone"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="modifyNumber('mobile')">确认修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getAllMember, deleteMember, passMember, unpassMember, blockMember } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  import { formatDate } from '../../../common/js/util'
  export default {
    data() {
      let validateNewPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('修改的手机号码不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('手机号码必须为数字'));
          } else {
            /* let regexpAll = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^249\D]|8\d)\d{8}$/; // 匹配所有 */
            let regexp = /^(?=\d{11}$)^1(?:3\d|4[57]|5[^4\D]|7[^01249\D]|8\d)\d{8}$/; // 排除虚拟运营商的号码
            if (!regexp.test(value)) {
              callback(new Error('请输入正确的手机号'));
            } else {
              callback();
            }
          }
        }, 300);
      };
      return {
        searchForm: {
          status: '',
          input: '',
          type: '',
          time: [null, null],
        },
        mobileForm: {
          name: 'alvin',
          iphone: '13100000000',
          newIphone: '',
        },
        mobileRules: {
          newIphone: [{ validator: validateNewPhone, trigger: 'blur' }],
        },
        tableData: [],
        multipleSelection: [],
        search: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        currentPage: 1,
        total: 10,
        myCurrentPage: 1,
        isDisabledInfo: true,
        isDisabledMobile: true,
        currentTab: 'list',
      }
    },
    methods: {
      getSelectedUserId() {
        let idArr = [];
        this.multipleSelection.forEach(v => {
          idArr.push(v.userId);
        });
        return idArr.join(',');
      },
      changeCondition() {
        let condition = '';
        if (this.searchForm.time[0]) {
          condition =
            `?param=${this.searchForm.input}&startTime=${formatDate(new Date(this.searchForm.time[0]), 'yyyy-MM-dd')}&endTime=${formatDate(new Date(this.searchForm.time[1]), 'yyyy-MM-dd')}&statu=${this.searchForm.status}`;
        } else {
          condition = `?param=${this.searchForm.input}&statu=${this.searchForm.status}`;
        }
        this.search = condition;
        this.fetchData(condition);
      },
      fetchData(search) {
        getAllMember(this.axios, search)
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handlePass() {
        let ids = this.getSelectedUserId();
        if (!ids) {
          this.$message({
            message: '请选择要操作的对象',
            type: 'info'
          });
        } else {
          this.$confirm('此操作将选定用户通过审核, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            NProgress.start();
            passMember(this.axios, { userId: ids })
              .then(response => {
                let data = response.data;
                if (data.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  this.handleCurrentChange(this.myCurrentPage);
                } else {
                  this.$message({
                    message: '操作失败',
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
      handleUnpass() {
        let ids = this.getSelectedUserId();
        if (!ids) {
          this.$message({
            message: '请选择要操作的对象',
            type: 'info'
          });
        } else {
          this.$confirm('此操作将选定用户修改为待审核状态, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            NProgress.start();
            unpassMember(this.axios, { userId: ids })
              .then(response => {
                let data = response.data;
                if (data.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  this.handleCurrentChange(this.myCurrentPage);
                } else {
                  this.$message({
                    message: '操作失败',
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
      handleBlock() {
        let ids = this.getSelectedUserId();
        if (!ids) {
          this.$message({
            message: '请选择要操作的对象',
            type: 'info'
          });
        } else {
          this.$confirm('此操作将禁止选中用户访问, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            NProgress.start();
            blockMember(this.axios, { userId: ids })
              .then(response => {
                let data = response.data;
                if (data.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '操作成功',
                    type: 'success'
                  });
                  this.handleCurrentChange(this.myCurrentPage);
                } else {
                  this.$message({
                    message: '操作失败',
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
      handleDelete() {
        let ids = this.getSelectedUserId();
        if (!ids) {
          this.$message({
            message: '请选择要操作的对象',
            type: 'info'
          });
        } else {
          this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                NProgress.start();
                deleteMember(this.axios, { userId: ids })
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
      handleMobile(index, row) {
        this.isDisabledMobile = false;
        this.currentTab = 'mobile';
        console.log(row.userId);
      },
      handleEdit(index, row) {
        this.isDisabledInfo = false;
        this.currentTab = 'info';
        console.log(row.userId);
      },
      clickTab() {
        this.isDisabledMobile = true;
        this.isDisabledInfo = true;
      },
      handleCurrentChange(page) {
        this.myCurrentPage = page;
        if (this.search) {
          this.fetchData(this.search + '&page=' + page)
        } else {
          this.fetchData('?page=' + page)
        }
      },
      modifyNumber(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: '请输入正确的值',
              type: 'error'
            });
            return false;
          }
        });
      },
    },
    filters: {
      formatTime(val) {
        return formatDate(new Date(val*1000), 'yyyy-MM-dd hh:mm:ss');
      },
      getStatus(val) {
        switch (val) {
          case 2:
            return '已审核';
            break;
          case 1:
            return '待审核';
            break;
          case -2:
            return '禁止访问';
            break;
        }
      },
    },
    created() {
      this.fetchData(this.search);
    },
  };
</script>

<style lang="sass" scoped>

</style>
