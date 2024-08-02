import { getMenuByUser } from '@/api/api'
const state = {
  activeMenuArrary: [
   
  ],
  activeMenu: "/index",
  flag: false,
  menus: [],
  routes: [],
  displayMenus: [],
  btnMenus: []
}

const getters ={
  getMenu(state) {
    return state.menus
  },
  getFlag(state) {
    return state.flag
  },
  getRoutes(state) {
    return state.routes
  },
  getDisplayMenus(state) {
    return state.displayMenus
  },
  getBtnMenus(state) {
    return state.btnMenus
  }
}

const mutations = {
  setActiveMenu(state,menu) {
      state.activeMenu = menu
  },
  addActiveMenu(state,menu) {
      state.activeMenuArrary.push(menu)
  },
  setActiveMenuArrary(state,menu) {
      state.activeMenuArrary = menu
  },
  reduceActiveMenu(state,i) {
      state.activeMenuArrary.splice(i,1)
  },
  setMenus(state,menus) {
      state.menus = menus
  },
  setFlag(state,flag) {
    state.flag = flag
  },
  setRoutes(state,routes) {
    state.routes = routes
  },
  setDisplayMenus(state,menus) {
    state.displayMenus = menus
  },
  setBtnMenus(state,btn) {
    state.btnMenus = btn
  }
}
 
const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      //根据用户获取菜单权限
      getMenuByUser().then(res => {
        if(res.code == 1000) {
          var data = res.data
          commit("setMenus",data)
          commit("setFlag",true)
          //开始组装路由信息
          var routes = filterRoutes(data)
          commit("setRoutes",routes)
          //遍历获取首页左侧菜单
          var display = filterMenus(data)
          for(let i = 0;i < display.length;i++) {
            var item = display[i]
            if(item.menuType == 1) {
              commit("setActiveMenu",item.routeUrl)
              commit("addActiveMenu",{name:item.menuName,url:item.routeUrl})
              break;
            } else {
              if(item.child.length > 0) {
                commit("setActiveMenu",item.child[0].routeUrl)
                commit("addActiveMenu",{name:item.child[0].menuName,url:item.child[0].routeUrl})
                break;
              }
            }
          }
          commit("setDisplayMenus",display)
          //遍历获取按钮权限
          var btnMenus = filterBtnMenus(data)
          commit("setBtnMenus",btnMenus)
          resolve(routes)
        }
      })
    })
  }
}

function filterBtnMenus(menus) {
  var menu = []
  menus.forEach(item => {
    if(item.menuType == 2) {
      menu.push(item)
    }
  })
  return menu
}

function filterMenus(menus) {
  var menu = []
  menus.forEach(item => {
    //遍历一级菜单或目录
    if(item.menuType != 2 && item.visible == 0 && item.parentId == "0") {
      //一级菜单去找自己的下级
      item.child = []
      if(item.menuType == 0) {
        filterChildMenus(item,menus)
      }
      menu.push(item)
    }
  })
  return menu
}

function filterChildMenus(menu,menus) {
  menu.child = []
  menus.forEach(item => {
    if(menu.id == item.parentId) {
      if(item.menuType == 0 && item.visible == 0) {
        filterChildMenus(item,menus)
        menu.child.push(item)
      } else if(item.menuType == 1 && item.visible == 0) {
        menu.child.push(item)
      }
    }
  })
}

function filterRoutes(menus) {
  var routes = []
  if(menus.length <= 0) {
    routes.push({ path: '/:pathMatch(.*)', redirect: '/403'})
    return routes;
  }
  var root = {
    path: "",
    name: 'main',
    component: () => import(`@/views/layout/index`),
    redirect: '/index',
    children: []
  }
  var children = []
  var index = 0;
  //遍历出路由
  menus.forEach(item => {
    //把菜单先遍历出来
    if(item.menuType == 1) {
      var param = {
        path: item.routeUrl,
        name: item.menuName,
        component: loadView(item.componentUrl),
      }
      if(item.param) {
        param.props = JSON.stringify(item.param)
      }
      if(item.target == 1) {
        children.push(param)
      }
      if(item.target == 0) {
        routes.push(param)
      }
    }
  });
  root.children = children
  routes.push(root)
  routes.push({ path: '/:pathMatch(.*)', redirect: '/404'})
  return routes;
}

function loadView(view){
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views${view}`], resolve)
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views${view}`)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
