<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>增加管理员</h3>
          <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px">

            <el-form-item label="账号" prop="user">
              <el-col :span="8"><el-input v-model="userInfo.user"></el-input></el-col>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-col :span="8"><el-input v-model="userInfo.password" type="password"></el-input></el-col>
            </el-form-item>

            <el-form-item label="管理员名" prop="name">
              <el-col :span="8"><el-input v-model="userInfo.name"></el-input></el-col>
            </el-form-item>

            <el-form-item label="管理组" prop="group" >
              <el-select
                v-model="userInfo.group"
                placeholder="请选择管理组"
                class="marginleft">
                <el-option
                  v-for="group in groupData"
                  :value="group.groupId"
                  :label="group.groupName"
                  :key="group.groupId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="所属城市" prop="area" >
              <el-select
                v-model="userInfo.province"
                placeholder="请选择"
                @change="changeProvince"
                class="marginleft">
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
              <el-button plain @click="reset">重置</el-button>
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
  import { getOptionsData, addUser } from '../../../api/index'
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
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码在6到20之间', trigger: 'blur' }
          ],
          name: [{ required: true, message: '请输入管理员名', trigger: 'blur' }],
          /*group: [
            { required: true, message: '请选择管理组', trigger: 'change' }
          ],*/
          area: [{ required: true, message: '请选择地址', trigger: 'change' }],
          /*shopCate: [
            { required: true, message: '请选择店铺分类', trigger: 'change' }
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
      reset() {
        this.userInfo.province = '';
        this.userInfo.city = '';
        this.$notify.info({
          title: '重置',
          message: '您已经重置了所有内容'
        });
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
            let provinceLabel = this.getLabel(this.userInfo.province, provinceData);
            let cityLabel = this.getLabel(this.userInfo.city, cityData[this.userInfo.province]);
            let areaLabel = this.getLabel(this.userInfo.area, areaData[this.userInfo.city]);
            addUser(this.axios, {
              user: this.userInfo.user,
              name: this.userInfo.name,
              password: this.userInfo.password,
              groupId: this.userInfo.group,
              province: provinceLabel,
              provinceid: this.userInfo.province,
              city: cityLabel,
              cityid: this.userInfo.city,
              area: areaLabel,
              areaid: this.userInfo.area,
              type: this.userInfo.shopCate,
              Lang: this.userInfo.language,
              desc: this.userInfo.desc,
            })
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '增加管理员成功',
                    type: 'success'
                  });
                  setTimeout(() => {
                    this.$router.go(0);
                  }, 500);
                } else {
                  this.$message({
                    message: '增加失败，请重试',
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
        getOptionsData(this.axios)
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.groupData = result.data;
              this.shopCateData = result.data1;
            } else {
              this.$message({
                message: '获取数据出错，请从新尝试',
                type: 'error'
              });
            }
            NProgress.done();
          })
          .catch(e => {
            NProgress.done();
            this.$message({
              message: '获取数据出错，请从新尝试',
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
  .marginleft
    padding-left: 10px
</style>
