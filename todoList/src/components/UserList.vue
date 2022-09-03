<template>
  <ul class="todo-main">
    <transition-group name="todo">
      <UserItem 
        v-for="todoObj in todos" 
        :key="todoObj.id" 
        :todo="todoObj" 
      />
    </transition-group>
  </ul>
</template>

<script>
import UserItem from './UserItem'
  export default {
    name: "UserList",
    components:{ UserItem },
    data() {
      return {
        
      }
    },
    props:['todos'],
    methods: {

    },
  };
</script>
<style scoped>
  /*main*/
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;padding: 0px;
  }
  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
  .todo-enter-active {
    animation: dhua 0.5s linear;
  }

  .todo-leave-active {
    animation: dhua 0.5s linear reverse;
  }

  @keyframes dhua {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0px);
    }
  }
</style>