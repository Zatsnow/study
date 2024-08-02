<template>
<div>
  <el-dialog title="编辑生成" width="65%" :destroy-on-close="true" :visible.sync="updateGenVisible" :before-close="handleClose">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
      </el-tab-pane>
      <el-tab-pane label="字段信息" name="second">
      </el-tab-pane>
      <el-tab-pane label="生成信息" name="third">
      </el-tab-pane>
    </el-tabs>
    <el-form v-show="activeName == 'first'" :model="form">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">表名称:</span>
            <el-form-item prop="tableName" style="margin-bottom:0">
              <el-input v-model="form.tableName" size="mini" placeholder="请输入表名称" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">表描述:</span>
            <el-form-item prop="tableComment" style="margin-bottom:0">
              <el-input v-model="form.tableComment" size="mini" placeholder="请输入表描述" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">实体类名称:</span>
            <el-form-item prop="className" style="margin-bottom:0">
              <el-input v-model="form.className" size="mini" placeholder="请输入实体类名称" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">作者:</span>
            <el-form-item prop="functionAuthor" style="margin-bottom:0">
              <el-input v-model="form.functionAuthor" size="mini" placeholder="请输入作者" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <span class="search-title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;备注:</span>
            <el-input type="textarea" v-model="form.remark"></el-input>
        </el-col>
      </el-row>
    </el-form>
    <div class="table" v-show="activeName == 'second'">
      <el-table
        :data="column"
        :header-cell-style="{
        'color': '#4A2B90',
        'background-color': '#ECE9F4',
        }"
        :row-style="{
        'color': '#888897',
        'font-size': '15px',
        'font-family':'黑体',
        'white-space': 'nowrap'
        }"
        stripe
        style="width: 100%">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        prop="columnName"
        label="字段名称"
        >
        </el-table-column>
        <el-table-column
        prop="columnComment"
        label="字段描述"
        >
        </el-table-column>
        <el-table-column
        prop="columnType"
        label="字段类型"
        >
        </el-table-column>
        <el-table-column
        prop="javaField"
        label="Java属性"
        >
        </el-table-column>
        <el-table-column
        prop="javaType"
        label="Java类型"
        >
          <template slot-scope="scope">
              <el-select size="mini" v-model="column[scope.$index].javaType" placeholder="请选择">
                  <el-option label="Long" value="Long"></el-option>
                  <el-option label="String" value="String"></el-option>
                  <el-option label="Integer" value="Integer"></el-option>
                  <el-option label="Double" value="Double"></el-option>
                  <el-option label="BigDecimal" value="BigDecimal"></el-option>
                  <el-option label="Date" value="Date"></el-option>
                  <el-option label="Boolean" value="Boolean"></el-option>
              </el-select>
          </template>
        </el-table-column>
        <el-table-column
        prop="isInsert"
        label="插入"
        width=40
        >
          <template slot-scope="scope">
            <el-checkbox true-label="1" false-label="0" v-model="column[scope.$index].isInsert"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
        prop="isEdit"
        label="编辑"
        width=40
        >
          <template slot-scope="scope">
            <el-checkbox true-label="1" false-label="0" v-model="column[scope.$index].isEdit"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
        prop="isList"
        label="列表"
        width=40
        >
          <template slot-scope="scope">
            <el-checkbox true-label="1" false-label="0" v-model="column[scope.$index].isList"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
        prop="isQuery"
        label="查询"
        width=40
        >
          <template slot-scope="scope">
            <el-checkbox true-label="1" false-label="0" v-model="column[scope.$index].isQuery"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
        prop="queryType"
        label="查询方式"
        >
          <template slot-scope="scope">
              <el-select size="mini" v-model="column[scope.$index].queryType" placeholder="请选择">
                  <el-option label="=" value="EQ"></el-option>
                  <el-option label="!=" value="NE"></el-option>
                  <el-option label=">" value="GT"></el-option>
                  <el-option label=">=" value="GTE"></el-option>
                  <el-option label="<" value="LT"></el-option>
                  <el-option label="<=" value="LTE"></el-option>
                  <el-option label="LIKE" value="LIKE"></el-option>
                  <el-option label="BETWEEN" value="BETWEEN"></el-option>
              </el-select>
          </template>
        </el-table-column>
        <el-table-column
        prop="isRequired"
        label="必填"
        width=40
        >
          <template slot-scope="scope">
            <el-checkbox true-label="1" false-label="0" v-model="column[scope.$index].isRequired"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
        prop="htmlType"
        label="显示类型"
        >
            <template slot-scope="scope">
              <el-select size="mini" v-model="column[scope.$index].htmlType" placeholder="请选择">
                  <el-option label="文本框" value="文本框"></el-option>
                  <el-option label="文本域" value="文本域"></el-option>
                  <el-option label="下拉框" value="下拉框"></el-option>
                  <el-option label="单选框" value="单选框"></el-option>
                  <el-option label="日期控件" value="日期控件"></el-option>
              </el-select>
            </template>
        </el-table-column>
        <el-table-column
        prop="dictType"
        label="字典类型"
        >
          <template slot-scope="scope">
            <el-select size="mini" clearable v-model="column[scope.$index].dictType" placeholder="请选择">
                <el-option v-for="(item,index) in dict" :key="index" :label="item.dictCode" :value="item.dictCode"></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-form v-show="activeName == 'third'" :model="form">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">生成模板:</span>
            <el-form-item prop="tplCategory" style="margin-bottom:0">
              <el-select size="mini" v-model="form.tplCategory" placeholder="请选择">
                  <el-option
                    label="单表（增删改查）"
                    value="crud">
                  </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                <el-tooltip class="item" effect="dark" content="生成在哪个java包下，例如 com.ape.apeadmin" placement="top-start">
                    <i class="el-icon-question"></i>
                </el-tooltip>
                生成包路径:
            </span>
            <el-form-item prop="packageName" style="margin-bottom:0">
                <el-input v-model="form.packageName" size="mini" placeholder="请输入生成包路径" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                <el-tooltip class="item" effect="dark" content="可理解为子系统名，例如 system" placement="top-start">
                    <i class="el-icon-question"></i>
                </el-tooltip>
                生成模块名:
            </span>
            <el-form-item prop="moduleName" style="margin-bottom:0">
                <el-input v-model="form.moduleName" size="mini" placeholder="请输入生成模块名" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                <el-tooltip class="item" effect="dark" content="可理解为功能英文名，例如 user" placement="top-start">
                    <i class="el-icon-question"></i>
                </el-tooltip>
                生成业务名:
            </span>
            <el-form-item prop="businessName" style="margin-bottom:0">
                <el-input v-model="form.businessName" size="mini" placeholder="请输入生成业务名" autocomplete="off"></el-input>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <span class="search-title">
                <el-tooltip class="item" effect="dark" content="用作类描述，例如 用户" placement="top-start">
                    <i class="el-icon-question"></i>
                </el-tooltip>
                生成功能名:
            </span>
            <el-form-item prop="functionName" style="margin-bottom:0">
                <el-input v-model="form.functionName" size="mini" placeholder="请输入生成功能名" autocomplete="off"></el-input>
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
  import {editGen,getGenById,getDictTypeList} from '../../../api/api'
  export default {
    data() {
      return{
        activeName: 'second',
        column: [],
        form: {
          tableName: "",
          tableComment: "",
          className: "",
          tplCategory: "",
          packageName: "",
          moduleName: "",
          businessName: "",
          functionName: "",
          functionAuthor: "",
          genPath: "",
          genType: "0",
          options: "",
          remark: "",
        },
        dict: [],
      }
    },
    props: ['updateGenVisible','updateId'],
    methods: {
      submit() {
        if(!this.form.tableName) {
            this.$notify.error({
              title: '错误',
              message: "请输入表名称"
            });
            return;
        }
        if(!this.form.tableComment) {
            this.$notify.error({
              title: '错误',
              message: "请输入表描述"
            });
            return;
        }
        if(!this.form.className) {
            this.$notify.error({
              title: '错误',
              message: "请输入实体类名称"
            });
            return;
        }
        if(!this.form.functionAuthor) {
            this.$notify.error({
              title: '错误',
              message: "请输入作者"
            });
            return;
        }
        if(!this.form.packageName) {
            this.$notify.error({
              title: '错误',
              message: "请输入生成包路径"
            });
            return;
        }
        if(!this.form.moduleName) {
            this.$notify.error({
              title: '错误',
              message: "请输入生成模块名"
            });
            return;
        }
        if(!this.form.businessName) {
            this.$notify.error({
              title: '错误',
              message: "请输入生成业务名"
            });
            return;
        }
        if(!this.form.functionName) {
            this.$notify.error({
              title: '错误',
              message: "请输入生成功能名"
            });
            return;
        }
        editGen({apeGenTable: this.form,columns: this.column}).then(res => {
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
      },
      handleClose() {
        this.$emit("updateGenFalse")
      },
    },
    watch: {
      updateId(newVal) {
        if(newVal) {
          getGenById({id:newVal}).then(res => {
            if(res.code == 1000) {
              this.form = res.data.table
              this.column = res.data.column
              for(let i = 0;i < this.column.length;i++) {
                this.column[i].isPk = this.column[i].isPk + ""
                this.column[i].isRequired = this.column[i].isRequired + ""
                this.column[i].isInsert = this.column[i].isInsert + ""
                this.column[i].isEdit = this.column[i].isEdit + ""
                this.column[i].isList = this.column[i].isList + ""
                this.column[i].isQuery = this.column[i].isQuery + ""
              }
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              });
            }
          })
          getDictTypeList().then(res => {
            if(res.code == 1000) {
              this.dict = res.data
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
  .table {
      background: #ffffff;
      border-radius: 7px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      margin-top: 10px;
      height: 300px;
      overflow-y: scroll;
  }
  .search-title {
      font-family: '黑体';
      float: right;
      white-space: nowrap;
      font-size: 14px;
      width: 100px;
      text-align: right;
  }
  .el-tree {
      border: 1px solid #BDC1C9;
  }
</style>