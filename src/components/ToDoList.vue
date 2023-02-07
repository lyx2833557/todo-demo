<template>
  <div class="todo-list" v-if="showTodos.length">
<ToDoLtem 
v-for="todo in showTodos" 
:key="todo.id"
v-bind="todo" 
@del='(id)=>$emit("del",id)' 
@changetodo="(id)=>$emit('changetodo',id)"
:editId="editId"
@changeEditId="(id)=>$emit('changeEditId',id)"
/>
  </div>
  
</template>

<script>
import ToDoLtem from './ToDoLtem.vue'
export default {
  components: { ToDoLtem },
  props:['showTodos',"editId"]
  // 'todos'

}
</script>
    

<style>

</style>