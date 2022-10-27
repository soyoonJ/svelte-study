<script>
  // 마지막 id 기준으로 더해서 넣는 방법도 있음
  let todoLists = [
    { checked: false, text: "리스트1" },
    { checked: false, text: "리스트2" },
    { checked: false, text: "리스트3" },
  ];
  let temp = [];

  let newTodo = "";
  let updateBackup = "";

  let isUpdate = Array(todoLists.length).fill(false);

  function handleSubmit() {
    if (newTodo === "") {
      console.log("내용을 입력하세요");
    } else {
      todoLists = [...todoLists, { checked: false, text: newTodo }];
      newTodo = "";
    }
  }

  function toggleTodo(targetTodo) {
    let todo = todoLists.findIndex((e) => e.text === targetTodo.text);
    todoLists[todo]["checked"] = !todoLists[todo]["checked"];
  }

  function rewriteTodo(todoList) {
    const targetTodoIndex = todoLists.findIndex((e) => e === todoList);
    isUpdate[targetTodoIndex] = true;
  }
  function removeTodo(todoList) {
    if (window.confirm(`${todoList.text}를 삭제하시겠습니까?`)) {
      todoLists = todoLists.filter((e) => e !== todoList);
    } else {
    }
  }

  function updateTodo(todoList) {
    const targetTodoIndex = todoLists.findIndex((e) => e === todoList);
    isUpdate[targetTodoIndex] = false;
  }
  function cancelTodoUpdate(todoList) {
    const targetTodoIndex = todoLists.findIndex((e) => e === todoList);
    isUpdate[targetTodoIndex] = false;
    todoLists[targetTodoIndex]["text"] = updateBackup;
  }
</script>

<main>
  <h1>투두리스트</h1>

  <div>
    {#each todoLists as todoList}
      <div class="todo_align">
        {#if !isUpdate[todoLists.findIndex((e) => e === todoList)]}
          <label class:checked={todoList.checked === true}>
            <input
              on:click={() => toggleTodo(todoList)}
              type="checkbox"
              value={todoList}
            />
            {todoList.text}
          </label>

          <button on:click={() => rewriteTodo(todoList)}>수정✍️</button>
          <button on:click={() => removeTodo(todoList)}>삭제🗑️</button>
        {:else}
          <!-- 다시 포커스 됐을 때 데이터 이상해짐 -->
          <input
            bind:value={todoList.text}
            on:focus={() => (updateBackup = todoList.text)}
          />

          <button on:click={() => cancelTodoUpdate(todoList)}>취소</button>
          <button on:click={() => updateTodo(todoList)}>저장✍️</button>
        {/if}
      </div>
      <br />
    {/each}
  </div>

  <form on:submit|preventDefault={handleSubmit}>
    <input bind:value={newTodo} placeholder="할 일을 입력해주세요" />
    <button type="submit">추가</button>
  </form>
</main>

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
