<template>
  <el-form :model="webInfo" :rules="rules" ref="webInfo" label-width="100px">
    <el-form-item label="省份" prop="area" >
      <el-select
        v-model="webInfo.province"
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
    <el-form-item label="网站默认模板" prop="group" >
      <el-select
        v-model="webInfo.group"
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
    <el-form-item label="二级域名">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="webInfo.subDomain">
          <template slot="prepend">Http://</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="顶级域名">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="webInfo.domain">
          <template slot="prepend">Http://</template>
          <template slot="append">.0xi.com.cn</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="分站标题" prop="user">
      <el-col :span="8"><el-input v-model="webInfo.user"></el-input></el-col>
    </el-form-item>
    <el-form-item label="分站关键词" prop="password">
      <el-col :span="8"><el-input v-model="webInfo.password"></el-input></el-col>
    </el-form-item>

    <el-form-item label="分站描述" prop="name">
      <el-col :span="8"><el-input v-model="webInfo.name"></el-input></el-col>
    </el-form-item>
    <el-form-item label="简介联系方式" prop="desc">
      <el-col :span="8">
        <el-input
          type="textarea"
          v-model="webInfo.desc"
          class="style_width"
          :autosize="{ minRows: 4, maxRows:
               8}" placeholder="请输入您的简介"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="Copyright" prop="desc">
      <el-col :span="8">
        <el-input
          type="textarea"
          v-model="webInfo.desc"
          class="style_width"
          :autosize="{ minRows: 4, maxRows:
               8}" placeholder="请输入 Copyright"></el-input>
      </el-col>
    </el-form-item>
    <!--底部按钮-->
    <el-form-item>
      <el-button type="primary" @click="submitForm('webInfo') ">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        webInfo: {},
      }
    },
  };
</script>

<style lang="sass" scoped>

</style>
