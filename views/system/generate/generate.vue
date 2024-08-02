<template>
  <div class="gen">
      <div class="search-table">
        <div class="search">
            <el-row :gutter="10" style="padding:10px">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <span class="search-title">表名称:</span>
                    <el-input
                        style="margin-top:10px"
                        size="mini"
                        placeholder="请输入表名称"
                        v-model="search.tableName">
                    </el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <span class="search-title">表描述:</span>
                    <el-input
                        style="margin-top:10px"
                        size="mini"
                        placeholder="请输入表描述"
                        v-model="search.tableComment">
                    </el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <span class="search-title">创建时间:</span>
                    <el-date-picker size="mini"
                      style="margin-top:10px"
                      v-model="time"
                      type="daterange"
                      range-separator="至"
                      format="yyyy-MM-dd" 
                      value-format="yyyy-MM-dd" 
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-button style="margin-top:10px" size="mini" icon="el-icon-search" type="primary" @click="searchPage">查询</el-button>
                    <el-button style="margin-top:10px" size="mini" icon="el-icon-refresh" @click="refresh">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="table">
            <el-row style="padding-top:10px;margin-left:10px">
                <el-button type="primary" size="mini" icon="el-icon-plus" plain @click="addGen">导入</el-button>
                <el-button type="success" :disabled="update.length != 1 ?true:false" size="mini" icon="el-icon-edit" plain @click="updateGenBtn">修改</el-button>
                <el-button style="margin-left:10px" type="danger" :disabled="remove.length <= 0 ?true:false" size="mini" icon="el-icon-delete" plain @click="deleteDateBtn">删除</el-button>
                <!-- <el-button type="warning" size="mini" icon="el-icon-download" plain>导出</el-button> -->
            </el-row>
            <el-table
            v-loading="loading"
            :data="tableData"
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
            @selection-change="handleSelectionChange"
            stripe
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="tableName"
              label="表名称"
              width="150"
              >
            </el-table-column>
            <el-table-column
              prop="tableComment"
              label="表描述"
              width="150"
              >
            </el-table-column>
            <el-table-column
              prop="className"
              label="实体"
              width="150"
              >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="180"
              >
            </el-table-column>
             <el-table-column
              prop="updateTime"
              label="更新时间"
              width="180"
              >
            </el-table-column>
            <el-table-column
              label="操作"
              >
              <template slot-scope="scope">
                <el-button size="mini" @click="previewGen(scope.row.id)">预览</el-button>
                <el-button size="mini" type="info" @click="syncColumn(scope.row.id)">同步</el-button>
                <el-button size="mini" type="success" @click="updateGen(scope.row.id)">修改</el-button>
                <el-popconfirm
                  style="margin-left:5px"
                  confirm-button-text='确认'
                  cancel-button-text='取消'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确认删除选中的数据？"
                  @confirm="deleteDate(scope.row.id)"
                >
                  <el-button size="mini" slot="reference" type="danger">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="search.pageSize"
            :current-page="search.pageNumber"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="total">
          </el-pagination>
          </div>
        </div>
        <add-gen @addGenFalse="addGenFalse" :addGenVisible = "addGenVisible"></add-gen>
        <update-gen @updateGenFalse="updateGenFalse" :updateId = "updateId" :updateGenVisible = "updateGenVisible"></update-gen>
        <preview-gen @previewGenFalse="previewGenFalse" :updateId = "updateId" :previewGenVisible = "previewGenVisible"></preview-gen>
    </div>
  </div>
</template>

<script>
  import {getGenPage,removeGen,syncTableAndColumns} from '../../../api/api' 
  import addGen from '../../../components/system/generate/addGenerate'
  import updateGen from '../../../components/system/generate/updateGenerate'
  import previewGen from '../../../components/system/generate/genPreview'
  export default {
    data() {
      return{
        loading: true,
        update: [],
        remove: [],
        updateId: "",
        addGenVisible: false,
        updateGenVisible: false,
        previewGenVisible: false,
        time: [],
        search: {
            tableName: "",
            tableComment: "",
            startTime: "",
            endTime: "",
            pageNumber: 1,
            pageSize:10
        },
        total: 0,
        tableData: []
      }
    },
    components: {
      addGen,
      updateGen,
      previewGen
    },
    methods: {
      searchPage() {
        this.search.pageNumber = 1
        this.query()
      },
      query() {
        if (this.time.length > 0) {
          this.search.startTime = this.time[0] + " 00:00:00"
          this.search.endTime = this.time[1] + " 23:59:59"
        }
        getGenPage(this.search).then(res => {
          if(res.code == 1000) {
            this.tableData = res.data.records
            this.total = res.data.total
            this.loading = false
          } else {
            this.$notify.error({
              title: '错误',
              message: res.message
            });
          }
        })
      },
      refresh() {
        this.search.tableName = ""
        this.search.tableComment = ""
        this.search.startTime = ""
        this.search.endTime = ""
        this.time = []
        this.query()
      },
      handleCurrentChange(val) {
        this.search.pageNumber = val
        this.query()
      },
      handleSizeChange(val) {
        this.search.pageSize = val
        this.query()
      },
      handleSelectionChange(val) {
        this.remove = []
        for (let i = 0;i < val.length;i++) {
          var item = val[i]
          this.remove.push(item.id)
          this.update.push(item.id)
        }
      },
      addGen() {
        this.addGenVisible = true
      },
      addGenFalse() {
        this.addGenVisible = false
        this.query()
      },
      updateGen(id) {
        this.updateId = id
        this.updateGenVisible = true
      },
      updateGenFalse() {
        this.updateId = ""
        this.updateGenVisible = false
        this.query()
      },
      updateGenBtn() {
        this.updateRole(this.update[0])
      },
      previewGen(id) {
        this.updateId = id
        this.previewGenVisible = true
      },
      previewGenFalse() {
        this.updateId = ""
        this.previewGenVisible = false
        this.query()
      },
      syncColumn(id) {
        syncTableAndColumns({id:id}).then(res => {
          if(res.code == 1000) {
            this.$message({
              type: 'success',
              message: '同步成功!'
            });
            this.query()
          } else {
            this.$notify.error({
              title: '错误',
              message: res.message
            });
          }
        })
      },
      deleteDateBtn() {
        this.$confirm('确定删除选中的'+ this.remove.length +'条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDate(this.remove.join(","))
        }).catch(() => {
                 
        });
      },
      deleteDate(ids) {
        removeGen({ids:ids}).then(res => {
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
      },
    },
    created() {
     
    },
    mounted() {
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