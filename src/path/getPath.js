import { createLineGraph } from "./createLineGraph";
import { bfs } from "./bfs";
import { createAllPossiblePaths } from "./createAllPossiblePaths";
import { countStations } from "./countStations";

class Path {
  constructor(stationsTravelled) {
    this.stationsTravelled = stationsTravelled;
  }
}

function sortPaths(paths, stations) {
  const pathsToSort = paths.map(
    (path) => new Path(countStations(path, stations))
  );
  pathsToSort.sort(
    (p1, p2) => p1.stationsTravelled.length - p2.stationsTravelled.length
  );
  console.log(pathsToSort);
  return pathsToSort.map((path) => path.stationsTravelled);
}

export function getPath(origin, destination, stations) {
  const STATION_NAMES = Object.keys(stations);
  if (!STATION_NAMES.includes(origin) || !STATION_NAMES.includes(destination)) {
    throw new Error("Invalid station, cannot calculate path");
  }
  const paths = [];
  if (origin === destination) return paths;
  const linesOrigin = stations[origin];
  const linesDestination = stations[destination];
  const common = Object.keys(linesOrigin).filter((line) =>
    Object.keys(linesDestination).includes(line)
  );
  if (common.length > 0) {
    paths.push([origin, destination]);
  }
  const graph = createLineGraph(stations);
  Object.keys(linesOrigin).forEach((originLine) => {
    Object.keys(linesDestination).forEach((destinationLine) => {
      const linePath = bfs(originLine, destinationLine, graph);
      const possiblePaths = createAllPossiblePaths(linePath, 0, graph, []);
      possiblePaths.forEach((possiblePath) => {
        if (
          !possiblePath.includes(origin) &&
          !possiblePath.includes(destination)
        ) {
          paths.push([origin, ...possiblePath, destination]);
        }
      });
    });
  });
  return sortPaths(paths, stations);
}
