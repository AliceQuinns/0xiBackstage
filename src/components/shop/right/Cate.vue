<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>店铺分类</h3>
          <p class="topicTags">操作提示</p>
          <ul class="promptMessage">
            <li><i class="el-icon-share"></i>
              &nbsp;&nbsp;左侧输入框表示分类的显示顺序
            </li>
            <li><i class="el-icon-share"></i>
              &nbsp;&nbsp;右侧输入框为分类名称
            </li>
          </ul>
          <el-tree
            :data="cateData"
            class="tree"
            :props="defaultProps"
            node-key="id"
            :expand-on-click-node="false"
            :render-content="renderContent">
          </el-tree>
          <div>
            <el-button type="primary" icon="edit" @click="addCate1">添加一级</el-button>
            <el-button type="success" icon="upload2" @click="submitCate">提交</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  let prefix = 'fan';
  let id = 0;
  import { getAllCates, deleteCate, modifyNAddCate } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  export default {
    data() {
      return {
        cateData: [],
        defaultProps: {
          children: 'shscTwoShopCatList',
          label: 'name',
        }
      }
    },

    methods: {
      append(data, store) {
        data.shscTwoShopCatList.push({ id: `${prefix + (id++)}`, name: '', displayorder: ''});
        store.append({ id: `${prefix + (id++)}`, name: '', displayorder: ''}, data);
      },
      remove(data, store) {
        let id = data.id.toString();
        if (id.indexOf('fan') !== -1) {
          // 处理新增加的分类
          for (let i = 0; i < this.cateData.length; i++) {
            let cate = this.cateData[i];
            let firstLevelId = cate.id;
            let nFirstLevelId = prefix + cate.id;  // 新增加的一级分类的ID
            if (data.id === firstLevelId || data.id === nFirstLevelId) {
              this.cateData.splice(i, 1);
              break;
            } else {
              if (cate.shscTwoShopCatList.length > 0) {
                for (let j = 0; j < cate.shscTwoShopCatList.length; j++) {
                  let subCate = cate.shscTwoShopCatList[j];
                  let secondLevelId = subCate.id;
                  let nSecondLevelId = prefix + subCate.id;
                  if (data.id === secondLevelId || data.id === nSecondLevelId) {
                    cate.shscTwoShopCatList.splice(j, 1);
                  }
                }
              }
            }
          }
          store.remove(data);
        } else {
          // 已存在的分类
          this.$confirm('此操作将永久删除该管理员, 是否继续?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            NProgress.start();
            deleteCate(this.axios, { id })
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  });
                  for (let i = 0; i < this.cateData.length; i++) {
                    let cate = this.cateData[i];
                    let firstLevelId = cate.id;
                    let nFirstLevelId = prefix + cate.id;  // 新增加的一级分类的ID
                    if (data.id === firstLevelId || data.id === nFirstLevelId) {
                      this.cateData.splice(i, 1);
                      break;
                    } else {
                      if (cate.shscTwoShopCatList.length > 0) {
                        for (let j = 0; j < cate.shscTwoShopCatList.length; j++) {
                          let subCate = cate.shscTwoShopCatList[j];
                          let secondLevelId = subCate.id;
                          let nSecondLevelId = prefix + subCate.id;
                          if (data.id === secondLevelId || data.id === nSecondLevelId) {
                            cate.shscTwoShopCatList.splice(j, 1);
                          }
                        }
                      }
                    }
                  }
                  store.remove(data);
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
        }
      },
      renderContent(h, { node, data, store }) {
        if (data.shscTwoShopCatList) {
          return h('span', [h('span', [h('el-input', {on: { change: (val) => {this.changeShowOrder(val, data, node)} }, attrs: {value: data.displayorder, size: 'small', placeholder: '显示顺序', type: 'number'},
            style: {width: '80px'}}),
            h('el-input',
            {on: { change: (val) => {this.changeCateName(val, data, node)} },style: {width: '100px',
              marginLeft: '10px'}, attrs: {value:
          data.name, size: 'small', placeholder: '分类名称'}})]), h('span',
            {style: {float: 'right', marginRight: '20px'}},
            [h('el-button', {on: {click: () => this.append(data, store)},attrs: {size: 'mini'}}, '添加二级分类'), h('el-button', {on: {click: () => this.remove(data, store)},attrs: {size: 'mini'}}, '删除')])])
        } else {
          return h('span', [h('span', [h('el-input', {on: { change: (val) => {this.changeShowOrder(val, data, node)} },attrs: {value: data.displayorder, size: 'small', placeholder: '显示顺序', type: 'number'},
            style: {width: '80px'}}),
            h('el-input',
              {on: { change: (val) => {this.changeCateName(val, data, node)} }, style: {width: '100px', marginLeft:
                '10px'}, attrs: {value:
              data.name, size: 'small', placeholder: '分类名称'}})]), h('span',
            {style: {float: 'right', marginRight: '20px'}},
            [h('el-button', {on: {click: () => this.remove(data, store)},attrs: {size: 'mini'}}, '删除')])])
        }
      },
      addCate1() {
        this.cateData.push({
          id: `${prefix + (id++)}`,
          displayorder: '',
          name: '',
//          shscTwoShopCatList: [],
        });
      },
      submitCate() {
        let firstLevelArr = [];
        let secondLevelArr = [];
        for (let i = 0; i < this.cateData.length; i++) {
          let cate = this.cateData[i];
          if (cate.id.toString().indexOf('fan') !== -1) {
            firstLevelArr.push(`0:${cate.displayorder}:${cate.name}`);
          } else {
            firstLevelArr.push(`${cate.id}:${cate.displayorder}:${cate.name}`)
          }
          if (cate.shscTwoShopCatList) {
            for (let j = 0; j < cate.shscTwoShopCatList.length; j++) {
              let subCate = cate.shscTwoShopCatList[j];
              if (subCate.id.toString().indexOf('fan') !== -1) {
                secondLevelArr.push(`0:${subCate.displayorder}:${subCate.name}:${cate.id}`);
              } else {
                secondLevelArr.push(`${subCate.id}:${subCate.displayorder}:${subCate.name}:${cate.id}`);
              }
            }
          }
        }
        NProgress.start();
        modifyNAddCate(this.axios, {
          oneCategoryParam: firstLevelArr.join(','),
          twoCategory: secondLevelArr.join(',')
        })
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.fetchData();
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
      },
      changeCateName(val, data, node) {
        data.name = val;
      },
      changeShowOrder(val, data, node) {
        data.displayorder = val;
      },
      fetchData() {
        getAllCates(this.axios)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.cateData = result.data.data;
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
    },
    created() {
      this.fetchData();
    },
  };
</script>

<style lang="sass" scoped>
  .tree
    padding: 10px 0 10px 0
    margin-bottom: 10px
    border-radius: 5px
  .topicTags
    background-color: #eef1f6
    line-height: 3em
    padding-left: 2em
  .promptMessage
    list-style-type: none
    padding-left: 1em
    line-height: 2em
</style>
