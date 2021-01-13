import { createAllPossiblePaths } from "../createAllPossiblePaths";
import { createLineGraph } from "../createLineGraph";

describe("createAllPossiblePaths", () => {
  const STATIONS = {
    Admiralty: { NS: 10 },
    Aljunied: { EW: 9 },
    "Ang Mo Kio": { NS: 16 },
    "City Hall": { NS: 25, EW: 13 },
    Bedok: { EW: 5 },
    Somerset: { NS: 23 },
    "Raffles Place": { NS: 26, EW: 14 },
    "Tanah Merah": { EW: 4, CG: 0 },
    "Changi Airport": { CG: 2 },
    Phoenix: { BP: [5, 15] },
    "Jurong East": { NS: 1, EW: 24, JE: 5 },
    "Choa Chu Kang": { NS: 4, JS: 1, BP: [1, 19] },
    "Buona Vista": { EW: 21, CC: 22, CE: 22 },
    "Paya Lebar": { EW: 8, CC: 9, CE: 9 },
  };
  const GRAPH = createLineGraph(STATIONS);
  it("can create all possible intermediate paths when there are multiple interchanges between 2 lines", () => {
    expect(createAllPossiblePaths(["NS", "EW"], 0, GRAPH, [])).toEqual(
      expect.arrayContaining([
        ["Jurong East"],
        ["City Hall"],
        ["Raffles Place"],
      ])
    );
  });

  it("can create all possible intermediate paths when there are multiple interchanges between multiple lines", () => {
    expect(createAllPossiblePaths(["NS", "EW", "CC"], 0, GRAPH, [])).toEqual(
      expect.arrayContaining([
        ["Jurong East", "Paya Lebar"],
        ["City Hall", "Paya Lebar"],
        ["Raffles Place", "Paya Lebar"],
        ["Jurong East", "Buona Vista"],
        ["City Hall", "Buona Vista"],
        ["Raffles Place", "Buona Vista"],
      ])
    );
  });
});
