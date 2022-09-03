<template>
  <el-container height='100%'>
    <el-aside width="auto" >
      <common-aside/>
    </el-aside>
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <tag/>
      <el-main >
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Tag from '@/components/Tag.vue'
import CommonAside from '../components/CommonAside'
import Header from '../components/Header'
export default {
  components:{
    CommonAside,
    Header,
    Tag
  } 
}
</script>

<style  scoped>
  .el-header{
    background-color: #B3C0D1;
    color: #333;
  }
/*   .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  } */
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100vh;
    /* text-align: center; */
  }
</style>