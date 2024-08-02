import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu' 
import user from './modules/user' 
import configure from './modules/configure' 

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menu,
    user,
    configure
  }
})
