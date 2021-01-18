import { Dropdown, Header } from "semantic-ui-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useMemo } from "react";

const CustomDropDown = styled(Dropdown)`
  margin-bottom: 25px;
`;

const Form = (props) => {
  const { stations, setOrigin, setDestination, origin, destination } = props;
  const options = useMemo(
    () =>
      Object.keys(stations).map((key) => ({
        key,
        text: key,
        value: key,
      })),
    []
  );

  const handleChange = (setValue) => (e, { value }) => {
    setValue(value);
  };

  return (
    <>
      <Header as="h5">From</Header>
      <CustomDropDown
        fluid
        value={origin}
        onChange={handleChange(setOrigin)}
        clearable
        search
        placeholder="Origin"
        options={options}
        selection
      />
      <Header as="h5">To</Header>
      <CustomDropDown
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
