import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useMatch, useNavigate } from "react-router-dom";
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
import styled from "styled-components";

const Title = styled.h1`
  display: inline-block;
  background: linear-gradient(135deg, cornflowerblue, darkblue, cornflowerblue);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @keyframes shimmer {
    from {
      background-position: 0% center;
    }
    to {
      background-position: 200% center;
    }
  }

  animation: shimmer 3s linear infinite;
`;

const App = () => {
  const blogFormRef = useRef();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!user) navigate("/login");
    else navigate("/");
  }, [user]);

  return (
    <div>
      <Menu />
      <Notification />
      <Title>Blog List App</Title>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
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
};

export default App;
