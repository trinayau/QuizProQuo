import { default as NotFound } from ".";
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
          <NotFound getResult={getResultMock} index={0} percentage={0} />
        </Provider>
      </Router>
    );
  });

  test("it renders a heading with a role of notFound", () => {
    const div = screen.getByRole("heading");
    expect(div).toBeInTheDocument();
  });
});
