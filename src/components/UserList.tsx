import Styled from "styled-components";
import { IUser } from "../shared/user.model";

const Container = Styled.div`
  background: red;
  width: 100%;
`;

interface Props {
  users: IUser[];
}

const UserList = ({ users }: Props) => {
  return (
    <Container>
      {users.map((user, i) => (
        <div key={user.id}>{`${i + 1}. ${user.name} @${user.username}`}</div>
      ))}
    </Container>
  );
};

export default UserList;
