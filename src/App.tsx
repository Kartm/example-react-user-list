import React, { useCallback, useEffect, useState } from "react";
import Styled from "styled-components";
import debounce from "lodash/debounce";
import { userInfo } from "os";

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
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setLoading(false);
          // const url = `https://jsonplaceholder.typicode.com/users/_search?username=${searchValue}`;
          // todo handle error
          console.error("something went wrong");
          return;
        }
        const json = await response.json();
        setUsers(json);
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    setLoading(true);
    fetchData();
    setLoading(false);
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
      {loading ? (
        <div>loading</div>
      ) : (
        filteredUsers.map((user, i) => (
          <div key={user.id}>{`${i + 1}. ${user.name} @${user.username}`}</div>
        ))
      )}
    </Container>
  );
};

export default App;
