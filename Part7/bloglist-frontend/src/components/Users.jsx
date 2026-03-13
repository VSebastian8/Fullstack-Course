import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { refreshUsers } from "../reducers/usersReducer";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px;
  background-color: cornflowerblue;
  color: white;
  text-align: ${(props) => (props.$center ? "center" : "left")};
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid lightblue;
  text-align: ${(props) => (props.$center ? "center" : "left")};
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f0f5ff;
  }
`;

const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUsers());
  }, []);

  if (!users) return <p>loading users...</p>;
  return (
    <Table>
      <thead>
        <Tr>
          <Th></Th>
          <Th $center>blogs created</Th>
        </Tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td>
              <Link to={`${user.id}`}>{user.name}</Link>
            </Td>
            <Td $center>{user.blogs.length}</Td>
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Users;
