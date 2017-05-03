<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>增加管理员</h3>
          <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px">
            <el-form-item label="账号" prop="name" :span="8">
              <el-col :span="8"><el-input v-model="userInfo.name"></el-input></el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password" >
              <el-col :span="8"><el-input v-model="userInfo.password"></el-input></el-col>
            </el-form-item>
            <el-form-item label="管理组" prop="region">
              <el-select v-model="userInfo.region" placeholder="财务总监">
                <el-option label="财务总监" value="shanghai"></el-option>
                <el-option label="技术总监" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="店铺分类" prop="region">
              <el-select v-model="userInfo.region" placeholder="建材">
                <el-option label="家装" value="shanghai"></el-option>
                <el-option label="生活" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="语言" prop="region">
              <el-select v-model="userInfo.region" placeholder="汉语">
                <el-option label="汉语" value="shanghai"></el-option>
                <el-option label="English" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系方式" prop="desc">
              <el-col :span="8"><el-input type="textarea" v-model="userInfo.desc" class="style_width" :autosize="{ minRows: 8, maxRows:
               20}" placeholder="请输入您的详细地址"></el-input></el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('userInfo') ">提交</el-button>
              <el-button
                plain
                @click="open5">
                重置
              </el-button>
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
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写您的联系方式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      open5() {
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
