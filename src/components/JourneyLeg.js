import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Header, Icon } from "semantic-ui-react";
import StationsForLine from "./StationsForLine";

const Clickable = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Expand = styled.div`
  text-decoration: underline;
`;

const Wrapper = styled.div`
  margin: 10px 0;
  border: 1px solid #dfdfdf;
  padding: 5px;
  border-radius: 3px;
`;

const JourneyLeg = (props) => {
  const [expanded, setExpanded] = useState(true);
  const { line, stops, index, lineOrder } = props;
  const lastStop = [...stops].pop();
  const firstStop = stops[0];
  const handleClick = () => setExpanded(!expanded);

  return (
    <Wrapper>
      <Clickable onClick={handleClick}>
        <Header as="h5">
          Travel on the {line} line from {firstStop} to {lastStop}
        </Header>
        <Expand>{expanded ? "Collapse" : "Expand"}</Expand>
      </Clickable>
      {expanded && <StationsForLine stops={stops} line={line} />}
      {index < lineOrder.length - 1 && (
        <div>
          <Icon name="arrow right" />
          <Icon name="train" />
          Change to {lineOrder[index + 1]} line at {lastStop}
        </div>
      )}
    </Wrapper>
  );
};

JourneyLeg.propTypes = {
  line: PropTypes.string.isRequired,
  stops: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  lineOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default JourneyLeg;
