<template>
  <div class="dept">
      <div class="search-table">
        <div class="search">
            <el-row :gutter="10" style="padding:10px">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <span class="search-title">部门名称:</span>
                    <el-input
                        style="margin-top:10px"
                        size="mini"
                        placeholder="请输入部门名称"
                        v-model="search.deptName">
                    </el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <span class="search-title">部门状态:</span>
                    <el-select clearable style="margin-top:10px" size="mini" v-model="search.status" placeholder="请选择">
                      <el-option
                        label="正常"
                        value="0">
                      </el-option>
                      <el-option
                        label="停用"
                        value="1">
                      </el-option>
                    </el-select>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-button style="margin-top:10px" size="mini" icon="el-icon-search" type="primary" @click="query()">查询</el-button>
                    <el-button style="margin-top:10px" size="mini" icon="el-icon-refresh" @click="refresh()">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="table">
            <el-row style="padding-top:10px;margin-left:10px">
                <el-button type="primary" size="mini" icon="el-icon-plus" plain @click="addDept">新增</el-button>
                <el-button type="primary" size="mini" icon="el-icon-sort" plain @click="changeExpand">展开/折叠</el-button>
            </el-row>

            <el-table
                v-if="refreshTable"
                v-loading="loading"
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
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="id"
                :default-expand-all="expand"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                    prop="deptName"
                    label="部门名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="orderNum"
                    label="排序"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="status"
                    width="180"
                    label="状态">
                    <template slot-scope="scope">
                      <el-tag v-if="scope.row.status == 0">正常</el-tag>
                      <el-tag v-if="scope.row.status == 1" type="warning">停用</el-tag>
                    </template>
                </el-table-column>
                 <el-table-column
                    prop="createTime"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-dropdown trigger="hover" @command="handleCommand">
                      <span class="el-dropdown-link">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-plus" :command="scope.row.idArrary + '#add#' + scope.row.id">新增</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-edit" :command="scope.row.id + '#edit'">修改</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-delete" :command="scope.row.id + '#remove'">删除</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </template>
                </el-table-column>
            </el-table>
          </div>
        </div>
      <add-dept @addDeptFalse="addDeptFalse" :disable = "disable" :parentId = "parentId" :dropData = "tableData" :addDeptVisible = "addDeptVisible"></add-dept>
      <update-dept @updateDeptFalse="updateDeptFalse" :updateId = "updateId" :dropData = "tableData" :updateDeptVisible = "updateDeptVisible"></update-dept>
    </div>
  </div>
</template>

<script>
  import {getDeptList,removeDept} from '../../../api/api'
  import addDept from '../../../components/system/dept/addDept'
  import updateDept from '../../../components/system/dept/updateDept'
  export default {
    data() {
      return{
        loading: true,
        refreshTable: true,
        expand:true,
        addDeptVisible: false,
        updateDeptVisible: false,
        search: {
          deptName: "",
          status: "",
        },
        tableData: [],
        parentId: [],
        disable: false,
        updateId: "",
      }
    },
    components: {
      addDept,
      updateDept
    },
    methods: {
      // 搜索
      query() {
        getDeptList(this.search).then(res => {
          if(res.code == 1000) {
            this.tableData = res.data
            this.loading = false
          } else {
            this.$notify.error({
              title: '错误',
              message: res.message
            });
          }
        })
      },
      // 重置
      refresh() {
        this.search.deptName = ""
        this.search.status = ""
        this.query()
      },
      changeExpand() {
        this.refreshTable = false;
        this.expand = !this.expand;
        this.$nextTick(() => {
          this.refreshTable = true;
        });
      },
      addDept() {
        this.addDeptVisible = true
      },
      addDeptFalse() {
        this.addDeptVisible = false
        this.query()
        this.parentId = []
        this.disable = false
      },
      updateDept() {
        this.updateDeptVisible = true
      },
      updateDeptFalse() {
        this.updateId = ""
        this.updateDeptVisible = false
        this.query()
      },
      handleCommand(command) {
        var data = command.split("#")
        if(data[1] == 'add') {
          var idArrary = data[0].split(",")
          var id = data[2]
          if (idArrary[0] != "0") {
            this.parentId = idArrary
          }
          this.parentId.push(id)
          this.disable = true
          this.addDept()
        } else if (data[1] == 'edit') {
          this.updateId = data[0]
          this.updateDept()
        } else {
          this.deleteDate(data[0])
        }
      },
      deleteDate(id) {
        this.$confirm('确定删除选中的数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeDept({id:id}).then(res => {
            if(res.code == 1000) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.pageNumber = 1
              this.query()
            } else {
              this.$notify.error({
                title: '错误',
                message: res.message
              });
            }
          })
        }).catch(() => {
                 
        });
      }
    },
    mounted() {
      //初始化页面调用查询方法
      this.query()
    }
 }
</script>

<style   scoped>
  .search-table {
      width: 100%;
  }
  .search {
      background: #ffffff;
      border-radius: 7px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
  }
  .table {
      background: #ffffff;
      border-radius: 7px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      margin-top: 10px
  }
  .el-col {
      display: flex;
      flex-direction: row;
      align-items: center;
  }
  .search-title {
      font-family: '黑体';
      float: right;
      white-space: nowrap;
      font-size: 14px;
      margin-top:10px;
      width: 63px;
      text-align: right;
  }
  .el-table {
      padding: 10px;
  }
  .el-dialog__header {
    border-bottom: 1px solid #F4F8F9 !important;
  }
  .el-dialog {
    border-radius: 10px!important;
  }
</style>