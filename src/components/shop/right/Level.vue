<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>店铺等级</h3>
          <el-tabs type="border-card" v-model="editableTabsValue">

            <!-- 管理 -->
            <el-tab-pane name="1" value="1">
              <!-- 图标 -->
              <span slot="label" @click="toggleClickShow">
                <i class="el-icon-date"></i>&nbsp;&nbsp;管理
              </span>
              <!-- 提示语 -->
              <p class="topicTags">操作提示</p>
              <ul class="promptMessage">
                <li><i class="el-icon-share"></i>
                  &nbsp;&nbsp;店铺等级默认包括4种店铺等级。默认店铺等级不可以删除。
                </li>
                <li><i class="el-icon-share"></i>
                  &nbsp;&nbsp;如果店铺等级不够，可以自定义添加。自定义店铺等级可以删除。
                </li>
              </ul>
              <!-- 数据表格 -->
              <el-table
                ref="multipleTable"
                :data="tableData"
                border
                scopeone="scope"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <!-- selection -->
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <!-- 状态 -->
                <el-table-column
                  label="状态"
                  width="120"
                  prop="status">
                </el-table-column>
                <!-- 名称 -->
                <el-table-column
                  prop="name"
                  label="名称">
                </el-table-column>
                <!-- 描述 -->
                <el-table-column
                  prop="desc"
                  label="描述">
                </el-table-column>
                <!-- 创建时间 -->
                <el-table-column
                  prop="createTime"
                  label="创建时间">
                </el-table-column>
                <!-- 修改 -->
                <el-table-column label="操作" width="100">
                  <template scope="scope">
                    <el-button
                      type="primary"
                      icon="edit"
                      size="small"
                      @click="clickShow(scope.$index, scope.row)">
                      修改
                    </el-button>
                  </template>
                </el-table-column>
                </el-table>
                <!-- 按钮及分页 -->
                  <div style="margin-top: 20px">
                    <el-button
                      type="danger"
                      @click="handleDelete()">
                      删除</el-button>
                  </div>
                </el-tab-pane>

            <!-- 添加--选项卡 -->
            <el-tab-pane label="添加" name="2" value="2">
              <span slot="label" @click="toggleClickShow"><i class="el-icon-star-on"></i>&nbsp;&nbsp;添加</span>
              <!-- 标题 -->
              <p class="topicTags">添加店铺</p>
              <div id="">
                <el-form v-model="ruleForm"  ref="ruleForm" label-width="100px" class="">

                  <el-form-item label="名称" prop="name">
                    <el-col :span="8"><el-input v-model="ruleForm.name"></el-input></el-col>
                  </el-form-item>

                  <el-form-item label="描述" prop="desc">
                    <el-col :span="8"><el-input type="textarea" v-model="ruleForm.desc" :rows="5"></el-input></el-col>
                  </el-form-item>

                  <el-form-item label="状态" prop="state">
                    <el-switch v-model="ruleForm.state" on-color="#13ce66" off-color="#ff4949">
                    </el-switch>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>

                </el-form>
              </div>
            </el-tab-pane>


            <!-- 修改--选项卡 -->
            <el-tab-pane label="修改" v-if="displayCondition" name="3" value="3">
              <span slot="label"><i class="el-icon-edit"></i>&nbsp;&nbsp;修改</span>
              <p class="topicTags">修改店铺</p>
              <div>
                <el-form
                  v-model="modifyForm"
                  :rules="rulesModifyForm"
                  ref="modifyForm"
                  label-width="100px"
                  class="demo-modifyForm">

                  <el-form-item label="名称">
                    <el-col :span="8"><el-input v-model="modifyForm.name"></el-input></el-col>
                  </el-form-item>

                  <el-form-item label="描述">
                    <el-col :span="8">
                      <el-input
                        type="textarea"
                        v-model="modifyForm.desc"
                        :rows="5">
                      </el-input>
                    </el-col>
                  </el-form-item>

                  <el-form-item label="状态" prop="status">
                    <el-switch v-model="stateButtonModifyForm" on-color="#13ce66" off-color="#ff4949">
                    </el-switch>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitFormEdit('modifyForm')">提交</el-button>
                    <el-button @click="resetForm('modifyForm')">重置</el-button>
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
  import NProgress from 'nprogress'
  import { addShopLevel, getAllShopsLevel,editShopLevel,getOneShopLevel,deleteShopLevel } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'

  export default {
    data() {
      return {
        /* 复选框 */
        selection: [],
        /* 选项卡默认选中 */
        editableTabsValue: '1',
        /* 分页 */
        total: 100,
        currentPage: 1,
        /* 选项卡切换 */
        displayCondition: false,
        /* 管理 -- 表格 */
        tableData: [],
        /* 管理 -- 表格 -- 复选框 */
        multipleSelection: [],
        /* 添加 -- 表单 */
        ruleForm: {
          name: '',
          delivery: false,
          type: [],
          desc: '',
          state: false,
        },
        /* 修改 -- 表单 */
        modifyForm: {
          name: '',
          delivery: false,
          type: [],
          desc: '',
          status: true,
        },
        /* 添加 -- 表单验证 */
        rulesform: {
          name: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写店铺描述', trigger: 'blur' }
          ]
        },
        /* 修改 -- 表单验证 */
        rulesModifyForm: {
          name: [
            { required: true, message: '请输入修改店铺名称', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写修改描述内容', trigger: 'blur' }
          ]
        },
        /* 添加 开关滑块 */
        stateButton: true,
        /* 修改 开关滑块 */
        stateButtonModifyForm: true,
      }
    },
    methods: {
      /* 表格删除按钮 */
      handleDelete() {
        this.$confirm('此操作将永久删除该权限组, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          let idArr = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
            idArr.push(this.multipleSelection[i].id);
          }
          let result = idArr.join(',');
          console.log(result);
          deleteShopLevel(this.axios, { id: result })
            .then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.multipleSelection.forEach(v => {
                  for (let i = 0; i < this.tableData.length; i++) {
                    if (v.id === this.tableData[i].id) {
                      this.tableData.splice(i, 1);
                    }
                  }
                });
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

      /* 选项卡的切换 */
      toggleClickShow: function() {
        this.displayCondition = false;
      },

      /* 获取单条店铺信息 */
      clickShow: function(index, row){
        this.displayCondition = !this.displayCondition;
        this.editableTabsValue = '3';
        NProgress.start();
        getOneShopLevel(this.axios, row.id)
            .then(response => {
              let groups = response.data;
              if (groups.statusCode === STATUS_SUCCESS) {
                this.modifyForm = groups.data[0];
                console.log(this.modifyForm);
                console.log(this.modifyForm.desc);
                if (groups.data.status == 1){
                  this.stateButtonModifyForm = true;
                }else if(groups.data.status == 0){
                  this.stateButtonModifyForm = false;
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

      /* 管理 -- 保存选中的数组 */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      /* 添加 -- 表单 -- 提交 */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            NProgress.start();
            addShopLevel(this.axios,{
              name: this.ruleForm.name,
              desc: this.ruleForm.desc,
              status: this.ruleForm.state ? 1 : 0
            })
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '增加店铺成功',
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

      /* 编辑 -- 表单 -- 提交 */
      submitFormEdit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            NProgress.start();
            editShopLevel(this.axios,{
              name: this.modifyForm.name,
              desc: this.modifyForm.desc,
              status: this.stateButtonModifyForm ? 1 : 0
            })
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '修改店铺成功',
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

      /* 重置表单 */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      selectRow(index, row) {
        console.log(index, row);
      },
    },
    /* 页面加载时请求 */
    created() {
      NProgress.start();
      getAllShopsLevel(this.axios)
        .then(response => {
          let groups = response.data;
          if (groups.statusCode === STATUS_SUCCESS) {
            this.tableData = groups.data;
            console.log(this.tableData);
            console.log(this.tableData.createTime);
            var status = this.tableData;
            for(var i=0; i<status.length;i++) {
              if(status[i].status == true) {
                status[i].status = '开启';
              }else if(status[i].status == false){
                status[i].status = '关闭';
              };
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

  }
</script>

<style lang="sass" scoped>
  .topicTags
    background-color: #eef1f6
    line-height: 3em
    padding-left: 2em
  .promptMessage
    list-style-type: none
    padding-left: 1em
    line-height: 2em
  .pagination
    float: right
</style>
