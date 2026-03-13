import { setNotification } from "../reducers/notificationReducer";
import { logoutUser } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setNotification("logged out successfully", false));
  };

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <div style={{ display: "inline-block" }}>{user.name} logged in</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Menu;
