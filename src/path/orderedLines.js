export function orderedLines(stations) {
  const result = {};
  Object.entries(stations).forEach(([station, lines]) => {
    Object.entries(lines).forEach(([lineName, lineNumber]) => {
      const orderedLine = result[lineName] || {};
      if (Array.isArray(lineNumber)) {
        lineNumber.forEach((number) => {
          orderedLine[number] = station;
        });
      } else {
        orderedLine[lineNumber] = station;
      }
      result[lineName] = orderedLine;
    });
  });
  return result;
}
