import axios from "axios"
import store from '../index'

const token = JSON.parse(localStorage.getItem('auth_token'));
// const baseURL = mapGetters.baseURL
export default {
  namespaced: true,
  state: {
    token: token ? true : false
  },

  getters: {
  },

  mutations: {
  },

  actions: {
    async getAllTestimonials () {
        try {
            const res = await axios({
                method: 'get',
                url: `${store.state.baseURL}api/admin/testimonials`,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            return res.data
        } catch (error) {
            return error.response
        }
    },
    async addNewTestimonial ({ commit }, data) {
      try {
        const res = await axios.post(`${store.state.baseURL}api/admin/testimonials`, data, {
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "multipart/form-data"
            }
        })
        await commit('', res.data)
        return res.data
      } catch (err) {
          return err.response
      }
    },
    async editTestimonial ({ commit }, payload) {
      const { data, id } = payload
      try {
        const res = await axios.put(`${store.state.baseURL}api/admin/testimonials/${id}`, data, {
            headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "multipart/form-data"
            }
        })
        await commit('', res.data)
        return res.data
      } catch (err) {
          return err.response
      }
    },
    async archiveTestimonial ({ commit }, id) {
      try {
        const res = await axios({
          method: 'put',
          url: `${store.state.baseURL}api/admin/testimonials/archive/${id}`,
          headers: {
              'Authorization': 'Bearer ' + token
          }
        })
        await commit('', res.data)
        return res.data
      } catch (err) {
          return err.response
      }
    }
  }
}
