import Styled from "styled-components";
import { IUser } from "../shared/user.model";
import UserRow from "./UserRow";

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
        <UserRow user={user} key={i} />
      ))}
    </Container>
  );
};

export default UserList;
