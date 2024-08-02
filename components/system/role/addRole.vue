<template>
<div>
  <el-dialog title="新增角色" width="40%" :destroy-on-close="true" :visible.sync="addRoleVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">角色名称:</span>
            <el-form-item prop="roleName" style="margin-bottom:0">
              <el-input v-model="form.roleName" size="mini" placeholder="请输入用户名称" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                <el-tooltip class="item" effect="dark" content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top-start">
                    <i class="el-icon-question"></i>
                </el-tooltip>
                权限字符:
                </span>
            <el-form-item prop="roleKey" style="margin-bottom:0">
                <el-input v-model="form.roleKey" size="mini" placeholder="请输入权限字符" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">角色顺序:</span>
            <el-form-item prop="roleSort" style="margin-bottom:0">
              <el-input-number size="mini" v-model="form.roleSort" :min="1"  label="角色顺序"></el-input-number>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">状态:</span>
             <el-form-item prop="status" style="margin-bottom:0">
                <el-radio-group style="margin-top:1px;height:40px;display:flex;align-items: center" v-model="form.status">
                  <el-radio label="0">正常</el-radio>
                  <el-radio label="1">停用</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">菜单权限:</span>
            <el-tree v-if="menu.length > 0" style="font-family:'黑体';padding-right:20px;border-radius:4px"
                :props="defaultProps"
                :data="menu"
                node-key="id"
                ref="tree"
                :check-strictly="true"
                show-checkbox
                >
            </el-tree>
            <span style="font-family: '黑体'" v-if="menu.length <= 0">暂无数据</span>
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
  import {saveRole} from '../../../api/api'
  export default {
    data() {
      return{
        defaultProps: {
          children: 'children',
          label: 'menuName'
        },
        formLabelWidth: '80px',
        form: {
          roleName: "",
          roleKey: "",
          roleSort: "",
          status: "0",
          remark: "",
          menuIds: [],
        },
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
          ],
          roleKey: [
            { required: true, message: '请输入权限标识', trigger: 'blur' },
          ]
        },
      }
    },
    props: ['addRoleVisible','menu'],
    methods: {
      submit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            this.form.menuIds = this.$refs.tree.getCheckedKeys()
            saveRole(this.form).then(res => {
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
          roleName: "",
          roleKey: "",
          roleSort: "",
          status: "0",
          remark: "",
          menuIds: [],
        },
        this.$emit("addRoleFalse")
      },
     
    },
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