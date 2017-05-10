<template>
  <div class="table">
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
        v-if="isShowIndex"
        label="排名指数"
        width="120">
        <template scope="scope">
          <el-input :value="scope.row.index" type="number"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="user"
        label="店主用户名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="company"
        label="商铺名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="Name"
        label="店铺等级"
        width="120">
      </el-table-column>
      <el-table-column
        prop="productCount"
        label="商品数量"
        width="120">
      </el-table-column>
      <el-table-column
        prop="earnest"
        label="保证金"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pos_deposit"
        label="pos押金"
        width="120">
      </el-table-column>
      <el-table-column
        prop="create_time"
        show-overflow-tooltip
        label="创店时间">
      </el-table-column>
      <el-table-column
        prop="shop_statu"
        width="120"
        label="状态">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            icon="edit"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <a :href="scope.row.user" target="_blank">
            <el-button
              size="small"
              icon="search">查看</el-button>
          </a>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px" class="clearfix">
      <el-button @click="submit">提交</el-button>
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
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [
          {
            index: 0,
            user: 'alvin',
            company: 'love',
            Name: '白金店铺',
            productCount: 1000,
            earnest: 0.00,
            pos_deposit: 0.00,
            create_time: '2017-05-09 10:10:08',
            shop_statu: 1,
          },
        ],
        multipleSelection: [],
        currentPage: 1,
        total: 10,
        isShowIndex: false,
      }
    },

    methods: {
      submit() {
        console.log('tijiao');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
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
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
    }
  }
</script>

<style lang="sass" scoped>

</style>
