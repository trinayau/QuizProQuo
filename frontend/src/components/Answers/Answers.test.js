import { default as Answers } from ".";
import { screen, render } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { MemoryRouter } from "react-router-dom";
describe("AnswerCard", () => {
  beforeEach(() => {
    render(<Answers result={resultStub} />);
    const resultStub = ["Paris", "Madrid", "London", "New York"];
  });
  test("it renders a button for the answer cards", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
  //   test("it shows the incorrect answer in the results", async () => {
  //     const incorrectAnswer = await screen.findByText("London");
  //     expect(incorrectAnswer).toBeInTheDocument();
  //   });
  //   test("it shows the correct answer in the results", async () => {
  //     const correct = await screen.findByText("Paris");
  //     expect(correct).toBeInTheDocument();
  //   });
});
