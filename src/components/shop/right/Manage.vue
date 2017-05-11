<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>店铺</h3>
          <el-tabs type="border-card" v-model="currentTab" @tab-click="clickTab">
            <el-tab-pane name="list">
              <span slot="label"><i class="el-icon-date"></i> 管理</span>
              <search @change-condition="changeCondition" :show-time="isShowTime"></search>
              <table-list :table-data="tableData" :total="total" @change-page="changePage"
                          @edit="editInfo"></table-list>
            </el-tab-pane>
            <el-tab-pane :disabled="isDisabled" name="info">
              <span slot="label"><i class="el-icon-edit"></i> 修改</span>
              <info :shop-info="shopInfo" :grade-data="shopGradeData" :type-data="shopTypeData"></info>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Search from './Search.vue'
  import TableList from './TableList.vue'
  import Info from './Info.vue'
  import { getAllShopInfo, getDistributionInfo, getShopInfo } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  export default {
    data() {
      return {
        tableData: [],
        total: 10,
        isDisabled: true,
        search: '',
        shopInfo: {},
        shopGradeData: [],
        shopTypeData: [],
        currentTab: 'list',
        isShowTime: true,
      }
    },
    methods: {
      fetchData(search) {
        NProgress.start();
        getAllShopInfo(this.axios, search)
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
      changePage(page) {
        if (this.search) {
          this.fetchData(this.search + '&page=' + page)
        } else {
          this.fetchData('?page=' + page)
        }
      },
      changeCondition(condition) {
        this.search = condition;
        this.fetchData(condition);
      },
      editInfo(userid, shopType) {
        NProgress.start();
        if (shopType === 1) {
          getDistributionInfo(this.axios, userid)
            .then(response => {
              let result = response.data;
              if (result.statusCode === STATUS_SUCCESS) {
                this.isDisabled = false;
                this.currentTab= 'info';
                this.shopInfo = result.data;
                this.shopGradeData = result.data1;
                this.shopTypeData = result.data2;
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
        } else {
          getShopInfo(this.axios, userid)
            .then(response => {
              let result = response.data;
              if (result.statusCode === STATUS_SUCCESS) {
                this.isDisabled = false;
                this.currentTab= 'info';
                this.shopInfo = result.data;
                this.shopGradeData = result.data1;
                this.shopTypeData = result.data2;
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
        }
      },
      clickTab(tab) {
        this.isDisabled = true;
      },
    },
    created() {
      this.fetchData(this.search);
    },
    components: {
      Search,
      TableList,
      Info,
    }
  };
</script>

<style lang="sass" scoped>

</style>
