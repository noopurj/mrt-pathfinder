import { Graph, alg } from "@dagrejs/graphlib";
import { orderedLines } from "./orderedLines";

export function createGraph(stations) {
  const graph = new Graph({ directed: false, multigraph: true });
  const orderedStationsByLine = orderedLines(stations);
  Object.entries(orderedStationsByLine).forEach(
    ([lineName, stationsForLine]) => {
      const minStationNumber = Math.min(
        ...Object.keys(stationsForLine).map((num) => Number(num))
      );
      const maxStationNumber = Math.max(
        ...Object.keys(stationsForLine).map((num) => Number(num))
      );
      let currentStationNumber = minStationNumber;
      while (currentStationNumber < maxStationNumber) {
        if (
          Object.keys(stationsForLine).includes(String(currentStationNumber))
        ) {
          let nextStationNumber = currentStationNumber + 1;
          while (
            !Object.keys(stationsForLine).includes(String(nextStationNumber)) &&
            nextStationNumber <= maxStationNumber
          ) {
            nextStationNumber += 1;
          }
          const currentStation = stationsForLine[String(currentStationNumber)];
          const nextStation = stationsForLine[String(nextStationNumber)];
          graph.setEdge(currentStation, nextStation, lineName);
          currentStationNumber = nextStationNumber;
        } else {
          currentStationNumber += 1;
        }
      }
    }
  );
  return graph;
}

export function getShortestPath(graph, source, destination) {
  const STATION_NAMES = graph.nodes();
  if (!STATION_NAMES.includes(source) || !STATION_NAMES.includes(destination)) {
    throw new Error("Invalid station, cannot calculate path");
  }

  const edgeFn = (v) => {
    return graph.nodeEdges(v);
  };
  const pathMap = alg.dijkstra(graph, source, () => 1, edgeFn);
  const stationsTravelled = [];
  const lineOrder = [];
  const lineMap = {};
  let previousStop = destination;
  while (previousStop !== source) {
    stationsTravelled.push(previousStop);
    const line = graph.edge(previousStop, pathMap[previousStop].predecessor);
    if (!lineOrder.includes(line)) {
      lineOrder.push(line);
    }
    const lineStationList = lineMap[line] || [];
    lineStationList.unshift(previousStop);
    previousStop = pathMap[previousStop].predecessor;
    if (previousStop === source) {
      lineStationList.unshift(previousStop);
    }
    lineMap[line] = lineStationList;
  }
  stationsTravelled.push(source);
  stationsTravelled.reverse();
  lineOrder.reverse();
  const stops = [source];
  lineOrder.forEach((line) => stops.push([...lineMap[line]].pop()));
  for (let i = 1; i < stops.length - 1; i++) {
    const previousLineStations = lineMap[lineOrder[i - 1]];
    const lastStopOfPreviousLine =
      previousLineStations[previousLineStations.length - 1];
    lineMap[lineOrder[i]].unshift(lastStopOfPreviousLine);
  }
  return { lineMap, lineOrder, stationsTravelled, stops };
}
