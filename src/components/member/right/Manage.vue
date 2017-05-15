<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>会员管理</h3>
          <el-tabs type="border-card">
            <el-tab-pane>
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
                    v-model="time"
                    type="daterange"
                    align="right"
                    placeholder="选择日期范围"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select v-model="searchForm.status" placeholder="选择状态">
                    <el-option label="已审核" value="2"></el-option>
                    <el-option label="待审核" value="1"></el-option>
                    <el-option label="禁止访问" value="-2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改信息">修改信息</el-tab-pane>
            <el-tab-pane label="修改绑定手机号">修改绑定手机号</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchForm: {
          status: '',
          input: '',
          type: '',
          time: '',
        },
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
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      fetchData(search) {

      },
    }
  };
</script>

<style lang="sass" scoped>

</style>
