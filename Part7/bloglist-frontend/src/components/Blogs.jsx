import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 6,
  };
  return (
    <>
      {blogs
        .toSorted((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
    </>
  );
};

export default Blogs;
