import Vue from 'vue'
import Vuex from 'vuex'
import UserInfo from './modules/userinfo'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

// export const store = new Vuex.Store({
//     modules:{
//         UserInfo : UserInfo
//     }
// })

// const modules = {
//   UserInfo
// }

export const store = new Vuex.Store({
  modules: {
    UserInfo: UserInfo
  },
  plugins:[
    createPersistedState({
      paths:["UserInfo"]
    })
  ]
})