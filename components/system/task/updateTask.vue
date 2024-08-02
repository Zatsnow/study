<template>
<div>
  <el-dialog title="编辑课程" width="40%" :destroy-on-close="true" :visible.sync="updateVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                课程名称:
                </span>
            <div style="width:100%">
              <el-form-item prop="name" style="margin-bottom:0">
                  <el-input v-model="form.name" size="mini" placeholder="请输入课程名称" autocomplete="off"></el-input>
              </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                课程占比:
                </span>
            <div style="width:100%">
              <el-form-item prop="proportion" style="margin-bottom:0">
                  <el-input type="number" min="0" max="100" v-model="form.proportion" size="mini" placeholder="请输入视频和作业分数所占比例" autocomplete="off"></el-input>
              </el-form-item>
            </div>
        </el-col>
        <el-col v-if="flag == 1" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                教师名称:
                </span>
            <div style="width:100%">
              <el-form-item prop="teacherId" style="margin-bottom:0">
                  <el-select clearable style="margin-top:10px" size="mini" v-model="form.teacherId" placeholder="请选择">
                    <el-option v-for="(item,index) in teacher" :key="index"
                      :label="item.userName"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>
             </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                所属专业:
                </span>
            <div style="width:100%">
              <el-form-item prop="major" style="margin-bottom:0">
                <el-select clearable style="margin-top:10px" size="mini" v-model="form.major" placeholder="请选择">
                  <el-option v-for="(item,index) in major" :key="index"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                所属分类:
                </span>
            <div style="width:100%">
              <el-form-item prop="classification" style="margin-bottom:0">
                  <el-select clearable style="margin-top:10px" size="mini" v-model="form.classification" placeholder="请选择">
                    <el-option v-for="(item,index) in classification" :key="index"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
              </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                封面:
                </span>
            <div style="width:100%">
              <el-form-item prop="image" style="margin-bottom:0">
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
            </div>
        </el-col>
        <el-col style="margin-top:35px" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                课程描述:
                </span>
            <div style="width:100%">
              <el-form-item prop="taskDescribe" style="margin-bottom:0">
                <el-input type="textarea" v-model="form.taskDescribe" size="mini" placeholder="请输入课程描述" autocomplete="off"></el-input>
              </el-form-item>
            </div>
        </el-col>
        <el-col style="margin-top:25px" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
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
  import {mixin} from "../../../minix";
  import {editApeTask,getApeTaskById,getUserListByType,getApeMajorList,getApeClassificationList} from '../../../api/api'
  export default {
    mixins: [mixin],
    data() {
      return{
        formLabelWidth: '80px',
        form: {
          name: "",
          taskDescribe: "",
          teacherId: "",
          teacherName: "",
          image: "",
          state: "",
          major: "",
          classification: "",
          num: "",
          remark: "",
          proportion: "",
        },
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        rules: {
          proportion: [
            { required: true, message: '请输入视频和作业分数占比', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
          ],
          taskDescribe: [
            { required: true, message: '请输入课程描述', trigger: 'blur' },
          ],
          teacherId: [
            { required: true, message: '请选择教师', trigger: 'blur' },
          ],
          state: [
            { required: true, message: '请选择状态', trigger: 'blur' },
          ],
          major: [
            { required: true, message: '请选择所属专业', trigger: 'blur' },
          ],
          classification: [
            { required: true, message: '请选择所属分类', trigger: 'blur' },
          ],
          image: [
            { required: true, message: '请上传封面图片', trigger: 'blur' },
          ],
        },
        teacher: [],
        major: [],
        classification: []
      }
    },
    props: ['updateVisible','updateId','flag'],
    methods: {
      handleAvatorSuccess(res) {
        let _this = this;
        if(res.code == 1000){
            _this.$message({
              type: 'success',
              message: '上传成功!'
            });
            this.fileList.push({url:this.$store.state.configure.HOST + res.message})
            this.form.image = res.message
        }else{
          _this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      },
      handleRemove(file, fileList) {
        this.form.image = ""
        this.fileList = []
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getUserListByType() {
        getUserListByType({type:1}).then(res => {
          if(res.code == 1000) {
            this.teacher = res.data
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
      getApeClassificationList() {
        getApeClassificationList().then(res => {
          if(res.code == 1000) {
            this.classification = res.data
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
            if(this.flag == 2) {
              this.form.type = 1
            }
            editApeTask(this.form).then(res => {
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
        this.fileList = []
        this.$emit("updateFalse")
      },
     
    },
    created() {
     
    },
    mounted() {
      this.getUserListByType()
      this.getApeMajorList()
      this.getApeClassificationList()
    },
    watch: {
      updateId(newVal) {
        if(newVal) {
          getApeTaskById({id:newVal}).then(res => {
            if(res.code == 1000) {
              this.form = res.data
              this.form.state = 2
              this.form.num = res.data.num + ""
              this.fileList.push({url:this.$store.state.configure.HOST + this.form.image})
              if (this.flag == 1) {
                this.form.type = 0
              } else {
                this.form.type = 1
              }
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