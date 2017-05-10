<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>店铺手机端模板</h3>
          <el-tabs
            type="border-card"
            v-model="editableTabsValue">
            <!-- 管理选项卡 -->
            <el-tab-pane
              name="1"
              value="1">
              <!-- 选项卡图标 -->
              <span slot="label" @click="toggleClickShow">
                <i class="el-icon-date"></i>&nbsp;&nbsp;管理
              </span>
              <!-- 数据表格 -->
              <el-table
                ref="multipleTable"
                :data="tableData"
                border
                scopeone="scope"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <!-- 复选框 -->
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <!-- 显示顺序 -->
                <el-table-column
                  label="显示顺序"
                  width="120"
                  prop="displayorder">
                  <template scope="scope">
                    <el-input
                      placeholder="255"
                      type="number"
                      size="small"
                      v-model= "scope.row.displayorder">
                    </el-input>
                  </template>
                </el-table-column>
                <!--  模板名称 -->
                <el-table-column
                  prop="name"
                  label="模板名称">
                </el-table-column>
                <!-- 模板风格 -->
                <el-table-column
                  prop="style"
                  label="模板风格">
                </el-table-column>
                <!--  状态 -->
                <el-table-column
                  prop="status"
                  label="状态">
                </el-table-column>
                <!-- 创建时间 -->
                <el-table-column
                  prop="createTime"
                  label="创建时间">
                </el-table-column>
                <!-- 操作 -->
                <el-table-column
                  label="操作"
                  width="180">
                  <template
                    scope="scope">
                    <!--修改-->
                    <el-button
                      icon="edit"
                      size="small"
                      @click="clickShow(scope.$index, scope.row)">
                      修改
                    </el-button>
                    <!--删除-->
                    <el-button
                      type="danger"
                      icon="delete"
                      size="small"
                      @click="handleDelete(scope.$index, scope.row)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 批量删除 -->
              <div class="submit-display">
                <el-button
                  type="info"
                  @click="batchHandleDelete()">
                  删除
                </el-button>
              </div>
            </el-tab-pane>
            <!-- 添加选项卡 -->
            <el-tab-pane
              label="添加"
              name="2"
              value="2">
              <span slot="label" @click="toggleClickShow"><i class="el-icon-star-on"></i>&nbsp;&nbsp;添加</span>
              <!-- 标题 -->
              <p class="topicTags">添加店铺</p>
              <div id="">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="">

                  <el-form-item label="模板名称" prop="name">
                    <el-col :span="8"><el-input v-model="ruleForm.name"></el-input></el-col>
                  </el-form-item>

                  <el-form-item label="模板风格" prop="style">
                    <el-col :span="8"><el-input v-model="ruleForm.style"></el-input></el-col>
                  </el-form-item>

                  <el-form-item label="模板文件" prop="tempFile" class="tempFileSelection">
                    <el-select v-model="ruleForm.tempFile" placeholder="请选择模板文件">
                      <el-option label="数据1" value="1"></el-option>
                      <el-option label="数据2" value="2"></el-option>
                    </el-select>
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
            <!-- 修改选项卡 -->
            <el-tab-pane
              label="修改"
              v-if="displayCondition"
              name="3"
              value="3">
              <span slot="label"><i class="el-icon-edit"></i>&nbsp;&nbsp;修改</span>
              <p class="topicTags">修改店铺</p>
              <div>
                <el-form :model="modifyForm" :rules="rulesModifyForm" ref="modifyForm" label-width="100px"
                         class="demo-modifyForm">

                  <el-form-item label="模板名称" prop="name">
                    <el-col :span="8"><el-input v-model="modifyForm.name"></el-input></el-col>
                  </el-form-item>

                  <el-form-item label="模板风格" prop="style">
                    <el-col :span="8"><el-input v-model="modifyForm.style"></el-input></el-col>
                  </el-form-item>

                  <el-form-item label="模板文件" prop="tempFile" class="tempFileSelection">
                    <el-select v-model="modifyForm.tempFile" placeholder="请选择模板文件">
                      <el-option label="数据1" value="1"></el-option>
                      <el-option label="数据2" value="2"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="状态" prop="status">
                    <el-switch v-model="modifyForm.status" on-color="#13ce66" off-color="#ff4949">
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
  import { addStoreModuleMobile,modifyStoreModuleMobile,deleteShopTemplateMobile,getShopTemplateMobile, }
    from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'

  export default {
    /* 数据 */
    data() {
      return {
        /* 显示顺序 */
        input: [],
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
          style: '',
          tempFile: '',
          state: true,
        },
        /* 修改 -- 表单 */
        modifyForm: {
          name: '',
          delivery: false,/* 选项卡切换 */
          type: [],
          style: '',
          tempFile: '',
          status: true,
        },
        /* 添加表单 -- 表单验证 */
        rules: {
          name: [
            { required: true, message: '请输入模板名称', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          style: [
            { required: true, message: '请输入模板风格', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
        },
        /* 修改表单 -- 表单验证 */
        rulesModifyForm: {
          name: [
            { required: true, message: '请输入要修改的模板名称', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          style: [
            { required: true, message: '请输入要修改的模板风格', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
        },
        /* 添加表单 -- 开关滑块 */
        stateButton: true,
        /* 修改表单 -- 开关滑块 */
        stateButtonModifyForm: true,
      }
    },
    /* 操作 */
    methods: {
      /* 批量删除按钮 */
      batchHandleDelete() {
        this.$confirm('此操作将永久删除该店铺, 是否继续?', '警告', {
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
          deleteShopTemplateMobile(this.axios, result)
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
      /* 单条删除按钮 */
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该店铺, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          deleteShopTemplateMobile(this.axios, {id: Number(row.id)})
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
      /* 选项卡的切换 */
      toggleClickShow: function() {
        this.displayCondition = false;
      },
      /* 获取单条店铺信息 */
      clickShow: function(index, row){
        this.displayCondition = !this.displayCondition;
        this.editableTabsValue = '3';
        /*/!* 单条店铺信息 *!/
         console.log("asydgjgas");
         NProgress.start();
         getOneShopLevel(this.axios,row.id)
         .then(response => {
         let groups = response.data;
         if (groups.statusCode === STATUS_SUCCESS) {
         this.modifyForm = groups.data;
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
         });*/
      },
      /* 管理 -- 保存选中的数组 */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      /* 添加 -- 表单 -- 提交 */
      submitForm(formName) {

        /* 测试 */
        /*let name = this.ruleForm.name;
        let style = this.ruleForm.style;
        let status = this.ruleForm.state ? 1 : 0;
        let tempFile = this.ruleForm.tempFile;
        console.log(name);
        console.log(style);
        console.log(status);
        console.log(tempFile);
        return;*/
        /* 测试 */

        this.$refs[formName].validate((valid) => {
          if (valid) {
            NProgress.start();
            addStoreModuleMobile(this.axios,{
              name: this.ruleForm.name,
              style: this.ruleForm.style,
              status: this.ruleForm.state ? 1 : 0,
              tempFile: this.ruleForm.tempFile,
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

        /* 测试 */
        /*let name = this.modifyForm.name;
        let style = this.modifyForm.style;
        let status = this.modifyForm.status ? 1 : 0;
        let tempFile = this.modifyForm.tempFile;
        console.log(name);
        console.log(style);
        console.log(status);
        console.log(tempFile);
        return;*/
        /* 测试 */

        this.$refs[formName].validate((valid) => {
          if (valid) {
            NProgress.start();
            modifyStoreModuleMobile(this.axios,{
              name: this.modifyForm.name,
              style: this.modifyForm.style,
              status: this.modifyForm.status ? 1 : 0,
              tempFile: this.modifyForm.tempFile,
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
    created() {
      /* 查询店铺请求 */
      NProgress.start();
      getShopTemplateMobile(this.axios)
        .then(response => {
          let groups = response.data;
          if (groups.statusCode === STATUS_SUCCESS) {
            this.tableData = groups.data;

            /* 自定 */
            let tableData = this.tableData;
            var i
            for( i=0; i<tableData.length; i++){
              if(tableData[i].status == true){
                tableData[i].status = "开启";
              }else if(tableData[i].status == false){
                tableData[i].status = "关闭";
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
  //模板实例
  .name-img
    float: left
    background-color: #eef1f6
    width:  5em
    height: 5em
    margin:
    top: 0.5em
    bottom: 0.5em
  .name-text
    padding-top: 2em
    padding-left: 10px
    display: inline-block
  .submit-display
    margin-top: 20px
  .tempFileSelection
    margin-left: 10px
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
