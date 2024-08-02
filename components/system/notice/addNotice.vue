<template>
<div>
  <el-dialog title="新增通知公告" width="40%" :destroy-on-close="true" :visible.sync="addNoticeVisible" :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                标题:
                </span>
            <el-form-item prop="title" style="margin-bottom:0">
                <el-input v-model="form.title" size="mini" placeholder="请输入标题" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">公告类型:</span>
            <el-form-item prop="type" style="margin-bottom:0">
              <el-select size="mini" v-model="form.type" placeholder="请选择">
                <el-option label="公告" value="0"></el-option>
                <el-option label="通知" value="1"></el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">状态:</span>
             <el-form-item prop="state" style="margin-bottom:0">
                <el-radio-group style="margin-top:1px;height:40px;display:flex;align-items: center" v-model="form.state">
                  <el-radio label="0">正常</el-radio>
                  <el-radio label="1">关闭</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内容:</span>
            <quill-editor ref="myQuillEditor" :options="editorOption"
            v-model="form.content"/>
            <el-upload class="Quill-uploader" :show-file-list="false" accept="image/*" v-show="0" ref="updateUpload" :multiple="false" :action="uploadImageUrl()"
                :on-success="handleQillSuccess">
            </el-upload>
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
  import { mixin } from '../../../minix/index';
  import {saveAccount} from '../../../api/api'
  export default {
    mixins: [mixin],
    data() {
      return{
        editorOption: {
          placeholder: "请输入文字内容",
          modules: { 
            toolbar: {
                container: [
                    ["bold", "italic", "underline", "strike"], 
                    ["blockquote", "code-block"], 
                    [{ header: 1 }, { header: 2 }], 
                    [{ list: "ordered" }, { list: "bullet" }], 
                    [{ script: "sub" }, { script: "super" }], 
                    [{ indent: "-1" }, { indent: "+1" }], 
                    [{ direction: "rtl" }], 
                    [{ size: ["small", false, "large", "huge"] }], 
                    [{ header: [1, 2, 3, 4, 5, 6, false] }], 
                    [{ color: [] }, { background: [] }], 
                    [{ font: [] }], [{ align: [] }], 
                    ["clean"], ["image"]
                ],
                handlers: {
                    'image': function ( value ) {
                        if ( value ) {
                            // 触发上传插件
                            document.querySelector('.Quill-uploader .el-upload__input').click()
                        } else {
                            this.quill.format( 'image', false );
                        }
                    }
                }
            },
            syntax: { 
                highlight: text => { 
                    return hljs.highlightAuto(text).value; // 这里就是代码高亮需要配置的地方 
                }
            }
          }
        },
        formLabelWidth: '60px',
        form: {
          title: "",
          type: "0",
          state: "0",
          content: "",
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
        },
      }
    },
    props: ['addNoticeVisible'],
    methods: {
      submit() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            saveAccount(this.form).then(res => {
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
          title: "",
          type: "0",
          state: "0",
          content: ""
        },
        this.$emit("addNoticeFalse")
      },
      handleQillSuccess(res){
            let _this = this;
            if(res.code == 1000){
                _this.$notify({
                    title: '上传成功',
                    type: 'success'
                });
                let imgurl = this.$store.state.configure.HOST + res.message
                let quill = this.$refs.myQuillEditor.quill
                let position = quill.getSelection().index
                quill.insertEmbed(position, 'image', imgurl)
                quill.setSelection(position + 1)
            }else{
                _this.$notify({
                    title: '上传失败',
                    type: 'error'
                });
            }
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
  ::v-deep .ql-editor {
    min-height: 150px !important;
  }
</style>