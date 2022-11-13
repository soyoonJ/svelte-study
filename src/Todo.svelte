<script>
  export let todo;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let isUpdate = false;

  function toggleTodo(targetTodo) {
    dispatch("toggleTodo", {
      todoList: targetTodo,
    });
  }
  function rewriteTodo(todo) {
    isUpdate = true;
  }
  function removeTodo(todo) {
    if (window.confirm(`${todo.text}를 삭제하시겠습니까?`)) {
      dispatch("removeTodo", {
        targetTodo: todo,
      });
    } else {
    }
  }

  function updateTodo(todo) {
    isUpdate = false;
  }
  function cancelTodoUpdate(todo) {
    isUpdate = false;
  }
</script>

<div class="todo_align">
  {#if !isUpdate}
    <label class:checked={todo.checked}>
      <!-- <input on:click={() => toggleTodo(todo)} type="checkbox" value={todo} /> -->
      <input
        on:click={() => toggleTodo(todo)}
        bind:checked={todo.checked}
        type="checkbox"
        value={todo}
      />
      {todo.text}
    </label>

    <button on:click={() => rewriteTodo(todo)}>수정✍️</button>
    <button on:click={() => removeTodo(todo)}>삭제🗑️</button>
  {:else}
    <!-- 다시 포커스 됐을 때 데이터 이상해짐 -->
    <input bind:value={todo.text} />
    <!-- on:focus={() => (updateBackup = todo.text)} -->

    <button on:click={() => cancelTodoUpdate(todo)}>취소</button>
    <button on:click={() => updateTodo(todo)}>저장✍️</button>
  {/if}
</div>
<br />

<style>
  .todo_align {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .checked {
    color: #ddd;
    text-decoration: line-through;
  }

  button {
    margin-left: 10px;
  }
</style>
