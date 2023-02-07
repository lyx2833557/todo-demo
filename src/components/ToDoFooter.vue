<template>
  <div class="todo-footer">
    <span>
      {{ todos.filter((todo) => !todo.isCompleted).length }}
      itmes left</span
    >
    <div class="action-btns">
      <button @click=" changeType('all')" :class="{active:showType==='all'}">All</button>
      <button @click=" changeType('active')" :class="{active:showType==='active'}" >Active</button>
      <button @click=" changeType('completed')" :class="{active:showType==='completed'}">Completed</button>
    </div>
    <button class="clear-completed" v-if="isHasCompletedTodo">Clear Completed</button>
    <span v-else class="clear-completed-copy"></span>
  </div>
</template>

<script>
export default {
  props: ["todos","actibeNum",'isHasCompletedTodo','showType'],
  methods:{
    changeType(type){
      this.$emit('update:showType',type)
    }
  }
 
};
</script>

<style>
.todo-footer {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.clear-completed,
.clear-completed-copy {
  width: 114px;
}
.todo-footer .action-btns button.active{
  color: red;
}
</style>