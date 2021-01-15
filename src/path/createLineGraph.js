export function createLineGraph(stations) {
  const graph = {};
  Object.entries(stations).forEach(([stationName, lines]) => {
    Object.keys(lines).forEach((line) => {
      const adjacentLines = graph[line] || {};

      Object.keys(lines).forEach((neighbour) => {
        if (line !== neighbour) {
          const interchangeList = adjacentLines[neighbour] || [];
          if (!interchangeList.includes(stationName)) {
            interchangeList.push(stationName);
          }
          adjacentLines[neighbour] = interchangeList;
        }
      });
      graph[line] = adjacentLines;
    });
  });
  return graph;
}
