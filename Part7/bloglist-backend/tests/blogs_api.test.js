const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

describe("blogs api with initial blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("identifier property is named id", async () => {
    const response = await api.get("/api/blogs");

    assert(response.body[0].id);
    assert.strictEqual(response.body[0]._id, undefined);
  });

  test("maformatted id causes error message", async () => {
    const randomMalId = "5a422random7a2";
    const blogUser = helper.usersList[0];

    const res = await api
      .delete(`/api/blogs/${randomMalId}`)
      .set({ Authorization: blogUser.token })
      .expect(400);

    // Check error message
    assert.strictEqual(res.body.error, "malformatted id");
  });

  describe("adding blogs", () => {
    test("a valid blog can be added", async () => {
      const blogUser = helper.usersList[0];
      const newBlog = {
        title: "Spy techniques: new and old",
        author: "James Bond",
        url: "www.some/inexistent/url",
        likes: 2026,
      };

      await api
        .post("/api/blogs")
        .set({ Authorization: blogUser.token })
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
      // Check number of blogs increased by one
      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      const addedBlog = blogsAtEnd.find((blog) => blog.title === newBlog.title);

      // Check new blog exists in test DB
      const contents = blogsAtEnd.map((blog) => blog.title);
      assert(contents.includes("Spy techniques: new and old"));

      // Check blog has been added to user
      const userAfter = (await helper.usersInDb()).find(
        (user) => user.id === blogUser._id,
      );
      const afterBlogs = userAfter.blogs.map((blogId) => blogId.toString());
      assert(afterBlogs.includes(addedBlog.id));
    });

    test("default likes for added blog", async () => {
      const blogUser = helper.usersList[0];
      const newBlog = {
        title: "Spy techniques: new and slightly old",
        url: "www.some/inexistent2/url",
      };

      await api
        .post("/api/blogs")
        .set({ Authorization: blogUser.token })
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      // Check number of blogs increased by one
      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

      // Check that likes default to 0
      const addedBlog = blogsAtEnd.find(
        (blog) => blog.title === "Spy techniques: new and slightly old",
      );
      assert.strictEqual(addedBlog.likes, 0);
    });

    test("blog without title is not added", async () => {
      const blogUser = helper.usersList[0];
      const newBlog = {
        author: "Some Guy",
        url: "www.some/inexistent3/url",
        likes: 4,
      };

      await api
        .post("/api/blogs")
        .set({ Authorization: blogUser.token })
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("blog without url is not added", async () => {
      const blogUser = helper.usersList[0];
      const newBlog = {
        title: "Awesome paper without sources",
        author: "Some Guy",
        likes: 2,
      };

      await api
        .post("/api/blogs")
        .set({ Authorization: blogUser.token })
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test("a blog cannot be added without a token", async () => {
      const newBlog = {
        title: "Spy techniques: new and old",
        author: "James Bond",
        url: "www.some/inexistent/url",
        likes: 2026,
      };

      await api.post("/api/blogs").send(newBlog).expect(401);
    });
  });

  describe("deleting blogs", () => {
    test("a blog can be deleted", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];
      const blogUser = helper.usersList.find(
        (user) => user._id === blogToDelete.user.toString(),
      );

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: blogUser.token })
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      // Check blog with that id is not in the DB
      const ids = blogsAtEnd.map((n) => n.id);
      assert(!ids.includes(blogToDelete.id));

      // Check DB blog length is one less
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

      // Check blog has been deleted from the user
      const userAfter = (await helper.usersInDb()).find(
        (user) => user.id === blogUser._id,
      );
      const afterBlogs = userAfter.blogs.map((blogId) => blogId.toString());
      assert(!afterBlogs.includes(blogToDelete.id));
    });

    test("deleting a blog with an inexistent id does not modify the database", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const randomId = "5a422aa71b54a676234d17a2";
      const blogUser = helper.usersList[0];

      await api
        .delete(`/api/blogs/${randomId}`)
        .set({ Authorization: blogUser.token })
        .expect(204);

      // Check DB blog length is not changed
      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
    });
  });

  describe("updating blogs", () => {
    test("a blogs likes can be updated", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const blogUser = helper.usersList.find(
        (user) => user._id === blogToUpdate.user.toString(),
      );

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set({ Authorization: blogUser.token })
        .send({ likes: 29 })
        .expect(200);

      // Check likes have been updated
      const blogsAtEnd = await helper.blogsInDb();
      const updatedBlog = blogsAtEnd.find(
        (blog) => blog.id === blogToUpdate.id,
      );
      assert.strictEqual(updatedBlog.likes, 29);
    });

    test("an inexistent blog cant be updated", async () => {
      const randomId = "5a422aa71b54a676234d17a2";
      const blogUser = helper.usersList[0];

      await api
        .put(`/api/blogs/${randomId}`)
        .set({ Authorization: blogUser.token })
        .send({ likes: 210 })
        .expect(404);

      // Check that the random id still isn't in the DB
      const blogsAtEnd = await helper.blogsInDb();
      const ids = blogsAtEnd.map((blog) => blog.id);
      assert(!ids.includes(randomId));
    });

    test("blog without likes is not updated", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const blogUser = helper.usersList[0];

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set({ Authorization: blogUser.token })
        .send({})
        .expect(400);

      // Check that the likes have not been updated
      const blogsAtEnd = await helper.blogsInDb();
      const updatedBlog = blogsAtEnd.find(
        (blog) => blog.id === blogToUpdate.id,
      );
      assert.strictEqual(updatedBlog.likes, blogToUpdate.likes);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
