<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>编辑管理员</h3>
          <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px">

            <el-form-item label="账号" prop="user">
              <el-col :span="8"><el-input v-model="userInfo.user"></el-input></el-col>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-col :span="8"><el-input v-model="userInfo.password" type="password"></el-input></el-col>
              <el-col :span="5">
                <el-alert
                  class="alert"
                  title="密码留空则不更改密码"
                  type="info">
                </el-alert>
              </el-col>
            </el-form-item>

            <el-form-item label="管理员名" prop="name">
              <el-col :span="8"><el-input v-model="userInfo.name"></el-input></el-col>
            </el-form-item>

            <el-form-item label="管理组" prop="group">
              <el-select v-model="userInfo.group" placeholder="请选择管理组" class="marginleft">
                <el-option
                  v-for="group in groupData"
                  :value="group.groupId"
                  :label="group.groupName"
                  :key="group.groupId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="所属城市" prop="area" v-show="isEdit">
              <el-select v-model="userInfo.province" placeholder="请选择" @change="changeProvince">
                <el-option
                  v-for="item in provinceData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="userInfo.city" placeholder="请选择" @change="changeCity" v-show="isShowCity">
                <el-option
                  v-for="item in cityData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="userInfo.area" placeholder="请选择" v-show="isShowArea">
                <el-option
                  v-for="item in areaData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属城市" v-show="!isEdit">
              <el-col :span="6">
                <el-input
                  placeholder="请输入内容"
                  v-model="address"
                  :disabled="true">
                </el-input>
              </el-col>
              <i class="el-icon-edit editAddress" @click="editAddress"></i>
            </el-form-item>

            <el-form-item label="店铺分类" prop="shopCate">
              <el-select v-model="userInfo.shopCate" placeholder="请选择店铺分类" class="marginleft">
                <el-option
                  v-for="cate in shopCateData"
                  :value="cate.id"
                  :label="cate.name"
                  :key="cate.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="语言" prop="language">
              <el-select v-model="userInfo.language" placeholder="请选择语言" class="marginleft">
                <el-option
                  v-for="language in languageData"
                  :value="language"
                  :label="language"
                  :key="language">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="联系方式" prop="desc">
              <el-col :span="8">
                <el-input
                  type="textarea"
                  v-model="userInfo.desc"
                  class="style_width"
                  :autosize="{ minRows: 8, maxRows:
               20}" placeholder="请输入您的详细地址"></el-input>
              </el-col>
            </el-form-item>
            <!--底部按钮-->
            <el-form-item>
              <el-button type="primary" @click="submitForm('userInfo') ">提交</el-button>
              <el-button plain @click="reset('userInfo')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  let provinceData = require('../../../common/js/province.json');
  let cityData = require('../../../common/js/city.json');
  let areaData = require('../../../common/js/area.json');
  import NProgress from 'nprogress'
  import { getUserInfo, editUser } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  export default {
    data() {
      return {
        userInfo: {
          name: '',
          password:'',
          user: '',
          group: '',  /*管理组*/
          shopCate: '',  /* 店铺分类 */
          language: '',  /* 语言 */
          desc: '',  /* 联系方式 */
          province: '',
          city: '',
          area: '',
        },
        rules: {
          user: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          name: [{ required: true, message: '请输入管理员名', trigger: 'blur' }],
          /*group: [
            { required: true, message: '请选择管理组', trigger: 'change' }
          ],*/
          /*shopCate: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ],*/
          language: [
            { required: true, message: '请选择语言', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写您的联系方式', trigger: 'blur' }
          ]
        },
        provinceData: provinceData,
        cityData: [],
        areaData: [],
        isShowCity: false,
        isShowArea: false,
        groupData: [],
        shopCateData: [],
        languageData: ['cn'],
        isEdit: false,
        address: '',
        originalUserInfo: {},
      };
    },
    methods: {
      changeProvince(val) {
        this.cityData = cityData[val];
        if (!this.isShowCity) {this.isShowCity = true;}
        if (this.userInfo.city || this.userInfo.area) {
          this.userInfo.city = '';
          this.userInfo.area = '';
        }
      },
      changeCity(val) {
        this.areaData = areaData[val];
        if (!this.isShowArea) {this.isShowArea = true;}
      },
      reset(formName) {
        this.$refs[formName].resetFields();
        this.$notify.info({
          title: '重置',
          message: '您已经重置了所有内容'
        });
      },
      editAddress() {
        this.isEdit = true;
      },
      getLabel(id, arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].value === id) {
            return arr[i].label;
          }
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            NProgress.start();
            let provinceLabel = '';
            let cityLabel = '';
            let areaLabel = '';
            if (this.isEdit) {
              provinceLabel = this.getLabel(this.userInfo.province, provinceData);
              cityLabel = this.getLabel(this.userInfo.city, cityData[this.userInfo.province]);
              areaLabel = this.getLabel(this.userInfo.area, areaData[this.userInfo.city]);
            } else {
              provinceLabel = this.originalUserInfo.province;
              cityLabel = this.originalUserInfo.city;
              areaLabel = this.originalUserInfo.area;
            }
            editUser(this.axios, {
              id: this.$route.params.id,
              user: this.userInfo.user,
              name: this.userInfo.name,
              password: this.userInfo.password,
              groupId: this.userInfo.group,
              province: provinceLabel,
              provinceid: this.userInfo.province || this.originalUserInfo.provinceid,
              city: cityLabel,
              cityid: this.userInfo.city || this.originalUserInfo.cityid,
              area: areaLabel,
              areaid: this.userInfo.area || this.originalUserInfo.areaid,
              type: this.userInfo.shopCate,
              Lang: this.userInfo.language,
              desc: this.userInfo.desc,
            })
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '修改管理员成功',
                    type: 'success'
                  });
                  setTimeout(() => {
                    this.$router.go(-1);
                  }, 500);
                } else {
                  this.$message({
                    message: '修改失败，请重试',
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
              message: '请参照错误提示',
              type: 'error'
            });
            return false;
          }
        });
      },
      fetchData() {
        NProgress.start();
        getUserInfo(this.axios, this.$route.params.id)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              let user = response.data;
              this.userInfo.name = user.data.name;
              this.userInfo.user = user.data.user;
              this.address = `${user.data.province + user.data.city + user.data.area}`;
              this.userInfo.language = 'cn';
              this.userInfo.desc = user.data.desc;
              this.userInfo.group = user.data.groupId;
              this.originalUserInfo = user.data;
              this.groupData = user.data1;
              this.shopCateData = user.data2;
            } else {
              this.$message({
                message: '获取数据出错，请重新尝试',
                type: 'error'
              });
            }
            NProgress.done();
          })
          .catch(e => {
            NProgress.done();
            console.log(e);
            this.$message({
              message: '获取数据出错，请重新尝试',
              type: 'error'
            });
          });
      },
    },
    created() {
      this.fetchData();
    },
  }
</script>

<style lang="sass" scoped>
  .editAddress
    margin-left: 10px
    cursor: pointer
  .alert
    padding: 0
    margin-left: 10px
  .marginleft
    padding: 10px
</style>
