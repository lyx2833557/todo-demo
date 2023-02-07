<template>
  <div class="todo-form">
    <i class="icon-xiala iconfont"></i>
    <input
      type="text"
      v-model.trim="todoText"
      placeholder="what needs to be done?"
      @keydown.enter="addTodo"
    />
  </div>
</template>

<script>
import request from '../plugins/request'
export default {
  data() {
    return {
      todoText: "",
    };
  },
  methods: {
   async addTodo() {
      // console.log("toandsj");
      // 获取内容。向后端发其添加请求，根据请求成功后端更新todos数组，清空内容
      const todoText = this.todoText;
      if (todoText) {
      const res= await request.post("/todos",{
              todoText,
              isCompleted: false,  
              
          });
          this.$emit('add',res)
          this.todoText=''


      }
      else{
          console.log('请输入内容');
      }
    },
  },
};
</script>

<style>
.todo-form {
  display: flex;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  align-items: center;
}

.todo-form i {
  padding: 16px;
  font-size: 24px;
  flex-shrink: 0;
}

.todo-form input {
  flex-grow: 1;
  padding: 16px;
  font-size: 24px;
  line-height: 1.5;
  border: 0;
  outline: 0;
}
</style>