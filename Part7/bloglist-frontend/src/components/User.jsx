import { Link } from "react-router-dom";
import styled from "styled-components";

const UserName = styled.h2`
  background-color: cornflowerblue;
  color: white;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border: 2px solid cornflowerblue;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid lightblue;
  color: darkblue;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f0f5ff;
  }
`;

const User = ({ user }) => {
  if (!user) return <p>loading user...</p>;
  return (
    <>
      <UserName>{user.name}</UserName>
      <h3>added blogs</h3>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <Link to={`../blogs/${blog.id}`}>{blog.title}</Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default User;
