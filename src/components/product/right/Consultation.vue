<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>产品咨询</h3>

          <!-- 搜索表单 -->
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline marignbottom">

            <!-- 产品名称 -->
            <el-form-item label="产品名称">
              <el-input v-model="formInline.user" placeholder="请输入产品名称" icon="search"></el-input>
            </el-form-item>

            <!-- 咨询内容 -->
            <el-form-item label="咨询内容">
              <el-input v-model="formInline.text" placeholder="请输入咨询内容" icon="search"></el-input>
            </el-form-item>

            <!-- 咨询分类 -->
            <el-form-item label="咨询分类">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="已回复" value="1"></el-option>
                <el-option label="未回复" value="0"></el-option>
              </el-select>
            </el-form-item>

            <!-- 查询 -->
            <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
            </el-form-item>
          </el-form>

          <!-- 表格 -->
          <el-table
            :data="far.consults"
            scope="scope"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-for="far in tabelfor"
            :key="far"
            class="tabels">
            <el-table-column :render-header="(h, {column, $index}) =>
            { return renderHeader(h, column, $index, far.subhead, far.consults.length, far.id,far.price)
            }" class="theader">
              <!--批量删除-->
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>

              <!--咨询内容-->
              <el-table-column
                prop="question"
                label="咨询内容">
              </el-table-column>


              <!--回复-->
              <el-table-column
                prop="answer"
                label="回复">
              </el-table-column>

              <!--提问时间-->
              <el-table-column
                prop="questionTimeStr"
                label="提问时间">
              </el-table-column>

              <!--操作-->
              <el-table-column
                label="操作"
                width="100">
                <template
                  scope="scope">
                  <el-button
                    @click="deleteRow(scope.$index, scope.row)"
                    type="danger"
                    icon="delete"
                    size="small"
                    class="deletone">
                    删除
                  </el-button>
                </template>
              </el-table-column>

            </el-table-column>
          </el-table>

          <!-- 删除&分页 -->
          <div style="margin-top: 20px;">
            <el-button
              type="danger"
              :plain="true"
              icon="delete"
              @click="deleteItem()">
              删除
            </el-button>
            <el-pagination
              class="pagination"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /* 接口 */
  import NProgress from 'nprogress'
  import { consultations,deleteconsultations } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item";

  export default {
    data() {
      return {
        formInline: {user: '', region: '',text: ''},/* 搜索表单 */

        total: 10,/* 每页显示 */

        tableDataPage: [],/* 逻辑分页后表格*/

        multipleSelection: [],/* 批量删除复选框 */

        currentPage: 1,/* 分页默认显示页码 */

        tabelfor: '',/* 表格数组 */

        pages: '',/* 分页默认页码 */
      }
    },
    methods: {
      /* 查询产品咨询 */
      fetchData(obj) {
        NProgress.start();
        consultations(this.axios , obj)
          .then(
            response => {
              let groups = response.data;
              if (groups.statusCode === STATUS_SUCCESS) {
                this.total = groups.data.rows;
                this.tabelfor = groups.data.displayData;
              }
              NProgress.done();
            })
          .catch(e => {
            this.$message({
              message: '获取数据出错，请重新尝试',
              type: 'info'
            });
            console.log(e);
            NProgress.done();
          });
      },

      /* 搜素表单 */
      query() {
        this.fetchData({
          productName: this.formInline.user,/* 产品名称 */
          status: this.formInline.region,/* 咨询分类 */
          question: this.formInline.text,/* 咨询内容 */
        });
      },

      /* 获取单条产品咨询 */
      handleClick(id) {
        this.fetchData({productId: id});
      },

      /* 获取复选框 */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      /* 单条删除 */
      deleteRow(index, row) {
        this.$confirm('此操作将永久删除该店铺发货地址, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          deleteconsultations(this.axios, {consultIds: row.id})
            .then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.fetchData({page : this.pages});
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

      /* 批量删除 */
      deleteItem() {
        /*判断是否有选中*/
        if (this.multipleSelection.length <= 0) {
          console.log(this.multipleSelection);
          this.$message({
            message: '请选择要删除的项目',
            type: 'info'
          });
        } else {
          /*遍历出选中的id*/
          var selectGroup = [];
          var i;
          for(i = 0; i<this.multipleSelection.length; i++) {
            var select= this.multipleSelection[i].id;
            selectGroup.push(select);
          }
          console.log(selectGroup.join(','));
          this.$confirm('此操作将永久删除该产品评论, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            NProgress.start();
            deleteconsultations(this.axios, {consultIds: selectGroup.join(',')})
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.fetchData({page : this.pages});
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },

      /* 分页 */
      handleCurrentChange(val) {
        this.fetchData({page: val});
        this.pages = val;
      },

      /* render渲染 */
      renderHeader(h, column, $index, name, num, id,prices) {
        return h('div',
          [h('span', name),h('span',{style:{color: '#f00',marginLeft: '1em'},},`￥${prices}`),h('el-button',
          {attrs:
            {type:
            'primary', size:
            'small',icon:
            'search'},
            style:
            {float: 'right'}, on: {click: () => {this.handleClick(id)}}},
          `${num}条咨询`)]);
      },
    },
    created() {
      this.fetchData(0);
    },
  }
</script>

<style lang="sass" scoped>
  .tabels
    margin-top: 2em
    .marignbottom
      margin-bottom: -20px
    .theader
      color: #fff
</style>
