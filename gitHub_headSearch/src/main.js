/* 
  该文件是整个项目入口文件
*/
//引入Vue
import Vue from 'vue'
//所有组件的父组件
import App from './App.vue'

//关闭控制台提示
Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
