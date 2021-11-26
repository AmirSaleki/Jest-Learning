import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/hey yo/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("App Component Tests", () => {
  test("renders the 'Todo List'", () => {
    render(<App />);
    const text = screen.getByText("Todo List");
    expect(text).toBeInTheDocument();
  });

  test("renders 'Buy Milk' after adding 'Buy Milk' to todo list", () => {
    render(<App />);
    const editText = screen.getByPlaceholderText("Task");
    const button = screen.getByText("Add");
    userEvent.type(editText, "Buy Milk");
    userEvent.click(button);
    const result = screen.getByText("Buy Milk");
    expect(result).toBeInTheDocument();
  });

  test("renders global corona stats", async () => {
    render(<App />);
    const button = screen.getByText("Find");
    userEvent.click(button);
    //only find... methods return a promise
    const coronaStat = await screen.findByText("Global Statistics");
    expect(coronaStat).toBeInTheDocument();
  });
});
