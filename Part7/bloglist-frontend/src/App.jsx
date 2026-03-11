import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { checkUser, logoutUser } from "./reducers/userReducer";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setNotification("logged out successfully", false));
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    );
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <Togglable ref={blogFormRef} buttonLabel="create blog">
          <CreateForm blogFormRef={blogFormRef} />
        </Togglable>
        <p />
        <Blogs user={user} />
      </div>
    );
  }
};

export default App;
