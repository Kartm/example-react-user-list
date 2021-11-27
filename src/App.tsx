import Styled from "styled-components";
import UserListView from "./views/UserListView";

const Container = Styled.div`
  background: red;
  width: 100%;
`;

const App = () => {
  return (
    <Container>
      <UserListView />
    </Container>
  );
};

export default App;
