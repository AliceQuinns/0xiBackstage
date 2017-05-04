<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>后台操作日志</h3>

          <!--选项卡-->
          <el-row :gutter="20" class="deviation-top deviation-bottom">
            <el-col :span="24"  >
              <el-tabs type="border-card">

                <!--选项卡1-->
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 详细记录 </span>
                  <!--表单-->
                  <el-row>
                    <el-col :span="24">
                      <div>
                        <el-form :inline="true" :model="formInline" class="">

                          <el-form-item label="会员名">
                            <el-input v-model="formInline.user" placeholder="会员名"></el-input>
                          </el-form-item>

                          <el-form-item label="操作时间" required>
                            <!--日期-->
                            <el-col :span="11">
                              <el-form-item prop="date1">
                                <el-date-picker
                                  type="date"
                                  placeholder="选择日期"
                                  v-model="ruleForm.date1"
                                  style="width: 100%;">
                                </el-date-picker>
                              </el-form-item>
                            </el-col>
                            <!--分割线-->
                            <el-col class="line" :span="1">-</el-col>
                            <!--时间-->
                            <el-col :span="11">
                              <el-form-item prop="dateTime">
                                <el-time-picker
                                  type="fixed-time"
                                  placeholder="选择时间"
                                  v-model="ruleForm.dateTime"
                                  style="width: 100%;">
                                </el-time-picker>
                              </el-form-item>
                            </el-col>
                          </el-form-item>

                          <el-form-item label="操作URL:">
                            <el-input v-model="formInline.url" placeholder="URL"></el-input>
                          </el-form-item>

                          <el-button type="primary" @click="onSubmit">查询</el-button>
                        </el-form>
                      </div>
                    </el-col>
                  </el-row>
                  <!--表格-->
                  <template>
                    <el-table
                      :data="tableData"
                      style="width: 100%"
                      :row-class-name="tableRowClassNames">
                      <el-table-column
                        prop="date"
                        label="账号"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="操作"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="address"
                        label="操作url">
                      </el-table-column>
                      <el-table-column
                        prop="folder"
                        label="文件名">
                      </el-table-column>
                      <el-table-column
                        prop="time"
                        label="操作时间">
                      </el-table-column>
                    </el-table>
                  </template>
                  <!--分页-->
                  <el-row
                    :gutter="20"
                    class="deviation-top clearfix">
                    <el-col :span="6">
                      <div class=" ">
                        <el-button>删除选择</el-button>
                      </div>
                    </el-col>

                      <div class="pull-right" >
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page.sync="DefaultValue"
                          :page-size="100"
                          layout="prev, pager, next, jumper"
                          :total="1000">
                        </el-pagination>
                      </div>

                  </el-row>
                </el-tab-pane>

                <!--选项卡2-->
                <el-tab-pane label="清空日志">
                  <span slot="label"><i class="el-icon-date"></i> 清空日志 </span>
                  <el-row>
                    <el-col :span="24">
                      <div class="">
                        <span class="">清空日志</span>
                        <el-date-picker
                          v-model="dateSelectTwo"
                          type="date"
                          placeholder="选择开始日期"
                          :picker-options="CalculationDate">
                        </el-date-picker>
                        <el-date-picker
                          v-model="timeSelectTwo"
                          type="date"
                          placeholder="选择结束日期"
                          :picker-options="CalculationDate">
                        </el-date-picker>
                      </div>
                    </el-col>
                  </el-row>

                </el-tab-pane>

              </el-tabs>
            </el-col>
          </el-row>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ElRow from "../../../../node_modules/element-ui/packages/row/src/row";
  export default {
    components: {ElRow},
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      onSubmit() {
        console.log('submit!');
      },
      tableRowClassNames(row, index) {
        if (index === 1) {
          return 'info-row';
        }
        else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
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
    },
    data() {
      return {
        multipleSelection: [],
        ruleForm:
          {
          date1: '',
          dateTime: '',
        },
        formInline: {
          user: '',
          url: '',
        },
        tableData: [
          {
          select: '',
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          folder: 'alksdjfhka',
          time: '2017-05-04',
        },
          {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          folder: 'alksdjfhka',
          time: '2017-05-04',
        },
          {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          folder: 'alksdjfhka',
          time: '2017-05-04',
        },
          {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄' ,
          folder: 'alksdjfhka',
          time: '2017-05-04',
        },
        ],
        CalculationDate: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        dateSelectTwo : '',
        timeSelectTwo: '',
        DefaultValue: 1,
      }
    },
  }
</script>

<style lang="sass" scoped>
  .deviation-top
    margin-top: 2em
  .deviation-bottom
    margin-bottom: 2em
    margin-top: 0px
  h3
    line-height: 2em
  .pull-right
    float: right
    margin-right: 0px
</style>
