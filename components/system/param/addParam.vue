<template>
<div>
  <el-dialog title="新增参数" width="40%" :destroy-on-close="true" :visible.sync="addParamVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                参数名称:
                </span>
            <el-form-item prop="paramName" style="margin-bottom:0">
                <el-input v-model="form.paramName" size="mini" placeholder="请输入参数名称" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                参数键名:
                </span>
            <el-form-item prop="paramKey" style="margin-bottom:0">
                <el-input v-model="form.paramKey" size="mini" placeholder="请输入参数键名" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                参数键值:
                </span>
            <el-form-item prop="paramValue" style="margin-bottom:0">
                <el-input v-model="form.paramValue" size="mini" placeholder="请输入参数键值" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">系统内置:</span>
             <el-form-item prop="within" style="margin-bottom:0">
                <el-radio-group style="margin-top:1px;height:40px;display:flex;align-items: center" v-model="form.within">
                  <el-radio label="0">是</el-radio>
                  <el-radio label="1">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注:</span>
            <el-input type="textarea" v-model="form.remark"></el-input>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="submit">确 定</el-button>
      <el-button size="mini" @click="handleClose ">取 消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import {saveParam} from '../../../api/api'
  export default {
    data() {
      return{
        formLabelWidth: '80px',
        form: {
          paramName: "",
          paramKey: "",
          paramValue: "",
          within: '1',
          remark: ""
        },
        rules: {
          paramName: [
            { required: true, message: '请输入参数名称', trigger: 'blur' },
          ],
          paramKey: [
            { required: true, message: '请输入参数键名', trigger: 'blur' },
          ],
          paramValue: [
            { required: true, message: '请输入参数键值', trigger: 'blur' },
          ],
        },
      }
    },
    props: ['addParamVisible'],
    methods: {
      submit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            saveParam(this.form).then(res => {
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
          paramName: "",
          paramKey: "",
          paramValue: "",
          within: "1",
          remark: ""
        },
        this.$emit("addParamFalse")
      },
     
    },
    created() {
     
    },
    mounted() {
      
    }
 }
</script>

<style   scoped>
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