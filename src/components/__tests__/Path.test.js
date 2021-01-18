import { render } from "@testing-library/react";
import Path from "../Path";

describe("Path", () => {
  it("return message if path prop is a string", () => {
    const message = "Sorry this path is invalid";
    const { getByText } = render(<Path path={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });

  it("returns null if there are no stops and path is not a string", () => {
    const { container } = render(<Path path={{ some: "foo" }} />);
    expect(container.children).toHaveLength(0);
  });

  it("displays path summary", () => {
    const stops = ["Paya Lebar", "Bugis"];
    const { getByText } = render(
      <Path
        path={{ stops, lineOrder: [], lineMap: {}, stationsTravelled: stops }}
      />
    );
    expect(getByText(stops.join(" -> "))).toBeInTheDocument();
    expect(
      getByText("This path is 2 mrt stations long with 0 changes")
    ).toBeInTheDocument();
  });

  it("can display a different message in summary for 1 change", () => {
    const stops = ["Paya Lebar", "Bugis", "Bedok"];
    const { getByText } = render(
      <Path
        path={{ stops, lineOrder: [], lineMap: {}, stationsTravelled: stops }}
      />
    );
    expect(
      getByText("This path is 3 mrt stations long with 1 change")
    ).toBeInTheDocument();
  });
});
