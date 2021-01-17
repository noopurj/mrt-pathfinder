import stations from "../../stations";
import { createGraph, getShortestPath } from "../stationBfs";

describe("stationBfs", () => {
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
    "Unreachable station": { US: 1 },
    "Another Unreachable station": { US: 2 },
  };

  describe("createGraph", () => {
    it("can create an undirected graph with all the given stations as nodes, with different nodes for same station with more than 1 line", () => {
      const graph = createGraph(STATIONS);
      expect(graph.nodes()).toEqual(
        expect.arrayContaining([
          "City Hall-NS",
          "City Hall-EW",
          "Raffles Place-NS",
          "Raffles Place-EW",
          "Jurong East-NS",
          "Jurong East-JE",
          "Jurong East-EW",
          "Choa Chu Kang-NS",
          "Choa Chu Kang-JS",
          "Choa Chu Kang-BP",
          "Tanah Merah-EW",
          "Tanah Merah-CG",
          "Admiralty",
          "Ang Mo Kio",
          "Somerset",
          "Aljunied",
          "Bedok",
          "Changi Airport",
          "Phoenix",
          "Unreachable station",
          "Another Unreachable station",
        ])
      );
      expect(graph.isDirected()).toEqual(false);
    });

    it("can create edge with given line change weight between two lines of the same stations", () => {
      const graph = createGraph(STATIONS, 5);
      expect(graph.edge("City Hall-NS", "City Hall-EW", "interchange")).toEqual(
        5
      );
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
      expect(getShortestPath(sameStation, sameStation, stations)).toEqual(
        expect.objectContaining({
          lineMap: {},
          lineOrder: [],
          stationsTravelled: [sameStation],
          stops: [sameStation],
        })
      );
    });

    it("can return path without interchange when another path with same number of stations with interchange is present", () => {
      expect(
        getShortestPath("Marina South Pier", "City Hall", stations, 1)
      ).toEqual(
        expect.objectContaining({
          lineMap: {
            NS: [
              "Marina South Pier",
              "Marina Bay",
              "Raffles Place",
              "City Hall",
            ],
          },
          lineOrder: ["NS"],
          stationsTravelled: [
            "Marina South Pier",
            "Marina Bay",
            "Raffles Place",
            "City Hall",
          ],
          stops: ["Marina South Pier", "City Hall"],
        })
      );
    });

    it("can return path with interchanges if stops are on different lines", () => {
      expect(getShortestPath("Bedok", "Somerset", stations)).toEqual(
        expect.objectContaining({
          lineMap: {
            EW: [
              "Bedok",
              "Kembangan",
              "Eunos",
              "Paya Lebar",
              "Aljunied",
              "Kallang",
              "Lavender",
              "Bugis",
              "City Hall",
            ],
            NS: ["City Hall", "Dhoby Ghaut", "Somerset"],
          },
          lineOrder: ["EW", "NS"],
          stationsTravelled: [
            "Bedok",
            "Kembangan",
            "Eunos",
            "Paya Lebar",
            "Aljunied",
            "Kallang",
            "Lavender",
            "Bugis",
            "City Hall",
            "Dhoby Ghaut",
            "Somerset",
          ],
          stops: ["Bedok", "City Hall", "Somerset"],
        })
      );
    });

    it("can return longer path on same line if changing weight is high enough to outnumber number of stations on direct path", () => {
      expect(getShortestPath("Expo", "Bugis", stations, 13)).toEqual(
        expect.objectContaining({ lineOrder: ["DT"], stops: ["Expo", "Bugis"] })
      );
    });

    it("can return shorter path with more changes if changing weight is default", () => {
      expect(getShortestPath("Expo", "Bugis", stations, 12)).toEqual(
        expect.objectContaining({
          lineOrder: ["CG", "EW"],
          stops: ["Expo", "Tanah Merah", "Bugis"],
        })
      );
    });

    it("return no path found message if no path possible", () => {
      expect(getShortestPath("Unreachable station", "Bedok", STATIONS)).toEqual(
        "Sorry, no path found!"
      );
    });
  });
});
