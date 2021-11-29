import Styled from "styled-components";
import UserListView from "./views/UserListView";

const Container = Styled.div`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const UserListContainer = Styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
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
