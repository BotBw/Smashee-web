import { createStore } from 'vuex'
import ModuleUser from './user'
import ModuleMatchmaking from './matchmaking'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: ModuleUser,
    matchmaking: ModuleMatchmaking
  }
})
