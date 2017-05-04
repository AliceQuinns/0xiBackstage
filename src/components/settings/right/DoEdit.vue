<template>
  <div class="right el-col-20" v-loading.body="loading" element-loading-text="拼命加载中">
    <el-row :gutter="20">
      <el-col>
        <div class="container">
          <h3>编辑权限组</h3>
          <el-form :model="powerGroup" label-width="100px" ref="form">
            <el-form-item
              label="权限组" prop="group"
              :rules="[{ required: true, message: '权限组不能为空'}]"
            >
              <el-col :span="8">
                <el-input
                  type="group"
                  v-model="powerGroup.group"
                  auto-complete="off"
                  placeholder="请输入权限组名称"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="描述" prop="desc"
              class="description"
              :rules="[{ required: true, message: '描述不能为空'}]"
            >
              <el-col :span="8"><el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 8}"
                placeholder="请输入内容"
                v-model="powerGroup.desc">
              </el-input></el-col>
            </el-form-item>
            <el-form-item class="powerCate" v-for="(item, index) in total" :key="index">
              <el-checkbox :indeterminate="item.isIndeterminate"
                           v-model="item.checkAll"
                           :disabled="item.disabledPower.length === item.powers.length"
                           @change="handleCheckAllChange($event, item)">{{
                item.name }}
              </el-checkbox>
              <el-checkbox-group v-model="item.checkedPowers" @change="handleCheckedCitiesChange($event, item)">
                <div class="powerCate-list">
                  <el-checkbox v-for="(power, idx) in item.powers" :key="idx" :label="power"
                               :disabled="power.isDisabled">{{
                    power.name}}
                  </el-checkbox>
                </div>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="submitForm('form')">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // TODO 优化，重构组件
  import NProgress from 'nprogress'
  import { getGroupInfo, editGroup } from '../../../api/index'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  let allPowers = require('../../../common/js/powerMap.json');
  let cateMap = ['index', 'settings', 'product', 'member', 'shop', 'transaction', 'manage', 'web', 'tool'];
  export default {
    data() {
      return {
        powerGroup: {
          group: '',
          desc: ''
        },
        total: [],
        loading: false,
        existedGroup: null,
        groupId: this.$route.params['id']
      };
    },
    created() {
      // 获取权限组的信息
      NProgress.start();
      getGroupInfo(this.axios, Number(this.groupId))
        .then(response => {
          let info = response.data;
          if (info.statusCode === STATUS_SUCCESS) {
            this.powerGroup.group = info.data.groupName;
            this.powerGroup.desc = info.data.groupDesc;
          }
          NProgress.done();
        })
        .catch(err => {
          console.log(err);
          NProgress.done();
        });
      // TODO 是否把权限给选中，需要后台给相应的字段
      // 页面中的权限及分类
      let total = [];
      for (let i = 0; i < cateMap.length; i++) {
        let disabledPower = [];  // 被禁用的权限
        let notDisabled = [];  // 没有被禁用的权限
        let powers = [];
        let obj = {};
        allPowers[i].subs.forEach(v => {
          if (v.itemIds) {
            v.itemIds.forEach(value => {
              if (!value.path) {
                value.isDisabled = true;
                disabledPower.push(value);
              } else {
                notDisabled.push(value);
              }
            });
            powers = powers.concat(v.itemIds);
          } else {
            // 禁止选择
            if (!v.path) {
              v.isDisabled = true;
              disabledPower.push(v);
            } else {
              notDisabled.push(v);
            }
            powers.push(v);
          }
        });
        obj.checkAll= false;
        obj.checkedPowers= [];
        obj.powers= powers;
        obj.isIndeterminate= false;
        obj.name = allPowers[i].name;
        obj.id = allPowers[i].id;
        obj.disabledPower = disabledPower;
        obj.notDisabled = notDisabled;
        total.push(obj);  // 每一组权限下的状态对象
      }
      this.total = total;
    },
    methods: {
      handleCheckAllChange(event, item) {
        item.checkedPowers = event.target.checked ? item.notDisabled : [];
        item.isIndeterminate = false;
      },
      handleCheckedCitiesChange(event, item) {
        let checkedCount = item.checkedPowers.length;
        item.checkAll = checkedCount === (item.powers.length - item.disabledPower.length);
        item.isIndeterminate = checkedCount > 0 && checkedCount < (item.powers.length - item.disabledPower.length);
      },
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
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
            editGroup(this.axios, {
              groupId: this.groupId,
              groupName: this.powerGroup.group,
              groupDesc: this.powerGroup.desc,
              groupPerms,
            }).then(response => {
              let data = response.data;
              if (data.statusCode === STATUS_SUCCESS) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.$router.go(-1);
              } else {
                this.$message({
                  message: '修改失败',
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
              message: '修改失败，请参考错误提示',
              type: 'error'
            });
            return false;
          }
        });
      },
    },
  }
</script>

<style lang="sass" scoped>
  .powerCate
    background: #E5E9F2
    border-radius: 5px

</style>
