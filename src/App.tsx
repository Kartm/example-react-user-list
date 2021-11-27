import React, { useCallback, useEffect, useState } from "react";
import Styled from "styled-components";
import debounce from "lodash/debounce";
import { IUser } from "./user.model";
import { getUsers } from "./user.api";

const Container = Styled.div`
  background: red;
  width: 100%;
`;
const Label = Styled.div`
  color: white;
  padding: 20px;
`;
const SearchField = Styled.input`
  padding: 20px;
`;

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const test = async () => {
      const usersResponse = await getUsers();

      if (usersResponse.error) {
        setErrorMessage(usersResponse.error);
        return;
      }

      setUsers(usersResponse.users);
    };

    test();
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
        filteredUsers.map((user, i) => (
          <div key={user.id}>{`${i + 1}. ${user.name} @${user.username}`}</div>
        ))
      )}
    </Container>
  );
};

export default App;
