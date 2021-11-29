import Styled from "styled-components";
import { IUser } from "../shared/user.model";

const UserRowListItem = Styled.li`
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
  user: IUser;
}

const UserList = ({ user }: Props) => {
  return (
    <UserRowListItem>
      <span>{`${user.name}`}</span>
      <a href={user.website} target="_blank">{`@${user.username}`}</a>
    </UserRowListItem>
  );
};

export default UserList;
