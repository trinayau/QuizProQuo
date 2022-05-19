import { default as Form } from ".";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter as Router} from "react-router-dom";

describe("Form", () => {
  let getResultMock;

  beforeEach(() => {
    getResultMock = jest.fn();
    render(
      <Router>
        <Provider store={store}>
          <Form getResult={getResultMock} />{" "}
        </Provider>
      </Router>
    );
  });

  test("it renders a form", () => {
    let form = screen.getByLabel("game-selection");
    expect(form).toBeInTheDocument();
  });
  test("it renders a category dropdown menu", () => {
    let categoryInput = screen.getByLabelText("category");
    expect(categoryInput).toBeInTheDocument();
  });

  test("it calls category choice on form submission", () => {
    let categoryInput = screen.getByLabelText("category");
    userEvent.type(categoryInput, "Music{enter}");
    expect(getResultMock).toHaveBeenNthCalledWith(1, "Music");
  });

  test("it renders a number of questions option", () => {
    let numberOfQuestionsInput = screen.getByLabelText("number of questions");
    expect(numberOfQuestionsInput).toBeInTheDocument();
  });
  test("it calls number of questions chosen on form submission", () => {
    let numberOfQuestionsInput = screen.getByLabelText("number of questions");
    userEvent.type(numberOfQuestionsInput, "5{enter}");
    expect(getResultMock).toHaveBeenNthCalledWith(1, "5");
  });
});
