const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { exampleBlogs, listWithOneBlog } = require('./example_blogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, equals the sum of all blog likes', () => {
    const result = listHelper.totalLikes(exampleBlogs)
    assert.strictEqual(result, 36)
  })

  test('when list is empty, equals zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog).title
    assert.strictEqual(result, 'Go To Statement Considered Harmful')
  })

  test('when list has multiple blogs, return first blog with most likes', () => {
    const result = listHelper.favoriteBlog(exampleBlogs).title
    assert.strictEqual(result, 'Canonical string reduction')
  })

  test('when list is empty, return undefined', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), undefined)
  })
})

describe('most blogs', () => {
  test('when list has only one blog, return that author with 1 blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result,  { author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('when list has multiple blogs, return the author with most blogs', () => {
    const result = listHelper.mostBlogs(exampleBlogs)
    assert.deepStrictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  })

  test('when list is empty, return undefined', () => {
    assert.strictEqual(listHelper.mostBlogs([]), undefined)
  })
})


describe('most blogs', () => {
  test('when list has only one blog, return that author with the blogs likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result,  { author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('when list has multiple blogs, return the author with most total likes', () => {
    const result = listHelper.mostLikes(exampleBlogs)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 17 })
  })

  test('when list is empty, return undefined', () => {
    assert.strictEqual(listHelper.mostLikes([]), undefined)
  })
})