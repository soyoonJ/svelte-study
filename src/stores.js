import { writable } from "svelte/store";

export const todoLists = writable([
  { checked: false, text: "리스트1" },
  { checked: false, text: "리스트2" },
  { checked: false, text: "리스트3" },
]);
