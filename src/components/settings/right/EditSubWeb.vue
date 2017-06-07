<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>分站管理</h3>
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> 分站列表</span>
              <el-table :data="tableData" border>
                <el-table-column label="域名"></el-table-column>
                <el-table-column label="内容"></el-table-column>
                <el-table-column label="操作">
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-switch
                      v-model="scope.row.status"
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
            <el-tab-pane label="增加分站">
              <subweb-form></subweb-form>
            </el-tab-pane>
            <el-tab-pane label="修改分站">
              <subweb-form></subweb-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  let provinceData = require('../../../common/js/province.json');
  let cityData = require('../../../common/js/city.json');
  let areaData = require('../../../common/js/area.json');
  let SubwebForm = require('./Subweb-form.vue');
  import NProgress from 'nprogress'
  import { getOptionsData, addUser } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  export default {
    data() {
      return {
        tableData: [],
        currentPage: 1,
        total: 10,
      }
    },
    methods: {
      fetchData() {},
      handleEdit() {},
      handleDelete() {},
      submitForm() {},
      handleCurrentChange() {},
    },
    components: {
      SubwebForm
    },
    created() {},
  };
</script>

<style lang="sass" scoped>

</style>
