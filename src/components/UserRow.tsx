import Styled from "styled-components";
import { IUser } from "../shared/user.model";

const Container = Styled.div`
  background: red;
  width: 100%;
`;

interface Props {
  user: IUser;
}

const UserList = ({ user }: Props) => {
  return <Container>{`${user.name} @${user.username}`}</Container>;
};

export default UserList;
