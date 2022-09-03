<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Main from './pages/Main.vue'
export default {
  name: 'App',
  components: {
    Main,
  }
}
</script>

<style>
html body{
  margin: 0px;
  padding: 0px;
}
</style>
