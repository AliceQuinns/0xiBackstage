<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>公告</h3>
          <el-tabs type="border-card">
            <el-tab-pane>
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
                      v-model="scope.row.displayOrder"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="标题"></el-table-column>
                <el-table-column label="内容" show-overflow-tooltip></el-table-column>
                <el-table-column label="状态" width="120px"></el-table-column>
                <el-table-column label="发布时间" show-overflow-tooltip>
                  <template scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px;" class="clearfix">
                <el-button type="primary" @click="handleSubmit">提交</el-button>
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
            <el-tab-pane label="增加">
              <bulletin-form></bulletin-form>
            </el-tab-pane>
            <el-tab-pane label="修改">
              <bulletin-form></bulletin-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import NProgress from 'nprogress'
  import { getOptionsData, addUser } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  let BulletinForm = require('./Bulletin-form.vue');
  export default {
    data() {
      return {
        tableData: [],
        currentPage: 1,
        total: 10,
        multipleSelection: [],
      }
    },
    methods: {
      fetchData() {},
      handleEdit() {},
      handleDelete() {},
      submitForm() {},
      handleCurrentChange() {},
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSubmit() {},
    },
    components: {
      BulletinForm
    },
    created() {},
  };
</script>

<style lang="sass" scoped>

</style>
