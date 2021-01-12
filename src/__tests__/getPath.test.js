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
    ]);
  });

  it("can return 2 possible paths", () => {
    expect(getPath("Bedok", "Somerset", STATIONS)).toEqual([
      ["Bedok", "City Hall", "Somerset"],
      ["Bedok", "Raffles Place", "Somerset"],
    ]);
  });

  it("can return a path on 2 different lines with no common interchange between them", () => {
    expect(getPath("Ang Mo Kio", "Changi Airport", STATIONS)).toEqual([
      ["Ang Mo Kio", "City Hall", "Tanah Merah", "Changi Airport"],
      ["Ang Mo Kio", "Raffles Place", "Tanah Merah", "Changi Airport"],
    ]);
  });
});
