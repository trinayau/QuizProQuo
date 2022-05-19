import { default as Quiz } from ".";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter as Router } from "react-router-dom";

describe("Quiz", () => {
  let getResultMock;

  beforeEach(() => {
    getResultMock = jest.fn();
    render(
      <Router>
        <Provider store={store}>
          <Quiz getResult={getResultMock} />
        </Provider>
      </Router>
    );
  });
  test("it renders a paragraph", () => {
    let p = screen.getByRole("quizPage");
    expect(p).toBeInTheDocument();
  });
});
