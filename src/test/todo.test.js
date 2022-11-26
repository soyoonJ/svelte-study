import "@testing-library/jest-dom";

import { render, fireEvent, screen } from "@testing-library/svelte";
import { beforeEach, describe, it } from "vitest";
import App from "../App.svelte";

describe("App.svelte render test", () => {
  beforeEach(() => {
    render(App);
  });

  it("main title render", () => {
    const todoText = screen.getByText("투두리스트");
    expect(todoText).toBeInTheDocument();
  });

  it("'수정' button length when it renders", () => {
    const buttonEl = screen.getAllByRole("button", { name: /수정/i });
    expect(buttonEl.length).toBe(3);
  });

  it("button Text change When click '수정' button", async () => {
    const buttonEl = screen.getAllByRole("button", { name: /수정/i });
    expect(buttonEl[0]).toBeInTheDocument();

    await fireEvent.click(buttonEl[0]);
    await fireEvent.click(buttonEl[1]);

    const cancelButtonEl = screen.getAllByRole("button", { name: /취소/i });
    // expect(cancelButtonEl).toBeInTheDocument();
    expect(cancelButtonEl.length).toBe(2);
  });
});
