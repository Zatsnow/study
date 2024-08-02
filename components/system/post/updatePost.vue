<template>
<div>
  <el-dialog title="新增角色" width="40%" :destroy-on-close="true" :visible.sync="updatePostVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                岗位名称:
                </span>
            <el-form-item prop="postName" style="margin-bottom:0">
                <el-input v-model="form.postName" size="mini" placeholder="请输入岗位名称" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
         <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                岗位编码:
                </span>
            <el-form-item prop="postCode" style="margin-bottom:0">
                <el-input v-model="form.postCode" size="mini" placeholder="请输入岗位编码" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">岗位顺序:</span>
            <el-form-item prop="postSort" style="margin-bottom:0">
              <el-input-number size="mini" v-model="form.postSort" :min="1"  label="岗位顺序"></el-input-number>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">岗位状态:</span>
             <el-form-item prop="status" style="margin-bottom:0">
                <el-radio-group style="margin-top:1px;height:40px;display:flex;align-items: center" v-model="form.status">
                  <el-radio label="0">正常</el-radio>
                  <el-radio label="1">停用</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">&nbsp;&nbsp;&nbsp;&nbsp;备注:</span>
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
  import {editPost,getPostById} from '../../../api/api'
  export default {
    data() {
      return{
        formLabelWidth: '80px',
        form: {
          postCode: "",
          postName: "",
          status: "0",
          postSort: 1,
          remark: ""
        },
        rules: {
          postCode: [
            { required: true, message: '请输入岗位编码', trigger: 'blur' },
          ],
          postName: [
            { required: true, message: '请输入岗位名称', trigger: 'blur' },
          ],
        },
      }
    },
    props: ['updatePostVisible','updateId'],
    methods: {
      submit() {
        editPost(this.form).then(res => {
          if(res.code == 1000) {
            this.$notify.success({
                  title: '成功',
                  message: "保存成功"
                });
            this.handleClose()
          } else {
            this.$notify.error({
              title: '错误',
              message: res.message
            });
          }
        })
      },
      handleClose() {
        this.$emit("updatePostFalse")
      },
    },
    watch: {
      updateId(newVal) {
        if(newVal) {
          getPostById({id:newVal}).then(res => {
            if(res.code == 1000) {
              this.form = res.data
              this.form.status = res.data.status + ""
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