import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import { initializeBlogs } from "./reducers/blogReducer";
import { refreshUsers } from "./reducers/usersReducer";
import { checkUser } from "./reducers/userReducer";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import LoginForm from "./components/LoginForm";
import CreateForm from "./components/CreateForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Menu from "./components/Menu";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const blogFormRef = useRef();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const userMatch = useMatch("users/:id");
  const viewedUser = userMatch
    ? users.find((us) => us.id === userMatch.params.id)
    : null;
  const blogMatch = useMatch("blogs/:id");
  const viewedBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(refreshUsers());
  }, []);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

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
        <Menu />
        <Notification />
        <h2>Blog App</h2>
        <Routes>
          <Route path="/users/:id" element={<User user={viewedUser} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<Blog blog={viewedBlog} />} />
          <Route
            path="/"
            element={
              <>
                <Togglable ref={blogFormRef} buttonLabel="create blog">
                  <CreateForm blogFormRef={blogFormRef} />
                </Togglable>
                <Blogs />
              </>
            }
          />
        </Routes>
      </div>
    );
  }
};

export default App;
