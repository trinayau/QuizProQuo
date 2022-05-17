import { default as WaitingRoom } from ".";
import { screen, render } from "@testing-library/react";

describe("Waiting Room", () => {
  test("it renders a question header", () => {
    render(<WaitingRoom />);
    let button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("it renders a title with", () => {
    render(<WaitingRoom />);
    const para = screen.getByText("Waiting for host to start the game...");
    expect(p).toBeInTheDocument();
  });
});
