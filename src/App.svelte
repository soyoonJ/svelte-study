<script>
  // TODO: 업데이트 취소기능 보완
  import { todoLists } from "./stores";
  import Todo from "./Todo.svelte";

  let newTodo = "";

  function handleSubmit() {
    if (newTodo === "") {
      console.log("내용을 입력하세요");
    } else {
      $todoLists = [...$todoLists, { checked: false, text: newTodo }];
      newTodo = "";
    }
  }
  function removeTodo(event) {
    $todoLists = $todoLists.filter((e) => e !== event.detail.targetTodo);
  }

  let remaining = $todoLists.filter((e) => !e.checked).length;
  function toggleTodo(event) {
    event.detail.todoList.checked = !event.detail.todoList.checked;
    // remianing, filteredTodoLists $ 문법으로 사용 시, 하단 코드 없으면 동작 안함
    $todoLists = $todoLists;
    filterTodo($todoLists, currentFilter);
  }

  function completeAll() {
    $todoLists = $todoLists.map((e) => ({ checked: true, text: e.text }));
    remaining = 0;
  }
  function clear() {
    $todoLists = $todoLists.filter((e) => !e.checked);
  }

  let currentFilter = "all";

  function filterTodo($todoLists, selectedMode) {
    switch (selectedMode) {
      case "all":
        return $todoLists;
      case "completed":
        return $todoLists.filter((todo) => todo.checked);
      case "notYet":
        return $todoLists.filter((todo) => !todo.checked);
    }
  }
  function setFilter(selectedButton) {
    currentFilter = selectedButton;
    filterTodo($todoLists, currentFilter);
  }

  $: filteredTodoLists = filterTodo($todoLists, currentFilter);
  $: remaining = $todoLists.filter((e) => !e.checked).length;
</script>

<main>
  <h1>투두리스트</h1>

  <div>
    {#each filteredTodoLists as todoList}
      <Todo
        todo={todoList}
        on:removeTodo={removeTodo}
        on:toggleTodo={toggleTodo}
      />
    {/each}
  </div>

  <form on:submit|preventDefault={handleSubmit}>
    <input bind:value={newTodo} placeholder="할 일을 입력해주세요" />
    <button type="submit">추가</button>
  </form>

  <p>
    {remaining}개 남음/{$todoLists.length}
  </p>

  <button on:click={completeAll}>전체완료</button>
  <button on:click={clear}>Clear Completed</button>
  <br />

  <button on:click={() => setFilter("all")}>All</button>
  <button on:click={() => setFilter("completed")}>Completed</button>
  <button on:click={() => setFilter("notYet")}>Not Yet</button>
</main>

<style>
  button {
    margin-left: 10px;
  }
</style>
