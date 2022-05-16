import { default as SetGame } from ".";
import { screen, render } from "@testing-library/react";

describe("SetGame", () => {
  test("it renders the Form component", () => {
    const { getByText } = render(<Form />);
    expect(getByText("Pick a category").toBeInTheDocument());
  });
});
