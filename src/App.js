import { useState } from "react";
import "./App.css";
import Form from "./Form";
import STATIONS from "./stations";
import Path from "./Path";
import { Button, Container, Grid } from "semantic-ui-react";
import { getPath } from "./path/getPath";
import styled from "styled-components";

const AppWrapper = styled(Container)`
  margin-top: 15px;
`;

function App() {
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [paths, setPaths] = useState([]);

  const handleClick = () => {
    const calculated = getPath(origin, destination, STATIONS);
    setPaths(calculated);
  };

  return (
    <AppWrapper>
      <Grid columns={2}>
        <Grid.Column>
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
          <Path paths={paths} />
        </Grid.Column>
      </Grid>
    </AppWrapper>
  );
}

export default App;
