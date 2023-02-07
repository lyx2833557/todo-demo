<template>
  <div class="todos-demo">
    <h3>todos</h3>
    <ToDoForm @add="add" />
    <ToDoList  :showTodos="showTodos" @del="del" v-if="todos"
    @changetodo="changetodo" 
    :editId="editId"
    @changeEditId="changeEditId"/>
    <div v-else-if="!todos">稍等一下。。。。</div>
    <ToDoFooter
   
    v-if="todos&&todos.length"
      :todos="todos"
      :isHasCompletedTodo="isHasCompletedTodo"
      :showType.sync="showType"
    />
  </div>
</template>

<script>
import request from "../plugins/request";
import ToDoFooter from "./ToDoFooter.vue";
import ToDoForm from "./ToDoForm.vue";
import ToDoList from "./ToDoList.vue";
export default {
  components: { ToDoForm, ToDoList, ToDoFooter },
  data() {
    return {
      // 为了做等待效果，将todos初始值定义成null，代表没有向后台请求 【】表示请求回来没内容 [{}]表示请求回来有内容
      todos: null,
      showType: "all",
      editId:''
    };
  },
  computed: {
    activeNum() {
      return this.filter((todo) => !todo.isCompleted).length;
    },
    isHasCompletedTodo() {
      return this.todos.some((todo) => todo.isCompleted);
    },
    showTodos() {
      // const type=this.showType
      // const todos=this.todos
      const { showType: type, todos } = this;
      if (type === "all") {
        return todos;
      } else if (type === "active") {
        return todos.filter((todo) => !todo.isCompleted);
      } else {
        return todos.filter((todo) => todo.isCompleted);
      }
    },
 

  },
  async created() {
    //项目中用到很多axios请求，对axios进行封装
    const res = await request.get("/todos");
    // console.log(res);
    this.todos = res;
  },
  methods: {
    add(todo) {
      this.todos.push(todo);
    },
    async del(id) {
      await request.delete(`/todos/${id}`);
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    // 修改todo请求
    // 修改todo的完成状态 直接取反不需要传参 需要id
       async changetodo(id){
         const todo=this.todos.find(todo=>todo.id===id)
         const res=await request.patch('/todos/'+id,{isCompleted:!todo.isCompleted})
         todo.isCompleted=res.isCompleted
       
     

    },
    changeEditId(id){
      this.editId=id
    }

  },
};
</script>

<style>
.todos-demo {
  width: 550px;
  margin: 40px auto;
  background-color: #fff;
  box-shadow: 0px 0px 8px #ccc;
}
.todos-demo h3 {
  text-align: center;
  margin-bottom: 20px;
  padding-top: 20px;
  font-size: 40px;
  font-weight: bold;
}
</style>