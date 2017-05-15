<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>产品管理</h3>

          <el-tabs type="border-card">
            <!-- 产品信息 -->
            <el-tab-pane>
              <span slot="label"><i class="el-icon-star-on"></i> 产品信息</span>
              <!-- 查询表单 -->
              <el-form
                :inline="true"
                :model="searchForm">

                <!-- 产品名称 -->
                <el-form-item
                  label="产品名称：">
                  <el-input
                    v-model="searchForm.company"
                    placeholder="请输入产品名称"
                    icon="search"
                    ref="searchForm">
                  </el-input>
                </el-form-item>

                <!-- 店铺名称 -->
                <el-form-item
                  label="店铺名称：">
                  <el-input
                    icon="search"
                    v-model="searchForm.shopName"
                    placeholder="请输入店铺名称">
                  </el-input>
                </el-form-item>

                <!-- 下拉框 -->
                <el-form-item
                  label="管理分类：">
                  <template>
                    <el-select
                      v-model="value"
                      placeholder="所有产品"
                      @change="dropdownQuery">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-form-item>

                <!-- 操作 -->
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="goSearch">查询
                  </el-button>
                  <el-button
                    @click="resetForm()">重置
                  </el-button>
                </el-form-item>

              </el-form>

              <!-- 表格 -->
              <el-table
                ref="multipleTable"
                :data="tableData"
                border
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <!-- 复选框 -->
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>

                <!--产品名称-->
                <el-table-column
                  label="产品名称"
                  width="450">
                  <template scope="scope">
                    <img  class="imgName"><!--:src="scope.row.pic"-->
                    <div class="textName">
                      <h4>标题：{{ scope.row.subhead }}</h4>
                      <span>
                    所属店铺：{{ scope.row.company }}
                  </span>
                      <span>所属分类：
                    {{ scope.row.firstCat }}
                    >
                    {{ scope.row.secondCat}}
                    >
                    {{ scope.row.thirdCat }}
                  </span>
                      <span>
                    所属品牌：{{ scope.row.brand }}
                  </span>
                    </div>
                  </template>
                </el-table-column>

                <!-- 销售价 -->
                <el-table-column
                  prop="price"
                  label="销售价">
                </el-table-column>

                <!-- 库存 -->
                <el-table-column
                  prop="stock"
                  label="库存">
                </el-table-column>

                <!-- 竞价排名 -->
                <el-table-column
                  prop="rank"
                  label="竞价排名">
                </el-table-column>

                <!-- 状态 -->
                <el-table-column
                  label="状态"
                  prop="statusStr">
                </el-table-column>

                <!-- 浏览 -->
                <el-table-column
                  prop="clicks"
                  label="浏览">
                </el-table-column>

                <!-- 更新时间 -->
                <el-table-column
                  prop="upStrTime"
                  label="更新时间"
                  width="180">
                </el-table-column>

                <!--操作-->
                <el-table-column
                  label="操作"
                  width="180">
                  <template
                    scope="scope">
                    <!-- 删除按钮 -->
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, scope.row)"
                      type="danger"
                      icon="delete"
                      size="small">
                      删除
                    </el-button>
                    <!-- 编辑按钮 -->
                    <el-button
                      @click.native.prevent="query(scope.$index, scope.row)"
                      icon="setting"
                      size="small">
                      编辑
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <!-- 按钮组 -->
              <div class="btnGroup">
                <!-- 可售 -->
                <el-button
                  type="success"
                  icon="share"
                  @click="updateStatusProduct(1)">可售
                </el-button>

                <!-- 推荐 -->
                <el-button
                  type="info"
                  @click="updateStatusProduct(2)">
                  <i class="el-icon-star-on el-icon--right"></i>推荐
                </el-button>

                <!-- 违规下架 -->
                <el-button
                  type="danger"
                  icon="delete"
                  @click="open3">违规下架
                </el-button>

              </div>

              <!-- 分页 -->
              <div
                style="margin-top: 20px"
                class="clearfix">
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

            <!-- 编辑产品 -->
            <el-tab-pane>
              <span slot="label"><i class="el-icon-edit"></i> 编辑产品</span>
              <h4 class="textHeader">操作提示:</h4>
              <p>
                <i class="el-icon-share"></i>
                    因为商城的所有产品是用来交易的，
                产品发布时有多种规格和内容要填，
                交易过程中也有很多环节相关联。
              </p>
              <p>
                <i class="el-icon-share"></i>
                    商家所发商品是私有的，
                在没有经过会员允许的情可下请不要擅自修改会员的产品信息．
                因此我们只保留极个别信息可以编辑．
              </p>
              <el-form
                ref="editform"
                :model="editform"
                label-width="80px"
                class="editForm">

                <!-- 产品名称 -->
                <el-form-item
                  label="产品名称"
                  prop="name"
                  :rules="[
                      { required: true, message: '请输入产品名称', trigger: 'blur' },
                      { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                  ]">
                  <el-input v-model="editform.name"></el-input>
                </el-form-item>

                <!-- 关键字 -->
                <el-form-item
                  label="关键字"
                  prop="Keyword"
                  :rules="[
                      { required: true, message: '关键字不能为空', trigger: 'blur' },
                      { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                  ]">
                  <el-input v-model="editform.Keyword"></el-input>
                </el-form-item>

                <!-- 竞价排名 -->
                <el-form-item
                  label="竞价排名"
                  prop="biddingRanking"
                  :rules="[
                      { required: true, message: '竞价排名不能为空'},
                      { type: 'number', message: '竞价排名必须为数字'}
                  ]">
                  <el-input v-model="editform.biddingRanking"></el-input>
                </el-form-item>

                <!-- 提交按钮 -->
                <el-button type="primary">提交</el-button>

              </el-form>
            </el-tab-pane>
          </el-tabs>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { formatDate } from '../../../common/js/util'
  import {
    inquiryCommodity,
    notAudited,
    illegalDelivery,
    updateStatus,
    deleteProduct,
    individualCommodity,} from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    data() {
      return {
        /* 表下拉框数据 */
        options: [
          {
          value: '1',
          label: '所有产品'
        },
          {
          value: '2',
          label: '待审核'
        },
          {
          value: '3',
          label: '违规下架产品'
        }
        ],
        value: '',

        /*产品编辑*/
        display: true,

        /* 查询表单 */
        searchForm: {
          company: '',
          shopName: '',
        },

        /* 表格 */
        tableData: [],

        /* 下架原因文本 */
        openText: '',

        /* 页码数 */
        currentPage: 1,

        /* 分页显示条数 */
        total: 10,

        /* 分页请求头 */
        search: " ",

        /* 当前页码数 */
        pageNumber: '',

        /* 选中的复选框 */
        multipleSelection: [],

        /* 编辑表单 */
        editform: {
          name: '',
          Keyword: '',
          biddingRanking: '',
        },
      }
    },
    methods: {
      /* 查询商品 */
      fetchData(search) {
        inquiryCommodity(this.axios, search)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.total = result.data.rows;
              this.tableData = result.data.displayData;
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

      /* 查询未审核的商品 */
      shuonotAudited(search) {
        notAudited(this.axios, search)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.total = result.data.rows;
              this.tableData = result.data.displayData;
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

      /* 查询违规下架的商品 */
      shelfGoods(search) {
        illegalDelivery(this.axios, search)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.total = result.data.rows;
              this.tableData = result.data.displayData;
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

      /* 下拉菜单查询 */
      dropdownQuery() {
        console.log(this.value);
        if(this.value == 1) {
          this.fetchData('');
        }else if(this.value == 2){
          this.shuonotAudited('');
        }else if(this.value == 3) {
          this.shelfGoods('');
        };
      },

      /* 遍历复选框 !!返回字符串 */
      ergodic() {
        var selectGroup = [];
        for(var i = 0; i<this.multipleSelection.length; i++) {
          var select= this.multipleSelection[i].id;
          selectGroup.push(select);
        };
        return selectGroup.join(',');
      },

      /* 下架原因对话框 */
      open3() {
        var text= this.ergodic();
        if (text.length == 0) {
          this.$message({
            message: '请选择要操作的项目',
            type: 'info'
          });
        }else {
          this.$prompt('请输入下架原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            if(value != null) {
              this.openText = value;
              this.updateStatusProduct(-1);
              this.$message({
                type: 'success',
                message: '提交成功'
              });
            }else if(value == null){
              this.$message({
                type: 'error',
                message: '您未输入下架原因'
              });
            }

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消输入'
            });
          });
        }
      },

      /* 更新商品状态 */
      updateStatusProduct(status) {
        var text= this.ergodic();
        if (text.length == 0) {
          this.$message({
            message: '请选择要操作的项目',
            type: 'info'
          });
        }
        else {
          if(status == 1 || status == 2) {
            this.openText = '';
          };
          updateStatus(this.axios, {
            productIds: text,
            status: status.toString(),
            reason: this.openText
          })
            .then(response => {
              let result = response.data;
              if (result.statusCode === STATUS_SUCCESS) {
                this.fetchData('?page=' + this.pageNumber);
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
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
        };
      },

      /* 重置表单 */
      resetForm() {
        this.searchForm.company = '';
        this.searchForm.shopName = '';
      },

      /* 拼接请求 */
      goSearch() {
        this.search = `?company=${this.searchForm.company}&shop_statu=${this.searchForm.shopName}`;
        this.fetchData(this.search);
      },

      /* 编辑表单 */
      onSubmit() {
        console.log('submit!');
      },

      /* 分页 */
      handleCurrentChange(val) {
        if (!this.search) {
          this.fetchData(`?page=${val}`);
        } else {
          this.fetchData('?page=' + val);
          this.pageNumber = val;
        }
      },

      /* 选中的复选框 */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      /* 单条删除 */
      deleteRow(index, row) {
        this.$confirm('此操作将永久删除该会员等级, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          deleteProduct(this.axios, {productIds: row.id})
            .then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.tableData.splice(index, 1);
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
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

      /* 单条信息查询 */
      query() {},

    },
    created() {
      this.fetchData(this.search);
    },
  };
</script>

<style lang="sass" scoped>
  .textHeader
    background-color: #eef1f6
    line-height: 3em
    font-size: 1.1em
    padding-left: 2em
    margin-bottom: 1em
  .imgName
    display: inline-block
    width: 80px
    height: 80px
    border: 0px solid #ccc
    margin: 0.5em
    margin-left: 0px
  .textName
    display: inline-block
    h4
      color: #20a0ff
    span
      display: block
  .btnGroup
    min-width: 50%
    float: left
    margin-top: 20px
  .shelfReason
    width: 50%
    margin-left: 1em
  .editForm
    width: 26%
</style>
