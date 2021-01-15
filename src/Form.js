import { Dropdown } from "semantic-ui-react";
import PropTypes from "prop-types";

const Form = (props) => {
  const { stations, setOrigin, setDestination, origin, destination } = props;
  const options = Object.keys(stations).map((key) => ({
    key,
    text: key,
    value: key,
  }));

  const handleChange = (setValue) => (e, { value }) => {
    setValue(value);
  };

  return (
    <>
      <Dropdown
        fluid
        value={origin}
        onChange={handleChange(setOrigin)}
        clearable
        search
        placeholder="Origin"
        options={options}
        selection
      />
      <Dropdown
        fluid
        value={destination}
        onChange={handleChange(setDestination)}
        clearable
        search
        placeholder="Destination"
        options={options}
        selection
      />
    </>
  );
};

Form.propTypes = {
  stations: PropTypes.object,
  setOrigin: PropTypes.func.isRequired,
  setDestination: PropTypes.func.isRequired,
  origin: PropTypes.string,
  destination: PropTypes.string,
};

Form.defaultProps = {
  stations: {},
  origin: undefined,
  destination: undefined,
};

export default Form;
