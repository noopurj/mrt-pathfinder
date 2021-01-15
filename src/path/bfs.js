export function bfs(originLine, destinationLine, graph) {
  const visited = {};
  const parent = {};
  Object.keys(graph).forEach((key) => {
    visited[key] = false;
    parent[key] = null;
  });
  const queue = [originLine];
  visited[originLine] = true;
  while (queue.length > 0) {
    const current = queue.pop();
    if (current === destinationLine) {
      let start = current;
      const path = [];
      while (start !== null) {
        path.push(start);
        start = parent[start];
      }
      return path.reverse();
    }
    Object.keys(graph[current]).forEach((neighbour) => {
      if (visited[neighbour] === false) {
        visited[neighbour] = true;
        parent[neighbour] = current;
        queue.push(neighbour);
      }
    });
  }
  return [];
}
