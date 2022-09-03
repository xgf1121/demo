<template>
  <div class="tags">
    <el-tag 
      v-for="(tag, index) in tags" :key="tag.name"
      size="small"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changMenu(tag)"
      @close='handlerClose(tag,index)'
    >
    {{tag.label}}
    </el-tag>
  </div>
</template>
<script>
import { mapState , mapMutations } from 'vuex'
export default {
  name:'Tag',
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState({
      tags:state => state.tab.tagList
    })
  },
  methods:{
    ...mapMutations({ close:"closeTag",}),
    changMenu(item) {
      this.$router.push({ name: item.name })
    },
    handlerClose(tag, index) {
      const length = this.tags.length - 1
      this.close(tag)
      if(tag.name !== this.$route.name){
        return
      }
      if(index === length){
        this.$router.push({
          name: this.tags[index - 1].name
        })
      }else{
        this.$router.push({
          name: this.tags[index].name
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .tags{
    padding: 16px;
    background-color: #E9EEF3;
    .el-tag{
      margin-right: 15px;
      cursor: pointer;
    }
  }
</style>