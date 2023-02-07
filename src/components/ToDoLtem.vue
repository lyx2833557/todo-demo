<template>
  <div class="todo-item">
    <!-- 特殊的checkbox -->
    <label :for="id" v-if="editId !== id">
      <input
        type="checkbox"
        name=""
        :id="id"
        :checked="isCompleted"
        @click="change"
      />
      <span class="icon-duihao iconfont"></span>
    </label>
    <div v-else style="width: 30px"></div>
    <div class="todo-text">
      <template v-if="editId !== id">
        <p @dblclick="handleDblclick" :class="{ completed: isCompleted }">
          {{ todoText }}
        </p>
        <span @click="delTodo" class="icon-cuowu iconfont"></span>
      </template>

      <input ref="inp" type="text" :value="todoText" v-else @blur="changeTodoText" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "todoText", "isCompleted", "editId"],
  methods: {
    delTodo() {
      this.$emit("del", this.id);
    },
    change() {
      this.$emit("changetodo", this.id);
    },
    handleDblclick() {
      this.$emit("changeEditId", this.id);
      // 让对应的input获取焦点，只能选用原生的做法
      // 获取input的真实dom 在vue中不提倡使用documengt
      // vue中推荐使用ref来获取真是dom
      // console.log(this.$reds.inp);
      //直接获取的话是获取不到的，因为双击之后input才出现,改变了data input才出现。
      // 所以只有在生命周期updated之后才能获取更新后的dom
      // 想要在数据更新之后就要获取真实dom 需要使用vue提供的$next方法获取
      this.$nextTick(() => {
        console.log(this.$refs);
        this.$refs.inp.focus();
      });
    },
    changeTodoText(e){
      // 1/先获取输入框的内容，其实内容并不是todotext。因为并没有使用v-model绑定输入框（因为绑定就直接修改porps了）
// 所有获取输入框的内容需要使用原生的dom也就是借助事件对象
const value=e.target.value
// 判断修改了吗或者输入是否为空
if(value===this.todoText){
  // 没有做任何修改，直接让输入框消失即可，原来的文字展示
  this.$emit("changeEditId", '');

}else if(value===''){
   this.$emit("del", this.id);
  // 将内容全部删除了。也就是是删除了这个todo
}else{
  // 去做修改
}

    }
  },
};
</script>

<style>
.todo-item {
  padding: 16px 30px 16px 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
}
.todo-item label {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 30px;
  color: rgb(67, 199, 155);
}
.todo-item input[type="checkbox"] {
  display: none;
}
.todo-item label span {
  display: none;
}
.todo-item input[type="checkbox"]:checked + span {
  display: inline;
}
.todo-item .todo-text {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-indent: 30px;
  font-size: 20px;
}
.todo-item .todo-text:hover span {
  display: block;
}
.todo-item .todo-text span {
  display: none;
  color: chocolate;
  font-size: 20px;
  flex-shrink: 0;
}
.todo-item .todo-text p {
  cursor: default;
  flex-grow: 1;
}
.todo-item .todo-text p.completed {
  color: #ccc;
  text-decoration: line-through;
}
.todo-item .todo-text input {
  outline: 0;
  border: 0;
  font-size: 20px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 2px #ccc inset;
  flex-grow: 1;
  margin-left: 30px;
  text-indent: 10px;
}
</style>