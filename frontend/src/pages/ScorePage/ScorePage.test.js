import { default as ScorePage } from ".";
import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { MemoryRouter as Router } from "react-router-dom";
describe("ScorePage", () => {
  let getResultMock;

  beforeEach(() => {
    getResultMock = jest.fn();
    render(
      <Router>
        <Provider store={store}>
          <ScorePage getResult={getResultMock} index={0} percentage={0}/>
        </Provider>
      </Router>
    );
  });

  test("it renders a heading with a role scorePage", () => {
    const div = screen.getByRole("scorePage");
    expect(div).toBeInTheDocument();
  });

  test("it renders a button for the score page", () => {
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("it renders an image with a role of ScorePageImage ", () => {
    const button = screen.getByRole('img', { src: 'teary' });
    expect(button).toBeInTheDocument();
  });
});
