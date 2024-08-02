<template>
<div>
  <el-dialog title="新增字典" width="40%" :destroy-on-close="true" :visible.sync="addDictVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                字典编码:
                </span>
            <el-form-item prop="dictCode" style="margin-bottom:0">
                <el-input v-model="form.dictCode" size="mini" placeholder="请输入字典编码" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                字典标签:
                </span>
            <el-form-item prop="dictLabel" style="margin-bottom:0">
                <el-input v-model="form.dictLabel" size="mini" placeholder="请输入字典标签" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                字典排序:
                </span>
            <el-form-item prop="dictSort" style="margin-bottom:0">
                <el-input-number size="mini" v-model="form.dictSort" :min="1"  label="字典排序"></el-input-number>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                字典键值:
                </span>
            <el-form-item prop="dictValue" style="margin-bottom:0">
                <el-input v-model="form.dictValue" size="mini" placeholder="请输入字典键值" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                样式属性:
                </span>
            <el-form-item prop="cssClass" style="margin-bottom:0">
                <el-input v-model="form.cssClass" size="mini" placeholder="请输入样式属性" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                回显样式:
                </span>
            <el-form-item prop="listClass" style="margin-bottom:0">
                <el-select size="mini" clearable v-model="form.listClass" placeholder="请选择回显样式">
                  <el-option label="primary" value="primary"></el-option>
                  <el-option label="success" value="success"></el-option>
                  <el-option label="info" value="info"></el-option>
                  <el-option label="warning" value="warning"></el-option>
                  <el-option label="danger" value="danger"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">状态:</span>
             <el-form-item prop="name" style="margin-bottom:0">
                <el-radio-group style="margin-top:1px;height:40px;display:flex;align-items: center" v-model="form.status">
                  <el-radio label="0">正常</el-radio>
                  <el-radio label="1">停用</el-radio>
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
      <el-button size="mini" @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import {saveDict} from '../../../api/api'
  export default {
    data() {
      return{
        formLabelWidth: '80px',
        form: {
          dictCode: "",
          dictLabel: "",
          dictSort: "",
          dictValue: "",
          cssClass: "",
          listClass: "",
          status: "0",
          remark: "",
        },
        rules: {
          dictCode: [
            { required: true, message: '请输入字典编码', trigger: 'blur' },
          ],
          dictSort: [
            { required: true, message: '请输入字典排序', trigger: 'blur' },
          ],
          dictLabel: [
            { required: true, message: '请输入字典标签', trigger: 'blur' },
          ],
          dictValue: [
            { required: true, message: '请输入字典键值', trigger: 'blur' },
          ],
        },
      }
    },
    props: ['addDictVisible'],
    methods: {
      submit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            saveDict(this.form).then(res => {
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
          dictCode: "",
          dictLabel: "",
          dictSort: "",
          dictValue: "",
          cssClass: "",
          listClass: "",
          status: "0",
          remark: "",
        },
        this.$emit("addDictFalse")
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