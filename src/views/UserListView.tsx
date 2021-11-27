import React, { useCallback, useEffect, useState } from "react";
import Styled from "styled-components";
import UserList from "../components/UserList";
import { getUsers } from "../shared/user.api";
import { IUser } from "../shared/user.model";

const Container = Styled.div`
  background: red;
  width: 100%;
`;

const SearchField = Styled.input`
  padding: 20px;
`;

const UserListView = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await getUsers();

      if (usersResponse.error) {
        setErrorMessage(usersResponse.error);
        return;
      }

      setUsers(usersResponse.users);
    };

    fetchData();
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

  return (
    <Container>
      <SearchField defaultValue={searchValue} onChange={handleInputChange} />
      {errorMessage ? (
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
