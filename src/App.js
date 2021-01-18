import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Message,
  Radio,
} from "semantic-ui-react";
import styled from "styled-components";
import "./App.css";
import Form from "./components/Form";
import STATIONS from "./stations";
import Path from "./components/Path";
import {
  createGraph,
  getShortestPath,
  setLineChangeWeight,
} from "./path/stationBfs";

const AppWrapper = styled(Container)`
  padding-top: 20px;
`;

const CustomRadio = styled(Radio)`
  margin-bottom: 15px;
`;
const FormWrapper = styled(Grid.Column)`
  background: #dfdfdf;
  border-radius: 3px;
`;

function App() {
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [path, setPath] = useState({});
  const [lineChangeWeight, setWeight] = useState(1);
  const [graph, setGraph] = useState(createGraph(STATIONS, lineChangeWeight));

  useEffect(() => {
    setLineChangeWeight(graph, STATIONS, lineChangeWeight);
    setGraph(graph);
    if (origin && destination) {
      setPath(
        getShortestPath(origin, destination, STATIONS, lineChangeWeight, graph)
      );
    }
  }, [lineChangeWeight]);

  useEffect(() => {
    setPath({});
  }, [origin, destination]);

  const handleClick = () => {
    const calculated = getShortestPath(origin, destination, STATIONS, 1, graph);
    setPath(calculated);
  };
  const handleChange = (_, { value }) => setWeight(value);

  return (
    <AppWrapper>
      <Header as="h2">MRT Path Finder</Header>
      <Divider />
      <Grid columns={2}>
        <FormWrapper width={5}>
          <Grid.Row>
            <Header as="h5">Find a path with - </Header>
            <CustomRadio
              label="least stations"
              name="lineWeightGroup"
              value={1}
              checked={lineChangeWeight === 1}
              onChange={handleChange}
            />
            <br />
            <CustomRadio
              label="least changes in MRT line"
              name="lineWeightGroup"
              value={15}
              checked={lineChangeWeight === 15}
              onChange={handleChange}
            />
          </Grid.Row>
          <Grid.Row>
            <Form
              origin={origin}
              destination={destination}
              setOrigin={setOrigin}
              setDestination={setDestination}
              stations={STATIONS}
            />
          </Grid.Row>
          <Grid.Row>
            <Button
              content="Find me a path!"
              fluid
              disabled={!origin || !destination}
              primary
              onClick={handleClick}
            />
          </Grid.Row>
        </FormWrapper>
        <Grid.Column width={11}>
          {origin && destination && origin === destination ? (
            <Message> You are already where you want to be</Message>
          ) : (
            <Path path={path} />
          )}
        </Grid.Column>
      </Grid>
    </AppWrapper>
  );
}

export default App;
