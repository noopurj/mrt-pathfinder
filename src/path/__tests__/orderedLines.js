import { orderedLines } from "../orderedLines";

describe("orderedLines", () => {
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

  it("can separate stations by lines and create object with station number as key and station name as value", () => {
    expect(orderedLines(STATIONS)).toEqual({
      BP: {
        15: "Phoenix",
        19: "Choa Chu Kang",
        2: "Choa Chu Kang",
        5: "Phoenix",
      },
      CG: {
        0: "Tanah Merah",
        1: "Changi Airport",
      },
      EW: {
        1: "Aljunied",
        2: "City Hall",
        3: "Bedok",
        6: "Raffles Place",
        7: "Tanah Merah",
        8: "Jurong East",
      },
      JE: {
        5: "Jurong East",
      },
      JS: {
        1: "Choa Chu Kang",
      },
      NS: {
        1: "Admiralty",
        2: "Ang Mo Kio",
        3: "City Hall",
        4: "Somerset",
        5: "Raffles Place",
        6: "Jurong East",
        8: "Choa Chu Kang",
      },
    });
  });
});
