<template>
  <div id="app">
    <router-view></router-view>
    <div>
      <main-tab-bar></main-tab-bar>
    </div>
  </div>
</template>
<script>
import MainTabBar from "components/MainTabBar"
export default {
  components: {
    MainTabBar
  }
}
</script>
<style>
@import "./assets/css/base.css"
</style>
