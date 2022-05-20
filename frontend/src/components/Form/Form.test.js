import { default as Form } from ".";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter as Router } from "react-router-dom";

describe("Form", () => {
  let getResultMock;

  beforeEach(() => {
    getResultMock = jest.fn();
    render(
      <Router>
        <Provider store={store}>
          <Form getResult={getResultMock} />
        </Provider>
      </Router>
    );
  });

  test("it renders a form", () => {
    const form = screen.getByLabelText("game-selection");
    expect(form).toBeInTheDocument();
  });
  test("it renders a category dropdown menu", () => {
    let categoryInput = screen.getByLabelText("category");
    expect(categoryInput).toBeInTheDocument();
  });

  test("it renders a number of questions option", () => {
    let numberOfQuestionsInput = screen.getByLabelText("number of questions");
    expect(numberOfQuestionsInput).toBeInTheDocument();
  });
});
