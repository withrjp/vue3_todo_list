<template>
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgColor, color: fgColor }"
  >
    <label>
      <input type="checkbox" v-model="isCompleted" />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteTodo(index)">
      删除
    </button>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Todo } from "../types/todo";

export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const isShow = ref(false);
    const bgColor = ref("white");
    const fgColor = ref("black");
    const mouseHandler = (flag: boolean) => {
      if (flag) {
        bgColor.value = "pink";
        fgColor.value = "green";
        isShow.value = true;
      } else {
        bgColor.value = "white";
        fgColor.value = "black";
        isShow.value = false;
      }
    };
    const isCompleted = computed({
      get() {
        return props.todo.isCompleted;
      },
      set(val: boolean) {
        props.updateTodo(props.todo, val);
      },
    });
    return {
      bgColor,
      fgColor,
      mouseHandler,
      isShow,
      isCompleted,
    };
  },
});
</script>

<style scoped>
li label input:checked + span{
  text-decoration: line-through;
}

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
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>
