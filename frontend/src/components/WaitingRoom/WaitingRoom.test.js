import { default as WaitingRoom } from ".";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter as Router } from "react-router-dom";

describe("Waiting Room", () => {
  let getResultMock;

  beforeEach(() => {
    getResultMock = jest.fn();
    render(
      <Router>
        <Provider store={store}>
          <WaitingRoom getResult={getResultMock} />
        </Provider>
      </Router>
    );
  });
  test("it renders a role with lobby", () => {
    const lobby = screen.getByRole("lobby");
    expect(lobby).toBeInTheDocument();
  });

  test("it renders a title with", () => {
    const p = screen.getByText("Lobby");
    expect(p).toBeInTheDocument();
  });
});
