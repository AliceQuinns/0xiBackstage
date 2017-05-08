<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>后台操作日志</h3>

          <!--选项卡-->
          <el-row :gutter="20" class="deviation-top deviation-bottom">
            <el-col :span="24"  >
              <el-tabs type="border-card">

                <!--选项卡1-->
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 详细记录 </span>
                  <!--表单-->
                  <el-row>
                    <el-col :span="24">
                      <div>
                        <el-form :inline="true" :model="search">

                          <el-form-item label="会员名">
                            <el-input v-model="search.user" placeholder="会员名"></el-input>
                          </el-form-item>

                          <el-form-item prop="date" label="操作日期">
                            <el-date-picker
                              type="date"
                              placeholder="选择日期"
                              v-model="search.date"
                              style="width: 100%;">
                            </el-date-picker>
                          </el-form-item>

                          <el-form-item label="操作URL:">
                            <el-input v-model="search.url" placeholder="URL"></el-input>
                          </el-form-item>

                          <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form>
                      </div>
                    </el-col>
                  </el-row>
                  <el-table
                    ref="logTable"
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
                      label="账号"
                      prop="user"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="url"
                      label="操作的URL"
                      width="120">
                    </el-table-column>
                    <el-table-column
                      prop="scriptName"
                      width="120"
                      label="文件名">
                    </el-table-column>
                    <el-table-column
                      prop="time"
                      label="操作时间">
                    </el-table-column>
                  </el-table>
                  <div style="margin-top: 20px" class="clearfix">
                    <el-button @click="toggleSelection()">删除选择</el-button>
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

                <!--选项卡2-->
                <el-tab-pane label="清空日志">
                  <span slot="label"><i class="el-icon-date"></i> 清空日志 </span>
                  <el-row>
                    <el-col :span="24">
                      <div class="">
                        <span class="">清空日志</span>
                        <el-date-picker
                          v-model="dateSelectTwo"
                          type="date"
                          placeholder="选择开始日期"
                          :picker-options="calculationDate">
                        </el-date-picker>
                        <el-date-picker
                          v-model="timeSelectTwo"
                          type="date"
                          placeholder="选择结束日期"
                          :picker-options="calculationDate">
                        </el-date-picker>
                      </div>
                    </el-col>
                  </el-row>

                </el-tab-pane>

              </el-tabs>
            </el-col>
          </el-row>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      onSubmit() {
        console.log('submit!');
      },
      tableRowClassNames(row, index) {
        if (index === 1) {
          return 'info-row';
        }
        else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      fetchData() {

      },
    },
    data() {
      return {
        search: {
          user: '',
          url: '',
          date: '',
        },
        tableData: [],
        multipleSelection: [],
        calculationDate: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        dateSelectTwo : '',
        timeSelectTwo: '',
        defaultValue: 1,
        currentPage: 1,
        total: 10,
      }
    },
    created() {

    },
  }
</script>

<style lang="sass" scoped>
  .deviation-top
    margin-top: 2em
  .deviation-bottom
    margin-bottom: 2em
    margin-top: 0px
  h3
    line-height: 2em
  .pagination
    float: right
</style>
