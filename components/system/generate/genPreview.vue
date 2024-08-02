<template>
  <div class="preview">
    <el-dialog title="代码预览" width="60%" :destroy-on-close="true" :visible.sync="previewGenVisible" :before-close="handleClose">
        <el-tabs v-model="activeName">
            <el-tab-pane label="domain.java" name="one"></el-tab-pane>
            <el-tab-pane label="mapper.java" name="two"></el-tab-pane>
            <el-tab-pane label="service.java" name="three"></el-tab-pane>
            <el-tab-pane label="serviceImpl.java" name="four"></el-tab-pane>
            <el-tab-pane label="controller.java" name="five"></el-tab-pane>
            <el-tab-pane label="mapper.xml" name="six"></el-tab-pane>
            <el-tab-pane label="api.js" name="seven"></el-tab-pane>
            <el-tab-pane label="index.vue" name="eight"></el-tab-pane>
            <el-tab-pane label="add.vue" name="nine"></el-tab-pane>
            <el-tab-pane label="update.vue" name="ten"></el-tab-pane>
        </el-tabs>
        <div class="content">
            <div v-show="activeName == 'one'">
              <el-link type="danger">
                
                <div>{{data.domainName}}</div>
              </el-link>
              <el-button type="primary" size="mini" plain  @click="copyName('domain')">
                <i class="el-icon-document-copy" style="cursor: pointer;"></i>复制名称
              </el-button>
              <el-button type="primary" size="mini" plain  @click="copyCode('domain')">
                <i class="el-icon-copy-document" style="cursor: pointer;"></i>复制代码
              </el-button>
              <div style="white-space: pre-wrap;" v-text="data.domain"></div>
            </div>
            <div v-show="activeName == 'two'">
              <el-link type="danger">
                <div>{{data.mapperName}}</div>
              </el-link>
              <el-button type="primary" size="mini" plain  @click="copyName('mapper')">
                <i class="el-icon-document-copy" style="cursor: pointer;"></i>复制名称
              </el-button>
              <el-button type="primary" size="mini" plain  @click="copyCode('mapper')">
                <i class="el-icon-copy-document" style="cursor: pointer;"></i>复制代码
              </el-button>
              <div style="white-space: pre-wrap;" v-text="data.mapper"></div>
            </div>
            <div v-show="activeName == 'three'">
              <el-link type="danger">
                <div>{{data.serviceName}}</div>
              </el-link>
              <el-button type="primary" size="mini" plain  @click="copyName('service')">
                <i class="el-icon-document-copy" style="cursor: pointer;"></i>复制名称
              </el-button>
              <el-button type="primary" size="mini" plain  @click="copyCode('service')">
                <i class="el-icon-copy-document" style="cursor: pointer;"></i>复制代码
              </el-button>
              <div style="white-space: pre-wrap;" v-text="data.service"></div>
            </div>
            <div v-show="activeName == 'four'">
              <el-link type="danger">
                <div>{{data.serviceImplName}}</div>
              </el-link>
              <el-button type="primary" size="mini" plain  @click="copyName('serviceImpl')">
                <i class="el-icon-document-copy" style="cursor: pointer;"></i>复制名称
              </el-button>
              <el-button type="primary" size="mini" plain  @click="copyCode('serviceImpl')">
                <i class="el-icon-copy-document" style="cursor: pointer;"></i>复制代码
              </el-button>
              <div style="white-space: pre-wrap;" v-text="data.serviceImpl"></div>
            </div>
            <div v-show="activeName == 'five'">
              <el-link type="danger">
                <div>{{data.controllerName}}</div>
              </el-link>
              <el-button type="primary" size="mini" plain  @click="copyName('controller')">
                <i class="el-icon-document-copy" style="cursor: pointer;"></i>复制名称
              </el-button>
              <el-button type="primary" size="mini" plain  @click="copyCode('controller')">
                <i class="el-icon-copy-document" style="cursor: pointer;"></i>复制代码
              </el-button>
              <div style="white-space: pre-wrap;" v-text="data.controller"></div>
            </div>
            <div v-show="activeName == 'six'">
              <el-link type="danger">
                <div>{{data.mapperXmlName}}</div>
              </el-link>
              <el-button type="primary" size="mini" plain  @click="copyName('mapperXml')">
                <i class="el-icon-document-copy" style="cursor: pointer;"></i>复制名称
              </el-button>
              <el-button type="primary" size="mini" plain  @click="copyCode('mapperXml')">
                <i class="el-icon-copy-document" style="cursor: pointer;"></i>复制代码
              </el-button>
              <div style="white-space: pre-wrap;" v-text="data.mapperXml"></div>
            </div>
            <div v-show="activeName == 'seven'">
              <el-link type="danger">
                api
              </el-link>
              <el-button type="primary" size="mini" plain  @click="copyCode('api')">
                <i class="el-icon-copy-document" style="cursor: pointer;"></i>复制代码
              </el-button>
              <div style="white-space: pre-wrap;" v-text="data.api"></div>
            </div>
            <div v-show="activeName == 'eight'">
              <el-link type="danger">
                index
              </el-link>
              <el-button type="primary" size="mini" plain  @click="copyCode('index')">
                <i class="el-icon-copy-document" style="cursor: pointer;"></i>复制代码
              </el-button>
              <div style="white-space: pre-wrap;" v-text="data.index"></div>
            </div>
            <div v-show="activeName == 'nine'">
              <el-link type="danger">
                add
              </el-link>
              <el-button type="primary" size="mini" plain  @click="copyCode('add')">
                <i class="el-icon-copy-document" style="cursor: pointer;"></i>复制代码
              </el-button>
              <div style="white-space: pre-wrap;" v-text="data.add"></div>
            </div>
            <div v-show="activeName == 'ten'">
              <el-link type="danger">
                update
              </el-link>
              <el-button type="primary" size="mini" plain  @click="copyCode('update')">
                <i class="el-icon-copy-document" style="cursor: pointer;"></i>复制代码
              </el-button>
              <div style="white-space: pre-wrap;" v-text="data.update"></div>
            </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import Clipboard from "clipboard";
  import {preview} from '../../../api/api'
  export default {
    data() {
      return{
        activeName: "one",
        data: {
          domain: "",
          domainName: "",
          mapper: "",
          mapperName: "",
          service: "",
          serviceName: "",
          serviceImpl: "",
          serviceImplName: "",
          controller: "",
          controllerName: "",
          mapperXml: "",
          mapperXmlName: "",
          api: "",
          index: "",
          add: "",
          update: ""
        }
      }
    },
    props: ['previewGenVisible','updateId'],
    methods: {
      copyName(name) {
        var text = ""
        if (name == "domain") {
          text = this.data.domainName
        } else if (name == "mapper") {
          text = this.data.mapperName
        } else if (name == "service") {
          text = this.data.serviceName
        } else if (name == "serviceImpl") {
          text = this.data.serviceImplName
        } else if (name == "controller") {
          text = this.data.controllerName
        } else if (name == "mapperXml") {
          text = this.data.mapperXmlName
        }
        navigator.clipboard.writeText(text).then(() => {
            this.$message.success('复制成功')
        })
      },
      copyCode(name) {
        var text = ""
        if (name == "domain") {
          text = this.data.domain
        } else if (name == "mapper") {
          text = this.data.mapper
        } else if (name == "service") {
          text = this.data.service
        } else if (name == "serviceImpl") {
          text = this.data.serviceImpl
        } else if (name == "controller") {
          text = this.data.controller
        } else if (name == "mapperXml") {
          text = this.data.mapperXml
        } else if (name == "api") {
          text = this.data.api
        } else if (name == "index") {
          text = this.data.index
        } else if (name == "add") {
          text = this.data.add
        } else if (name == "update") {
          text = this.data.update
        }
        navigator.clipboard.writeText(text).then(() => {
            this.$message.success('复制成功')
        })
      },
      handleClose() {
        this.data = {
          domain: "",
          domainName: "",
          mapper: "",
          mapperName: "",
          service: "",
          serviceName: "",
          serviceImpl: "",
          serviceImplName: "",
          controller: "",
          controllerName: "",
          mapperXml: "",
          mapperXmlName: "",
          api: "",
          index: "",
          add: "",
          update: ""
        }
        this.$emit("previewGenFalse")
      },
    },
    created() {
     
    },
    mounted() {
      
    },
    watch: {
      updateId(newVal) {
        if(newVal) {
          preview({id:newVal}).then(res => {
            if(res.code == 1000) {
              this.data = res.data
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
  .preview {
    font-family: '黑体';
  }
  .content {
    height: 350px;
    overflow-y: scroll;
  }
</style>