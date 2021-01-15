import stations from "../../stations";
import { stationBfs } from "../stationBfs";
import { getPath } from "../getPath";
import { countStations } from "../countStations";

describe("stationBfs", () => {
  it("can return path with least number of stations", () => {
    // expect(stationBfs("Expo", "Bugis", stations)).toEqual([]);
    const bfsPath = stationBfs("Expo", "Bugis", stations);
    console.log(bfsPath, bfsPath.length);
    const paths = getPath("Expo", "Bugis", stations);
    console.log(paths);
  });
});
