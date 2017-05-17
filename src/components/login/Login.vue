<template>
  <div>testtesttest</div>
</template>

<script>
  import { CHANGE_HEADER_STATUS } from '../../common/consts/mutation-types'
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit(CHANGE_HEADER_STATUS, {status: false});
      })
    }
  };
</script>

<style lang="sass" scoped>

</style>
