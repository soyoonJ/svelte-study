<script>
  import Todo from "./Todo.svelte";
  // 마지막 id 기준으로 더해서 넣는 방법도 있음
  let todoLists = [
    { checked: false, text: "리스트1" },
    { checked: false, text: "리스트2" },
    { checked: false, text: "리스트3" },
  ];

  let newTodo = "";

  let filteredTodoLists = todoLists;
  function filterAll() {
    filteredTodoLists = todoLists;
  }
  function filterCompleted() {
    filteredTodoLists = todoLists.filter((e) => e.checked);
  }
  function filterNotYet() {
    filteredTodoLists = todoLists.filter((e) => !e.checked);
  }

  function handleSubmit() {
    if (newTodo === "") {
      console.log("내용을 입력하세요");
    } else {
      todoLists = [...todoLists, { checked: false, text: newTodo }];
      newTodo = "";
    }
  }

  function removeTodo(event) {
    todoLists = todoLists.filter((e) => e !== event.detail.targetTodo);
  }

  let remaining = todoLists.filter((e) => !e.checked).length;
  function toggleTodo(event) {
    event.detail.todoList.checked = !event.detail.todoList.checked;
    remaining = todoLists.filter((e) => !e.checked).length;
    // $ 문법으로 사용 시, 하단 코드 없으면 동작 안함
    // todoLists = todoLists;
  }

  function updateTodo(todoList) {
    const targetTodoIndex = todoLists.findIndex((e) => e === todoList);
  }

  function completeAll() {
    todoLists = todoLists.map((e) => ({ checked: true, text: e.text }));
    remaining = 0;
  }
  function clear() {
    todoLists = todoLists.filter((e) => !e.checked);
  }

  // $: remaining = todoLists.filter((e) => !e.checked).length;
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
    {remaining}개 남음/{todoLists.length}
  </p>

  <button on:click={completeAll}>전체완료</button>
  <button on:click={clear}>Clear Completed</button>
  <br />

  <button on:click={filterAll}>All</button>
  <button on:click={filterCompleted}>Completed</button>
  <button on:click={filterNotYet}>Not Yet</button>
</main>

<style>
  button {
    margin-left: 10px;
  }
</style>
