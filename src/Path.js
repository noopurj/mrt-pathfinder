import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

const Path = (props) => {
  return (
    <List divided>
      {props.paths.map((path) => (
        <List.Item key={path.join("-")}>{path.join(", ")}</List.Item>
      ))}
    </List>
  );
};

Path.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

Path.defaultProps = {
  paths: [],
};

export default Path;
