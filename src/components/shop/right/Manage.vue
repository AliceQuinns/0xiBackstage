<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>店铺分类</h3>
          <search></search>
          <table-list></table-list>
          <info></info>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Search from './Search.vue'
  import TableList from './TableList.vue'
  import Info from './Info.vue'
  export default {
    components: {
      Search,
      TableList,
      Info,
    }
  };
</script>

<style lang="sass" scoped>

</style>
