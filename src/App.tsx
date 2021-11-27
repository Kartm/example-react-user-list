import React, { useCallback, useEffect, useState } from "react";
import Styled from "styled-components";
import debounce from "lodash/debounce";

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

//jsonplaceholder.typicode.com/users

interface IUser {
  id: number;
  name: string;
  username: string;
}

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setUsers(json);
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [searchValue]);

  const debounceHandler = useCallback(
    debounce((value) => {
      setSearchValue(value);
    }, 500),
    []
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      debounceHandler(value);
    },
    [debounceHandler]
  );

  return (
    <Container>
      <SearchField defaultValue={searchValue} onChange={handleInputChange} />
      {users.map((user, i) => (
        <div key={user.id}>{`${i + 1}. ${user.name} @${user.username}`}</div>
      ))}
    </Container>
  );
};

export default App;
