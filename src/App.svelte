<script>
  // import svelteLogo from "./assets/svelte.svg";
  // import Counter from "./lib/Counter.svelte";

  // let name = "world";

  // let count = 0;
  // function handleClick() {
  //   count += 1;
  // }

  // let visible = true;

  // 마지막 id 기준으로 더해서 넣는 방법도 있음
  let todoLists = [
    { checked: false, text: "리스트1" },
    { checked: false, text: "리스트2" },
    { checked: false, text: "리스트3" },
  ];
  // let todoListsCopy = todoLists.map((e) => JSON.parse(JSON.stringify(e)));

  let newTodo = "";
  let updateBackup = "";

  let isUpdate = Array(todoLists.length).fill(false);

  function handleSubmit() {
    if (newTodo === "") {
      console.log("내용을 입력하세요");
    } else {
      todoLists = [...todoLists, { checked: false, text: newTodo }];
      // todoListsCopy = todoLists;
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
    // todoListsCopy = todoLists;
  }

  // function setDefaultValue(todoList) {
  //   return todoList.text;
  // }

  function updateTodo(todoList) {
    const targetTodoIndex = todoLists.findIndex((e) => e === todoList);
    isUpdate[targetTodoIndex] = false;
  }
  function cancelTodoUpdate(todoList) {
    const targetTodoIndex = todoLists.findIndex((e) => e === todoList);
    isUpdate[targetTodoIndex] = false;

    // console.log(todoLists[targetTodoIndex].text);
    todoLists[targetTodoIndex]["text"] = updateBackup;
  }
</script>

<!-- <main>
  <h1>Hello {name}!</h1>

  {#if visible}
    <p>체크됨</p>
  {/if}
  <button on:click={handleClick}
    >{count === 0 ? "클릭" : "버튼테스트"} {count}</button
  >
  <label>
    <input type="checkbox" bind:checked={visible} />
    체크
  </label>

  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank"
      >SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main> -->
<main>
  <h1>투두리스트</h1>

  <div>
    <!-- bind:checked={toggleTodo(todoList.text)} -->
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
  /* .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  } */
</style>
