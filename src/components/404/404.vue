<template>
  <div class="notFound">
    <div class="content">
      <p class="notice">您要查找的页面不存在</p>
      <p>
        <img src="./404.gif" alt="">
      </p>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="sass" scoped>
  .notFound
    position: absolute
    width: 100%
    height: 100%
    z-index: 99
    background-color: #fff
    .content
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      .notice
        text-align: center
        font-size: 20px
</style>
