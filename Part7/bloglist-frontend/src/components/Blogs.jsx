import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const BlogTitle = styled.div`
  padding-top: 10px;
  padding-left: 2px;
  padding-bottom: 5px;
  color: darkblue;
  border: 3px solid;
  margin-top: 10px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: lightblue;
  }
`;

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return (
    <>
      {blogs
        .toSorted((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <BlogTitle key={blog.id}>
            <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
          </BlogTitle>
        ))}
    </>
  );
};

export default Blogs;
