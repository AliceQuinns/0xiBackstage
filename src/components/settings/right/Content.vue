<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>首页内容配置</h3>
          <el-row>
            <el-col :span="5" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
              <el-card :body-style="{ padding: '0px' }">
                <img src="http://element.eleme.io/static/hamburger.50e4091.png" class="image">
                <div style="padding: 14px;">
                  <span>好吃的汉堡</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">操作按钮</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentDate: new Date()
      }
    },
  };
</script>

<style lang="sass" scoped>
  .time
    font-size: 13px
    color: #999

    .bottom
      margin-top: 13px
      line-height: 12px

    .button
      padding: 0
      float: right

    .image
      width: 100%
      display: block
</style>
