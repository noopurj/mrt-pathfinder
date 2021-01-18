# MRT Path Finder
 [Live Demo](https://noopurj.github.io/mrt-pathfinder/) hosted on github pages

## Usage
1. Choose an origin mrt station
2. Choose a destination mrt station
3. Click on "**Find me a path!**" button
4. Path with least number of stations displayed by default
5. Choose the "**least changes in MRT line**" path option to get different path (if possible) with least number of changes, this path maybe longer
6. Choosing a different origin or destination will make the currently displayed path disappear 

## Running locally 
In root directory - 
```shell script
$ yarn 
$ yarn start
```
navigate to http://localhost:3000

## Assumptions 
1. Distance between 2 consecutive mrt stations on any line (or the time taken to travel between them, can be referred to as "cost") is assumed to be the same. For example travel time from Jurong East to Clementi on the EW line is the same as travelling from Dakota to Mountbatten on the CC line.
2. This means cost of travelling 1 station in any direction on any given line is 1.
3. The cost of changing lines at an interchange (station that is on more than 1 line) is the same as travelling a distance of 1 station on any line for finding a path with least stations.
4. The cost of changing lines is changed to 15 for finding a path with least number of changes.

## Improvements 
1. Cost between consecutive stations which are farther away can be higher
2. Cost of changing lines can be different for different interchanges depending on walking involved.
3. Group station dropdown by line for easier selection