import { default as Answers } from ".";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter as Router } from "react-router-dom";
// import userEvent from "@testing-library/user-event";
// import { MemoryRouter } from "react-router-dom";
describe("Answers", () => {
  let getResultMock;

  beforeEach(() => {
    getResultMock = jest.fn();
    render(
      <Router>
        <Provider store={store}>
          <Answers getResult={getResultMock} />
        </Provider>
      </Router>
    );
  });
  test("it renders a button for the answer cards", () => {
    const button = screen.getByRole("answer-button");
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
