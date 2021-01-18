import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

test("renders app header", () => {
  render(<App />);
  const linkElement = screen.getByText(/MRT Path Finder/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders message if origin and destination is the same", () => {
  render(<App />);
  const selectionElements = screen.getAllByText("Admiralty");
  userEvent.click(selectionElements[0]);
  userEvent.click(selectionElements[1]);
  expect(
    screen.getByText("You are already where you want to be")
  ).toBeInTheDocument();
});
