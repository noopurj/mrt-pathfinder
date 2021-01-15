import { orderedLines } from "./orderedLines";

function getStartEndNumbers(station1Numbers, station2Numbers) {
  let start = station1Numbers[0];
  let end = station2Numbers[0];
  let minDiff = 100;
  station1Numbers.forEach((station1Number) => {
    station2Numbers.forEach((station2Number) => {
      const diff = Math.abs(station1Number - station2Number);
      if (diff < minDiff) {
        start = station1Numbers;
        end = station2Number;
        minDiff = diff;
      }
    });
  });
  if (end < start) {
    return [end, start];
  }
  return [start, end];
}

function countStationsBetween(origin, destination, orderedLines, stations) {
  let minStations = 100;
  let minStops = [];
  const commonLines = Object.keys(stations[origin]).filter((originLine) =>
    Object.keys(stations[destination]).includes(originLine)
  );
  commonLines.forEach((commonLine) => {
    const stops = [];
    const originStationNumber = Object.entries(orderedLines[commonLine])
      .filter(([, name]) => name === origin)
      .map(([number]) => Number(number));
    const destinationStationNumber = Object.entries(orderedLines[commonLine])
      .filter(([, name]) => name === destination)
      .map(([number]) => Number(number));
    const [start, end] = getStartEndNumbers(
      originStationNumber,
      destinationStationNumber
    );
    for (let i = start; i <= end; i++) {
      if (Object.keys(orderedLines[commonLine]).includes(String(i))) {
        stops.push(orderedLines[commonLine][i]);
      }
    }
    if (stops.length < minStations) {
      console.log(origin, destination, minStops, start, end);
      minStations = stops.length;
      minStops = stops;
    }
  });
  if (origin === minStops[minStops.length - 1]) {
    minStops.reverse();
  }
  return minStops;
}

export function countStations(path, stations) {
  const ordered = orderedLines(stations);
  const ans = [];
  for (let i = 0; i < path.length - 1; i += 1) {
    const minPath = countStationsBetween(
      path[i],
      path[i + 1],
      ordered,
      stations
    );
    minPath.forEach((station) => ans.push(station));
  }
  return ans;
}
