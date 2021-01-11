export function getPath(origin, destination, stations) {
    const STATION_NAMES = Object.keys(stations);
    if(!STATION_NAMES.includes(origin) || !STATION_NAMES.includes(destination)) {
        throw new Error('Invalid station, cannot calculate path');
    }
    const path = [];
    if(origin === destination) return path;
    path.push([origin, destination]);
    return path;
}