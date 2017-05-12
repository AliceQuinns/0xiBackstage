<template>
  <el-form :model="shopInfo" ref="shopInfo" label-width="140px">
    <el-form-item label="店主用户名" >
      <el-col :span="8">
        <a href="" target="_blank">{{ shopInfo.user }}</a>
      </el-col>
    </el-form-item>
    <el-form-item label="商铺名称" >
      <el-col :span="8">
        <a href="" target="_blank">{{ shopInfo.company }}</a>
      </el-col>
    </el-form-item>
    <el-form-item label="地址" >
      <el-col :span="8">
        {{ shopInfo.addr }}
      </el-col>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-col :span="8">
        {{ shopInfo.tel }}
      </el-col>
    </el-form-item>
    <el-form-item label="主营商品" >
      <el-col :span="8">
        {{ shopInfo.main_pro }}
      </el-col>
    </el-form-item>
    <el-form-item label="创店时间" >
      <el-col :span="8">
        {{ shopInfo.create_time | formatTime }}
      </el-col>
    </el-form-item>
    <el-form-item label="商品数量" >
      <el-col :span="8">
        {{ shopInfo.productCount }}
      </el-col>
    </el-form-item>
    <el-form-item label="收藏数量" >
      <el-col :span="8">
        {{ shopInfo.shop_collect }}
      </el-col>
    </el-form-item>
    <el-form-item label="访问数量" prop="view_times">
      <el-col :span="8">
        <el-input v-model="shopInfo.view_times" type="number"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="有效期" prop="duration">
      <el-date-picker
        v-model="shopInfo.duration"
        type="daterange"
        align="left"
        placeholder="选择日期范围"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="店铺等级" prop="grade">
      <el-select v-model="shopInfo.grade" placeholder="请选择">
        <el-option
          v-for="item in gradeData"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="店铺分类" prop="catid">
      <el-cascader
        :options="actualTypeData"
        :props="props"
        v-model="shopInfo.catid"
      ></el-cascader>
    </el-form-item>
    <el-form-item label="保证金" prop="earnest">
      <el-col :span="8">
        <el-input v-model="shopInfo.earnest"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="pos押金" prop="pos_deposit">
      <el-col :span="8">
        <el-input v-model="shopInfo.pos_deposit"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="是否开通店铺" v-if="isDistribution" prop="shop_statu">
      <el-radio-group v-model="shopInfo.shop_statu">
        <el-radio :label="-3">开启</el-radio>
        <el-radio :label="-4">待审核</el-radio>
        <el-radio :label="-6">关闭</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否开通店铺" v-if="!isDistribution" prop="shop_statu">
      <el-radio-group v-model="shopInfo.shop_statu">
        <el-radio :label="1">开启</el-radio>
        <el-radio :label="0">待审核</el-radio>
        <el-radio :label="-1">关闭</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="平台提取佣金比率" v-if="!isDistribution" prop="plantformMission">
      <el-col :span="8">
        <el-input v-model="shopInfo.plantformMission"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="一级店铺佣金比率" v-if="!isDistribution" prop="rate1Mission">
      <el-col :span="8">
        <el-input v-model="shopInfo.rate1Mission"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="二级店铺佣金比率" v-if="!isDistribution" prop="rate2Mission">
      <el-col :span="8">
        <el-input v-model="shopInfo.rate2Mission"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="三级店铺佣金比率" v-if="!isDistribution" prop="rate3Mission">
      <el-col :span="8">
        <el-input v-model="shopInfo.rate3Mission"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="店铺顶级域名" prop="domin">
      <el-col :span="8">
        <el-input v-model="shopInfo.domin"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="推荐状态" prop="statu">
      <el-radio-group v-model="shopInfo.statu">
        <el-radio :label="0">暂未推荐</el-radio>
        <el-radio :label="1">推荐企业</el-radio>
        <el-radio :label="2">明星企业</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('shopInfo')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { formatDate } from '../../../common/js/util'
  export default {
    props: {
      shopInfo: {
        type: Object,
      },
      gradeData: {
        type: Array,
      },
      typeData: {
        type: Array,
      },
    },
    data() {
      return {
        pickerOptions: {
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
        props: {
          value: 'id',
          label: 'name',
          children: 'shscTwoShopCatList'
        },
        /*rules: {
          view_times: [{ required: true, message: '不能为空'}],
          duration: [{ required: true, message: '不能为空'}],
          grade: [{ required: true, message: '不能为空'}],
          catid: [{ required: true, message: '不能为空'}],
          earnest: [{ required: true, message: '不能为空'}],
          pos_deposit: [{ required: true, message: '不能为空'}],
          status: [{ required: true, message: '不能为空'}],
          plantformMission: [{ required: true, message: '不能为空'}],
          rate1Mission: [{ required: true, message: '不能为空'}],
          rate2Mission: [{ required: true, message: '不能为空'}],
          rate3Mission: [{ required: true, message: '不能为空'}],
          domin: [{ required: true, message: '不能为空'}],
          statu: [{ required: true, message: '不能为空'}],
        },*/
      }
    },
    computed: {
      actualTypeData() {
        let data = [...this.typeData];
        data.forEach(v => {
          if (v.shscTwoShopCatList.length <= 0) {
            delete v.shscTwoShopCatList;
          }
        });
        return data;
      },
      isDistribution() {
        if (this.shopInfo.shop_type) {
          return this.shopInfo.shop_type === 1 ? true : false;
        }
      },
    },
    methods: {
      submitForm(formuser) {
        this.$refs[formuser].validate((valid) => {
          if (valid) {
            let data = {
              view_times: this.shopInfo.view_times,
              stime: formatDate(new Date(this.shopInfo.duration[0]), 'yyyy-MM-dd'),
              etime: formatDate(new Date(this.shopInfo.duration[1]), 'yyyy-MM-dd'),
              grade: this.shopInfo.grade,
              catid: this.shopInfo.catid[0],
              earnest: parseFloat(this.shopInfo.earnest).toFixed(2),
              pos_deposit: parseFloat(this.shopInfo.pos_deposit).toFixed(2),
              shop_statu: this.shopInfo.shop_statu,
              domin: this.shopInfo.domin,
              statu: this.shopInfo.statu,
              userid: this.shopInfo.userid,
            };
            if (this.isDistribution) {
              this.$emit('distribution', data);
            } else {
              data.commission_shop_rate_plantform = this.shopInfo.plantformMission;
              data.commission_commission_shop_rate_0 = this.shopInfo.rate1Mission;
              data.commission_commission_shop_rate_1 = this.shopInfo.rate2Mission;
              data.commission_commission_shop_rate_2 = this.shopInfo.rate3Mission;
              this.$emit('normal', data);
            }
          } else {
            this.$message({
                message: '表单验证失败，请重试',
                type: 'error'
            });
          }
        });
      },
    },
    filters: {
      formatTime(val) {
        if (val) {
          let date = new Date(val*1000);
          return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
        }
      },
    },
  }
</script>

<style lang="sass" scoped>

</style>
