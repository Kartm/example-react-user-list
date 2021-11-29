import Styled from "styled-components";
import { IUser } from "../shared/user.model";

const Container = Styled.ol`
  padding-inline-start: 8px;
  overflow: auto;
`;

const UserRowListItem = Styled.li`
  list-style-position: inside;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;   

  ::marker {
    content: counter(list-item) ". ";
    color: grey;
  }

  a {
    margin-left: 8px;
    color: grey;
    text-decoration: none;
  }
`;

interface Props {
  users: IUser[];
}

const UserList = ({ users }: Props) => {
  return (
    <Container>
      {users.map((user, i) => (
        <UserRowListItem key={i}>
          <span>{`${user.name}`}</span>
          <a href={user.website} target="_blank">{`@${user.username}`}</a>
        </UserRowListItem>
      ))}
    </Container>
  );
};

export default UserList;
