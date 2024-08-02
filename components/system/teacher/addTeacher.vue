<template>
<div>
  <el-dialog title="新增教师" width="40%" :destroy-on-close="true" :visible.sync="addUserVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">教师昵称:</span>
            <el-form-item prop="userName" style="margin-bottom:0">
              <el-input v-model="form.userName" size="mini" placeholder="请输入教师昵称" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">手机号码:</span>
            <el-form-item prop="tel" style="margin-bottom:0">
              <el-input v-model="form.tel" size="mini" placeholder="请输入手机号码" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">&nbsp;&nbsp;&nbsp;&nbsp;邮箱:</span>
            <el-form-item prop="email" style="margin-bottom:0">
              <el-input v-model="form.email" size="mini" placeholder="请输入邮箱" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">登陆账号:</span>
            <el-form-item prop="loginAccount" style="margin-bottom:0">
              <el-input v-model="form.loginAccount" size="mini" placeholder="请输入登陆账号" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">教师密码:</span>
            <el-form-item prop="password" style="margin-bottom:0">
              <el-input v-model="form.password" show-password size="mini" placeholder="请输入教师密码" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">学校:</span>
            <el-form-item prop="school" style="margin-bottom:0">
              <el-select size="mini" v-model="form.school" placeholder="请选择学校">
                <el-option v-for="(item,index) in school" :key="index" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">专业:</span>
            <el-form-item prop="major" style="margin-bottom:0">
              <el-select size="mini" v-model="form.major" placeholder="请选择专业">
                <el-option v-for="(item,index) in major" :key="index" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">国家:</span>
            <el-form-item prop="country" style="margin-bottom:0">
              <el-input v-model="form.country" size="mini" placeholder="请输入国家" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">职称:</span>
            <el-form-item prop="agree" style="margin-bottom:0">
              <el-input v-model="form.agree" size="mini" placeholder="请输入职称" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">年龄:</span>
            <el-form-item prop="age" style="margin-bottom:0">
              <el-input type="number" v-model="form.age" size="mini" placeholder="请输入年龄" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">生日:</span>
            <el-form-item prop="birth" style="margin-bottom:0">
              <el-date-picker size="mini"
                v-model="form.birth"
                type="date"
                placeholder="请输入生日">
              </el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">地址:</span>
            <el-form-item prop="address" style="margin-bottom:0">
              <el-input v-model="form.address" size="mini" placeholder="请输入地址" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">工作年限:</span>
            <el-form-item prop="workDate" style="margin-bottom:0">
              <el-input type="number" v-model="form.workDate" size="mini" placeholder="请输入工作年限" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">性别:</span>
            <el-form-item prop="sex" style="margin-bottom:0">
              <el-select size="mini" v-model="form.sex" placeholder="请选择性别">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
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
            <span class="search-title">教学资质:</span>
            <el-form-item prop="flair" style="margin-bottom:0">
              <el-upload
                :file-list="fileList"
                ref="upload"
                :action="uploadImageUrl()"
                accept="image/*"
                :multiple="false"
                :limit="1"
                :before-upload="beforeAvatorUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-exceed="handleExceed"
                :on-success="handleAvatorSuccess"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
        </el-col>
        <el-col style="margin-top:30px" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">&nbsp;&nbsp;&nbsp;&nbsp;备注:</span>
            <div style="width:100%">
              <el-form-item prop="remark" style="margin-bottom:0">
                <el-input type="textarea" v-model="form.remark"></el-input>
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
  import {mixin} from "../../../minix";
  import {saveUser,getApeSchoolList,getApeMajorList} from '../../../api/api'
  export default {
    mixins: [mixin],
    data() {
      return{
        formLabelWidth: '80px',
        school: [],
        major: [],
        dialogImageUrl: '',
        dialogVisible: false,
        form: {
          userName: "",
          loginAccount: "",
          email: "",
          tel: "",
          sex: "",
          password: "",
          status: "0",
          userType: 1,
          school: "",
          major: "",
          country: "",
          agree: "",
          age: "",
          birth: "",
          flair: "",
          address: "",
          workDate: "",
          remark: "",
        },
        fileList: [],
        rules: {
          userName: [
            { required: true, message: '请输入教师昵称', trigger: 'blur' },
          ],
          loginAccount: [
            { required: true, message: '请输入登陆账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入登陆密码', trigger: 'blur' },
          ],
          tel: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          ],
          school: [
            { required: true, message: '请选择学校', trigger: 'blur' },
          ],
          major: [
            { required: true, message: '请选择专业', trigger: 'blur' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          country: [
            { required: true, message: '请输入国家', trigger: 'blur' },
          ],
          agree: [
            { required: true, message: '请输入职称', trigger: 'blur' },
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
          ],
          birth: [
            { required: true, message: '请选择生日', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' },
          ],
          flair: [
            { required: true, message: '请上传教学资质', trigger: 'blur' },
          ],
          workDate: [
            { required: true, message: '请输入工作年限', trigger: 'blur' },
          ],
          remark: [
            { required: true, message: '请输入教师介绍', trigger: 'blur' },
          ]
        }
      }
    },
    props: ['addUserVisible'],
    methods: {
      handleAvatorSuccess(res) {
        let _this = this;
        if(res.code == 1000){
            _this.$message({
              type: 'success',
              message: '上传成功!'
            });
            this.fileList.push({url:this.$store.state.configure.HOST + res.message})
            this.form.flair = res.message
        }else{
          _this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      },
      handleRemove(file, fileList) {
        this.form.flair = ""
        this.fileList = []
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getApeSchoolList() {
        getApeSchoolList().then(res=> {
          if(res.code == 1000) {
            this.school = res.data
          } else {
            this.$notify.error({
              title: '错误',
              message: res.message
            });
          }
        })
      },
      getApeMajorList() {
        getApeMajorList().then(res => {
          if(res.code == 1000) {
            this.major = res.data
          } else {
            this.$notify.error({
              title: '错误',
              message: res.message
            });
          }
        })
      },
      submit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            saveUser(this.form).then(res => {
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
          userName: "",
          loginAccount: "",
          userType: 0,
          email: "",
          tel: "",
          sex: "",
          password: "",
          status: "0",
          userType: 1,
          school: "",
          major: "",
          country: "",
          agree: "",
          age: "",
          birth: "",
          flair: "",
          address: "",
          workDate: "",
          remark: "",
        }
        this.fileList = []
        this.$emit("addUserFalse")
      },
    },
    created() {
     
    },
    mounted() {
      this.getApeMajorList()
      this.getApeSchoolList()
    }
 }
</script>

<style   scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
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
      width: 63px;
      text-align: right;
  }
</style>