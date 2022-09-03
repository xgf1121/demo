import Cookie from 'js-cookie'
export default {
  state: {
    token: ""
  },
  mutations: {
    setToken(state, val) {
      state.token = val
      Cookie.set('token', val)//把token加到cookie
    },
    clearToken(state) {
      state.token = ''
      Cookie.remove('token')//删除cookie中的token
    },
    getToken(state) {
      state.token = state.token || Cookie.get("token") //获取cookie中的token
    }
  }
}