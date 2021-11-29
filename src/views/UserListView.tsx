import { useCallback, useEffect, useState } from "react";
import Styled from "styled-components";
import CircularSpinner from "../components/CircularSpinner";
import EmptyState from "../components/EmptyState";
import UserList from "../components/UserList";
import { getUsers } from "../shared/user.api";
import { IUser } from "../shared/user.model";

const Header = Styled.h1`
  text-align: center;
`;

const Container = Styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchField = Styled.input`
  padding: 8px;
  max-width: 250px;
  border: 0.5px solid black;
  border-radius: 2px;
`;

const UserListView = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await getUsers();

      if (usersResponse.error) {
        setErrorMessage(usersResponse.error);
        return;
      }

      setUsers(usersResponse.users);

      setIsLoading(false);
    };

    let mounted = true;

    if (mounted) {
      fetchData();
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, users]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setSearchValue(value);
    },
    []
  );

  function Content() {
    if (isLoading) {
      return <CircularSpinner />;
    }

    if (errorMessage) {
      return <div>{errorMessage}</div>;
    }

    if (filteredUsers.length === 0) {
      return <EmptyState />;
    }

    return <UserList users={filteredUsers} />;
  }

  return (
    <Container>
      <Header>{"Users list"}</Header>
      <SearchField
        placeholder="Search by username..."
        onChange={handleInputChange}
        aria-label="search-input"
      />

      <Content />
    </Container>
  );
};

export default UserListView;
