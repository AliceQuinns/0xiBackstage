<template>
  <div class="login clearfix">
    <el-col :span="8" :offset="8" class="pos">
      <el-form :model="logForm" :rules="rules" ref="logForm" label-width="100px">
        <el-form-item>
          <img src="./logo.png" alt="">
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="logForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="logForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="logForm.code" style="width: 80%"></el-input>
          <img class="code" src="http://192.168.1.146:8080/pictureCheckCode" alt="" @click="getNewPic($event)">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('logForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  import { CHANGE_HEADER_STATUS } from '../../common/consts/mutation-types'
  import { login } from '../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../common/consts/index'
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit(CHANGE_HEADER_STATUS, {status: false});
      })
    },
    props: ['subNav'],
    data() {
      return {
        logForm: {
          name: '',
          password: '',
          code: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            NProgress.start();
            login(this.axios, {
              user: this.logForm.name,
              password: this.logForm.password,
              randcode: this.logForm.code,
            })
              .then(response => {
                let result = response.data;
                console.log(result);
                if (result.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                  if (window.localStorage) {
                    window.localStorage.setItem('sessionId', result.data.sessionId);
                    window.localStorage.setItem('powers', result.data.groupParam);
                  }
                  this.$store.commit('CHANGE_POWERS', {powers: result.data.groupParam});
                  this.$router.push('/index/welcome');
                } else {
                  this.$message({
                    message: '登录失败，请重试',
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
          } else {
            this.$message({
              message: '请正确填写相关信息',
              type: 'error'
            });
            return false;
          }
        });
      },
      getNewPic(e) {
        e.target.src = 'http://192.168.1.146:8080/pictureCheckCode?v=' + new Date().getTime();
      },
    },

  };
</script>

<style lang="sass" scoped>
  .login
    height: 100%
    background: rgb(50,138,145) url(./bg.jpg) no-repeat 0 0
    background-size: 100%
    /*background: linear-gradient(135deg, rgb(50,138,145) 0%,rgb(72,153,135) 51%,rgb(91,206,187) 100%)*/
    .pos
      margin-top: 100px
      .code
        margin-left: 10px
        vertical-align: top
</style>
