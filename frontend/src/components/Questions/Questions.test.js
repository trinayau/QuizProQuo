import { default as Questions } from ".";
import { screen, render } from "@testing-library/react";

describe("Questions", () => {
  test("it renders a question header", () => {
    render(<Questions />);
    let heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  test("it renders a div", () => {
    render(<Questions />);
    const div = screen.getByRole("quizCard");
    expect(div).toBeInTheDocument();
  });
});
