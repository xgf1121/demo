import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
  routes:[
    {
      path:'/',
      name:'Main',
      component: () => import('../pages/Main'),
      // redirect: '/home',
      children:[
        {
          path:'/home',
          name:'home',
          component: () => import('../pages/home/index')
        },
        {
          path:'/user',
          name:'user',
          component: () => import('../pages/user')
        },
        {
          path:'/mall',
          name:'mall',
          component: () => import('../pages/mall/Mall')
        },
        {
          path:'/page1',
          name:'page1',
          component: () => import('../pages/other/PageOne')
        },
        {
          path:'/page2',
          name:'page2',
          component: () => import('../pages/other/PageTwo')
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component: () => import('../pages/login/Login')
    }
  ]
})
// const router = new VueRouter({
//   mode: 'hash', //模式选择 选择了hash模式
//   routes
// })
//两个固定写法 防止报错的
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}
export default router