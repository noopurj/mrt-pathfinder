import PropTypes from "prop-types";
import { Accordion, Card, Icon } from "semantic-ui-react";
import { useState } from "react";

const Path = (props) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const changes = props.path.stops?.length - 2;
  const numberOfStations = props.path.stationsTravelled?.length;
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <>
      <Card fluid>
        <Card.Header>
          This path is {numberOfStations} mrt stations long with {changes}{" "}
          changes
        </Card.Header>
        <Card.Meta>Summary: {props.path.stops?.join(" -> ")}</Card.Meta>
        <Card.Description
          content={
            <Accordion styled>
              {props.path.lineOrder?.map((line, index) => {
                const lastStop = [...props.path.lineMap[line]].pop();
                const firstStop = props.path.lineMap[line][0];
                console.log(props.path.lineMap[line]?.join(", "));
                return (
                  <>
                    <Accordion.Title
                      color="green"
                      index={index}
                      key={line}
                      active={activeIndex === index}
                      onClick={handleClick}
                    >
                      <Icon name="dropdown" />
                      Travel on the {line} line from {firstStop} to {lastStop}
                      {index < props.path.lineOrder?.length - 1 && (
                        <p>
                          <Icon name="arrow right" />
                          <Icon name="train" />
                          Change to {props.path.lineOrder[index + 1]} line at{" "}
                          {lastStop}
                        </p>
                      )}
                    </Accordion.Title>

                    <Accordion.Content active={activeIndex === index}>
                      <p>{props.path.lineMap[line]?.join(" -> ")}</p>
                    </Accordion.Content>
                  </>
                );
              })}
            </Accordion>
          }
        />
      </Card>
    </>
  );
};

Path.propTypes = {
  path: PropTypes.shape({
    stationsTravelled: PropTypes.arrayOf(PropTypes.string),
    stops: PropTypes.arrayOf(PropTypes.string),
    lineMap: PropTypes.object,
    lineOrder: PropTypes.arrayOf(PropTypes.string),
  }),
};

Path.defaultProps = {
  path: { stationsTravelled: [] },
  stops: [],
  lineMap: {},
  lineOrder: [],
};

export default Path;
