<template>
  <el-form :model="shopInfo" ref="shopInfo" label-width="140px">
    <el-form-item label="店主用户名" >
      <el-col :span="5">
        <a href="" target="_blank">{{ shopInfo.user }}</a>
      </el-col>
    </el-form-item>
    <el-form-item label="商铺名称" >
      <el-col :span="5">
        <a href="" target="_blank">{{ shopInfo.company }}</a>
      </el-col>
    </el-form-item>
    <el-form-item label="地址" >
      <el-col :span="5">
        {{ shopInfo.area }}
      </el-col>
    </el-form-item>
    <el-form-item label="联系电话" >
      <el-col :span="5">
        {{ shopInfo.tel }}
      </el-col>
    </el-form-item>
    <el-form-item label="主营商品" >
      <el-col :span="5">
        {{ shopInfo.main_pro }}
      </el-col>
    </el-form-item>
    <el-form-item label="创店时间" >
      <el-col :span="5">
        {{ shopInfo.create_time }}
      </el-col>
    </el-form-item>
    <el-form-item label="商品数量" >
      <el-col :span="5">
        {{ shopInfo.productCount }}
      </el-col>
    </el-form-item>
    <el-form-item label="收藏数量" >
      <el-col :span="5">
        {{ shopInfo.shop_collect }}
      </el-col>
    </el-form-item>
    <el-form-item label="访问数量" >
      <el-col :span="5">
        <el-input v-model="shopInfo.view_times"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="有效期">
      <el-date-picker
        v-model="value7"
        type="daterange"
        align="right"
        placeholder="选择日期范围"
        :picker-options="pickerOptions2">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="店铺等级" >
      <el-select v-model="shopInfo.grade" placeholder="请选择">
        <el-option
          v-for="item in shopInfo.grades"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="店铺分类" >
      <el-select v-model="shopInfo.catid" placeholder="请选择">
        <el-option
          v-for="item in shopInfo.catids"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="店铺分类" v-show="!isEdit">
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="shopInfo.catid"
          :disabled="true">
        </el-input>
      </el-col>
      <i class="el-icon-edit editAddress" @click="editAddress"></i>
    </el-form-item>
    <el-form-item label="保证金" >
      <el-col :span="5">
        <el-input v-model="shopInfo.earnest"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="pos押金" >
      <el-col :span="5">
        <el-input v-model="shopInfo.pos_deposit"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="是否开通店铺" >
      <el-radio-group v-model="radio2">
        <el-radio :label="3">开启</el-radio>
        <el-radio :label="6">待审核</el-radio>
        <el-radio :label="9">关闭</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="平台提取佣金比率" >
      <el-col :span="5">
        <el-input v-model="shopInfo.commission_shop_rate_plantform"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="一级店铺佣金比率" >
      <el-col :span="5">
        <el-input v-model="shopInfo.commission_shop_rate_0"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="二级店铺佣金比率" >
      <el-col :span="5">
        <el-input v-model="shopInfo.commission_shop_rate_1"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="三级店铺佣金比率" >
      <el-col :span="5">
        <el-input v-model="shopInfo.commission_shop_rate_2"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="店铺顶级域名" >
      <el-col :span="5">
        <el-input v-model="shopInfo.domin"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="是否开通店铺" >
      <el-radio-group v-model="radio2">
        <el-radio :label="3">开启</el-radio>
        <el-radio :label="6">待审核</el-radio>
        <el-radio :label="9">关闭</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('shopInfo')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data() {
      return {
        name: 'info',
        shopInfo: {
          user: 'Hello World',
          company: 'love',
          area: '广东省深圳市宝安区',
          tel: '13100000000',
          main_pro: '瓷砖',
          create_time: '2017-05-06',
          productCount: 0,
          shop_collect: 0,
          view_times: 1200,
          duration: '',
          grade: '白金店铺',
          greades: [],
          catid: 1,
          catids: [],
          earnest: '0.00',
          pos_deposit: '0.00',
          shop_statu: 0,
          commission_shop_rate_plantform: 0,
          commission_shop_rate_0: 0,
          commission_shop_rate_1: 0,
          commission_shop_rate_2: 0,
          domin: 'baidu.com',
          statu: 0,
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: ''
      };
    },
    methods: {
      submitForm(formuser) {
        this.$refs[formuser].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formuser) {
        this.$refs[formuser].resetFields();
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
