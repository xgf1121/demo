<template>
    <div class="container">
      <search/>
      <list/>
  </div>
</template>
<script>
  import Search from './components/Search.vue'
  import List from './components/List.vue'
export default {
  name:"app",
  components:{ Search, List },
  data () {
    return {

    }
  },

}
</script>
<style>

</style>
