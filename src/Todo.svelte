<script>
  export let todo;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let isUpdate = false;
  let updateContent = "";

  function toggleTodo(targetTodo) {
    dispatch("toggleTodo", {
      todoList: targetTodo,
    });
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
    isUpdate = true;
    updateContent = todo.text;
  }
  function updateConfirm(updateContent) {
    isUpdate = false;
    todo.text = updateContent;
  }
  function updateCancel() {
    isUpdate = false;
  }
</script>

<div class="todo_align">
  {#if !isUpdate}
    <label class:checked={todo.checked}>
      <input
        on:click={() => toggleTodo(todo)}
        bind:checked={todo.checked}
        type="checkbox"
        value={todo}
      />
      {todo.text}
    </label>

    <button on:click={() => updateTodo(todo)}>수정✍️</button>
    <button on:click={() => removeTodo(todo)}>삭제🗑️</button>
  {:else}
    <input bind:value={updateContent} />

    <button on:click={() => updateCancel()}>취소</button>
    <button on:click={() => updateConfirm(updateContent)}>저장✍️</button>
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
