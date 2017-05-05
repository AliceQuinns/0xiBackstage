<template>
  <div class="left el-col-4">
    <tree></tree>
    <!--<el-col :span="4">
      <el-menu default-active="1" @open="handleOpen" @close="handleClose" theme="dark">
        <el-menu-item v-for="(item, index) in subNavPath.single" :key="index" :index="String(index)">
          <router-link :to="item.pathName">{{ item.name }}</router-link>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>导航一</template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>-->
  </div>
</template>

<script>
  import { getSubNavPath } from '../../common/js/util'
  export default {
    name: 'left',
    props: {
      parentId: {
        type: Number,
      },
      subNav: {
        type: Array,
      },
    },
    data() {
      return {
//        defaultActive: '0',
      }
    },
    computed: {
      subNavPath() {
        // 组合次级导航的数据
        return getSubNavPath(this.parentId, this.subNav);
      },
    },
    components: {
      tree: {
        render(h) {
          let parent = this.$parent;
          let path = parent.$route.path.split('/');
          path.splice(3, path.length - 3);  // 排除最后的 params
          path = path.join('/');
          // 左侧导航的选中状态
          let defaultActive = '0';
          for (let i = 0; i < parent.subNavPath.length; i++) {
            let item = parent.subNavPath[i];
            if (item.itemIds) {
              for (let j = 0; j < item.itemIds.length; j++) {
                let subItem = item.itemIds[j];
                if (subItem.pathName === path) {
                  defaultActive = `${i}-${j}`;
                  break;
                }
              }
            } else {
              if (item.pathName === path) {
                defaultActive = i.toString();
              }
            }
            if (defaultActive !== '0') {
              break;
            }
          }
          return h('el-col', { props: { /*span: 4*/ } },
           [ h('el-menu', {key: new Date(),props: { defaultActive }, attrs: {
           /*theme: 'dark'*/ } }, parent.subNavPath.map( (v, i) => {
             if (v.itemIds) {
               return h('el-submenu', { props: { key: i, index: String(i) } }, [h('template', { slot: 'title' },
                 [h('i', { attrs: { class: 'el-icon-message' } }), v.name]), h('el-menu-item-group',
                 v.itemIds.map((item, idx) => {
                   return h('el-menu-item', { props: { index: i + '-' + idx } }, [h('router-link', { props: { to:
                   item.pathName || '' }

                   }, item.name)])
                 }))])
             } else {
               return h('el-menu-item', { props: { index: String(i), key: i, } },
                 [ h('router-link', { props: { to: v.pathName || '' } }, v.name) ]);
             }
           }))])
        }
      }
    },
  }
</script>

<style lang="sass" scoped>
  .left
    height: 100%
    .el-col
      height: 100%
</style>
