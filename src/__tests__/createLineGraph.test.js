import { createLineGraph } from "../createLineGraph";
import stations from "../stations";
describe("createLineGraph", () => {
  it("can convert stations input into adjacency list", () => {
    expect(createLineGraph(stations)).toEqual({});
  });
});
