<template>
<div>
  <el-dialog title="编辑答疑" width="40%" :destroy-on-close="true" :visible.sync="updateVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                用户昵称:
                </span>
            <div style="width:100%">
              <el-form-item prop="userName" style="margin-bottom:0">
                <el-input disabled v-model="form.userName" size="mini" placeholder="请输入用户昵称" autocomplete="off"></el-input>
              </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                提问内容:
                </span>
            <div style="width:100%">
              <el-form-item prop="content" style="margin-bottom:0">
                  <el-input type="textarea" disabled v-model="form.content" size="mini" placeholder="请输入提问内容" autocomplete="off"></el-input>
              </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                回复:
                </span>
            <div style="width:100%">
              <el-form-item prop="answer" style="margin-bottom:0">
                  <el-input type="textarea" v-model="form.answer" size="mini" placeholder="请输入回复" autocomplete="off"></el-input>
              </el-form-item>
            </div>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="submit">确 定</el-button>
      <el-button size="mini" @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import {editApeQuestion,getApeQuestionById} from '../../../api/api'
  export default {
    data() {
      return{
        formLabelWidth: '80px',
        form: {
          userId: "",
          userName: "",
          content: "",
          answer: "",
          teacherId: "",
          taskId: "",
          taskName: "",
        },
        rules: {
          answer: [
            { required: true, message: '请输入回复内容', trigger: 'blur' },
          ]
        },
      }
    },
    props: ['updateVisible','updateId'],
    methods: {
      submit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            editApeQuestion(this.form).then(res => {
              if(res.code == 1000) {
                this.$notify.success({
                  title: '成功',
                  message: "保存成功"
                });
                this.handleClose();
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.message
                });
              }
            })
          } else {
            return false;
          }
        });
      },
      handleClose() {
        this.$emit("updateFalse")
      },
     
    },
    created() {
     
    },
    mounted() {
      
    },
    watch: {
      updateId(newVal) {
        if(newVal) {
          getApeQuestionById({id:newVal}).then(res => {
            if(res.code == 1000) {
              this.form = res.data
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              });
            }
          })
        }
        
      }
    }
 }
</script>

<style lang=scss scoped>
  .el-col {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 12px
  }
  .search-title {
      font-family: '黑体';
      float: right;
      white-space: nowrap;
      font-size: 14px;
      width: 84px;
      text-align: right;
  }
  .el-tree {
      border: 1px solid #BDC1C9;
  }
</style>