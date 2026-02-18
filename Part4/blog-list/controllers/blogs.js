const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const likes = request.body.likes
  if (!likes) {
    response.status(400).end()
  }

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).end()
  }

  // Update blog likes
  blog.likes = likes
  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})


module.exports = blogsRouter