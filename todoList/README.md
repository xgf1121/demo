# 笔记
## scoped样式
1
作用：让样式在局部生效，防止冲突
2
写法：<style scoped>
  Vue中的webpack并没有安装最新版，导致有些插件也不能默认安装最新版，如 npm i less-loader@7，而不是最新版

## 总结TodoList案例
一 组件化编码流程
  1拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突
  2实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用
    一个组件在用：放在组件自身即可
    一些组件在用：放在他们共同的父组件上（状态提升）
  3实现交互：从绑定事件开始

二 props适用于
  父组件 ==> 子组件 通信
  子组件 ==> 父组件 通信（要求父组件先给子组件一个函数）

三 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的 

四 props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做

##  组件的自定义事件
1一种组件间通信的方式，适用于：子组件 ===> 父组件
2使用场景：子组件想给父组件传数据，那么就要在父组件中给子组件绑定自定义事件（事件的回调在A中）
3绑定自定义事件
  a第一种方式，在父组件中<Demo @事件名="方法"/>或<Demo v-on:事件名="方法"/>
  b第二种方式，在父组件中this.$refs.demo.$on('事件名',方法)
    <Demo ref="demo"/>
      ......
      mounted(){
        this.$refs.demo.$on('atguigu',this.test)
    }
  c若想让自定义事件只能触发一次，可以使用once修饰符，或$once方法 
4触发自定义事件this.$emit('事件名',数据) 
5解绑自定义事件this.$off('事件名') 
6组件上也可以绑定原生DOM事件，需要使用native修饰符  @click.native="show"

上面绑定自定义事件，即使绑定的是原生事件也会被认为是自定义的，需要加native，加了后就将此事件给组件的根元素
7注意：通过this.$refs.xxx.$on('事件名',回调函数)绑定自定义事件时，回调函数要么配置在methods中，要么用箭头函数，否则 this 指向会出问题

## 全局事件总线（GlobalEventBus） 

一种可以在任意组件间通信的方式，本质上就是一个对象，它必须满足以下条件
  1所有的组件对象都必须能看见他 
  2这个对象必须能够使用$on$emit$off方法去绑定、触发和解绑事件
使用步骤
  1定义全局事件总线
    new Vue({
        ...
        beforeCreate() {
          Vue.prototype.$bus = this // 安装全局事件总线，$bus 就是当前应用的 vm
        },
        ...
    })
2使用事件总线 
  a接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身 
  export default {
      methods(){
          demo(data){...}
      }
      ...
      mounted() {
          this.$bus.$on('xxx',this.demo)
      }
  }
b提供数据：this.$bus.$emit('xxx',data) 
3最好在beforeDestroy钩子中，用$off()去解绑当前组件所用到的事件

## 准备好样式
  ○元素进入的样式
    v-enter		 	进入的起点
    v-enter-active	进入过程中
    v-enter-to	 	进入的终点
  元素离开的样式
    v-leave			离开的起点
    v-leave-active	离开过程中
    v-leave-to		离开的终点

  2使用<transition>包裹要过度的元素，并配置name属性，此时需要将上面样式名的v换为name
  3要让页面一开始就显示动画，需要添加appear









## Vue脚手架配置代理
本案例需要下载axios库npm install axios
配置参考文档 Vue-Cli devServer.proxy
vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。你也可以使用 package.json 中的 vue 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写
方法一
	在vue.config.js中添加如下配置
    module.exports = {
      devServer:{
        proxy:"http://localhost:5000"
      }
    }
说明
  1优点：配置简单，请求资源时直接发给前端（8080）即可
  2缺点：不能配置多个代理，不能灵活的控制请求是否走代理
  3工作方式：若按照上述配置代理，当请求了前端不存在的资源时，才会将请求会转发给服务器 （优先匹配前端资源）
二、编写vue.config.js配置具体代理规则
module.exports = {
	devServer: {
      proxy: {
      '/api1': {													// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',	// 代理目标的基础路径
        pathRewrite: {'^/api1':''},				// 代理往后端服务器的请求去掉 /api1 前缀
        ws: true,													// WebSocket
        changeOrigin: true,
        
      },
      '/api2': {
        target: 'http://localhost:5001',
        pathRewrite: {'^/api2': ''},
        changeOrigin: true
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
说明
1优点：可以配置多个代理，且可以灵活的控制请求是否走代理
2缺点：配置略微繁琐，请求资源时必须加前缀

## slot 插槽

 <slot>插槽：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，
      适用于 父组件 ===> 子组件
1分类：默认插槽、具名插槽、作用域插槽 
2使用方式
  a默认插槽
  b具名插槽
    父组件指明放入子组件的哪个插槽slot="footer"，如果是template可以写成v-slot:footer
  c作用域插槽
    scope用于父组件往子组件插槽放的html结构接收子组件的数据
  理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定
（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定） 

## 模块化+命名空间

1目的：让代码更好维护，让多种数据分类更加明确
2修改store.js
为了解决不同模块命名冲突的问题，将不同模块的namespaced: true，之后在不同页面中引入getteractionsmutations时，需要加上所属的模块名
3开启命名空间后，组件中读取state数据 
4开启命名空间后，组件中读取getters数据
 5开启命名空间后，组件中调用dispatch
 6开启命名空间后，组件中调用commit

## vue-router 的理解
  vue的一个插件库，专门用来实现SPA应用
  对SPA应用的理解
    1单页Web应用（single page web application，SPA）
    2整个应用只有一个完整的页面
    3点击页面中的导航链接不会刷新页面，只会做页面的局部更新
    4数据需要通过ajax请求获取
   路由的理解
  什么是路由? 
    a、一个路由就是一组映射关系（key - value）
    b、key为路径，value可能是function或componen
    2路由分类
    a、后端路由
      ⅰ理解：value是function，用于处理客户端提交的请求
      ⅱ工作过程：服务器接收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据
    b、前端路由
      ⅰ理解：value是component，用于展示页面内容
      ⅱ工作过程：当浏览器的路径改变时，对应的组件就会显示

## 路由几个注意点
  1``路由组件通常存放在pages文件夹，一般组件通常存放在components文件夹
  2``通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载
  3``每个组件都有自己的$route属性，里面存储着自己的路由信息
  4``整个应用只有一个router，可以通过组件的$router属性获取到