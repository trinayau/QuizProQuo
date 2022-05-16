import { default as Lobby } from ".";
import { default as WaitingRoom } from "../.././components/WaitingRoom";
import { render, screen } from "@testing-library/react";

describe("Lobby", () => {
  test("it renders the WaitingRoom component", () => {
    render(<Lobby />);
    const { getByRole } = render(<WaitingRoom />);
    expect(getByRole("form").toBeInTheDocument());
  });
});
