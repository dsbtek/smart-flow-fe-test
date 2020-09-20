import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import blogs from './modules/blogs'
import team from './modules/team'
import testimonials from './modules/testimonials'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'https://kenxedu.com/',
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
    blogs,
    team,
    testimonials
  }
})
