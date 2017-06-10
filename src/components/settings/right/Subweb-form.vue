<template>
  <el-form :model="webInfo" :rules="rules" ref="webInfo" label-width="100px">
    <el-form-item label="省份" v-show="isShow">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          :value="webInfo.con+webInfo.con2+webInfo.con3"
          :disabled="true">
        </el-input>
      </el-col>
      <i class="el-icon-edit editAddress" @click="editAddress"></i>
    </el-form-item>
    <el-form-item label="省份" v-show="!isShow">
      <el-select
        v-model="webInfo.province"
        placeholder="请选择"
        @change="changeProvince">
        <el-option
          v-for="item in provinceData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="webInfo.city" placeholder="请选择" @change="changeCity" v-show="isShowCity">
        <el-option
          v-for="item in cityData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="webInfo.area" placeholder="请选择" v-show="isShowArea">
        <el-option
          v-for="item in areaData"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级域名" prop="domain">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="webInfo.domain">
          <template slot="prepend">Http://</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="分站标题" prop="webTitle">
      <el-col :span="8">
        <el-input v-model="webInfo.webTitle"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="分站关键词">
      <el-col :span="8">
        <el-input v-model="webInfo.webKeyword"></el-input>
      </el-col>
    </el-form-item>

    <el-form-item label="分站描述">
      <el-col :span="8">
        <el-input v-model="webInfo.webDes"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="简介联系方式">
      <el-col :span="8">
        <el-input
          type="textarea"
          v-model="webInfo.des"
          class="style_width"
          :autosize="{ minRows: 4, maxRows:
               8}" placeholder="请输入您的简介"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Copyright">
      <el-col :span="8">
        <el-input
          type="textarea"
          v-model="webInfo.copyright"
          class="style_width"
          :autosize="{ minRows: 4, maxRows:
               8}" placeholder="请输入 Copyright"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="是否开启">
      <el-switch
        v-model="webInfo.isopen"
        on-color="#13ce66"
        off-color="#ff4949">
      </el-switch>
    </el-form-item>
    <!--底部按钮-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('webInfo') ">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  let provinceData = require('../../../common/js/province.json');
  let cityData = require('../../../common/js/city.json');
  let areaData = require('../../../common/js/area.json');
  import {addSub, modifySub} from '../../../api/index'
  import NProgress from 'nprogress'
  import {STATUS_SUCCESS} from '../../../common/consts/index'
  export default {
    props: {
      webInfo: {
        type: Object
      },
      isShow: {
        type: Boolean
      },
    },
    data() {
      return {
        provinceData: provinceData,
        cityData: [],
        areaData: [],
        isShowCity: false,
        isShowArea: false,
        rules: {
          domain: [
            {required: true, message: '请输入二级域名', trigger: 'blur'}
          ],
          webTitle: [
            {required: true, message: '请输入网站标题', trigger: 'blur'}
          ],
        },
      }
    },
    methods: {
      changeProvince(val) {
        this.cityData = cityData[val];
        if (!this.isShowCity) {
          this.isShowCity = true;
        }
        if (this.webInfo.city || this.webInfo.area) {
          this.webInfo.city = '';
          this.webInfo.area = '';
        }
      },
      changeCity(val) {
        this.areaData = areaData[val];
        if (!this.isShowArea) {
          this.isShowArea = true;
        }
      },
      getLabel(id, arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].value === id) {
            return arr[i].label;
          }
        }
      },
      editAddress() {
        this.$emit('edit');
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.webInfo.id) {
              let data = {};
              Object.assign(data, this.webInfo);
              if (!this.isShow) {
                let provinceLabel = this.getLabel(this.webInfo.province, provinceData);
                let cityLabel = this.getLabel(this.webInfo.city, cityData[this.webInfo.province]);
                let areaLabel = this.getLabel(this.webInfo.area, areaData[this.webInfo.city]);
                data.con = provinceLabel;
                data.con2 = cityLabel;
                data.con3 = areaLabel;
              }
              data.isopen = data.isopen ? 1 : 0;
              NProgress.start();
              modifySub(this.axios, data)
                .then(response => {
                  let result = response.data;
                  if (result.statusCode === STATUS_SUCCESS) {
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                    this.$emit('change');
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
              let data = {};
              Object.assign(data, this.webInfo);
              let provinceLabel = this.getLabel(this.webInfo.province, provinceData);
              let cityLabel = this.getLabel(this.webInfo.city, cityData[this.webInfo.province]);
              let areaLabel = this.getLabel(this.webInfo.area, areaData[this.webInfo.city]);
              data.con = provinceLabel;
              data.con2 = cityLabel;
              data.con3 = areaLabel;
              data.isopen = data.isopen ? 1 : 0;
              NProgress.start();
              addSub(this.axios, data)
                .then(response => {
                  let result = response.data;
                  if (result.statusCode === STATUS_SUCCESS) {
                    this.$message({
                      message: '增加成功',
                      type: 'success'
                    });
                    this.$emit('change');
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
            }
          } else {
            this.$message({
              message: '请正确填写信息',
              type: 'info'
            });
            return false;
          }
        });
      },
    },
  };
</script>

<style lang="sass" scoped>
</style>
