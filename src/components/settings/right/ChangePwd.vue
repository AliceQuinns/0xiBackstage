<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>修改登录密码</h3>
          <el-form ref="validateForm" :model="validateForm" :rules="rules" label-width="100px">
            <el-form-item label="用户名">
              <el-col :span="8"><el-input v-model="name" disabled></el-input></el-col>
            </el-form-item>
            <el-form-item label="原密码" prop="pass">
              <el-col :span="8"><el-input v-model="validateForm.pass" type="password"></el-input></el-col>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
              <el-col :span="8"><el-input v-model="validateForm.newPass" type="password"></el-input></el-col>
            </el-form-item>
            <el-form-item label="重复新密码" prop="checkNewPass">
              <el-col :span="8"><el-input v-model="validateForm.checkNewPass" type="password"></el-input></el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('validateForm')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      // 可以在 data 函数中处理完数据再返回
      let validatePass = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('原密码不能为空'));
        } else {
          callback();
        }
      };
      let validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.validateForm.checkNewPass !== '') {
            this.$refs.validateForm.validateField('checkNewPass');
          }
          callback();
        }
      };
      let validateNewPass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.validateForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        validateForm: {
          pass: '',
          newPass: '',
          checkNewPass: ''
        },
        name: '',
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          newPass: [
            { validator: validateNewPass, trigger: 'blur' }
          ],
          checkNewPass: [
            { validator: validateNewPass2, trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    created() {
      // 获取用户名
      let managerInfo = localStorage.getItem('managerInfo');
      this.name = JSON.parse(managerInfo).user;
    },
  };
</script>

<style lang="sass" scoped>

</style>
