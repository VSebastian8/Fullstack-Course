const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  const returnedBlog = await savedBlog.populate("user", {
    username: 1,
    name: 1,
  });
  response.status(201).json(returnedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const user = request.user;

  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(204).end();
  }
  if (blog.user.toString() !== user._id.toString()) {
    return response
      .status(401)
      .json({ error: "user invalid, cannot delete the blogs of another user" });
  }

  await Blog.findByIdAndDelete(id);
  user.blogs = user.blogs.filter((userBlog) => userBlog.toString() !== id);
  await user.save();
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const likes = request.body.likes;
  if (!likes) {
    response.status(400).end();
  }

  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).end();
  }

  // Update blog likes
  blog.likes = likes;
  const updatedBlog = await blog.save();
  response.json(updatedBlog);
});

blogsRouter.put("/comment/:id", async (request, response) => {
  const id = request.params.id;
  const comment = request.body.comment;

  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).end();
  }

  blog.comments.push(comment);
  const updatedBlog = await blog.save();
  response.json(updatedBlog);
});

module.exports = blogsRouter;
