<template>
  <div>
    <el-dialog title="导入" width="40%" :destroy-on-close="true" :visible.sync="addGenVisible" :before-close="handleClose">
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
                        <el-button style="margin-top:10px" size="mini" icon="el-icon-search" type="primary" @click="searchQuery()">查询</el-button>
                        <el-button style="margin-top:10px" size="mini" icon="el-icon-refresh" @click="refresh">重置</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="table">
                <el-table
                row-key="tableName"
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
                >
                </el-table-column>
                <el-table-column
                prop="tableComment"
                label="表描述"
                >
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
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" type="primary" @click="submit">确 定</el-button>
            <el-button size="mini" @click="handleClose">取 消</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getTables,saveGen} from '../../../api/api' 
  export default {
    data() {
      return{
        loading: true,
        select: [],
        search: {
            tableName: "",
            tableComment: "",
            pageNumber: 1,
            pageSize:10
        },
        total: 0,
        tableData: []
      }
    },
    props: ['addGenVisible','tables'],
    methods: {
        searchQuery() {
            this.search.pageNumber = 1,
            this.query()
        },
        query() {
            getTables(this.search).then(res => {
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
            this.select = []
            for (let i = 0;i < val.length;i++) {
                var item = val[i]
                this.select.push(item.tableName)
            }
        },
        submit() {
            if(this.select.length <= 0) {
                this.$notify.warning({
                    title: '警告',
                    message: "请选择最少一条数据!"
                });
                return;
            }
            saveGen({tables:this.select.join(",")}).then(res => {
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
            this.search = {
                tableName: "",
                tableComment: "",
                pageNumber: 1,
                pageSize:10
            },
            this.select = []
            this.loading = true
            this.total = 0,
            this.tableData = []
            this.$emit("addGenFalse")
        },
        
    },
    watch: {
        addGenVisible(newVal) {
            if(newVal) {
                this.query()
            }
        }
    }
 }
</script>

<style scoped>
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
      margin-top: 10px;
      height: 300px;
      overflow-y: scroll;
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