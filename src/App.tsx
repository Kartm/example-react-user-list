import Styled from "styled-components";
import UserListView from "./views/UserListView";

const Container = Styled.div`
  width: 100%;
`;

const UserListContainer = Styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 500px;
`;

const App = () => {
  return (
    <Container>
      <UserListContainer>
        <UserListView />
      </UserListContainer>
    </Container>
  );
};

export default App;
