<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>会员等级</h3>
          <el-tabs
            type="border-card"
            v-model="editableTabsValue"
            @tab-click="display = false">
      <!-- 管理 -->
            <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> 管理</span>
              <!-- 提示语 -->
              <p class="topicTags">操作提示</p>
              <ul class="promptMessage">
                <li><i class="el-icon-share"></i>
                  &nbsp;&nbsp;会员等级默认包括1种会员等级。默认会员等级不可以删除。
                </li>
                <li><i class="el-icon-share"></i>
                  &nbsp;&nbsp;如果会员等级不够，可以自定义添加。自定义会员等级可以删除。
                </li>
              </ul>
              <!-- 表格 -->
              <el-table
                :data="tableData"
                scopeone="scope"
                border
                ref="multipleTable"
                style="width: 100%"
                @selection-change="handleSelectionChange">

                <!--批量删除-->
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>

                <!--名称-->
                <el-table-column
                  label="名称">
                  <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    <img :src="scope.row.pic">
                    <img :src="scope.row.pic1">
                  </template>
                </el-table-column>

                <!--描述-->
                <el-table-column
                  prop="desc"
                  label="描述">
                </el-table-column>

                <!--状态-->
                <el-table-column
                  prop="status"
                  label="状态">
                </el-table-column>

                <!--创建时间-->
                <el-table-column
                  prop="createTime"
                  label="创建时间">
                </el-table-column>

                <!--操作-->
                <el-table-column
                  label="操作"
                  width="180">
                  <template scope="scope">
                    <!--修改按钮-->
                    <el-button
                      :plain="true"
                      type="danger"
                      icon="edit"
                      size="small"
                      @click="clickShow(scope.$index, scope.row)">
                      修改
                    </el-button>
                    <!--删除按钮-->
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, scope.row)"
                      type="danger"
                      icon="delete"
                      size="small"
                      class="deletone">
                      删除
                    </el-button>
                  </template>
                </el-table-column>

              </el-table>
              <!-- 批量删除按钮 -->
              <div
                style="margin-top: 20px;">
                <el-button
                  type="danger"
                  :plain="true"
                  icon="delete"
                  @click="deleteItem()">
                  删除
                </el-button>
              </div>
            </el-tab-pane>
      <!-- 添加 -->
            <el-tab-pane>
              <span slot="label"><i class="el-icon-star-on"></i>  添加</span>
              <p class="topicTags">添加会员等级</p>
              <!-- 添加会员表单 -->
              <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="">

                  <el-form-item label="名称" prop="name">
                    <el-col :span="8"><el-input v-model="ruleForm.name"></el-input></el-col>
                  </el-form-item>

                  <!-- 大图图片上传 -->
                  <el-form-item
                    label="大图上传">
                    <el-upload
                      class="upload-demo"
                      drag action="https://jsonplaceholder.typicode.com/posts/"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">
                        请将文件拖到此处，或<em>点击上传</em>
                        <p class="imgText">只能上传jpg/png文件，且不超过500kb</p>
                      </div>
                    </el-upload>
                  </el-form-item>

                  <!-- 小图图片上传 -->
                  <el-form-item
                    label="小图上传">
                    <el-upload
                      class="upload-demo"
                      drag action="https://jsonplaceholder.typicode.com/posts/"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">
                        请将文件拖到此处，或<em>点击上传</em>
                        <p class="imgText">只能上传jpg/png文件，且不超过500kb</p>
                      </div>
                    </el-upload>
                  </el-form-item>

                  <!-- 描述 -->
                  <el-form-item
                    label="描述"
                    prop="desc">
                    <el-col :span="8"><el-input type="textarea" v-model="ruleForm.desc" :rows="5"></el-input></el-col>
                  </el-form-item>

                  <!-- 状态 -->
                  <el-form-item
                    label="状态"
                    prop="status">
                    <el-switch v-model="ruleForm.status" on-color="#13ce66" off-color="#ff4949">
                    </el-switch>
                  </el-form-item>

                  <!-- 提交 -->
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>

                </el-form>
              </div>
            </el-tab-pane>
      <!-- 修改 -->
            <el-tab-pane v-if="display">
              <span slot="label"><i class="el-icon-upload"></i>  修改</span>
              <p class="topicTags">修改会员等级</p>
              <!-- 添加会员表单 -->
              <div>
                <el-form :model="modifyRuleForm" :rules="modifyrules" ref="modifyRuleForm" label-width="100px" class="">

                  <el-form-item label="名称" prop="name">
                    <el-col :span="8"><el-input v-model="modifyRuleForm.name"></el-input></el-col>
                  </el-form-item>

                  <!-- 大图图片上传 -->
                  <el-form-item
                    label="大图上传">
                    <el-upload
                      class="upload-demo"
                      drag action="https://jsonplaceholder.typicode.com/posts/"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">
                        请将文件拖到此处，或<em>点击上传</em>
                        <p class="imgText">只能上传jpg/png文件，且不超过500kb</p>
                      </div>
                    </el-upload>
                  </el-form-item>

                  <!-- 小图图片上传 -->
                  <el-form-item
                    label="小图上传">
                    <el-upload
                      class="upload-demo"
                      drag action="https://jsonplaceholder.typicode.com/posts/"
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">
                        请将文件拖到此处，或<em>点击上传</em>
                        <p class="imgText">只能上传jpg/png文件，且不超过500kb</p>
                      </div>
                    </el-upload>
                  </el-form-item>

                  <!-- 描述 -->
                  <el-form-item
                    label="描述"
                    prop="desc">
                    <el-col
                      :span="8"><el-input type="textarea" v-model="modifyRuleForm.desc" :rows="5"></el-input></el-col>
                  </el-form-item>

                  <!-- 状态 -->
                  <el-form-item
                    label="状态"
                    prop="status">
                    <el-switch v-model="modifyRuleForm.status" on-color="#13ce66" off-color="#ff4949">
                    </el-switch>
                  </el-form-item>

                  <!-- 提交 -->
                  <el-form-item>
                    <el-button type="primary" @click="modifySubmitForm('modifyRuleForm')">立即添加</el-button>
                    <el-button @click="resetForm('modifyRuleForm')">重置</el-button>
                  </el-form-item>

                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  /* 接口 */
  import NProgress from 'nprogress'
  import { membershipLevel,deletemembershipLevel,addmembershipLevel,getOnemembershipLevel,modifymembershipLevel } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'

  export default {
    data() {
      return {
        editableTabsValue: "0",/* 选项卡默认选中 */

        tableData: [],/* 全部表格数据 */

        multipleSelection: [],/* 批量删除复选框 */

        display: false,/* 控制编辑表单显示 */

        /* 添加 */
        ruleForm: {
          name: '',
          delivery: false,
          type: [],
          desc: '',
          status: true,
        },

        /* 编辑 */
        modifyRuleForm: {
          name: '',
          delivery: false,
          type: [],
          desc: '',
          status: true,
        },

        /* 添加验证 */
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写描述', trigger: 'blur' }
          ]
        },

        /* 修改验证 */
        modifyrules: {
          name: [
            { required: true, message: '请输入修改的名称', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写修改的描述', trigger: 'blur' }
          ]
        },

      }
    },
    methods: {
      fetchData() {
        /* 查询会员等级信息 */
        NProgress.start();
        membershipLevel(this.axios)
          .then(
            response => {
              let groups = response.data;
              if (groups.statusCode === STATUS_SUCCESS) {
                this.tableData = groups.data;
                for(let i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].status == 1){
                        this.tableData[i].status = "开启";
                    }else if(this.tableData[i].status == 0){
                        this.tableData[i].status = "关闭";
                    }
                };
              }
              NProgress.done();
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

      /* 获取复选框 */
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
          deletemembershipLevel(this.axios, {id: Number(row.id)})
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

      /* 获取单条数据 */
      clickShow: function(index, row){
        this.display = !this.display;
        this.editableTabsValue = '2';
        NProgress.start();
        getOnemembershipLevel(this.axios,row.id)
          .then(response => {
            let groups = response.data;
            if (groups.statusCode === STATUS_SUCCESS) {
              this.modifyRuleForm = groups.data[0];
              if (groups.data[0].status == 1){
                this.modifyRuleForm.status = true;
              }else if(groups.data[0].status == 0){
                this.modifyRuleForm.status = false;
              }
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

      /* 批量删除 */
      deleteItem() {
        /*判断是否有选中*/
        if (this.multipleSelection.length <= 0) {
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
          this.$confirm('此操作将永久删除该会员等级, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            NProgress.start();
            deletemembershipLevel(this.axios, {id: selectGroup.join(',')})
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  /* 前端删除 */
                  this.multipleSelection.forEach(v => {
                    for (let i = 0; i < this.tableData.length; i++) {
                      if (v.id === this.tableData[i].id) {
                        this.tableData.splice(i, 1);
                        break;
                      }
                    }
                  });
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

      /* 重置表单 */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      /* 提交添加 */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            NProgress.start();
            addmembershipLevel(this.axios,{
              name: this.ruleForm.name,
              desc: this.ruleForm.desc,
              status: this.ruleForm.status ? 1 : 0
            })
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '增加会员等级成功',
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: '增加失败，请重试',
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

      /* 提交修改 */
      modifySubmitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            NProgress.start();
            modifymembershipLevel(this.axios,{
              name: this.modifyRuleForm.name,
              desc: this.modifyRuleForm.desc,
              state: this.modifyRuleForm.status ? 1 : 0
            })
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '修改会员等级成功',
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
    },
    created() {
      this.fetchData();
    },
  }
</script>

<style lang="sass" scoped>
  .topicTags
    background-color: #eef1f6
    line-height: 3em
    padding-left: 2em
    font-weight: 600
  .promptMessage
    list-style-type: none
    padding-left: 1em
    line-height: 2em
  .upload-demo
    padding: 0 10px
  .imgText
    margin: 0px
  .upload-demo
    width: 50%
</style>

