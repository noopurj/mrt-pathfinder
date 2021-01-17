import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";
import STATIONS from "./stations";
import Path from "./Path";
import { Button, Container, Grid, Message, Radio } from "semantic-ui-react";
import styled from "styled-components";
import {
  createGraph,
  getShortestPath,
  setLineChangeWeight,
} from "./path/stationBfs";

const AppWrapper = styled(Container)`
  margin-top: 15px;
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
      <Grid columns={2}>
        <Grid.Column>
          <Grid.Row>
            <Radio
              label="Give me a path with least stations"
              name="lineWeightGroup"
              value={1}
              checked={lineChangeWeight === 1}
              onChange={handleChange}
            />
            <Radio
              label="Give me a path with least changes in lines"
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
        </Grid.Column>
        <Grid.Column>
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
