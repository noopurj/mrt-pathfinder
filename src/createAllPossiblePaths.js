export function createAllPossiblePaths(linePath, index, graph, paths) {
  if (index >= linePath.length - 1) return paths;
  const currentLine = linePath[index];
  const line = linePath[index + 1];
  const newPaths = [];
  const stations = graph[currentLine][line];
  if (paths.length === 0) {
    stations.forEach((station) => newPaths.push([station]));
  } else {
    paths.forEach((path) => {
      stations.forEach((station) => newPaths.push([...path, station]));
    });
  }
  return createAllPossiblePaths(linePath, index + 1, graph, newPaths);
}
