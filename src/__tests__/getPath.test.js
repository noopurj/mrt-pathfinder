import { getPath } from "../getPath";

describe("getPath", () => {
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
  };

  it("can return empty path if origin and destination is the same", () => {
    const sameStation = "Admiralty";
    expect(getPath(sameStation, sameStation, STATIONS)).toEqual([]);
  });

  it("can throw exception if destination or origin is invalid", () => {
    expect(() =>
      getPath("Invalid Station", "Invalid Station", STATIONS)
    ).toThrowError("Invalid station, cannot calculate path");
  });

  it("can return a single path between two stations on the same line", () => {
    expect(getPath("Admiralty", "Ang Mo Kio", STATIONS)).toEqual([
      ["Admiralty", "Ang Mo Kio"],
    ]);
  });

  it("can return a path between two stations on different lines with one intersection", () => {
    expect(getPath("Bedok", "Somerset", STATIONS)).toEqual([
      ["Bedok", "City Hall", "Somerset"],
      ["Bedok", "Raffles Place", "Somerset"],
      ["Bedok", "Jurong East", "Somerset"],
    ]);
  });

  it("can return 2 possible paths", () => {
    expect(getPath("Bedok", "Somerset", STATIONS)).toEqual([
      ["Bedok", "City Hall", "Somerset"],
      ["Bedok", "Raffles Place", "Somerset"],
      ["Bedok", "Jurong East", "Somerset"],
    ]);
  });

  it("can return a path on 2 different lines with 2 interchanges", () => {
    expect(getPath("Ang Mo Kio", "Changi Airport", STATIONS)).toEqual([
      ["Ang Mo Kio", "City Hall", "Tanah Merah", "Changi Airport"],
      ["Ang Mo Kio", "Raffles Place", "Tanah Merah", "Changi Airport"],
      ["Ang Mo Kio", "Jurong East", "Tanah Merah", "Changi Airport"],
    ]);
  });

  it("can return a path on 2 different lines with 3 interchanges", () => {
    expect(getPath("Phoenix", "Changi Airport", STATIONS)).toEqual(
      expect.arrayContaining([
        [
          "Phoenix",
          "Choa Chu Kang",
          "Jurong East",
          "Tanah Merah",
          "Changi Airport",
        ],
        [
          "Phoenix",
          "Choa Chu Kang",
          "City Hall",
          "Tanah Merah",
          "Changi Airport",
        ],
        [
          "Phoenix",
          "Choa Chu Kang",
          "Raffles Place",
          "Tanah Merah",
          "Changi Airport",
        ],
      ])
    );
  });
});
