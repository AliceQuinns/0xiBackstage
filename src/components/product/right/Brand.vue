<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>品牌管理</h3>

          <el-tabs
            type="border-card"
            v-model="editableTabsValue">
            <!-- 管理 -->
            <el-tab-pane>
              <span
                slot="label"
                @click= "displayshow"
                class="spanblock"><i class="el-icon-star-on"></i> 管理</span>
              <!-- 查询表单 -->
              <el-form
                :inline="true"
                :model="searchForm">

                <!-- 品牌名称 -->
                <el-form-item
                  label="品牌名称：">
                  <el-input
                    v-model="searchForm.company"
                    placeholder="请输入品牌名称"
                    icon="search"
                    ref="searchForm">
                  </el-input>
                </el-form-item>

                <!-- 操作 -->
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="goSearch">查询
                  </el-button>
                </el-form-item>

              </el-form>

              <!-- 表格 -->
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">

                <!-- 复选框 -->
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>

                <!-- 修改文本框 -->
                <el-table-column
                  label="修改排序"
                  prop="displayorder"
                  width="100">
                  <template
                    scope="scope">
                    <el-input
                      type='number'
                      placeholder="排序"
                      class="nameInput"
                      v-model="scope.row.displayorder">
                    </el-input>
                  </template>
                </el-table-column>

                <!--logo-->
                <el-table-column
                  label="品牌名称"
                  width="100">
                  <template scope="scope">
                    <img  class="imgName" :src="scope.row.logo">
                  </template>
                </el-table-column>

                <!-- 品牌名 -->
                <el-table-column
                  prop="name">
                </el-table-column>

                <!-- 分类名 -->
                <el-table-column
                  prop="catname"
                  label="分类名">
                </el-table-column>

                <!-- 状态 -->
                <el-table-column
                  prop="status"
                  label="状态">
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
                      @click="clickShow(scope.$index, scope.row)"
                      icon="setting"
                      size="small">
                      编辑
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <!-- 按钮组 -->
              <div class="btnGroup">
                <!-- 提交 -->
                <el-button
                  icon="upload"
                  @click="modifySorts">提交
                </el-button>

                <!-- 开启 -->
                <el-button
                  type="success"
                  icon="share"
                  @click="updateStatusProduct(1)">开启
                </el-button>

                <!-- 推荐 -->
                <el-button
                  type="info"
                  @click="updateStatusProduct(2)">
                  <i class="el-icon-star-on el-icon--right"></i>推荐
                </el-button>

                <!-- 关闭 -->
                <el-button
                  type="danger"
                  icon="delete"
                  @click="updateStatusProduct(0)">关闭
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

            <!-- 添加 -->
            <el-tab-pane>
              <span slot="label" @click= "displayshow"><i class="el-icon-star-on"></i> 添加</span>
              <el-form
                ref="editform"
                :model="editform"
                label-width="80px"
                class="editForm">

                <!-- 品牌 -->
                <el-form-item
                  label="品牌名称"
                  prop="subhead"
                  :rules="[
                      { required: true, message: '请输入品牌名称', trigger: 'blur' },
                      { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                  ]">
                  <el-input v-model="editform.subhead"></el-input>
                </el-form-item>

                <!-- 分类 -->
                <el-form-item
                  label="分类">
                  <el-select
                    v-model="value"
                    placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.catname"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <!-- logo -->
                <el-form-item
                label="logo">
                  <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>

                <!-- 点击数 -->
                <el-form-item
                  label="点击数"
                  prop="rank"
                  :rules="[
                      { required: true, message: '点击数不能为空'},
                      { type: 'number', message: '点击数必须为数字'}
                  ]">
                  <el-input
                    v-model.number="editform.rank"
                    type="number"></el-input>
                </el-form-item>

                <!-- 状态 -->
                <el-form-item
                  label="状态">
                  <el-switch v-model="value2" on-color="#13ce66" off-color="#ff4949">
                  </el-switch>
                </el-form-item>

                <!-- 提交按钮 -->
                <el-form-item>
                  <el-button type="primary" @click="submitFormEdit('editform')">提交</el-button>
                  <el-button @click="resetForm2('editform')">重置</el-button>
                </el-form-item>

              </el-form>
            </el-tab-pane>

            <!-- 修改产品 -->
            <el-tab-pane
              v-if="display">
              <span slot="label"><i class="el-icon-edit"></i> 修改</span>
              <el-form
                ref="editformTwo"
                :model="editformTwo"
                label-width="80px"
                class="editformTwo">

                <!-- 品牌 -->
                <el-form-item
                  label="品牌"
                  prop="name"
                  :rules="[
                      { required: true, message: '请输入品牌名称', trigger: 'blur' },
                      { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
                  ]">
                  <el-input v-model="editformTwo.name"></el-input>
                </el-form-item>

                <!-- 分类 -->
                <el-form-item
                  label="分类">
                  <el-select
                    v-model="catidTwo"
                    placeholder="请选择">
                    <el-option
                      v-for="item in optionsTwo"
                      :key="item.id"
                      :label="item.catname"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

                <!-- logo -->
                <el-form-item
                  label="logo">
                  <el-upload class="upload-demo" drag action="" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>

                <!-- 点击数 -->
                <el-form-item
                  label="点击数"
                  prop="hits"
                  :rules="[
                      { required: true, message: '点击数不能为空'},
                      { type: 'number', message: '点击数必须为数字'}
                  ]">
                  <el-input v-model.number="editformTwo.hits" type="number"></el-input>
                </el-form-item>

                <!-- 状态 -->
                <el-form-item
                  label="状态">
                  <el-switch v-model="value3" on-color="#13ce66" off-color="#ff4949">
                  </el-switch>
                </el-form-item>

                <!-- 提交按钮 -->
                <el-form-item>
                  <el-button type="primary" @click="submitFormEdittwo('editformTwo')">提交</el-button>
                  <el-button @click="resetForm2('editformTwo')">重置</el-button>
                </el-form-item>

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
    queryBrand,/* 查询品牌 */
    addQueryBrand,/* 添加品牌 */
    deleteQueryBrand,/* 删除品牌 */
    modifyState,/* 修改品牌状态 */
    modifySort,/* 修改品牌排序值 */
    queryselect,/* 获取下拉菜单选项 */
  } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    components: {ElFormItem},
    data() {
      return {
        /* 添加-开关 */
        value2: false,

        /* 编辑-开关 */
        value3: false,

        /* 默认页码 */
        editableTabsValue: '0',

        /* 添加-下拉框数据 */
        options: [],
        value: '',

        /* 编辑-下拉框数据 */
        optionsTwo: [],
        catidTwo: '',

        /*产品编辑*/
        display: false,

        /* 修改品牌Id */
        addId: '',

        /* 搜索筛选表单 */
        searchForm: {
          company: '',
        },

        /* 表格 */
        tableData: [],

        /* 页码数 */
        currentPage: 1,

        /* 分页显示条数 */
        total: 10,

        /* 搜索筛选请求头 */
        search: "",

        /* 当前页码数 */
        pageNumber: '',

        /* 选中的复选框 */
        multipleSelection: [],

        /* 添加表单 */
        editform: {
          subhead: '',/* 品牌名称 */
          rank: '',/* 点击数 */
        },

        /* 修改表单 */
        editformTwo: {
          name: '',/* 品牌名称 */
          hits: '',/* 点击数 */
        }
      }
    },
    methods: {
      /* 查询商品 */
      fetchData(search) {
        queryBrand(this.axios, search)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.total = result.data.rows;
              this.tableData = result.data.diaplayData;
              for (var i=0; i<this.tableData.length; i++) {
                if(this.tableData[i].status == 1) {
                  this.tableData[i].status = '开启'
                }else if(this.tableData[i].status == 2) {
                  this.tableData[i].status = '推荐';
                }else if(this.tableData[i].status == 0) {
                  this.tableData[i].status = '关闭'
                }
              };
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

      /* 获取下拉菜单 */
      select() {
        queryselect(this.axios)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.options = result.data.displayData;
              this.optionsTwo = result.data.displayData;
              console.log(result.data.displayData);
            } else {
              this.$message({
                message: '获取下拉菜单出错，请重新尝试',
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

      /* 遍历复选框 !!返回字符串 */
      ergodic() {
        var selectGroup = [];
        for(var i = 0; i<this.multipleSelection.length; i++) {
          var select= this.multipleSelection[i].id;
          selectGroup.push(select);
        };
        return selectGroup.join(',');
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
          modifyState(this.axios, {
            ids: text,
            status: status.toString(),
          })
            .then(response => {
              let result = response.data;
              if (result.statusCode === STATUS_SUCCESS) {
                this.fetchData({page: this.pageNumber});
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

      /* 搜索筛选 */
      goSearch() {
        this.search = {brandName: this.searchForm.company};
        console.log(this.searchForm.company);
        this.fetchData(this.search);
      },

      /* 添加表单 */
      submitFormEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            NProgress.start();
            addQueryBrand(this.axios,{
              catid: this.value,/* 品牌分类 */
              hits: this.editform.rank,/* 点击数 */
              status: this.value2 ? 1 : 0,/* 状态 */
              brandNames: this.editform.subhead,/* 品牌分类 */
            })
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: '修改失败，请重试',
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
            console.log('error submit!!');
            return false;
          }
        });
      },

      /* 修改品牌排序 */
      modifySorts() {
          var selectGroup = [];
          var displayorder = [];
          for(var i = 0; i<this.multipleSelection.length; i++) {
            var select= this.multipleSelection[i].id;
            var displayorders= this.multipleSelection[i].displayorder;
            selectGroup.push(select);
            displayorder.push(displayorders);
          };
          var text = selectGroup.join(',');
          var doss = displayorder.join(',');
        if (text.length == 0) {
          this.$message({
            message: '请选择要操作的项目',
            type: 'info'
          });
        }
        else {
          modifySort(this.axios, {
            ids: text,
            dos: doss
          })
            .then(response => {
              let result = response.data;
              if (result.statusCode === STATUS_SUCCESS) {
                this.fetchData({page: this.pageNumber});
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

      /* 修改表单 */
      submitFormEdittwo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            NProgress.start();
            addQueryBrand(this.axios,{
              id: this.addId,/* 修改id */
              catid: this.catidTwo,/* 品牌分类 */
              hits: this.editformTwo.hits,/* 点击数 */
              status: this.value3 ? 1 : 0,/* 状态 */
              brandNames: this.editformTwo.name,/* 品牌名 */
            })
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: '修改失败，请重试',
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
            console.log('error submit!!');
            return false;
          }
        });
      },

      /* 重置编辑表单 */
      resetForm2(formName) {
        this.$refs[formName].resetFields();
      },

      /* 分页 */
      handleCurrentChange(val) {
        this.fetchData({page: val});
        this.pageNumber = val;
      },

      /* 选中的复选框 */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      /* 删除 */
      deleteRow(index, row) {
        this.$confirm('此操作将永久删除该会员等级, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          deleteQueryBrand(this.axios, {brandId: row.id})
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

      /* 显示选项卡 */
      displayshow() {
        this.display = false;
      },

      /* 获取单条信息 */
      clickShow: function(index, row){
        this.display = !this.display;
        this.editableTabsValue = '2';
        NProgress.start();
        queryBrand(this.axios,{brandId: row.id})
          .then(response => {
            let groups = response.data;
            if (groups.statusCode === STATUS_SUCCESS) {
              this.editformTwo = groups.data.diaplayData[0];
              this.catidTwo = groups.data.diaplayData[0].catid;
              this.addId = row.id;
              if (groups.data.diaplayData[0].status == 1) {
                groups.data.diaplayData[0].status = true;
              }else if(groups.data.diaplayData[0].status == 0) {
                groups.data.diaplayData[0].status = false;
              }
              this.value3 = groups.data.diaplayData[0].status;
              NProgress.done();
            }
          })
          .catch(e => {
            this.$message({
              message: '获取数据出错，请重新尝试',
              type: 'error'
            });
            console.log(e);
            NProgress.done();
          });
      },
    },
    created() {
      this.fetchData(this.search);
      this.select();
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
    .editForm,.editformTwo
      width: 26%
    .spanblock
      display: block
    .nameInput
      margin: 0.5em
      max-width: 20em
</style>
