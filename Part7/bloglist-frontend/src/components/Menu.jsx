import styled from "styled-components";
import { setNotification } from "../reducers/notificationReducer";
import { logoutUser } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MenuDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  outline: 5px solid cornflowerblue;
  overflow: hidden;
  padding: 0;
`;

const MenuItem = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  cursor: pointer;
  color: darkblue;
  justify-content: center;
  &:hover {
    background-color: lightblue;
  }
`;

const LogoutButton = styled.button`
  cursor: pointer;
  color: white;
  background: cornflowerblue;
  border-radius: 3px;
  border: 2px solid cornflowerblue;
  padding: 0.25em 1em;
  &:hover {
    filter: brightness(0.85);
  }
`;

const Menu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setNotification("logged out successfully", false));
  };

  return (
    <MenuDiv>
      <MenuItem>
        <Link to="/">blogs</Link>
      </MenuItem>
      <MenuItem>
        <Link to="/users" discover="none">
          users
        </Link>
      </MenuItem>
      <MenuItem>{user.name}</MenuItem>
      <MenuItem>
        <LogoutButton onClick={handleLogout}>logout</LogoutButton>
      </MenuItem>
    </MenuDiv>
  );
};

export default Menu;
