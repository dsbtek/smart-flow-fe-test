import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import customers from './modules/customers'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'http://localhost:8000/',
    headerTitle: null
  },

  getters: {
    baseURL: state => state.baseURL,
    headerTitle: state => state.headerTitle
  },

  mutations: {
    title(state, title) {
      state.headerTitle = title
    }
  },

  actions: {
    setTitle({ commit}, title) {
      commit('title', title)
    }
  },

  modules: {
    auth,
    customers,
    users
  }
})
