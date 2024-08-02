<template>
  <div class="_student">
      <div class="search-table">
        <div class="search">
            <el-row :gutter="10" style="padding:10px">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <span class="search-title">学生姓名:</span>
                    <el-input
                        style="margin-top:10px"
                        size="mini"
                        placeholder="请输入学生姓名"
                        v-model="search.userName">
                    </el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <el-button style="margin-top:10px" size="mini" icon="el-icon-search" type="primary" @click="searchPage">查询</el-button>
                    <el-button style="margin-top:10px" size="mini" icon="el-icon-refresh" @click="refresh">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="table">
            <el-row style="padding-top:10px;margin-left:10px">
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
              prop="userName"
              label="学生姓名"
              >
            </el-table-column>
            <el-table-column
              prop="taskName"
              label="课程名称"
              >
            </el-table-column>
            <el-table-column
              label="章节名称"
              >
                <template slot-scope="scope">
                    {{chapter.name}}
                </template>
            </el-table-column>
            <el-table-column
              label="视频"
              >
                <template slot-scope="scope">
                    {{scope.row.video}}
                </template>
            </el-table-column>
            <el-table-column
              label="作业"
              >
              <template slot-scope="scope">
                {{scope.row.homework}}
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              >
              <template slot-scope="scope">
                <el-button v-if="scope.row.homework == '已完成'" size="mini" type="primary" @click="dianping(scope.row.userId)">点评反馈</el-button>
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
        <el-dialog
        title="点评反馈"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>
          <el-input type="textarea" rows="5" v-model="content" placeholder="请输入内容"></el-input>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="handleClose">取 消</el-button>
          <el-button size="mini" type="primary" @click="submitDianPing">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {dianping,getApeTaskStudentPage,getApeChapterById,getHomeworkStudentFlag,getTaskStudentPage} from '../../../api/api' 
  export default {
    data() {
      return{
        userId: "",
        content: "",
        dialogVisible: false,
        loading: true,
        update: [],
        remove: [],
        updateId: "",
        addVisible: false,
        updateVisible: false,
        chapterId: "",
        chapter: {},
        search: {
            chapterId: "",
            taskId: "",
            userName: "",
            state: "",
            pageNumber: 1,
            pageSize:10
        },
        total: 0,
        tableData: []
      }
    },
    components: {
    },
    methods: {
      handleClose() {
        this.dialogVisible = false
        this.userId = ""
        this.content = ""
      },
      dianping(userId) {
        this.userId = userId
        this.dialogVisible = true
      },
      submitDianPing() {
        if(!this.content) {
            this.$message({
                message: '请输入内容',
                type: 'warning'
            });
            return;
        }
        var param = {
          content: this.content,
          userId: this.userId,
          chapterId: this.chapterId
        }
        dianping(param).then(res => {
          if (res.code == 1000) {
            this.$message({
                message: '操作成功',
                type: 'success'
            });
            this.handleClose()
          }
        })
      },
      searchPage() {
        this.search.pageNumber = 1
        this.query()
      },
      query() {
        getTaskStudentPage(this.search).then(res => {
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
        this.search.userName = ""
        this.search.state = ""
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
        this.update = []
        this.remove = []
        for (let i = 0;i < val.length;i++) {
          var item = val[i]
          this.update.push(item.id)
          this.remove.push(item.id)
        }
      },
    },
    mounted() {
      this.chapterId = this.$route.query.id
      this.search.chapterId = this.$route.query.id
      getApeChapterById({id:this.chapterId}).then(res => {
          if(res.code == 1000) {
              this.chapter = res.data
              this.search.taskId = res.data.taskId
              this.query()
          }
      })
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