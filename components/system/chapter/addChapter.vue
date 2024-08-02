<template>
<div>
  <el-dialog title="新增章节" width="40%" :destroy-on-close="true" :visible.sync="addVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                所属课程:
                </span>
                <div style="width:100%">
                    <el-form-item prop="taskId" style="margin-bottom:0">
                        <el-select :disabled="type == 0 ? true:false" clearable style="margin-top:10px" size="mini" v-model="form.taskId" placeholder="请选择">
                            <el-option v-for="(item,index) in task" :key="index"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                章节名称:
                </span>
            <div style="width:100%">
                <el-form-item prop="name" style="margin-bottom:0">
                    <el-input v-model="form.name" size="mini" placeholder="请输入章节名称" autocomplete="off"></el-input>
                </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                视频:
                </span>
            <div style="width:100%">
                <el-form-item prop="video" style="margin-bottom:0">
                    <el-upload
                        :file-list="fileList"
                        ref="upload"
                        :action="uploadVideoUrl()"
                        accept="video/*"
                        :multiple="false"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :on-success="handleAvatorSuccess"
                        :on-remove="handleRemove">
                        <el-button size="mini" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">
                课件:
                </span>
            <div style="width:100%">
                <el-form-item prop="courseware" style="margin-bottom:0">
                    <el-upload
                        :file-list="fileList1"
                        ref="upload"
                        :action="uploadFileUrl()"
                        :multiple="false"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :on-success="handleFileSuccess"
                        :on-remove="handleFileRemove">
                        <el-button size="mini" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </div>
        </el-col>
        <el-col style="margin-top:30px" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
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
  import {saveApeChapter,getApeTaskList,getApeTaskByTeacherId} from '../../../api/api'
  export default {
    mixins: [mixin],
    data() {
      return{
        fileList: [],
        fileList1: [],
        formLabelWidth: '80px',
        form: {
          taskId: "",
          taskName: "",
          name: "",
          videoName: "",
          video: "",
          coursewareName: "",
          courseware: "",
          remark: "",
        },
        task: [], 
        rules: {
          taskId: [
            { required: true, message: '请输入课程id', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入章节名称', trigger: 'blur' },
          ],
          video: [
            { required: true, message: '请输入视频', trigger: 'blur' },
          ],
        },
      }
    },
    props: ['addVisible','taskId','type','flag'],
    methods: {
      handleAvatorSuccess(res) {
        let _this = this;
        if(res.code == 1000){
            _this.$message({
              type: 'success',
              message: '上传成功!'
            });
            this.fileList.push({name:res.data,url:this.$store.state.configure.HOST + res.message})
            this.form.video = res.message
            this.form.videoName = res.data
        }else{
          _this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      },
      handleRemove(file, fileList) {
        this.form.video = ""
        this.fileList = []
      },
      handleFileSuccess(res) {
        let _this = this;
        if(res.code == 1000){
            _this.$message({
              type: 'success',
              message: '上传成功!'
            });
            this.fileList1.push({name:res.data,url:this.$store.state.configure.HOST + res.message})
            this.form.courseware = res.message
            this.form.coursewareName = res.data
        }else{
          _this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      },
      handleFileRemove(file, fileList) {
        this.form.courseware = ""
        this.fileList1 = []
      },
      getApeTaskList() {
          getApeTaskList().then(res => {
              if(res.code == 1000) {
                this.task = res.data;
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.message
                });
              }
          })
      },
      getApeTaskByTeacherId() {
        getApeTaskByTeacherId().then(res => {
              if(res.code == 1000) {
                this.task = res.data;
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
            saveApeChapter(this.form).then(res => {
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
          taskId: "",
          taskName: "",
          name: "",
          videoName: "",
          video: "",
          coursewareName: "",
          courseware: "",
          remark: "",
        },
        this.fileList = []
        this.fileList1 = []
        this.$emit("addFalse")
      },
     
    },
    created() {
     
    },
    mounted() {
      if(this.flag == 2) {
        this.getApeTaskByTeacherId()
      } else {
        this.getApeTaskList()
      }
    },
    watch: {
      addVisible(newVal) {
        if(newVal) {
          if(this.taskId) {
            this.form.taskId = this.taskId
          }
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