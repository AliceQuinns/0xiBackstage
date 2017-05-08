<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>店铺分类</h3>
          <el-tree
            :data="data2"
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
  let id = 1000;

  export default {
    data() {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          showOrder: '',
          children: [{
            id: 4,
            label: '二级 1-1',
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },

    methods: {
      append(data, store) {
        store.append({ id: id++, label: 'testtest', }, data);
      },

      remove(data, store) {
        store.remove(data);
      },

      renderContent(h, { node, data, store }) {
        if (data.children) {
          return h('span', [h('span', [h('el-input', {on: { change: (val) => {this.changeShowOrder(val, data, node)} }, attrs: {value: node.id, size: 'small'},
            style: {width: '50px'}}),
            h('el-input',
            {on: { change: (val) => {this.changeCateName(val, data, node)} },style: {width: '100px',
              marginLeft: '10px'}, attrs: {value:
          node.label, size: 'small'}})]), h('span',
            {style: {float: 'right', marginRight: '20px'}},
            [h('el-button', {on: {click: () => this.append(data, store)},attrs: {size: 'mini'}}, '添加二级分类'), h('el-button', {on: {click: () => this.remove(data, store)},attrs: {size: 'mini'}}, '删除')])])
        } else {
          return h('span', [h('span', [h('el-input', {attrs: {value: node.id, size: 'small'},
            style: {width: '50px'}}),
            h('el-input',
              {style: {width: '100px', marginLeft: '10px'}, attrs: {value:
              node.label, size: 'small'}})])])
        }
      },
      addCate1() {
        this.data2.push({
          id: id++,
          label: '一级 100000000000',
          children: [],
        });
      },
      submitCate() {
        console.log(this.data2);
      },
      changeCateName(val, data, node) {
        console.log(data);
        data.label = val;
      },
      changeShowOrder(val, data, node) {
        data.showOrder = val;
      },
    }
  };
</script>

<style lang="sass" scoped>
  .tree
    padding: 10px 0 10px 0
    margin-bottom: 10px
    border-radius: 5px
</style>
