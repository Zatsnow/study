<template>
  <div class="dict">
      <div class="search-table">
        <div class="search">
            <el-row :gutter="10" style="padding:10px">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <span class="search-title">字典编码:</span>
                    <el-input
                        style="margin-top:10px"
                        size="mini"
                        placeholder="请输入字典编码"
                        v-model="search.dictCode">
                    </el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <span class="search-title">字典标签:</span>
                    <el-input
                        style="margin-top:10px"
                        size="mini"
                        placeholder="请输入字典标签"
                        v-model="search.dictLabel">
                    </el-input>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                    <span class="search-title">状态:</span>
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
                    <el-button style="margin-top:10px" size="mini" icon="el-icon-search" type="primary" @click="searchPage">查询</el-button>
                    <el-button style="margin-top:10px" size="mini" icon="el-icon-refresh" @click="refresh">重置</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="table">
            <el-row style="padding-top:10px;margin-left:10px">
                <el-button type="primary" size="mini" icon="el-icon-plus" plain @click="addDict">新增</el-button>
                <el-button type="success" :disabled="update.length != 1 ?true:false" size="mini" icon="el-icon-edit" plain @click="updateDictBtn">修改</el-button>
                <el-button type="danger" :disabled="update.length <= 0 ?true:false" size="mini" icon="el-icon-delete" plain @click="deleteDateBtn">删除</el-button>
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
              prop="dictCode"
              label="字典编码"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="dictLabel"
              label="字典标签"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="dictSort"
              label="字典排序"
              width="100"
              >
            </el-table-column>
            <el-table-column
              prop="dictValue"
              label="字典键值"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="180">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status == 0">正常</el-tag>
                <el-tag v-if="scope.row.status == 1" type="warning">停用</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              >
            </el-table-column>
            <el-table-column
              label="操作"
              width="180"
              >
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="updateDict(scope.row.id)">修改</el-button>
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
      <add-dict @addDictFalse="addDictFalse" :addDictVisible = "addDictVisible"></add-dict>
      <update-dict @updateDictFalse="updateDictFalse" :updateId = "updateId" :updateDictVisible = "updateDictVisible"></update-dict>
    </div>
  </div>
</template>

<script>
  import {getDictPage,removeDict} from '../../../api/api' 
  import addDict from '../../../components/system/dict/addDict'
  import updateDict from '../../../components/system/dict/updateDict'
  export default {
    data() {
      return{
        loading: true,
        update: [],
        remove: [],
        updateId: "",
        addDictVisible: false,
        updateDictVisible: false,
        search: {
            dictCode: "",
            dictLabel: "",
            status: "",
            pageNumber: 1,
            pageSize:10
        },
        total: 0,
        tableData: []
      }
    },
    components: {
      addDict,
      updateDict
    },
    methods: {
      searchPage() {
        this.search.pageNumber = 1
        this.query()
      },
      query() {
        getDictPage(this.search).then(res => {
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
        this.search.dictCode = ""
        this.search.dictLabel = ""
        this.search.status = ""
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
      addDict() {
        this.addDictVisible = true
      },
      addDictFalse() {
        this.addDictVisible = false
        this.query()
      },
      updateDictFalse() {
        this.updateId = ""
        this.updateDictVisible = false
        this.query()
      },
      updateDict(id) {
        this.updateId = id
        this.updateDictVisible = true
      },
      updateDictBtn() {
        this.updateDict(this.update[0])
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
        removeDict({ids:ids}).then(res => {
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