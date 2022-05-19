import { default as WaitingRoom } from ".";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Waiting Room", () => {
  test("it renders a question header", () => {
    render(<WaitingRoom />, { wrapper: MemoryRouter });
    let button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("it renders a title with", () => {
    render(<WaitingRoom />, { wrapper: MemoryRouter });
    const para = screen.getByContent("Waiting for host to start the game...");
    expect(p).toBeInTheDocument();
  });
});
