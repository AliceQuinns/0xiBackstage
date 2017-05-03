<template>
  <div class="settings el-row">
    <left :parent-id="parentId" :sub-nav="subNav"></left>
    <router-view></router-view>
  </div>
</template>

<script>
  import Left from '../left/Left'
  export default {
    name: 'settings-content',
    props: {
      subNav: {  // 次级权限
        type: Array,
      },
    },
    computed: {
      parentId() {  // 对应的主导航的 id
        return this.$store.state.navId;
      }
    },
    components: {
      Left
    },
  }
</script>

<style lang="sass" scoped>

</style>
