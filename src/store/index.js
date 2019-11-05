import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    address: sessionStorage.address || ''
  },
  mutations: {
    UPDATE__ADDRESS (state, address) {
      state.address = address || ''
    }
  },
  actions: {
    setAddress ({ commit, state }, address) {
      return new Promise((resolve, reject) => {
        commit('UPDATE__ADDRESS', address)
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
