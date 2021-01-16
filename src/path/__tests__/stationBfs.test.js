import stations from "../../stations";
import { createGraph, getShortestPath } from "../stationBfs";

describe("stationBfs", () => {
  describe("createGraph", () => {
    const STATIONS = {
      Admiralty: { NS: 1 },
      Aljunied: { EW: 1 },
      "Ang Mo Kio": { NS: 2 },
      "City Hall": { NS: 3, EW: 2 },
      Bedok: { EW: 3 },
      Somerset: { NS: 4 },
      "Raffles Place": { NS: 5, EW: 6 },
      "Tanah Merah": { EW: 7, CG: 0 },
      "Changi Airport": { CG: 1 },
      Phoenix: { BP: [5, 15] },
      "Jurong East": { NS: 6, EW: 8, JE: 5 },
      "Choa Chu Kang": { NS: 8, JS: 1, BP: [2, 19] },
    };

    it("can create an undirected graph with all the given stations as nodes", () => {
      const graph = createGraph(STATIONS);
      expect(graph.nodes()).toEqual(
        expect.arrayContaining(Object.keys(STATIONS))
      );
      expect(graph.isDirected()).toEqual(false);
    });
  });

  describe("getShortestPath", () => {
    const GRAPH = createGraph(stations);
    it("can throw exception if destination or origin is invalid", () => {
      expect(() =>
        getShortestPath(GRAPH, "Invalid Station", "Invalid Station")
      ).toThrowError("Invalid station, cannot calculate path");
    });

    it("can return empty path if origin and destination is the same", () => {
      const sameStation = "Admiralty";
      expect(getShortestPath(GRAPH, sameStation, sameStation)).toEqual(
        expect.objectContaining({
          lineMap: {},
          lineOrder: [],
          stationsTravelled: [sameStation],
          stops: [sameStation],
        })
      );
    });
  });
});
