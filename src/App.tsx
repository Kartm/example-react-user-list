import React from "react";
import Styled from "styled-components";

const Container = Styled.div`
  background: red;
  width: 100%;
`;
const Label = Styled.div`
  color: white;
  padding: 20px;
`;

const App = () => {
  return (
    <Container>
      <Label>Hello World</Label>
    </Container>
  );
};

export default App;
