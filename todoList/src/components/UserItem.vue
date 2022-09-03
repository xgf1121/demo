<template>
  <li>
    <label>
      <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
      <!-- <input type="checkbox" v-model="todo.done"/> -->
      <input type="checkbox"  :checked="todo.done" @change='handleCheck(todo.id)'  />  
      <span v-show="!todo.isEdit">{{ todo.title }}</span>
      <input 
        v-show="todo.isEdit" type="text" 
        :value="todo.title" 
        @blur="handleBlur(todo,$event)"
        ref="inputTitle"
      >
    </label>
    <button class="btn btn-danger" @click="handleDel(todo.id)">删除</button>
    <button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
  </li>
</template>

<script>
  export default {
    name: "UserItem",
    data() {
      return {

      }
    },
    //声明接收todo对象
    props:['todo'],
    mounted () {
    },
    methods: {
      handleCheck(id) {
        // console.log(id);
        //通知App组件
        // this.checkTodo(id)
        this.$bus.$emit('checkTodo',id)
      },
      handleDel(id) {
        if(confirm("确定删除？")){
          //通知App删除todo
          // this.DelTodo(id)
          this.$bus.$emit('DelTodo',id)
        }
      },
      handleEdit(todo) {
        if(todo.hasOwnProperty('isEdit')){
          todo.isEdit = true
        }else{
          this.$set(todo,'isEdit',true)
        }
        this.$nextTick(function(){
          this.$refs.inputTitle.focus()
        })
      },
      //失去焦点时回调，实现修改逻辑
      handleBlur(todo,e) {
        todo.isEdit = false
        if(!e.target.value.trim()) return alert('输入不能为空')
        this.$bus.$emit('updateTodo', todo.id, e.target.value)
      }
    },
  };
</script>
<style scoped>
 /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }
  li label {
    float: left;
    cursor: pointer;
  }
  li label li input {
    vertical-align:middle;
     margin-right:6px; 
     position:relative;
     top: -1px;
  }
  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }
  li:before {
    content: initial;
  }
  li:last-child {
    border-bottom: none;
  }
  li:hover{
    background-color: #ddd;
  }
  li:hover button{
    display: block;
  }


</style>