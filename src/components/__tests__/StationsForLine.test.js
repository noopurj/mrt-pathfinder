import { render } from "@testing-library/react";
import StationsForLine from "../StationsForLine";

describe("StationsForLine", () => {
  it("can display stops passed in as props", () => {
    const stops = ["Paya Lebar", "MacPherson"];
    const { getByText } = render(<StationsForLine stops={stops} />);
    stops.forEach((stop) => expect(getByText(stop)).toBeInTheDocument());
  });
});
