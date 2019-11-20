import Vue from 'vue'
import Vuex from 'vuex'
import { getVillageList } from '../api/index'

Vue.use(Vuex)

function getVillageName () {
  if (window.location.href.includes('selectvillage')) return
  if (!sessionStorage.villageName) {
    let id = Number(window.location.pathname.split('/')[2])
    getVillageList().then(res => {
      let list = res.data.list
      let village = list.find(item => item.id === id)
      sessionStorage.villageName = village.username || ''
      Store.commit('UPDATE__ADDRESS', village.username)
    })
  } else {
    return sessionStorage.villageName
  }
}
let Store = new Vuex.Store({
  state: {
    address: getVillageName()
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
