<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>店铺等级</h3>
          <el-tabs type="border-card">

            <!-- 管理 -->
            <el-tab-pane>

              <!-- 提示语 -->
              <span slot="label"><i class="el-icon-date"></i>&nbsp;&nbsp;管理</span>
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
                :data="tableData3"
                border
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="日期"
                  width="120">
                  <template scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px">
                <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
              </div>

            </el-tab-pane>


            <!-- 添加 -->
            <el-tab-pane label="添加">
              <span slot="label"><i class="el-icon-star-on"></i>    修改</span>
              添加
            </el-tab-pane>


            <!-- 修改 -->
            <el-tab-pane label="修改">
              <span slot="label"><i class="el-icon-edit"></i>    修改</span>
              修改
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
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {
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
      }
    }
  }
</script>

<style lang="sass" scoped>
  .topicTags
    background-color: #d3dce6
    line-height: 3em
    padding-left: 2em
  .promptMessage
    list-style-type: none
    padding-left: 1em
    line-height: 2em
</style>
