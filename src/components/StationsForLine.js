import PropTypes from "prop-types";
import styled from "styled-components";
import { LINE_COLOR_MAP } from "../Constants";

const StationWrapper = styled.ul`
  border-left: 5px solid ${({ color }) => `${color || "white"}`};
  padding: 0 12px;
  margin: 0 10px;
`;

const StationsForLine = (props) => {
  const { stops, line } = props;
  const color = LINE_COLOR_MAP[line];
  return (
    <StationWrapper color={color}>
      {stops.map((station) => (
        <li key={station}>{station}</li>
      ))}
    </StationWrapper>
  );
};

StationsForLine.propTypes = {
  stops: PropTypes.arrayOf(PropTypes.string),
  line: PropTypes.string,
};

StationsForLine.defaultProps = {
  stops: [],
  line: "",
};

export default StationsForLine;
