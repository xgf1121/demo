<template>
  <header class="header">
    <div class="i-content">
      <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
      <!-- <h3 style="color:#fff" >首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item) in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-dropdown :hide-on-click="false">
          <span class="el-dropdown-link" size='mini' target="click">
            <img :src="userImg" class="user" alt="">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'Header',
  data() {
    return {
      userImg: require('../assets/user/user.png')
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    loginOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tagList
    })
  },
}
</script>

<style lang="less" scoped>
header{
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
img{
  width: 30px;
  height: 30px;
}
.header{
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items:center;
}
.i-content
{
  width: 100%;
  display: flex;
  align-items:center;
  justify-content: space-between;
}
.el-button{
    margin-right: 20px;
  }
  .user{
    width: 40px;
    height: 40px;
    border-radius:50%;
  }

</style>