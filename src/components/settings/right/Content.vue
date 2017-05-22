<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>首页内容配置</h3>
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> 首页产品</span>
              <el-row>
                <div class="module">
                  <span>疯狂抢购</span>
                  <el-button type="info" size="small" @click="addItem(1)">增加</el-button>
                </div>
                <el-col :span="3" v-for="(item, index) in listData" :key="item" class="listItem">
                  <el-card :body-style="{ padding: '0px'}">
                    <img :src="item.pic" class="image" @error="handleErrorSrc($event)">
                    <div style="padding: 14px;">
                      <span class="name">{{ item.name }}</span>
                      <div class="bottom clearfix">
                        <p><span class="address">{{ item.area }}</span></p>
                        <span class="price">{{ item.price | addCurrency }}</span>
                        <el-button type="danger" class="button" size="small" @click="deleteItem(1, item.id)">删除
                        </el-button>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <el-row>
                <div class="module">
                  <span>热卖商品</span>
                  <el-button type="info" size="small" @click="addItem(2)">增加</el-button>
                </div>
                <el-col :span="3" v-for="(item, index) in hotListData" :key="item" class="listItem">
                  <el-card :body-style="{ padding: '0px'}">
                    <img :src="item.pic" class="image" @error="handleErrorSrc($event)">
                    <div style="padding: 14px;">
                      <span class="name">{{ item.name }}</span>
                      <div class="bottom clearfix">
                        <p><span class="address">{{ item.area }}</span></p>
                        <span class="price">{{ item.price | addCurrency }}</span>
                        <el-button type="danger" class="button" size="small" @click="deleteItem(2, item.id)">删除
                        </el-button>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="首页分类" v-if="isShowCate">消息中心</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <div class="productDialog-wrapper" v-if="isShowDialog">
      <div class="productDialog">
        <div class="productDialog-header">
          <span>选择产品</span>
          <span class="el-icon-close closeDialog" @click="closeDialog"></span>
        </div>
        <div class="productDialog-body">
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="产品名称">
              <el-input v-model="searchForm.pname" placeholder="请输入产品名称"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称">
              <el-input v-model="searchForm.shopname" placeholder="请输入店铺名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="goSearch">查询</el-button>
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
              label="产品图片">
              <template scope="scope">
                <img :src="scope.row.pic" alt="" @error="handleErrorSrc($event)" style="width: 100px;height: 100px;">
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="产品名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="产品价格">
              <template scope="scope">{{ scope.row.price | addCurrency }}</template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-pagination
              class="pagination"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage3"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
        <div class="productDialog-footer">
          <el-button type="success" @click="saveModify">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let img = require('./default.png');
  import { getIndexContent, addIndexContent } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  import axios from 'axios'
  export default {
    data() {
      return {
        isShowCate: false,
        listData: [],
        hotListData: [],
        searchForm: {
          pname: '',
          shopname: ''
        },
        currentPage3: 1,
        total: 10,
        tableData: [],
        multipleSelection: [],
        isShowDialog: false,
        search: '',
        type: 1,
      }
    },
    methods: {
      fetchData(type, search) {
        getIndexContent(this.axios, search)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              if (type === 0) {
                this.tableData = result.data.displayData;
              } else if (type === 1) {
                this.listData = result.data.displayData;
              } else if (type === 2) {
                this.hotListData = result.data.displayData;
              }
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
      goSearch() {
        let search = `?type=${this.type}&pname=${this.searchForm.pname}&shopname=${this.searchForm.shopname}`;
        this.search = search;
        this.fetchData(0, search + '&page=1');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCurrentChange(val) {
        if (this.search) {
          this.fetchData(0, `${this.search}&page=${val}`);
        } else {
          this.fetchData(0, `?type=${this.type}&page=${val}`);
        }
      },
      handleErrorSrc(event) {
        event.target.src = img;
      },
      addItem(type) {
        this.isShowDialog = true;
        this.type = type;
        this.fetchData(0, `?type=${type}&page=1`);
      },
      closeDialog() {
        this.isShowDialog = false;
        this.searchForm.pname = '';
        this.searchForm.shopname = '';
      },
      saveModify() {
        if (this.multipleSelection.length > 0) {
          let idArr = [];
          this.multipleSelection.forEach(v => {
            idArr.push(v.id);
          });
          addIndexContent(this.axios, {
            type: this.type,
            ids: idArr.join(',')
          })
            .then(response => {
              let result = response.data;
              if (result.statusCode === STATUS_SUCCESS) {
                this.$message({
                  message: '成功',
                  type: 'success'
                });
                this.isShowDialog = false;
                this.searchForm.pname = '';
                this.searchForm.shopname = '';
                this.fetchData(this.type, `?type=${this.type}`);
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
            message: '请选择要操作的对象',
            type: 'info'
          });
        }
      },
      deleteItem(type, id) {
        this.$confirm('是否将此商品从此列表删除', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              NProgress.start();
              addIndexContent(this.axios, {
                type: 0,
                ids: id,
              })
                .then(response => {
                  let data = response.data;
                  if (data.statusCode === STATUS_SUCCESS) {
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                    this.fetchData(type, `?type=${type}`);
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
    },
    filters: {
      addCurrency(val) {
        return `￥${val}`
      },
    },
    created() {
      axios.all([getIndexContent(this.axios, '?type=1'), getIndexContent(this.axios, '?type=2')])
        .then(axios.spread((prev, cur) => {
          let result = prev.data;
          let result1 = cur.data;
          if (result.statusCode === STATUS_SUCCESS) {
            this.listData = result.data.displayData;
          }
          if (result1.statusCode === STATUS_SUCCESS) {
            this.hotListData = result1.data.displayData;
          }
        }));
    },
  };
</script>

<style lang="sass" scoped>
  .module
    margin-bottom: 20px
    background-color: #EFF2F7
    padding: 10px 0 10px 10px
    border-radius: 5px
    button
      margin-left: 10px
    .bottom
    margin-top: 13px
    line-height: 12px

  .button
    float: right

  .image
    width: 100%
    display: block

  .price
    color: #FF6F0F
  .productDialog-wrapper
    width: 100%
    height: 100%
    background-color: rgba(0,0,0,.4)
    position: fixed
    top: 0
    left: 0
    z-index: 99
    .productDialog
      width: 800px
      max-height: 500px
      overflow: auto
      position: absolute
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      background-color: rgba(255,255,255,1)
      .productDialog-header
        padding: 20px 20px 0
        .closeDialog
          float: right
          cursor: pointer
      .productDialog-body
        padding: 20px
      .productDialog-footer
        margin-top: 30px
        margin-bottom: 10px
        padding: 0 20px
        text-align: center
  .listItem
    height: 305px
    margin-top: 20px
    margin-right: 4.16667%
    .el-card
      height: 100%
      .name, .address
        display: inline-block
        height: 18px
        width: 100%
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
</style>
