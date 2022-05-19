import { default as Questions } from ".";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter as Router } from "react-router-dom";

describe("Questions", () => {
  let getResultMock;

  beforeEach(() => {
    getResultMock = jest.fn();
    render(
      <Router>
        <Provider store={store}>
          <Questions getResult={getResultMock} />
        </Provider>
      </Router>
    );
  });
  test("it renders a question header", () => {
    const heading = screen.getByRole("question-container");
    expect(heading).toBeInTheDocument();
  });

  test("it renders a div", () => {
    const div = screen.getByLabel("question-render");
    expect(div).toBeInTheDocument();
  });
});
