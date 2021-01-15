import { countStations } from "../countStations";
import stations from "../../stations";

describe("countStations", () => {
  it("can return shortest number of stations if 2 possible lines", () => {
    expect(countStations(["Jurong East", "City Hall"], stations)).toEqual(12);
  });

  it("can return shortest path when there are loops", () => {
    expect(countStations(["Pending", "Phoenix"], stations)).toEqual(4);
  });
});
