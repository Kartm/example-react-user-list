import React, { useCallback, useEffect, useState } from "react";
import Styled from "styled-components";
import CircularSpinner from "../components/CircularSpinner";
import UserList from "../components/UserList";
import { getUsers } from "../shared/user.api";
import { IUser } from "../shared/user.model";

const Header = Styled.h1`
`;

const Container = Styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchField = Styled.input`
  padding: 20px;
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
    };

    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
    setIsLoading(false);
  }, [searchValue, users]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setSearchValue(value);
    },
    []
  );

  return (
    <Container>
      <Header>{"Users list"}</Header>
      <SearchField
        placeholder="Search by username..."
        defaultValue={searchValue}
        onChange={handleInputChange}
        aria-label="search-input"
      />
      {isLoading ? (
        <CircularSpinner />
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : filteredUsers.length === 0 ? (
        <div>brak wyników</div>
      ) : (
        <UserList users={filteredUsers} />
      )}
    </Container>
  );
};

export default UserListView;
