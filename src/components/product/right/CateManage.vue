<template>
  <div class="right el-col-20">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>分类管理</h3>
          <el-tabs type="border-card" v-model="editableTabsValue">

            <!-- 管理 -->
            <el-tab-pane>
              <span slot="label" @click="toggle"><i class="el-icon-date"></i> 管理</span>
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
              <el-table :data="tableData5" style="width: 100%">

                <!-- 2级 -->
                <el-table-column type="expand" v-if="catsdisplayTwo">
                  <template scope="props">
                    <el-table :data="props.row.cats" style="width: 100%">

                      <!-- 3级 -->
                      <el-table-column type="expand" v-if="catsdisplayThree">
                        <template scope="props">
                          <el-table :data="props.row.cats" style="width: 100%">

                            <!-- 4级 -->
                            <el-table-column type="expand" v-if="catsdisplayFour">
                              <template scope="props">
                                <el-table :data="props.row.cats" style="width: 100%">
                                  <!-- 显示顺序 -->
                                  <el-table-column label="显示顺序" prop="nums" width="100">
                                  </el-table-column>

                                  <!-- 分类名称 -->
                                  <el-table-column label="分类名称" prop="cat">
                                  </el-table-column>

                                  <!-- 显示 -->
                                  <el-table-column label="显示" prop="isindex">
                                  </el-table-column>
                                </el-table>
                              </template>
                            </el-table-column>

                            <!-- 显示顺序 -->
                            <el-table-column label="显示顺序" prop="nums" width="100">
                            </el-table-column>

                            <!-- 分类名称 -->
                            <el-table-column label="分类名称" prop="cat">
                            </el-table-column>

                            <!-- 显示 -->
                            <el-table-column label="显示" prop="isindex">
                            </el-table-column>

                            <!--操作-->
                            <el-table-column
                              label="操作"
                              width="285">
                              <template
                                scope="scope">
                                <!-- 添加按钮 -->
                                <el-button
                                  @click.native.prevent="addRow"
                                  icon="star-on"
                                  type="success"
                                  size="small">
                                  添加一级
                                </el-button>
                                <!-- 删除按钮 -->
                                <el-button
                                  @click.native.prevent="deleteRow(scope.$index, scope.row)"
                                  type="danger"
                                  icon="delete"
                                  size="small">
                                  删除
                                </el-button>
                                <!-- 编辑按钮 -->
                                <el-button
                                  @click="edit(scope.$index, scope.row)"
                                  icon="setting"
                                  size="small">
                                  编辑
                                </el-button>
                              </template>
                            </el-table-column>

                          </el-table>
                        </template>
                      </el-table-column>

                      <!-- 显示顺序 -->
                      <el-table-column label="显示顺序" prop="nums" width="100">
                      </el-table-column>

                      <!-- 分类名称 -->
                      <el-table-column label="分类名称" prop="cat">
                      </el-table-column>

                      <!-- 显示 -->
                      <el-table-column label="显示" prop="isindex">
                      </el-table-column>

                      <!--操作-->
                      <el-table-column
                        label="操作"
                        width="285">
                        <template
                          scope="scope">
                          <!-- 添加按钮 -->
                          <el-button
                            @click.native.prevent="addRow"
                            icon="star-on"
                            type="success"
                            size="small">
                            添加一级
                          </el-button>
                          <!-- 删除按钮 -->
                          <el-button
                            @click.native.prevent="deleteRow(scope.$index, scope.row)"
                            type="danger"
                            icon="delete"
                            size="small">
                            删除
                          </el-button>
                          <!-- 编辑按钮 -->
                          <el-button
                            @click="querYRow(scope.$index, scope.row)"
                            icon="setting"
                            size="small">
                            编辑
                          </el-button>
                        </template>
                      </el-table-column>

                    </el-table>
                  </template>
                </el-table-column>

                <!-- 显示顺序 -->
                <el-table-column label="显示顺序" prop="nums" width="100">
                </el-table-column>

                <!-- 分类名称 -->
                <el-table-column label="分类名称" prop="cat">
                </el-table-column>

                <!-- 显示 -->
                <el-table-column label="显示" prop="isindex">
                </el-table-column>

                <!--操作-->
                <el-table-column
                  label="操作"
                  width="285">
                  <template
                    scope="scope">
                    <!-- 添加按钮 -->
                    <el-button
                      @click.native.prevent="addRow"
                      icon="star-on"
                      type="success"
                      size="small">
                      添加一级
                    </el-button>
                    <!-- 删除按钮 -->
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, scope.row)"
                      type="danger"
                      icon="delete"
                      size="small">
                      删除
                    </el-button>
                    <!-- 编辑按钮 -->
                    <el-button
                      @click="edit(scope.$index, scope.row)"
                      icon="setting"
                      size="small">
                      编辑
                    </el-button>
                  </template>
                </el-table-column>

              </el-table>

            </el-tab-pane>

            <!-- 添加 -->
            <el-tab-pane >
              <span slot="label" @click="toggle"><i class="el-icon-star-on"></i> 添加</span>
              <el-form
                :model="powerGroup"
                label-width="100px"
                ref="form"
                :rules="rules">

                <!-- 分类 -->
                <el-form-item
                  label="分类"
                  class="paddings">
                  <el-select
                    v-model="powerGroup.regions"
                    placeholder="请选择分类">
                    <el-option
                    v-for="item in region"
                    :key="item.catid"
                    :label="item.cat"
                    :value="item.catid">
                    </el-option>
                  </el-select>
                </el-form-item>

                <!-- 分类名 -->
                <el-form-item
                  label="分类名">
                  <el-col :span="8">
                    <el-input
                      type="text"
                      :rows="5"
                      v-model="powerGroup.groupOne"
                      placeholder="请输入分类名">
                    </el-input>
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
                    @click="submitForm('powerGroup',0)">提交
                  </el-button>
                </el-form-item>

              </el-form>
            </el-tab-pane>

            <!-- 编辑 -->
            <el-tab-pane v-if="settings">
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
                      v-model="powerGroupTwo.sort"
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
                    @click="queryForm('form')">提交
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
  import ElCheckbox from "../../../../node_modules/element-ui/packages/checkbox/src/checkbox";
  export default {
    components: {ElCheckbox},
    data() {
      return {
        /* 添加 */
        powerGroup: {
          regions: [],  /* 选中分类 */
          desc: '',   /* 选中标志 */
          age: '',    /* 佣金提成 */
          attributeSet: '', /* 关联属性 */
          switchOne: '' ,/* 推荐显示 */
          switchTwo: '' ,/* 虚拟商品分类 */
          Templates: '', /* 模板 */
          sort: '', /* 排序 */
          groupOne: '',  /* 分类名 */
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

        /* 添加表单-分类全部选项 */
        region: [],

        /* 编辑表单-分类全部选项 */
        regionTwo: [],
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
        tableData5: [],

        /* 2级渲染 */
        catsdisplayTwo: true,

        /* 3级渲染 */
        catsdisplayThree: true,

        /* 4级渲染 */
        catsdisplayFour: true,

        /* 跳转选项卡 */
        editableTabsValue: '0',

        /* 编辑选项卡切换 */
        settings: false,
      };
    },
    created() {
      this.butttonGroup(0);
      this.query();
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
                this.citiesTwo = groups.data.diaplayData;
                for(var i=0;i<groups.data.diaplayData.length;i++) {
                  this.citiesgroup.push(groups.data.diaplayData[i].id);
                  this.citiesgroupTwo.push(groups.data.diaplayData[i].id);
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

      /* 分类信息 和 下拉菜单 */
      query() {
        NProgress.start();
        allCategories(this.axios)
          .then(
            response => {
              let groups = response.data;
              if (groups.statusCode === STATUS_SUCCESS) {
                  this.region = response.data.data.displayData;
                  this.tableData5 = response.data.data.displayData;
                  /* 1级循环 */
                  for(var i=0;i<response.data.data.displayData.length;i++) {
                    /* 2级循环 */
                    if(response.data.data.displayData[i].cats != null){
                      this.catsdisplayTwo = true;
                      for(var j=0;j<response.data.data.displayData[i].cats.length;i++) {
                        var displays = response.data.data.displayData[i].cats[j].isindex;
                        if(displays == true) {
                          response.data.data.displayData[i].cats[j].isindex = "显示";
                        }else if(displays == false){
                          response.data.data.displayData[i].cats[j].isindex = "不显示";
                        };
                      }
                    };
                    var display = response.data.data.displayData[i].isindex;
                    if(display == true) {
                      response.data.data.displayData[i].isindex = "显示";
                    }else if(display == false){
                      response.data.data.displayData[i].isindex = "不显示";
                    };
                  };
              }
              NProgress.done();
            })
          .catch(e => {
            this.$message({
              message: '获取数据出错，请重新尝试',
              type: 'error'
            });
            console.log(e);
            NProgress.done();
          });
      },

      /* 添加提交 */
      submitForm(formName) {
        addQueryBrand(this.axios, {
              tcatid: 0,/* 父分类id */
              cat: this.powerGroup.groupOne,/* 分类名称 */
              commission: this.powerGroup.age,/* 佣金 */
              extFieldCat: this.powerGroup.attributeSet,/* 关联属性集 */
              isindex: this.powerGroup.switchOne,/* 是否推荐显示 */
              isvirtual: this.powerGroup.switchTwo,/* 是否是虚拟产品 */
              current: this.powerGroup.desc,/* 选中标识 */
              templates: this.powerGroup.Templates,/* 模板 */
              nums: this.powerGroup.sort,/* 排序 */
              brand: this.checkedCities.join(','),/* 关联品牌 */
            })
              .then(response => {
                let result = response.data;
                if (result.statusCode === STATUS_SUCCESS) {
                  this.$message({
                    message: '增加成功',
                    type: 'success'
                  });
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
        },

      /* 编辑表单 */
      queryForm(formName) {
        addQueryBrand(this.axios, {
          tcatid: 0,/* 父分类id */
          cat: this.powerGroupTwo.groupOne,/* 分类名称 */
          commission: this.powerGroupTwo.age,/* 佣金 */
          extFieldCat: this.powerGroupTwo.attributeSet,/* 关联属性集 */
          isindex: this.powerGroupTwo.switchOne,/* 是否推荐显示 */
          isvirtual: this.powerGroupTwo.switchTwo,/* 是否是虚拟产品 */
          current: this.powerGroupTwo.desc,/* 选中标识 */
          templates: this.powerGroupTwo.Templates,/* 模板 */
          nums: this.powerGroupTwo.sort,/* 排序 */
          brand: this.checkedCitiesTwo.join(','),/* 关联品牌 */
        })
          .then(response => {
            let result = response.data;
            if (result.statusCode === STATUS_SUCCESS) {
              this.$message({
                message: '增加成功',
                type: 'success'
              });
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
      },

      /* 添加一级 */
      addRow() {
        this.editableTabsValue = '1';
      },

      /* 编辑 */
      edit(index,row) {
        this.settings = true;
        this.editableTabsValue = '2';
        NProgress.start();
        singleClassification(this.axios, {catid: row.catid})
          .then(response => {
            let data = response.data;
            if (data.statusCode === STATUS_SUCCESS) {
              let data = response.data.data.displayData;
              data.cat = this.powerGroupTwo.groupOne;/* 分类名称 */
              data.commission= this.powerGroupTwo.age,/* 佣金 */
              data.extFieldCat= this.powerGroupTwo.attributeSet,/* 关联属性集 */
              data.isindex= this.powerGroupTwo.switchOne,/* 是否推荐显示 */
              data.isvirtual= this.powerGroupTwo.switchTwo,/* 是否是虚拟产品 */
              data.current= this.powerGroupTwo.desc,/* 选中标识 */
              data.templates= this.powerGroupTwo.Templates,/* 模板 */
              data.nums= this.powerGroupTwo.sort,/* 排序 */
              data.brand= this.checkedCitiesTwo.join(','),/* 关联品牌 */
              console.log(data);
            } else {
              this.$message({
                message: '请求数据失败',
                type: 'error'
              });
            }
            NProgress.done();
          })
          .catch(e => {
            this.$message({
              message: '出现未知错误，请重试',
              type: 'error'
            });
            console.log(e);
            NProgress.done();
          });
      },

      /* 切换 */
      toggle(){
        this.settings = false;
      },

      /* 删除 */
      deleteRow(index, row) {
        this.$confirm('此操作将永久删除该会员等级, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          NProgress.start();
          console.log(row.catid);
          deleteCategories(this.axios, {catid: row.catid})
            .then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.query();
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  message: '删除失败',
                  type: 'error'
                });
              }
              NProgress.done();
            })
            .catch(e => {
              this.$message({
                message: '出现未知错误，请重试',
                type: 'error'
              });
              console.log(e);
              NProgress.done();
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

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
  .el-table__expanded-cell
    padding: 0px
</style>
