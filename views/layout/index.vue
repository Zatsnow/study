<template>
  <div class="common-layout">
    <el-container v-show="lock == 0">
      <el-asside></el-asside>
      <el-container>
        <el-header></el-header>
        <div class="main-menu">
          <div class="scroll-left" @click="leftScroll()">
            <i class="el-icon-arrow-left"></i>
          </div>
          <div class="menu" id="menu">
            <div class="menu-item" v-for="(item,index) in activeMenuArrary" :key="index" @click="openMenu(item.url)">
              <span :class="item.url == activeMenu?'active':''" class="menu-name">{{item.name}}</span>
              <i v-if="item.url != '/index'" class="menu-icon el-icon-close" @click.stop="closeMenu(item.url)"></i>
            </div>
          </div>
          <div class="scroll-right" @click="rightScroll()">
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <el-main></el-main>
      </el-container>
    </el-container>
    <el-container v-show="lock == 1">
    <div class="lock" >
        <img class="lock-back" src="../../assets/image/lock-back.jpg"/>
        <div class="form">
          <div class="content">
            <el-input prefix-icon="el-icon-star-off" type="password" v-model="pass" size="mini" placeholder="请输入密码"></el-input>
            <div @click="unlock"><i class="el-icon-d-arrow-right"></i></div>
          </div>
        </div>
    </div>
    </el-container>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getLock,setLock } from '@/utils/lock'
  import { verPassword } from '@/api/api'
  import elAsside from "../../components/layout/aside"
  import elMain from "../../components/layout/main"
  import elHeader from "../../components/layout/header"

  export default {
    name: "index",
    data() {
      return{
        lock: 0,
        pass: "",
      }
    },
    components:{
      elAsside,
      elMain,
      elHeader
    },
    computed: {
      ...mapState({
          activeMenuArrary: state => state.menu.activeMenuArrary,
          activeMenu: state => state.menu.activeMenu
      })
    },
    methods: {
      leftScroll() {
        var container = document.getElementById('menu');
        // 向左滚动100像素
        container.scrollLeft -= 100;
      },
      rightScroll() {
        var container = document.getElementById('menu');
        // 向右滚动100像素
        container.scrollLeft += 100;
      },
      openMenu(url) {
        if (this.activeMenu != url) {
          this.$router.push({
            path: url,
          })
          this.$store.commit('menu/setActiveMenu', url)
        }
      },
      closeMenu(url) {
        var index = this.activeMenuArrary.length - 1
        for(let i = 0;i < this.activeMenuArrary.length;i++) {
          if(this.activeMenuArrary[i].url == url) {
            index = i;
            break;
          }
        }
        if(this.activeMenu == url) {
          this.$router.push({
            path: this.activeMenuArrary[index-1].url,
          })
          this.$store.commit('menu/setActiveMenu', this.activeMenuArrary[index-1].url)
        }
        this.$store.commit('menu/reduceActiveMenu', index)
        this.$bus.$emit("clearKeepAlive", url);
      },
      unlock() {
        if (!this.pass) {
          this.$message({
              message: '请输入密码验证',
              type: 'warning'
          });
          return;
        }
        verPassword({password:this.pass}).then(res => {
          if (res.code == 1000) {
            this.$message({
              message: '验证通过',
              type: 'success'
            });
            this.pass = ""
            this.$bus.$emit('lock', 0)
          } else {
            this.$message({
              message: res.message,
              type: 'error'
            });
          }
        })
      }
    },
    created() {
     
    },
    mounted() {
      // console.clear()
      this.$nextTick(() => {
        this.lock = getLock()
        this.$bus.$on('lock', res=>{
          setLock(res)
          this.lock = res
        })
      })
      
    }
 }
</script>

<style   scoped>
    .common-layout >>> .el-menu-item {
        min-width: 0;
    }
    .main-menu {
      width: 100%;
      height: 25px;
      border-top: 1px solid #ECECF1;
      background-color: #ffffff;
      display: flex;
      flex-direction: row;
    }
    .menu {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 100%;
      width: calc(100% - 60px);
      overflow: scroll;
      flex-grow: 0;
      flex-basis: auto
    }
    .scroll-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 100%;
      cursor: pointer;
    }
    .menu::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
    .scroll-right {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 100%;
      cursor: pointer;
    }
    .menu-item {
      width: 100px;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-left: 1px solid #E5E5E5;
      border-right: 1px solid #E5E5E5;
      border-bottom: 1px solid #E5E5E5;
      cursor: pointer;
      background-color: #F5F7FA;
      flex-shrink: 0;
    }
    .menu-name {
      margin-left:10px;
      font-size: 12px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: '黑体';
    }
    .active {
      color: #66B1FF;
    }
    .menu-icon {
      cursor: pointer;
      font-size: 12px;
    }
    .lock {
      width: 100%;
      height: 100vh;
    }
    .lock-back {
      width: 100%;
      height: 100%;
      z-index: -1;
      position: fixed;
      object-fit: cover;
    }
    .form {
      z-index: 999;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .content {
      display: flex;
      align-items: center;
      color: black;
      font-size: 20px;
      cursor: pointer;
    }
</style>