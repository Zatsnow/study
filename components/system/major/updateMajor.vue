<template>
<div>
  <el-dialog title="编辑专业表" width="40%" :destroy-on-close="true" :visible.sync="updateVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                名称:
                </span>
            <div style="width:100%">
              <el-form-item prop="name" style="margin-bottom:0">
                  <el-input v-model="form.name" size="mini" placeholder="请输入名称" autocomplete="off"></el-input>
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
  import {editApeMajor,getApeMajorById} from '../../../api/api'
  export default {
    data() {
      return{
        formLabelWidth: '80px',
        form: {
          name: "",
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
        },
      }
    },
    props: ['updateVisible','updateId'],
    methods: {
      submit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            editApeMajor(this.form).then(res => {
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
          getApeMajorById({id:newVal}).then(res => {
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