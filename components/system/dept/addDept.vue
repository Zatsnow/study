<template>
<div>
  <el-dialog title="新增部门" width="40%" :destroy-on-close="true" :visible.sync="addDeptVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">上级部门:</span>
            <el-form-item prop="parentId" style="margin-bottom:0">
                <el-cascader
                    :disabled="disable"
                    :value="parentId"
                    @change="handleChange"
                    size="mini"
                    :options="dropData"
                    :props="{ checkStrictly: true,value:'id',label:'deptName',children:'children' }"
                    clearable>
                </el-cascader>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                部门名称:
                </span>
            <el-form-item prop="deptName" style="margin-bottom:0">
                <el-input v-model="form.deptName" size="mini" placeholder="请输入部门名称" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">显示顺序:</span>
            <el-form-item prop="orderNum" style="margin-bottom:0">
              <el-input-number size="mini" v-model="form.orderNum" :min="1"  label="显示顺序"></el-input-number>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                负责人:
                </span>
            <el-form-item prop="leader" style="margin-bottom:0">
                <el-input v-model="form.leader" size="mini" placeholder="请输入负责人" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                联系电话:
                </span>
            <el-form-item prop="phone" style="margin-bottom:0">
                <el-input v-model="form.phone" size="mini" placeholder="请输入联系电话" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                联系邮箱:
                </span>
            <el-form-item prop="email" style="margin-bottom:0">
                <el-input v-model="form.email" size="mini" placeholder="请输入邮箱" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">部门状态:</span>
             <el-form-item prop="status" style="margin-bottom:0">
                <el-radio-group style="margin-top:1px;height:40px;display:flex;align-items: center" v-model="form.status">
                  <el-radio label="0">正常</el-radio>
                  <el-radio label="1">停用</el-radio>
                </el-radio-group>
            </el-form-item>
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
  import {saveDept} from '../../../api/api'
  export default {
    data() {
      return{
        formLabelWidth: '80px',
        form: {
          parentId: "",
          deptName: "",
          orderNum: 1,
          leader: "",
          phone: "",
          email: "",
          status: "0",
          idArrary: "",
        },
        rules: {
          deptName: [
            { required: true, message: '请输入部门名称', trigger: 'blur' },
          ],
          leader: [
            { required: true, message: '请输入负责人', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入联系邮箱', trigger: 'blur' },
          ],
        },
      }
    },
    props: ['addDeptVisible','dropData','parentId','disable'],
    methods: {
      submit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            if(!this.form.parentId) {
              if (this.disable) {
                this.handleChange(this.parentId)
              } else {
                this.form.parentId = "0"
                this.form.idArrary = "0"
              }
            }
            saveDept(this.form).then(res => {
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
          parentId: "",
          deptName: "",
          orderNum: 1,
          leader: "",
          phone: "",
          email: "",
          status: "0",
          idArrary: ""
        }
        this.$emit("addDeptFalse")
      },
      handleChange(value) {
        this.form.idArrary = ""
        var length = value.length
        if(length > 0) {
          this.form.idArrary = value.join(",")
          this.form.parentId = value[length-1]
        }
      }
    },
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