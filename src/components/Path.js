import PropTypes from "prop-types";
import { Header, Message } from "semantic-ui-react";
import JourneyLeg from "./JourneyLeg";

const Path = (props) => {
  const { path } = props;
  if (typeof path === "string" || path instanceof String) {
    return <Message>{path}</Message>;
  }

  if (path.stops === undefined) {
    return null;
  }

  const {
    path: { stops, lineOrder, lineMap, stationsTravelled },
  } = props;
  const changes = stops.length - 2;
  const numberOfStations = stationsTravelled.length;

  return (
    <>
      <div>
        <Header as="h4">
          This path is {numberOfStations} mrt stations long with {changes}{" "}
          {changes === 1 ? "change" : "changes"}
        </Header>
        <Header as="h5">{stops.join(" -> ")}</Header>
        {lineOrder.map((line, index) => {
          return (
            <JourneyLeg
              key={line}
              line={line}
              stops={lineMap[line]}
              index={index}
              lineOrder={lineOrder}
            />
          );
        })}
      </div>
    </>
  );
};

Path.propTypes = {
  path: PropTypes.oneOfType([
    PropTypes.shape({
      stationsTravelled: PropTypes.arrayOf(PropTypes.string),
      stops: PropTypes.arrayOf(PropTypes.string),
      lineMap: PropTypes.object,
      lineOrder: PropTypes.arrayOf(PropTypes.string),
    }),
    PropTypes.string,
  ]),
};

Path.defaultProps = {
  path: { stationsTravelled: [] },
  stops: [],
  lineMap: {},
  lineOrder: [],
};

export default Path;
