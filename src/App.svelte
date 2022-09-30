<script>
  // import svelteLogo from "./assets/svelte.svg";
  // import Counter from "./lib/Counter.svelte";

  // let name = "world";

  // let count = 0;
  // function handleClick() {
  //   count += 1;
  // }

  // let visible = true;
  let todoLists = [
    { text: "리스트1" },
    { text: "리스트2" },
    { text: "리스트3" },
  ];

  let newTodo = "";

  function handleSubmit() {
    if (newTodo === "") {
      console.log("내용을 입력하세요");
    } else {
      console.log(newTodo);
    }
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
    {#each todoLists as todoList}
      <label><input type="checkbox" value={todoList} />{todoList.text}</label
      ><br />
    {/each}
  </div>

  <form on:submit|preventDefault={handleSubmit}>
    <input bind:value={newTodo} placeholder="할 일을 입력해주세요" />
    <button type="submit">추가</button>
  </form>
</main>

<style>
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
