import { default as Players } from ".";
import { screen, render } from "@testing-library/react";

describe("player bubble", () => {
  test("it renders a role with waiting-players", () => {
    render(<Players />);
    let p = screen.getByRole("waiting-players");
    expect(p).toBeInTheDocument();
  });
});
