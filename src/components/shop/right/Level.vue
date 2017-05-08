<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>店铺等级</h3>
          <el-tabs type="border-card" v-model="editableTabsValue">

            <!-- 管理 -->
            <el-tab-pane name="1" value="1">
              <span slot="label" @click="toggleClickShow"><i class="el-icon-date"></i>&nbsp;&nbsp;管理</span><!-- 图标 -->

              <!-- 提示语 -->
              <p class="topicTags">操作提示</p>
              <ul class="promptMessage">
                <li><i class="el-icon-share"></i>
                  &nbsp;&nbsp;店铺等级默认包括4种店铺等级。默认店铺等级不可以删除。
                </li>
                <li><i class="el-icon-share"></i>
                  &nbsp;&nbsp;如果店铺等级不够，可以自定以填加。自定义店铺等级可以删除。
                </li>
              </ul>

              <!-- 数据表格 -->
              <el-table
                ref="multipleTable"
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">

                <!-- selection -->
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>

                <!-- ID -->
                <el-table-column
                  label="ID"
                  width="120"
                  prop="id">
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

                <!-- 状态 -->
                <el-table-column label="操作" width="100">
                  <template scope="scope">
                    <el-button type="primary" icon="edit" size="small" @click="clickShow">修改</el-button>
                  </template>
                </el-table-column>
                <!-- 按钮及分页 -->
              </el-table>
              <div style="margin-top: 20px">
                <el-button @click="toggleSelection()">删除</el-button>
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
            <el-tab-pane label="添加" name="2" value="2">
              <span slot="label" @click="toggleClickShow"><i class="el-icon-star-on"></i>&nbsp;&nbsp;添加</span>
              <!-- 标题 -->
              <p class="topicTags">添加店铺</p>
              <div id="">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="">

                  <el-form-item label="名称" prop="activityName">
                    <el-col :span="8"><el-input v-model="ruleForm.activityName"></el-input></el-col>
                  </el-form-item>

                  <el-form-item label="形式" prop="textField">
                    <el-col :span="8"><el-input type="textarea" v-model="ruleForm.textField" :rows="5"></el-input></el-col>
                  </el-form-item>

                  <el-form-item label="状态" prop="state">
                    <el-switch v-model="stateButton" on-color="#13ce66" off-color="#ff4949">
                    </el-switch>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>

                </el-form>
              </div>
            </el-tab-pane>


            <!-- 修改 -->
            <el-tab-pane label="修改" v-if="displayCondition" name="3" value="3">
              <span slot="label"><i class="el-icon-edit"></i>&nbsp;&nbsp;修改</span>
              <p class="topicTags">修改店铺</p>
              <div>
                <el-form :model="modifyForm" :rules="rulesModifyForm" ref="modifyForm" label-width="100px"
                         class="demo-modifyForm">

                  <el-form-item label="名称" prop="activityName">
                    <el-col :span="8"><el-input v-model="modifyForm.activityName"></el-input></el-col>
                  </el-form-item>

                  <el-form-item label="描述" prop="textField">
                    <el-col :span="8"><el-input type="textarea" v-model="modifyForm.textField" :rows="5"></el-input></el-col>
                  </el-form-item>

                  <el-form-item label="状态" prop="state">
                    <el-switch v-model="stateButtonModifyForm" on-color="#13ce66" off-color="#ff4949">
                    </el-switch>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" @click="submitForm('modifyForm')">提交</el-button>
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
  export default {
    data() {
      return {
        /* 选项卡默认选中 */
        editableTabsValue: '1',

        /* 分页 */
        total: 10,
        currentPage: 1,

        /* 选项卡切换 */
        displayCondition: false,

        /* 管理 -- 表格 */
        tableData: [
          {
          id: '0',
          createTime: '2016-05-03',
          name: '王小虎',
          desc: '上海市普陀区金沙江路 1518 弄',
        }
        , {
          id: '1',
          createTime: '2016-05-02',
          name: '王小虎',
          desc: '上海市普陀区金沙江路 1518 弄'
        }
        , {
          id: '2',
          createTime: '2016-05-04',
          name: '王小虎',
          desc: '上海市普陀区金沙江路 1518 弄'
        }
        , {
          id: '3',
          createTime: '2016-05-01',
          name: '王小虎',
          desc: '上海市普陀区金沙江路 1518 弄'
        }
        , {
          id: '4',
          createTime: '2016-05-08',
          name: '王小虎',
          desc: '上海市普陀区金沙江路 1518 弄'
        }
        , {
          id: '5',
          createTime: '2016-05-06',
          name: '王小虎',
          desc: '上海市普陀区金沙江路 1518 弄'
        }
        , {
          id: '6',
          createTime: '2016-05-07',
          name: '王小虎',
          desc: '上海市普陀区金沙江路 1518 弄'
        }
        ],
        multipleSelection: [],

        /* 添加 -- 表单 */
        ruleForm: {
          activityName: '',
          delivery: false,
          type: [],
          textField: '',
          state: '',
        },

        /* 修改 -- 表单 */
        modifyForm: {
          activityName: '',
          delivery: false,
          type: [],
          textField: '',
          state: '',
        },

        /* 添加 -- 验证 */
        rules: {
          activityName: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          textField: [
            { required: true, message: '请填写店铺描述', trigger: 'blur' }
          ]
        },

        /* 修改 -- 验证 */
        rulesModifyForm: {
          activityName: [
            { required: true, message: '请输入修改店铺名称', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur' }
          ],
          textField: [
            { required: true, message: '请填写修改描述内容', trigger: 'blur' }
          ]
        },

        /* 开关滑块1 */
        stateButton: true,
        /* 开关滑块2 */
        stateButtonModifyForm: true,
      }
    },
    methods: {
      /* 分页 */
      handleCurrentChange(val) {
        NProgress.start();
        getUserList(this.axios, val)
          .then(response => {
            let userList = response.data;
            if (userList.statusCode === STATUS_SUCCESS) {
              this.tableData = userList.data.data;
              this.total = Number(userList.data.total);
              NProgress.done();
            } else {
              NProgress.done();
            }
          })
          .catch(e => {
            NProgress.done();
          });
      },

      /* 选项卡的切换 */
      toggleClickShow: function() {
        this.displayCondition = false;
      },
      clickShow: function(){
        this.displayCondition = !this.displayCondition;
        this.editableTabsValue = '3';
      },

      /* 管理 -- 表格操作 */
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      /* 添加 -- 表单 */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }

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
