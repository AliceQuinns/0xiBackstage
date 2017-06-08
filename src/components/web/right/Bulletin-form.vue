<template>
  <el-col :span="15">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="外部链接" prop="desc">
        <el-input v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" class="ql-container">
        <quill-editor v-model="ruleForm.content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </el-form-item>
      <el-form-item label="发布时间" prop="desc">
        <el-date-picker
          v-model="ruleForm.value2"
          type="datetime"
          placeholder="选择日期时间"
          align="left"
          :picker-options="pickerOptions1">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="delivery">
        <el-switch on-text="开启" off-text="关闭" v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          content: '',
          value2: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        editorOption: {
          // some quill options
        }
      };
    },
    /*computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },*/
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.value2);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
    },
    components: {
      quillEditor
    },
    /*mounted() {
      console.log('this is current quill instance object', this.editor);
    },*/
  };
</script>

<style lang="sass" scoped>

</style>
