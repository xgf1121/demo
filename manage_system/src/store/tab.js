import Cookie from "js-cookie" 
export default {
  // namespaced: true,
  state:{
    isCollapse: false,
    tagList:[
      {
        path:'/',
        name: 'home',
        label:"首页",
        icon:'home'
      },
    ],
    currentMenu: null,//点击高亮
    menu: []
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state,val) {
      // console.log(state,val);
      //添加tag
      if(val.name !== 'home'){
        state.currentMenu = val
        const result = state.tagList.findIndex(item => item.name === val.name)
        if(result === -1){
          state.tagList.push(val)
        }
      }else{
        state.currentMenu = null
      }
    },
    closeTag(state, val) {
      const result = state.tagList.findIndex(item => item.name === val.name)
      //删除tag
      state.tagList.splice(result,1)
    },
    setMenu(state,val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    addMenu(state,router) {
      if (!Cookie.get('menu')) {
        return
      }
      //我们可以使用 JSON.parse() 方法将cookie数据转换为 JavaScript 对象
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      const menuArray = []
      menu.forEach(item => {
        if(item.children){
          // map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
          // 处理二级路由菜单
          item.children = item.children.map(item => {
            item.component = () => import(`../pages/${item.url}`)
            return item
          })
          //解构添加
          menuArray.push(...item.children)
        }else{
          item.component = () => import(`../pages/${item.url}`)
          menuArray.push(item)
        }
      })
      //路由的动态添加
      menuArray.forEach(item => {
        // console.log(router,item);
        router.addRoute('Main', item)
      })
    }
  },
}