import { default as SetGame } from ".";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter as Router } from "react-router-dom";

describe("SetGame", () => {
  let getResultMock;

  beforeEach(() => {
    getResultMock = jest.fn();
    render(
      <Router>
        <Provider store={store}>
          <SetGame getResult={getResultMock} />{" "}
        </Provider>
      </Router>
    );
  });

  test("it renders a question header", () => {
    let heading = screen.getByRole("game-setup");
    expect(heading).toBeInTheDocument();
  });
});
