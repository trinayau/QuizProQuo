import { default as Lobby } from ".";
import { default as WaitingRoom } from "../.././components/WaitingRoom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter as Router } from "react-router-dom";
describe("Lobby", () => {
  let getResultMock;

  beforeEach(() => {
    getResultMock = jest.fn();
    render(
      <Router>
        <Provider store={store}>
          <Lobby getResult={getResultMock} />
        </Provider>
      </Router>
    );
  });
  test("it renders the WaitingRoom component", () => {
    const lobby = screen.getByRole("Lobby");
    expect(lobby).toBeInTheDocument();
  });
});
