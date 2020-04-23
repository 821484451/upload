import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    loadingFlag: false
  },
  mutations: {
    changeToken(state, option){
      state.token = option.token;
    },
    changeLoading(state, option){
      state.loadingFlag = option.flag
    }
  },
  actions: {
    
  },
  getters: {
    loadingFlag: state => state.loadingFlag
  },
  modules: {
  }
})
