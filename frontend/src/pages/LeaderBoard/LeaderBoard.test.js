import { default as LeaderBoard } from ".";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const fetchMock = require("jest-fetch-mock");
fetchMock.enableMocks();
describe("LeaderBoard", () => {
  let getResultMock;

  beforeEach(() => {
    fetch.mockResponseOnce(
      new Promise((resolve, reject) => {
        resolve([
          { username: "Yusra", score: 20000 },
          { username: "Dan", score: 4 },
        ]);
      })
    );
    render(
      <Router>
        <Provider store={store}>
          <LeaderBoard getResult={getResultMock} />
        </Provider>
      </Router>
    );
  });

  test("There is a sort button", () => {
    const button = screen.getByRole("Ascending");
    expect(button.textContent).toBe("ASCENDING");
  });

  test("Once clicked return with a role of username", () => {
    const button = screen.getByRole("Ascending");
    userEvent.click(button);

    const users = screen.getByRole("username");
    expect(users).toBeInTheDocument();
  });
  test("Clicking the sort button sorts the users", async () => {
    const button = screen.getByRole("Ascending");

    // Pretend to click it
    await userEvent.click(button);

    // Check that Yusra is the last user
    const users = await screen.getByRole("username");
    expect(users[-1].textContent).toBe("Yusra");
  });

  test("it renders the title", () => {
    const heading = screen.getByRole("leaderboard");
    expect(heading).toBeInTheDocument();
  });

  test("it renders the heading with role leaderboard-heading", () => {
    const heading = screen.getByRole("leaderboard-heading");
    expect(heading.textContent).toContain("Leaderboard");
  });

  test("it renders a button with ariaLabel BackBtn", () => {
    const button = screen.getByLabelText("backBtn");
    expect(button).toBeInTheDocument();
  });

  test("it renders a div with role leaderbaord-container", () => {
    const role = screen.getByRole("leaderboard-container");
    expect(role).toBeInTheDocument();
  });
});
