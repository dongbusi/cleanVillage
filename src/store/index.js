import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let Store = new Vuex.Store({
  state: {
    address: sessionStorage.villageName
  },
  mutations: {
    UPDATE__ADDRESS (state, villageName) {
      state.address = villageName || ''
    }
  },
  actions: {
    setAddress ({ commit, state }, villageName) {
      return new Promise((resolve, reject) => {
        commit('UPDATE__ADDRESS', villageName)
        resolve(1)
      })
    }
  },
  getters: {
    getAddress: state => state.address
  },
  modules: {
  }
})

export default Store
