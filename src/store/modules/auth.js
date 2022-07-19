import axios from "axios"

const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('auth_token'));
import store from '../index'
export default {
    namespaced: true,
  state: {
    token: token ? true : false,
    user: user ? user : null
  },

  getters: {
    authenticated (state) {
        return state.token
    },

    user (state) {
        return state.user
    }
  },

  mutations: {
    authenticated (state, token) {
        state.token = token
    },
    user (state, user) {
        state.user = user
    },
    logout(state) {
      state.token = false;
      state.user = null;
    },
  },

  actions: {
    async login ({ commit }, credentials) {
        try {
            const res = await axios({
                method: 'post',
                url: `${store.state.baseURL}api/login`,
                data: credentials
            })
            localStorage.setItem('auth_token', JSON.stringify(res.data.jwt));
            commit('authenticated', true)
            localStorage.setItem('user', JSON.stringify(res.data.user));
            commit('user', res.data.user)

            return res
        } catch (err) {
            return err.response
        }
    },

    async confirmToken(token) {
        try {
            const res = await axios({
                method: 'get',
                url: `${store.state.baseURL}api/admin`,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            return res
        } catch (error) {
            this.logout
            return error.response
        }
    },

    // async attempt ({ commit }, token) {
    //     localStorage.setItem('auth_token', JSON.stringify(token));
    //     commit('authenticated', true)

    //     try {
    //         const res = await axios({
    //             method: 'get',
    //             url: `${store.state.baseURL}api/admin`,
    //             headers: {
    //                 'Authorization': 'Bearer ' + token
    //             }
    //         })
    //         localStorage.setItem('user', JSON.stringify(res.data));
    //         commit('user', res.data)
    //         return res
    //     } catch (error) {
    //         this.logout
    //         return error.response
    //     }
    // },

    async changePassword ({ commit }, data) {
      try {
        const res = await axios.put(`${store.state.baseURL}api/admin/updateUserProfile`, data, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        await commit('', res.data)
        return res
      } catch (err) {
          return err.response
      }
    },
    
    logout({ commit }) {
        commit('authenticated', false)
        commit('user', null)
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        commit('logout');
    },
  }
}
