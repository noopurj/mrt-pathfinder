import { render, fireEvent } from "@testing-library/react";
import JourneyLeg from "../JourneyLeg";

describe("Journey Leg", () => {
  it("can display stations in the journey leg by default on loading", () => {
    const stops = ["Jurong East", "Joo Koon"];
    const { getByText } = render(
      <JourneyLeg line="EW" stops={stops} index={1} lineOrder={["EW"]} />
    );
    stops.forEach((stop) => {
      expect(getByText(stop)).toBeInTheDocument();
    });
  });

  it("can collapse the stations displayed on click", () => {
    const stops = ["Jurong East", "Joo Koon"];
    const { getByText, queryByText } = render(
      <JourneyLeg line="EW" stops={stops} index={0} lineOrder={["EW"]} />
    );
    fireEvent.click(getByText("Collapse"));
    stops.forEach((stop) => {
      expect(queryByText(stop)).not.toBeInTheDocument();
    });
  });

  it("Displays 'Expand' when stations section is collapsed", () => {
    const stops = ["Jurong East", "Joo Koon"];
    const { getByText } = render(
      <JourneyLeg line="EW" stops={stops} index={0} lineOrder={["EW"]} />
    );
    fireEvent.click(getByText("Collapse"));
    expect(getByText("Expand")).toBeInTheDocument();
  });

  it("can display message to change to a different line if it isn't the last leg of journey", () => {
    const stops = ["Starting", "InBetween", "Interchange"];
    const lineOrder = ["EW", "NS"];
    const { getByText } = render(
      <JourneyLeg line="EW" stops={stops} index={0} lineOrder={lineOrder} />
    );
    expect(getByText(`Change to NS line at ${stops[2]}`)).toBeInTheDocument();
  });
});
