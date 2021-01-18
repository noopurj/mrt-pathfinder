import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App", () => {
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

  test("Disables find path button when origin or destination or both not selected", () => {
    render(<App />);
    const findPathButton = screen.getByText("Find me a path!");
    expect(findPathButton).toBeDisabled();
    userEvent.click(screen.getAllByText("Bedok North")[0]);
    expect(findPathButton).toBeDisabled();
    userEvent.click(screen.getAllByText("Somerset")[1]);
    expect(findPathButton).not.toBeDisabled();
  });

  test("can find a path with least stations by default", () => {
    render(<App />);
    const bedokNorthOrigin = screen.getAllByText("Bedok North")[0];
    const somersetDestination = screen.getAllByText("Somerset")[1];
    userEvent.click(bedokNorthOrigin);
    userEvent.click(somersetDestination);
    userEvent.click(screen.getByText("Find me a path!"));
    expect(
      screen.getByText("This path is 12 mrt stations long with 3 changes")
    ).toBeInTheDocument();
  });

  test("can switch to path with least mrt changes when option is selected without clicking on find path button again", () => {
    render(<App />);
    const bedokNorthOrigin = screen.getAllByText("Bedok North")[0];
    const somersetDestination = screen.getAllByText("Somerset")[1];
    userEvent.click(bedokNorthOrigin);
    userEvent.click(somersetDestination);
    userEvent.click(screen.getByText("Find me a path!"));
    userEvent.click(screen.getByText("least changes in MRT line"));
    expect(
      screen.getByText("This path is 21 mrt stations long with 1 change")
    ).toBeInTheDocument();
  });

  test("Resets path view when new origin or destination is selected", () => {
    render(<App />);
    const bedokNorthOrigin = screen.getAllByText("Bedok North")[0];
    const somersetDestination = screen.getAllByText("Somerset")[1];
    userEvent.click(bedokNorthOrigin);
    userEvent.click(somersetDestination);
    userEvent.click(screen.getByText("Find me a path!"));
    expect(screen.getByText(/This path is/)).toBeInTheDocument();
    userEvent.click(screen.getAllByText("Bedok")[0]);
    expect(screen.queryByText(/This path is/)).not.toBeInTheDocument();
  });
});
