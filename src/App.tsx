import styled from "styled-components";

import { inspect } from "@xstate/inspect";

import Example1 from "models/Example1";

const App = () => {
  let NODE_ENV = import.meta.env.MODE;

  // uncomment below lines for xstate visualizations
  // add: `, {devTools: true}` to useMachine(..., here) to link the state to the visualizer
  if (NODE_ENV !== "production") {
    inspect({ iframe: false, url: "https://stately.ai/viz?inspect" });
  }

  return (
    <Scroller>
      <Container>
        <Example1 />
      </Container>
    </Scroller>
  );
};

const Container = styled.main`
  padding-top: 10%;
  padding-bottom: 10%;
  margin-right: 20%;
  margin-left: 20%;
  @media only screen and (max-width: 800px) {
    width: 100%;
    margin: 0;
  }
`;
const Scroller = styled.div`
  overflow-y: scroll;
  height: 100vh;
`;

export default App;
