import { createLineGraph } from "../createLineGraph";
import { bfs } from "../bfs";

describe("bfs", () => {
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
    Xilin: { DT: 36 },
  };
  const GRAPH = createLineGraph(STATIONS);

  it("can find the shortest path from one line to another, minimizing the number of changes", () => {
    expect(bfs("CG", "BP", GRAPH)).toEqual(["CG", "EW", "NS", "BP"]);
  });

  it("can return empty path if no connection to line is possible", () => {
    expect(bfs("DT", "CG", GRAPH)).toEqual([]);
  });
});
