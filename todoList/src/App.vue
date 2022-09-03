<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <UserHeader @addTodo='addTodo' />
        <UserList :todos="todos"  />
        <UserFooter :todos='todos' @checkAllTodo='checkAllTodo' @clearAllTodo='clearAllTodo'/>
    	</div>
    </div>
  </div>
</template>
<script>
import UserHeader from './components/UserHeader.vue'
import UserList from './components/UserList'
import UserFooter from './components/UserFooter'
export default {
  name:"app",
  components: {
    UserHeader,
    UserFooter,
    UserList,
  },
  data () {
    return {
      // todos: [
      //   {id:'001',title:'抽烟',done:true},
      //   {id:'002',title:'吃饭',done:false},
      //   {id:'003',title:'开车',done:false}
      // ],
      todos:JSON.parse(localStorage.getItem('todos')) || []
    }
  },
  methods: {
    //添加一个todo
    addTodo(x) {
      // console.log("我是app组件，我收到了数据",x);
      this.todos.unshift(x)
    },
    //勾选或者取消勾选一个todo 
    checkTodo(id) {
      this.todos.forEach((todo) => {
        // console.log(todo);
        if(todo.id === id ) {
          todo.done = !todo.done
        }
      })
    },
    //跟新一个Todo
    updateTodo(id,title) {
      this.todos.forEach((todo) => {
        // console.log(todo);
        if(todo.id === id ) {
          todo.title = title
        }
      })
    },
    //删除一个todo
    DelTodo(id){
      this.todos = this.todos.filter((todo) =>{
        return todo.id !== id
      })
    },
    //全选or取消全选
    checkAllTodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done
      })
    },
    clearAllTodo() {
      this.todos = this.todos.filter((todo) =>{
        return !todo.done
      })
    }
  },
  watch: {
    todos:{
      deep:true,
      handler(value){
        localStorage.setItem('todos',JSON.stringify(value))
      }
    }
  },
  mounted () {  
    this.$bus.$on('checkTodo', this.checkTodo)
    this.$bus.$on('DelTodo', this.DelTodo)
    this.$bus.$on('updateTodo', this.updateTodo)
  },
  beforeDestroy () {
    this.$bus.$off('checkTodo')
    this.$bus.$off('DelTodo')
    this.$bus.$off('updateTodo')
  }
}
</script>
<style>
  /*base*/
  body {
    background: #fff;
  }
  .btn {
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
  .btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
  }
  .btn-edit{
    color: #fff;
    background-color: skyblue;
    border: 1px solid rgb(83, 129, 148);
    margin-right: 5px;
  }
  .btn-danger:hover {
    color: #fff;
    background-color: #bd362f;
  }
  .btn:focus {
    outline: none;
  }
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
