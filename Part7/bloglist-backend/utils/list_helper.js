const lodash = require("lodash");

const dummy = (_blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes), 0);
  return blogs.find((blog) => blog.likes === mostLikes);
};

const mostBlogs = (blogs) => {
  const groupedAuthors = lodash.groupBy(blogs, (blog) => blog.author);
  const authorBlogs = lodash.map(groupedAuthors, (blogs, author) => ({
    author: author,
    blogs: blogs.length,
  }));
  return lodash.maxBy(authorBlogs, (authorBlog) => authorBlog.blogs);
};

const mostLikes = (blogs) => {
  const groupedAuthors = lodash.groupBy(blogs, (blog) => blog.author);
  const authorBlogs = lodash.map(groupedAuthors, (blogs, author) => ({
    author: author,
    likes: totalLikes(blogs),
  }));
  return lodash.maxBy(authorBlogs, (authorBlog) => authorBlog.likes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
