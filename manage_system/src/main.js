import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
import store from './store'
import axios from 'axios'
import  '@/api/mock'
// import Echarts from '@/components/Echarts'
// Vue.use(Echarts)

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({
      name:"login"
    })
  }else if(token && to.name === 'login'){ //登录状态下访问login直接跳转到home
    next({ name:"home" })
  }
  else{
    next()
  }
})

Vue.prototype.$http = axios;
new Vue({
  render: h => h(App),
  router,
  store,
  created () { //解决登录后刷新白屏
    store.commit('addMenu', router)
  }
}).$mount('#app')
