import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBloglistUser");
    dispatch(setNotification("logged out successfully", false));
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm setUser={setUser} />
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
