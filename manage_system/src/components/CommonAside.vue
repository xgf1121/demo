<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color='#545c64' text-color='#fff' active-text-color='#ffd04b' @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <h3>{{isCollapse ? '后台' : '通用后台管理系统'}}</h3>
      <el-menu-item @click="clickMenu(item)" v-for="item in onChildren" :key="item.path" :index="item.path + ''">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu v-for="item in hasChildren" :index="item.path + ''" :key="item.path">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="(subItem,subIndex) in item.children"  :key="subItem.path">
          <el-menu-item @click="clickMenu(subItem)" :index="subIndex + ''">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>
<script>
export default {
  name:'CommonAside',
  data() {
    return {
      // isCollapse:true,
      menu:[
        /* {
          path:'/',
          name:'home',
          label:'首页',
          icon:'house',
          url: 'Home/home'
        },
        {
          path:'/mall',
          name:'mall',
          label:'商品管理',
          icon:'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path:'/user',
          name:'user',
          label:'用户管理',
          icon:'user',
          url: 'userManage/userManage'
        },
        {
          path:'/other',
          label:'其他',
          icon:'location',
          children:[
            {
              path:'/page1',
              name:'page1',
              label:'页面1',
              icon:'setting',
              url: 'Other/pageOne'
            },
            {
              path:'/page2',
              name:'page2',
              label:'页面2',
              icon:'setting',
              url: 'Other/pageTwo'
            }
          ]
        }, */
      ]
    }
  },
  computed: {
    onChildren() {
      return this.asyncMenu.filter(item => !item.children)
    },
    hasChildren() {
      return this.asyncMenu.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    asyncMenu() {
      return this.$store.state.tab.menu
    }
  },
  methods:{
    handleOpen() {},
    handleClose() {},
    clickMenu(item) {
      console.log(item,"sss");
      this.$router.push({
        name:item.name
      })
      this.$store.commit("selectMenu",item)
    },
  }
}
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100%;
    border: none;
  }
  h3{
    text-align:center;
    line-height: 40px;
    color:#fff;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
</style>