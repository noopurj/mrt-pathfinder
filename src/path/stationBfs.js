import { orderedLines } from "./orderedLines";
import { bfs } from "./bfs";

function createStationGraph(stations) {
  const graph = {};
  const stationsByLines = orderedLines(stations);
  Object.entries(stationsByLines).forEach(([lineName, stationsForLine]) => {
    const maxStationNumber = Math.max(
      ...Object.keys(stationsForLine).map((num) => Number(num))
    );
    Object.entries(stationsForLine).forEach(([stationNumber, stationName]) => {
      const adjacent = graph[stationName] || {};
      let number = Number(stationNumber) + 1;
      while (!Object.keys(stationsForLine).includes(String(number))) {
        number++;
        if (number > maxStationNumber) {
          break;
        }
      }
      if (
        number !== Number(stationNumber) &&
        Object.keys(stationsForLine).includes(String(number))
      ) {
        const adjacentStation = stationsForLine[String(number)];
        const connectionLines = adjacent[adjacentStation] || [];
        connectionLines.push(lineName);
        adjacent[adjacentStation] = connectionLines;
      }
      number = Number(stationNumber) - 1;
      while (!Object.keys(stationsForLine).includes(String(number))) {
        number--;
        if (number < 0) {
          break;
        }
      }
      if (
        number !== Number(stationNumber) &&
        Object.keys(stationsForLine).includes(String(number))
      ) {
        const adjacentStation = stationsForLine[String(number)];
        const connectionLines = adjacent[adjacentStation] || [];
        connectionLines.push(lineName);
        adjacent[adjacentStation] = connectionLines;
      }
      graph[stationName] = adjacent;
    });
  });
  console.log(graph);
  return graph;
}

export function stationBfs(origin, destination, stations) {
  const adjacencyListStations = createStationGraph(stations);
  const path = bfs(origin, destination, adjacencyListStations);
  return path;
}
