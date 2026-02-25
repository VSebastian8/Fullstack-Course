const Blog = require('../models/blog')
const User = require('../models/user')

const usersList = [
  {
    _id: '699ec6fad81ee539baa1419f',
    username: 'dijstrack',
    name: 'Edsger W. Dijkstra',
    password: 'graphs',
    passwordHash: '$2b$10$.4tRwnhsn4K6FpuSgWeW/.bY5jckvY3QlL2OgCVRpBSN9CBLyj4Du',
    blogs: [
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9'
    ],
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpanN0cmFjayIsImlkIjoiNjk5ZWM2ZmFkODFlZTUzOWJhYTE0MTlmIiwiaWF0IjoxNzcyMDEzNDk3fQ.JwTh-sXCJfMlJ1FXb8a9zWazLr9EQGlMGBzf9Y20A_M',
    __v: 0
  },
  {
    _id: '699ec73ed81ee539baa141a1',
    username: 'mike',
    name: 'Michael Chan',
    password: 'reacting',
    passwordHash:
'$2b$10$GX6iu5NOMaa7pQcvHQoUsuBJGpXbslaMkQGGhsIiaYVMsOvPmBUcq',
    blogs: [ '5a422a851b54a676234d17f7' ],
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpZCI6IjY5OWVjNzNlZDgxZWU1MzliYWExNDFhMSIsImlhdCI6MTc3MjAxMzUyN30.LmoqTALVOBb88_5Y8Xw6qEUMkhcrpGVYScgP2_o-rWI',
    __v: 0

  },
  {
    _id: '699ec775d81ee539baa141a3',
    username: 'robby',
    name: 'Robert C. Martin',
    password: 'pass1234',
    passwordHash: '$2b$10$yOzdI9PBXJhh1GNcipflnOrUI0q8ik7hQHriaE4vHqw/xYxJZqFoG',
    blogs: [
      '5a422b891b54a676234d17fa',
      '5a422ba71b54a676234d17fb',
      '5a422bc61b54a676234d17fc'
    ],
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvYmJ5IiwiaWQiOiI2OTllYzc3NWQ4MWVlNTM5YmFhMTQxYTMiLCJpYXQiOjE3NzIwMTM1NTN9.ntry3p3bhMs6qCfqhtvath29j8sZY_YpLAjIimrWycg',
    __v: 0

  }
]

const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '699ec73ed81ee539baa141a1',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '699ec6fad81ee539baa1419f',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '699ec6fad81ee539baa1419f',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '699ec775d81ee539baa141a3',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '699ec775d81ee539baa141a3',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '699ec775d81ee539baa141a3',
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    user: '699ec6fad81ee539baa1419f',
    __v: 0
  }
]

const initialBlogs = listWithManyBlogs.map(blog => new Blog(blog))
const initialUsers = usersList.map(user => new User(user))

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'nooneatall' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { initialBlogs, nonExistingId,  blogsInDb, listWithManyBlogs, listWithOneBlog, usersInDb, usersList, initialUsers }