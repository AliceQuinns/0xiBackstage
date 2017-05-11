<template>
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="会员名">
      <el-input v-model="searchForm.user" placeholder="会员名"></el-input>
    </el-form-item>
    <el-form-item label="商铺名称">
      <el-input v-model="searchForm.company" placeholder="商铺名称"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" v-if="showTime">
      <el-date-picker
        v-model="searchForm.time"
        type="daterange"
        align="right"
        placeholder="选择日期范围"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="商铺分类">
      <el-select v-model="searchForm.catid" placeholder="商铺分类" clearable>
        <el-option
          v-for="item in shopTypeData"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="goSearch">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { formatDate } from '../../../common/js/util'
  import { getShopType } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  export default {
    name: 'search',
    props: {
      showTime: {
        type: Boolean,
      },
    },
    data() {
      return {
        searchForm: {
          user: '',
          company: '',
          catid: '',
          time: '',
        },
        shopTypeData: [],
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
      fetchData() {
        NProgress.start();
        getShopType(this.axios)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.shopTypeData = result.data;
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
            console.log(e);
            this.$message({
              message: '获取数据出错，请重新尝试',
              type: 'error'
            });
          });
      },
      goSearch() {
        let condition = `?user=${this.searchForm.user}&company=${this.searchForm.company}&catid=${this.searchForm.catid}`;
        if (this.searchForm.time && this.searchForm.time[0]) {
          let start = this.searchForm.time[0];
          let end = this.searchForm.time[1];
          condition = condition + '&startTime=' + formatDate(start, 'yyyy-MM-dd') + '&endTime=' + formatDate(end,
              'yyyy-MM-dd');
        } else {
          condition = condition + '&startTime=&endTime='
        }
        this.$emit('change-condition', condition);
      },
    },
    created() {
      this.fetchData();
    },
  }
</script>

<style lang="sass" scoped>

</style>
