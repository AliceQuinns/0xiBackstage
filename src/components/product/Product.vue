<template>
  <div class="product el-row">
    <left :parent-id="parentId" :sub-nav="subNav"></left>
    <router-view></router-view>
  </div>
</template>

<script>
  import Left from '../left/Left'
  export default {
    name: 'product-content',
    props: {
      subNav: {
        type: Array,
      },
    },
    computed: {
      parentId() {
        return this.$store.state.navId;
      }
    },
    components: {
      Left,
    },
  }
</script>

<style lang="sass" scoped>

</style>
