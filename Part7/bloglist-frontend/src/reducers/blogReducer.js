import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog,
      );
    },
    deleteBlog(state, action) {
      const deletedBlog = action.payload;
      return state.filter((blog) => blog.id !== deletedBlog.id);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

const { createBlog, setBlogs, updateBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const appendBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(createBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await blogService.update(updatedBlog.id, { likes: updatedBlog.likes });
    dispatch(updateBlog(updatedBlog));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id);
    dispatch(deleteBlog(blog));
  };
};

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(blog.id, comment);
    dispatch(updateBlog(updatedBlog));
  };
};

export default blogSlice.reducer;
