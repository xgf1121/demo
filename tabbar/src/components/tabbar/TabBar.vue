<template>
 <div id="tab-bar">
   <slot></slot>
 </div>
</template>

<script>
export default {
  name: "TabBar",
  data () {
    return {
    }
  },
}
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color:rgb(240, 238, 240) ;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
