<template>
  <el-col :span="15">
    <el-form :model="bulletinForm" :rules="rules" ref="bulletinForm" label-width="100px" class="demo-bulletinForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="bulletinForm.title"></el-input>
      </el-form-item>
      <el-form-item label="外部链接" prop="url">
        <el-input v-model="bulletinForm.url"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" class="ql-container">
        <quill-editor v-model="bulletinForm.content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="bulletinForm.createTime"
          type="datetime"
          placeholder="选择日期时间"
          align="left"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch on-text="开启" off-text="关闭" v-model="bulletinForm.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('bulletinForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import { addBulletin, modifyBulletin } from '../../../api/index'
  import NProgress from 'nprogress'
  import { STATUS_SUCCESS } from '../../../common/consts/index'
  export default {
    props: {
      bulletinForm: {
        type: Object
      }
    },
    data() {
      return {
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ],
          url: [
            {required: true, message: '请输入外部链接', trigger: 'blur'}
          ],
        },
        pickerOptions: {
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
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {};
            Object.assign(data, this.bulletinForm);
            data.createTime = Math.floor(data.createTime.getTime()/1000);
            NProgress.start();
            if (data.id) {
              modifyBulletin(this.axios, data)
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
              addBulletin(this.axios, data)
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
              message: '请输入相关信息',
              type: 'info'
            });
            return false;
          }
        });
      },
      onEditorBlur(editor) {},
      onEditorFocus(editor) {},
      onEditorReady(editor) {},
    },
    components: {
      quillEditor
    },
  };
</script>

<style lang="sass" scoped>

</style>
