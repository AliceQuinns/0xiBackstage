<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container clearfix">
          <h3>会员订单管理</h3>
          <el-tabs type="border-card" v-model="currentTab" @tab-click="clickTab">
            <el-tab-pane name="list">
              <span slot="label"><i class="el-icon-date"></i> 订单列表</span>
              <div class="search">
                <h3>
              <span @click="toggleSearchForm">
                <i class="el-icon-plus" v-show="!isShowForm"></i>
                <i class="el-icon-minus" v-show="isShowForm"></i> 搜索条件
              </span>
                </h3>
                <el-col :span="10">
                  <transition name="fade">
                    <el-form v-show="isShowForm" ref="form" :model="form" label-width="100px">
                      <el-form-item label="买家会员名">
                        <el-input v-model="form.buyer"></el-input>
                      </el-form-item>
                      <el-form-item label="卖家店铺名">
                        <el-input v-model="form.seller"></el-input>
                      </el-form-item>
                      <el-form-item label="保证金">
                        <el-select v-model="form.isdeposit">
                          <el-option label="所有" value="-1"></el-option>
                          <el-option label="有" value="1"></el-option>
                          <el-option label="没有" value="0"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="POS押金">
                        <el-select v-model="form.ispos">
                          <el-option label="所有" value="-1"></el-option>
                          <el-option label="有" value="1"></el-option>
                          <el-option label="没有" value="0"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="下单时间">
                        <el-date-picker
                          v-model="form.time"
                          type="daterange"
                          align="left"
                          clearable
                          placeholder="选择日期范围"
                          :picker-options="pickerOptions">
                        </el-date-picker>
                      </el-form-item>
                      <el-form-item label="订单状态">
                        <el-checkbox-group v-model="form.statusArr">
                          <el-checkbox label="已删除" name="status" value="-1"></el-checkbox>
                          <el-checkbox label="等待买家付款" name="status" value="1"></el-checkbox>
                          <el-checkbox label="待确认" name="status" value="9"></el-checkbox>
                          <el-checkbox label="已付款" name="status" value="2"></el-checkbox>
                          <el-checkbox label="卖家已发货" name="status" value="3"></el-checkbox>
                          <el-checkbox label="交易成功" name="status" value="4"></el-checkbox>
                          <el-checkbox label="退款中" name="status" value="5"></el-checkbox>
                          <el-checkbox label="退款成功" name="status" value="6"></el-checkbox>
                          <el-checkbox label="交易关闭" name="status" value="0"></el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                      <el-form-item label="城市分站">
                        <el-select v-model="form.station">
                          <el-option
                            v-for="item in stations"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="是否标注结算">
                        <el-select v-model="form.isconf">
                          <el-option label="已标注" value="1"></el-option>
                          <el-option label="未标注" value="0"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="goSearch">搜索</el-button>
                      </el-form-item>
                    </el-form>
                  </transition>
                </el-col>
                <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column type="expand">
                    <template scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="收货人">
                          <span>{{ props.row.consignee }}</span>
                        </el-form-item>
                        <el-form-item label="收货人电话">
                          <span>{{ props.row.consigneeTel }}</span>
                        </el-form-item>
                        <el-form-item label="买家">
                          <span>{{ props.row.buyer }}</span>
                        </el-form-item>
                        <el-form-item label="买家电话">
                          <span>{{ props.row.buyermobile }}</span>
                        </el-form-item>
                        <el-form-item label="卖家用户">
                          <span>{{ props.row.selleruser }}</span>
                        </el-form-item>
                        <el-form-item label="卖家店铺名">
                          <span>{{ props.row.company }}</span>
                        </el-form-item>
                        <el-form-item label="卖家POS押金">
                          <span>{{ props.row.posmoney | fixDigit }}</span>
                        </el-form-item>
                        <el-form-item label="卖家保证金">
                          <span>{{ props.row.earnestmoney | fixDigit }}</span>
                        </el-form-item>
                        <el-form-item label="订单地区">
                          <span>{{ props.row.area }}</span>
                        </el-form-item>
                        <el-form-item label="标注备注">
                          <span>{{ props.row.des }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="orderId"
                    label="订单编号">
                  </el-table-column>
                  <el-table-column
                    label="订单状态">
                    <template scope="scope">{{ scope.row.status | sematicStatus }}</template>
                  </el-table-column>
                  <el-table-column
                    label="运费">
                    <template scope="scope">{{ scope.row.freight | fixDigit }}</template>
                  </el-table-column>
                  <el-table-column
                    label="金额">
                    <template scope="scope">{{ scope.row.price | fixDigit }}</template>
                  </el-table-column>
                  <!--<el-table-column
                    label="订购时间">
                    <template scope="scope">{{ scope.row.createTime | sematicCon }}</template>
                  </el-table-column>-->
                  <el-table-column
                    label="标注时间">
                    <template scope="scope">{{ scope.row.conftime | sematicCon }}</template>
                  </el-table-column>
                  <el-table-column label="操作" width="300">
                    <template scope="scope">
                      <el-button
                        size="small"
                        @click="handleDetail(scope.$index, scope.row)" type="primary">查看详情</el-button>
                      <el-button
                        v-if="scope.row.status !== -1"
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      <el-button
                        v-if="!scope.row.conftime"
                        size="small"
                        type="success"
                        @click="handleClose(scope.$index, scope.row)">标注结算</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="clearfix" style="margin-top: 20px;">
                  <el-pagination
                    v-show="this.total !== 0"
                    class="pagination"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="10"
                    layout="prev, pager, next, jumper"
                    :total="total">
                  </el-pagination>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="detail" label="订单详情" :disabled="isDisabled">
              <div class="orderDetail">
                <h3>订单详情</h3>
                <ul>
                  <li>订单编号：{{ detail.orderId }}</li>
                  <li>订单状态：{{ detail.status | sematicStatus }}</li>
                  <!--<li>订购时间：{{ detail }}</li>-->
                  <li>收货人：{{ detail.consignee }}</li>
                  <li>收货人地址：{{ detail.consigneeAddress }}</li>
                  <li>收货人联系方式：{{ detail.consigneeTel }}</li>
                  <li>运送方式：{{ detail.logistics }}</li>
                  <li>运送总价：{{ detail.freight | fixDigit }}</li>
                  <li>商品总价：{{ detail.price | fixDigit }}</li>
                </ul>
              </div>
              <div class="productDetail">
                <h3>商品详情</h3>
                <ul v-if="detail.orderPros && detail.orderPros.length > 0">
                  <li v-for="item in detail.orderPros">
                    <div class="item">
                      <div>
                        <img :src="item.pic" alt="" @error="handleErrorAdd($event)">
                      </div>
                      <div class="info">
                        <p>产品名称：<a target="_blank" :href="`http://mall.0xi.cn/selectProduct?productId=${item.id}`">{{ item.name }}</a></p>
                        <p>产品单价：{{ item.price }}</p>
                        <p>产品数量：{{ item.num }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <p class="notice" v-else>暂无商品详情</p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getSubStations, getOrders, deleteOrder, confirmOrder, getOrderDetail } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  import { formatDate } from '../../../common/js/util'
  import axios from 'axios'
  let statusMap = {
    "已删除": -1,
    "等待买家付款": 1,
    "待确认": 9,
    "已付款": 2,
    "卖家已发货": 3,
    "交易成功": 4,
    "退款中": 5,
    "退款成功": 6,
    "交易关闭": 0
  };
  export default {
    data() {
      return {
        form: {
          buyer: '',
          seller: '',
          isdeposit: '',
          ispos: '',
          time: [],
          statusArr: [],
          station: '',
          isconf: ''
        },
        stations: [],
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
        isShowForm: true,
        tableData: [],
        currentPage: 1,
        total: 10,
        search: {},
        detail: '',
        currentTab: 'list',
        isDisabled: true,
      }
    },
    methods: {
      goSearch() {
        Object.assign(this.search, this.form);
        if (this.search.time.length > 0) {
          this.search.stime = formatDate(this.search.time[0], 'yyyy-MM-dd');
          this.search.etime = formatDate(this.search.time[1], 'yyyy-MM-dd');
        } else {
          this.search.stime = '';
          this.search.etime = '';
        }
        if (this.search.statusArr.length > 0) {
          this.search.statusArr = this.search.statusArr.map(v => {
            return statusMap[v];
          });
          this.search.status = this.search.statusArr.join(',');
        } else {
          this.search.status = '';
        }
        if (this.currentPage === 1) {
          this.fetchData(this.search);
        } else {
          this.currentPage = 1;
        }
      },
      toggleSearchForm() {
        this.isShowForm = !this.isShowForm;
      },
      detectNull(val) {
        return !val ? '' : val
      },
      handleDetail(index, row) {
        NProgress.start();
        getOrderDetail(this.axios, {id: row.id})
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.isDisabled = false;
              this.currentTab = 'detail';
              this.detail = result.data;
            } else {
              this.$message({
                message: '获取订单详情失败，请重试',
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
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该订单, 是否继续?', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              NProgress.start();
              deleteOrder(this.axios, { id: row.id })
                .then(response => {
                  let data = response.data;
                  if (data.statusCode === STATUS_SUCCESS) {
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
                    this.fetchData(this.search);
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
      handleClose(index, row) {
        this.$prompt('标注结算', '请输入备注', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if (!value) {
            value = '';
          }
          NProgress.start();
          confirmOrder(this.axios, {
            id: row.id,
            des: value
          })
            .then(response => {
              let result = response.data;
              if (result.statusCode === STATUS_SUCCESS) {
                this.$message({
                  message: '标注结算成功',
                  type: 'success'
                });
                this.fetchData(this.search);
              } else {
                this.$message({
                  message: '标注结算失败，请重试',
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.search.page = val;
        this.fetchData(this.search);
      },
      fetchData(search) {
        NProgress.start();
        getOrders(this.axios, {param: JSON.stringify(search)})
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.tableData = result.data.displayData;
              this.total = result.data.total;
              this.isShowForm = false;
            } else {
              this.$message({
                message: '获取数据失败，请重试',
                type: 'error'
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
      },
      handleErrorAdd(e) {
        e.target.src = 'http://element.eleme.io/static/hamburger.50e4091.png';
      },
      clickTab() {
        this.isDisabled = true;
      },
    },
    filters: {
      sematicStatus(val) {
        switch (val) {
          case -1 :
            return "已删除";
            break;
          case 1:
            return "等待买家付款";
            break;
          case 9:
            return "待确认";
            break;
          case 2:
            return "已付款";
            break;
          case 3:
            return "卖家已发货";
            break;
          case 4:
            return "交易成功";
            break;
          case 5:
            return "退款中";
            break;
          case 6:
            return "退款成功";
            break;
          case 0:
            return "交易关闭";
            break;
        }
      },
      fixDigit(val) {
        if (!val) val = 0;
        return val.toFixed(2);
      },
      sematicCon(val) {
        if (!val) {
          return "未标注"
        } else {
          return formatDate(new Date(val*1000), 'yyyy-MM-dd hh:mm:ss')
        }
      },
    },
    created() {
      NProgress.start();
      axios.all([getSubStations(this.axios), getOrders(this.axios, {param: {}})])
        .then(axios.spread((acct, perms) => {
          let result = acct.data;
          if (result.statusCode === STATUS_SUCCESS) {
            this.stations = result.data.map(v => {
              let value = this.detectNull(v.province) + ' ' + this.detectNull(v.city) + ' ' + this.detectNull(v.area);
              return { value }
            });
          } else {
            this.$message({
              message: '城市分站数据获取失败',
              type: 'error'
            });
          }
          let result1 = perms.data;
          if (result1.statusCode === STATUS_SUCCESS) {
            this.tableData = result1.data.displayData;
            this.total = result1.data.total;
          } else {
            this.$message({
              message: '订单数据获取失败',
              type: 'error'
            });
          }
          NProgress.done();
        }))
        .catch(e => {
          this.$message({
            message: '出现未知错误，请重试',
            type: 'error'
          });
        });
    },
  };
</script>

<style lang="sass" scoped>
  .search h3
    margin-bottom: 10px
    span
      cursor: pointer
  .fade-enter-active, .fade-leave-active
    transition: opacity .5s
  .fade-enter, .fade-leave-active
    opacity: 0
  .demo-table-expand
    font-size: 0
  .demo-table-expand label
    width: 90px
    color: #99a9bf
  .demo-table-expand .el-form-item
    margin-right: 0
    margin-bottom: 0
    width: 50%
  ul
    list-style-type: none
  .orderDetail
    ul
      width: 500px
      li
        padding: 5px 0
        border-bottom: 1px solid #999999
        &:first-of-type
          border-top: 1px solid #999999
  .productDetail
    li
      .item > div
        display: inline-block
        vertical-align: top
      .info
        margin-left: 20px
    .notice
      color: red
</style>
