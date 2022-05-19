import { default as Quiz } from ".";
import { screen, render } from "@testing-library/react";

describe("Quiz", () => {
  test("it renders a paragraph", () => {
    render(<Quiz />);
    let p = screen.getByRole("quizPage");
    expect(p).toBeInTheDocument();
  });
});
