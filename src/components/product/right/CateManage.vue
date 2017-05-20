<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>分类管理</h3>
          <el-tabs type="border-card">

            <!-- 管理 -->
            <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> 管理</span>

              <!-- 搜索分类 -->
              <el-form
                :inline="true"
                :model="searchForm">

                <!-- 产品名称 -->
                <el-form-item
                  label="分类名称：">
                  <el-input
                    v-model="searchForm.company"
                    placeholder="请输入分类名称"
                    icon="search"
                    ref="searchForm">
                  </el-input>
                </el-form-item>

                <!-- 操作 -->
                <el-form-item>
                  <el-button
                    type="primary">查询
                  </el-button>
                </el-form-item>

              </el-form>

              <!-- 树形控件 -->


            </el-tab-pane>

            <!-- 添加 -->
            <el-tab-pane>
              <span slot="label"><i class="el-icon-star-on"></i> 添加</span>
              <el-form
                :model="powerGroup"
                label-width="100px"
                ref="form"
                :rules="rules">

                <!-- 分类 -->
                <el-form-item
                  label="分类"
                  class="paddings">
                  <el-select v-model="powerGroup.region" placeholder="请选择分类">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <!-- 分类名 -->
                <el-form-item
                  label="分类名"
                  prop="group">
                  <el-col :span="8">
                    <el-input
                      type="textarea"
                      :rows="5"
                      v-model="powerGroup.group"
                      placeholder="请输入分类名"></el-input>
                  </el-col>
                </el-form-item>

                <!-- 佣金提成 -->
                <el-form-item
                  label="佣金提成"
                  prop="age">
                  <el-col :span="8">
                    <el-input
                      type="number"
                      v-model.number="powerGroup.age"
                      auto-complete="off">
                    </el-input>
                  </el-col>
                  <span class="promptText">
                    <i class="el-icon-warning"></i>
                      小于1，0.32代表32%
                    </span>
                </el-form-item>

                <!-- 关联属性集 -->
                <el-form-item
                  label="关联属性集"
                  class="paddings">
                  <el-select v-model="powerGroup.attributeSet" placeholder="请选择分类">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <!-- 推荐显示 -->
                <el-form-item
                  label="推荐显示"
                  class="paddings">
                  <el-switch
                    v-model="powerGroup.switchOne"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="1"
                    off-value="0">
                  </el-switch>
                </el-form-item>

                <!-- 虚拟商品分类 -->
                <el-form-item
                  label="虚拟商品分类"
                  class="paddings">
                  <el-switch
                    v-model="powerGroup.switchTwo"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="1"
                    off-value="0">
                  </el-switch>
                  <span class="promptText">
                    <i class="el-icon-warning"></i>
                    栏目只允许发布虚拟商品,只有顶级分类可以操作此属性
                  </span>
                </el-form-item>

                <!-- logo -->
                <el-form-item
                  label="logo"
                  class="paddings">
                  <el-upload
                    class="upload-demo"
                    drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或<em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                </el-form-item>

                <!-- 选中标志 -->
                <el-form-item
                  label="选中标志"
                  prop="desc"
                  class="description">
                  <el-col :span="8">
                    <el-input
                      type="text"
                      placeholder="请输入内容"
                      v-model="powerGroup.desc">
                    </el-input>
                  </el-col>
                </el-form-item>

                <!-- 模板 -->
                <el-form-item
                  label="模板"
                  prop="Templates">
                  <el-col :span="8">
                    <el-input
                      type="Templates"
                      v-model="powerGroup.Templates"
                      placeholder="请输入模板名"></el-input>
                  </el-col>
                </el-form-item>

                <!-- 排序 -->
                <el-form-item
                  label="排序"
                  prop="sort">
                  <el-col :span="8">
                    <el-input
                      type="sort"
                      v-model="powerGroup.sort"
                      placeholder="请输入分类名"></el-input>
                  </el-col>
                </el-form-item>

                <!-- 按钮组 -->
                <el-form-item
                  label="关联品牌"
                  class="paddings">
                  <template>
                    <el-checkbox
                      :indeterminate="isIndeterminate"
                      v-model="checkAll"
                      @change="handleCheckAllChange">全选
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group
                      v-model="checkedCities"
                      @change="handleCheckedCitiesChange">
                      <el-checkbox
                        v-for="city in cities"
                        :label="city.id"
                        :key="city.id">
                        {{city.catname}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </template>
                </el-form-item>

                <!-- 提交按钮 -->
                <el-form-item>
                  <el-button
                    type="success"
                    @click="submitForm('form')">提交
                  </el-button>
                </el-form-item>

              </el-form>
            </el-tab-pane>

            <!-- 编辑 -->
            <el-tab-pane>
              <span slot="label"><i class="el-icon-setting"></i> 编辑</span>
              <el-form
                :model="powerGroupTwo"
                label-width="100px"
                ref="form"
                :rules="rules">

                <!-- 分类 -->
                <el-form-item
                  label="分类"
                  class="paddings">
                  <el-select v-model="powerGroup.region" placeholder="请选择分类">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <!-- 分类名 -->
                <el-form-item
                  label="分类名"
                  prop="group">
                  <el-col :span="8">
                    <el-input
                      type="textarea"
                      :rows="5"
                      v-model="powerGroup.group"
                      placeholder="请输入分类名"></el-input>
                  </el-col>
                </el-form-item>

                <!-- 佣金提成 -->
                <el-form-item
                  label="佣金提成"
                  prop="age">
                  <el-col :span="8">
                    <el-input
                      type="number"
                      v-model.number="powerGroup.age"
                      auto-complete="off">
                    </el-input>
                  </el-col>
                  <span class="promptText">
                    <i class="el-icon-warning"></i>
                      小于1，0.32代表32%
                    </span>
                </el-form-item>

                <!-- 关联属性集 -->
                <el-form-item
                  label="关联属性集"
                  class="paddings">
                  <el-select v-model="powerGroup.attributeSet" placeholder="请选择分类">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <!-- 推荐显示 -->
                <el-form-item
                  label="推荐显示"
                  class="paddings">
                  <el-switch
                    v-model="powerGroup.switchOne"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="1"
                    off-value="0">
                  </el-switch>
                </el-form-item>

                <!-- 虚拟商品分类 -->
                <el-form-item
                  label="虚拟商品分类"
                  class="paddings">
                  <el-switch
                    v-model="powerGroup.switchTwo"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="1"
                    off-value="0">
                  </el-switch>
                  <span class="promptText">
                    <i class="el-icon-warning"></i>
                    栏目只允许发布虚拟商品,只有顶级分类可以操作此属性
                  </span>
                </el-form-item>

                <!-- logo -->
                <el-form-item
                  label="logo"
                  class="paddings">
                  <el-upload
                    class="upload-demo"
                    drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将文件拖到此处，或<em>点击上传</em>
                    </div>
                    <div class="el-upload__tip" slot="tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                </el-form-item>

                <!-- 选中标志 -->
                <el-form-item
                  label="选中标志"
                  prop="desc"
                  class="description">
                  <el-col :span="8">
                    <el-input
                      type="text"
                      placeholder="请输入内容"
                      v-model="powerGroup.desc">
                    </el-input>
                  </el-col>
                </el-form-item>

                <!-- 模板 -->
                <el-form-item
                  label="模板"
                  prop="Templates">
                  <el-col :span="8">
                    <el-input
                      type="Templates"
                      v-model="powerGroup.Templates"
                      placeholder="请输入模板名"></el-input>
                  </el-col>
                </el-form-item>

                <!-- 排序 -->
                <el-form-item
                  label="排序"
                  prop="sort">
                  <el-col :span="8">
                    <el-input
                      type="sort"
                      v-model="powerGroup.sort"
                      placeholder="请输入分类名"></el-input>
                  </el-col>
                </el-form-item>

                <!-- 按钮组 -->
                <el-form-item
                  label="关联品牌"
                  class="paddings">
                  <template>
                    <el-checkbox
                      :indeterminate="isIndeterminateTwo"
                      v-model="checkAllTwo"
                      @change="handleCheckAllChangeTwo">全选
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group
                      v-model="checkedCitiesTwo"
                      @change="handleCheckedCitiesChangeTwo">
                      <el-checkbox
                        v-for="city in citiesTwo"
                        :label="city.id"
                        :key="city.id">
                        {{city.catname}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </template>
                </el-form-item>

                <!-- 提交按钮 -->
                <el-form-item>
                  <el-button
                    type="success"
                    @click="submitForm('form')">提交
                  </el-button>
                </el-form-item>

              </el-form>
            </el-tab-pane>

          </el-tabs>


        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import NProgress from 'nprogress'
  import {
    addUserGroup,
    getGroupList,
    queryBrand,/* 查询复选框数据 */
    addQueryBrand,/* 添加分类,修改分类 */
    allCategories,/* 查询所有分类 */
    singleClassification,/* 查询单个分类 */
    modifiedCategories,/* 修改单个分类  添加单个分类 */
    deleteCategories,/* 删除分类 */
  } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item";
  export default {
    data() {
      return {
        /* 添加 */
        powerGroup: {
          region: '',  /* 分类 */
          group: '',  /* 分类名 */
          desc: '',   /* 选中标志 */
          age: '',    /* 佣金提成 */
          attributeSet: '', /* 关联属性 */
          switchOne: '' ,/* 推荐显示 */
          switchTwo: '' ,/* 虚拟商品分类 */
          Templates: '', /* 模板 */
          sort: '', /* 排序 */
        },

        /* 编辑 */
        powerGroupTwo: {
          region: '',  /* 分类 */
          group: '',  /* 分类名 */
          desc: '',   /* 选中标志 */
          age: '',    /* 佣金提成 */
          attributeSet: '', /* 关联属性 */
          switchOne: '' ,/* 推荐显示 */
          switchTwo: '' ,/* 虚拟商品分类 */
          Templates: '', /* 模板 */
          sort: '', /* 排序 */
        },

        /* 复选框1数据 */
        checkAll: false,		/* 主按钮状态 */
        checkedCities: [],  /* 选中的子按钮 */
        cities: [],		/* 所有选项 */
        isIndeterminate: false,	/* 主按钮选中样式 */
        citiesgroup: [],  /* 保存全部选项 */

        /* 复选框2数据 */
        checkAllTwo: false,		/* 主按钮状态 */
        checkedCitiesTwo: [],  /* 选中的子按钮 */
        citiesTwo: [],		/* 所有选项 */
        isIndeterminateTwo: false,	/* 主按钮选中样式 */
        citiesgroupTwo: [],  /* 保存全部选项 */

        /* 搜索 */
        searchForm: {
          company: '',
        },

        /* 表单验证 */
        rules: {
          group: [
            { required: true, message: '分类名不能为空'}/* 分类名 */
          ],
          Templates: [
            { required: true, message: '模板名不能为空'}/* 模板名 */
          ],
          desc: [
            { required: true, message: '选中标志不能为空'}/* 选中标志 */
          ],
          age: [
              { required: true, message: '佣金提成不能为空'},/* 佣金提成 */
              { type: 'number', message: '佣金提成必须为数字值'}
          ],
          region: [
            {}/* 分类 */
          ],
          attributeSet: [
            {}/* 关联属性 */
          ],
        },

        /* 树形控件 */
        data2: [{
          id: 1,
          label: '一级 1',
          children: [
            {
            id: 4,
            label: '二级 1-1',
            children: [
              {
              id: 9,
              label: '三级 1-1-1'
            },
              {
              id: 10,
              label: '三级 1-1-2'
            }
            ]
          }
          ]
        }, {
          id: 2,
          label: '一级 2',
          children: [
            {
            id: 5,
            label: '二级 2-1'
          },
            {
            id: 6,
            label: '二级 2-2'
          }
          ]
        },
          {
          id: 3,
          label: '一级 3',
          children: [
            {
            id: 7,
            label: '二级 3-1'
          },
            {
            id: 8,
            label: '二级 3-2'
          }
          ]
        }
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

      };
    },
    created() {
      this.butttonGroup(0);
    },

    methods: {
      /* 主按钮1 */
      handleCheckAllChange(event) {
        console.log(event.target.checked);
        this.checkedCities = event.target.checked ? this.citiesgroup : [];
        this.isIndeterminate = false;
      },

      /* 子按钮1 */
      handleCheckedCitiesChange(value) {
        console.log(value);
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },

      /* 主按钮2 */
      handleCheckAllChangeTwo(event) {
        console.log(event.target.checked);
        this.checkedCities = event.target.checked ? this.citiesgroup : [];
        this.isIndeterminate = false;
      },

      /* 子按钮2 */
      handleCheckedCitiesChangeTwo(value) {
        console.log(value);
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },

      /* 获取按钮组1数据 */
      butttonGroup(obj) {
        NProgress.start();
        queryBrand(this.axios , obj)
          .then(
            response => {
              let groups = response.data;
              if (groups.statusCode === STATUS_SUCCESS) {
                this.cities = groups.data.diaplayData;
                for(var i=0;i<groups.data.diaplayData.length;i++) {
                  this.citiesgroup.push(groups.data.diaplayData[i].id);
                };
              }
              NProgress.done();
            })
          .catch(e => {
            this.$message({
              message: '获取数据出错，请重新尝试',
              type: 'info'
            });
            console.log(e);
            NProgress.done();
          });
      },

      /* 提交 */
      submitForm(form) {
        /*this.$refs[form].validate((valid) => {
          if (valid) {
            // 如果存在权限组就返回
            if (this.existedGroup.indexOf(this.powerGroup.group) !== -1) {
              this.$message({
                message: '已存在此权限组',
                type: 'error',
              });
              return;
            }
            if (this.total[0].checkedPowers.length <= 0) {
              this.$message({
                message: '管理中心首页为必选',
                type: 'info',
              });
              return;
            }
            NProgress.start();
            this.loading = true;
            let powerArr = [];
            // 将选取的权限拼接成字符串
            this.total.forEach(category => {
              if (category.checkedPowers.length > 0) {
                powerArr.push(category.id);
              }
              category.checkedPowers.forEach(power => {
                powerArr.push(power.id)
              });
            });
            let groupPerms = powerArr.join(',');
            addUserGroup(this.axios, {
              groupName: this.powerGroup.group,
              groupDesc: this.powerGroup.desc,
              groupPerms,
            }).then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '添加失败',
                  type: 'error'
                });
              }
              NProgress.done();
              this.loading = false;
            }).catch(e => {
              NProgress.done();
              this.loading = false;
              this.$message({
                message: '出错，请重新尝试',
                type: 'error'
              });
              console.log(e);
            });
          } else {
            this.$message({
              message: '添加失败，请按照错误提示改正',
              type: 'error'
            });
            return false;
          }
        });*/
      },

      /* 树形控件 */

    },
  }
</script>

<style lang="sass" scoped>
  .powerCate
    background: #E5E9F2
    border-radius: 5px
  .paddings
    padding-left: 10px
  .promptText
    color: #20a0ff
    padding-left: 1em
  .upload-demo
    width: 30%
</style>
