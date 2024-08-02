<template>
<div>
  <el-dialog title="新增论坛" width="40%" :destroy-on-close="true" :visible.sync="addVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                讨论名称:
                </span>
            <div style="width:100%">
              <el-form-item prop="name" style="margin-bottom:0">
                  <el-input v-model="form.name" size="mini" placeholder="请输入讨论名称" autocomplete="off"></el-input>
              </el-form-item>
            </div>
        </el-col>
        <el-col style="margin-top:20px" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                讨论内容:
                </span>
            <div style="width:100%">
              <el-form-item prop="content" style="margin-bottom:0">
                  <el-input type="textarea" v-model="form.content" size="mini" placeholder="请输入讨论内容" autocomplete="off"></el-input>
              </el-form-item>
            </div>
        </el-col>
        <el-col style="margin-top:20px" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                备注:
                </span>
            <div style="width:100%">
              <el-form-item prop="remark" style="margin-bottom:0">
                  <el-input type="textarea" v-model="form.remark" size="mini" placeholder="请输入备注" autocomplete="off"></el-input>
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
  import {saveApeForum} from '../../../api/api'
  export default {
    data() {
      return{
        formLabelWidth: '80px',
        form: {
          name: "",
          content: "",
          remark: "",
        },
        rules: {
          name: [
            { required: true, message: '请输入讨论名称', trigger: 'blur' },
          ],
          content: [
            { required: true, message: '请输入讨论内容', trigger: 'blur' },
          ],
        },
      }
    },
    props: ['addVisible'],
    methods: {
      submit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            saveApeForum(this.form).then(res => {
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
        this.form = {
          name: "",
          content: "",
          userId: "",
          remark: "",
        },
        this.$emit("addFalse")
      },
     
    },
    created() {
     
    },
    mounted() {
      
    }
 }
</script>

<style scoped>
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