function getInterchangesBetween(station1, station2, stations) {
  const common = Object.keys(stations[station1]).filter((line) =>
    Object.keys(stations[station2]).includes(line)
  );
  if (common.length > 0) {
    return [];
  }
  const interchanges = new Set();
  Object.keys(stations[station1]).forEach((station1Line) => {
    Object.keys(stations[station2]).forEach((station2Line) => {
      Object.entries(stations).forEach(([station, lines]) => {
        if (
          Object.keys(lines).includes(station1Line) &&
          Object.keys(lines).includes(station2Line)
        ) {
          interchanges.add(station);
        }
      });
    });
  });
  return [...interchanges];
}

export function getPath(origin, destination, stations) {
  const STATION_NAMES = Object.keys(stations);
  if (!STATION_NAMES.includes(origin) || !STATION_NAMES.includes(destination)) {
    throw new Error("Invalid station, cannot calculate path");
  }
  const path = [];
  if (origin === destination) return path;
  const linesOrigin = stations[origin];
  const linesDestination = stations[destination];
  const common = Object.keys(linesOrigin).filter((line) =>
    Object.keys(linesDestination).includes(line)
  );
  if (common.length > 0) {
    path.push([origin, destination]);
  } else {
    const interchanges = getInterchangesBetween(origin, destination, stations);
    interchanges.forEach((interchange) => {
      path.push([origin, interchange, destination]);
    });
    Object.keys(linesDestination).forEach((destinationLine) => {
      Object.entries(stations).forEach(([station, line]) => {
        if (
          ![origin, destination].includes(station) &&
          Object.keys(line).length > 1 &&
          Object.keys(line).includes(destinationLine)
        ) {
          const interchanges = getInterchangesBetween(
            origin,
            station,
            stations
          );
          interchanges.forEach((interchange) => {
            if (interchange !== station) {
              path.push([origin, interchange, station, destination]);
            }
          });
        }
      });
    });
  }
  return path;
}
