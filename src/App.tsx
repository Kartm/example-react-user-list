import Styled from "styled-components";
import UserListView from "./views/UserListView";

const Container = Styled.div`
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
