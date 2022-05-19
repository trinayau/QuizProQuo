import { default as LeaderBoardScore } from ".";
import { screen, render } from "@testing-library/react";

// failing
describe("p", () => {
  test("it renders a with a role of leaderboardScore", () => {
    render(<LeaderBoardScore />);
    let leaderboard = screen.getByRole("leaderboardScore");
    expect(leaderboard).toBeInTheDocument();
  });
});
