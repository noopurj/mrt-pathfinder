import { Graph, alg } from "@dagrejs/graphlib";
import { orderedLines } from "./orderedLines";

function isInterchange(station, stations) {
  return Object.keys(stations[station]).length > 1;
}

export function createGraph(stations, lineChangeWeight = 1) {
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
          const currentStationName = isInterchange(currentStation, stations)
            ? currentStation + "-" + lineName
            : currentStation;
          const nextStationName = isInterchange(nextStation, stations)
            ? nextStation + "-" + lineName
            : nextStation;
          graph.setEdge(currentStationName, nextStationName, lineName);
          currentStationNumber = nextStationNumber;
        } else {
          currentStationNumber += 1;
        }
      }
    }
  );

  setLineChangeWeight(graph, stations, lineChangeWeight);
  return graph;
}

export function setLineChangeWeight(graph, stations, lineChangeWeight) {
  Object.entries(stations).forEach(([stationName, lines]) => {
    if (Object.keys(lines).length > 1) {
      Object.keys(lines).forEach((line1) =>
        Object.keys(lines).forEach((line2) => {
          if (line1 !== line2) {
            graph.setEdge(
              `${stationName}-${line1}`,
              `${stationName}-${line2}`,
              lineChangeWeight,
              "interchange"
            );
          }
        })
      );
    }
  });
}

function getLineWiseInterchangeName(station, stations) {
  const result = [];
  if (isInterchange(station, stations)) {
    Object.keys(stations[station]).forEach((line) =>
      result.push(`${station}-${line}`)
    );
  } else {
    result.push(station);
  }
  return result;
}

const edgeFunction = (graph) => (v) => graph.nodeEdges(v);

function constructPath(pathMap, source, destination, graph) {
  const stationsTravelled = [];
  const lineOrder = [];
  const lineMap = {};
  let previousStop = destination;
  while (previousStop !== source) {
    const previousStopWithoutLine = previousStop.split("-")[0];
    if (!stationsTravelled.includes(previousStopWithoutLine)) {
      stationsTravelled.push(previousStopWithoutLine);
    }
    const line = graph.edge(previousStop, pathMap[previousStop].predecessor);
    if (line !== undefined) {
      if (!lineOrder.includes(line)) {
        lineOrder.push(line);
      }
      const lineStationList = lineMap[line] || [];
      lineStationList.unshift(previousStopWithoutLine);
      previousStop = pathMap[previousStop].predecessor;
      if (previousStop === source) {
        lineStationList.unshift(previousStop.split("-")[0]);
      }
      lineMap[line] = lineStationList;
    } else {
      previousStop = pathMap[previousStop].predecessor;
    }
  }
  stationsTravelled.push(source.split("-")[0]);
  stationsTravelled.reverse();
  lineOrder.reverse();
  const stops = [source.split("-")[0]];
  lineOrder.forEach((line) => stops.push([...lineMap[line]].pop()));
  for (let i = 1; i < stops.length - 1; i++) {
    const previousLineStations = lineMap[lineOrder[i - 1]];
    const lastStopOfPreviousLine =
      previousLineStations[previousLineStations.length - 1];
    lineMap[lineOrder[i]].unshift(lastStopOfPreviousLine);
  }
  return { lineMap, lineOrder, stationsTravelled, stops };
}

export function getShortestPath(
  source,
  destination,
  stations,
  lineChangeWeight = 1,
  weightedGraph = null
) {
  const STATION_NAMES = Object.keys(stations);
  if (!STATION_NAMES.includes(source) || !STATION_NAMES.includes(destination)) {
    throw new Error("Invalid station, cannot calculate path");
  }
  const graph =
    weightedGraph === null
      ? createGraph(stations, lineChangeWeight)
      : weightedGraph;
  const sources = getLineWiseInterchangeName(source, stations);
  const destinations = getLineWiseInterchangeName(destination, stations);

  const weightFunction = (e) => {
    const edgeValue = graph.edge(e);
    if (isNaN(edgeValue)) return 1;
    return edgeValue;
  };

  let minCost = Infinity;
  let minPathMap = undefined;
  let minPathOrigin = undefined;
  let minPathDestination = undefined;

  sources.forEach((start) => {
    const pathMap = alg.dijkstra(
      graph,
      start,
      weightFunction,
      edgeFunction(graph)
    );
    destinations.forEach((end) => {
      const cost = pathMap[end].distance;
      if (cost < minCost) {
        minCost = cost;
        minPathMap = pathMap;
        minPathOrigin = start;
        minPathDestination = end;
      }
    });
  });

  if (minCost === Infinity) {
    return "Sorry, no path found!";
  }

  return constructPath(minPathMap, minPathOrigin, minPathDestination, graph);
}
