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
          <Answers answer={["a"]} getResult={getResultMock} index={0} />
        </Provider>
      </Router>
    );
  });
  test("it renders a button for the answer cards", () => {
    const button = screen.getByRole("button", { name: "a" });
    expect(button).toBeInTheDocument();
  });
});
