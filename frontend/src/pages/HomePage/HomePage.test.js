import { default as HomePage } from ".";
import { screen, render } from "@testing-library/react";

describe("HomePage", () => {
  //   let getResultMock;

  //   beforeEach(() => {
  //     getResultMock = jest.fn();
  //     render(<HomePage getResult={getResultMock}/>);
  // });

  test("it renders a form", () => {
    render(<HomePage />);
    let form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });
});
