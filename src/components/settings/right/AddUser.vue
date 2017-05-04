<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>增加管理员</h3>
          <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px">

            <el-form-item label="账号" prop="name">
              <el-col :span="8"><el-input v-model="userInfo.name"></el-input></el-col>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-col :span="8"><el-input v-model="userInfo.password"></el-input></el-col>
            </el-form-item>

            <el-form-item label="管理组" prop="region">
              <el-select v-model="userInfo.region" placeholder="财务总监">
                <el-option label="财务总监" value=""></el-option>
                <el-option label="技术总监" value=""></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="店铺分类" prop="shop">
              <el-select v-model="userInfo.shop" placeholder="建材">
                <el-option label="家装" value=""></el-option>
                <el-option label="生活" value=""></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="语言" prop="language">
              <el-select v-model="userInfo.language" placeholder="汉语">
                <el-option label="汉语" value=""></el-option>
                <el-option label="English" value=""></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="联系方式" prop="desc">
              <el-col :span="8"><el-input type="textarea" v-model="userInfo.desc" class="style_width" :autosize="{ minRows: 8, maxRows:
               20}" placeholder="请输入您的详细地址"></el-input></el-col>
            </el-form-item>
            <!--底部按钮-->
            <el-form-item>
              <el-button type="primary" @click="submitForm('userInfo') ">提交</el-button>
              <el-button plain @click="reset">重置</el-button>
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
      return {
        userInfo: {
          name: '',
          password:'',
          region: '',/*管理组*/
          shop: '',/* 店铺 */
          language: '',/* 语言 */
          desc: '' /* 联系方式 */
        },
        rules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 5, message: '您的密码', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择管理组', trigger: 'change' }
          ],
          shop: [
            { required: true, message: '请选择店铺分类', trigger: 'change' }
          ],
          language: [
            { required: true, message: '请选择语言', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写您的联系方式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      reset() {
        this.$notify.info({
          title: '重置',
          message: '您已经重置了所有内容'
        });
      },
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
