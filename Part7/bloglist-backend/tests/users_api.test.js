const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const api = supertest(app);

describe("users api with initial user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("hard2crack", 10);
    const user = new User({
      username: "root",
      name: "Admin Jones",
      passwordHash,
    });

    await user.save();
  });

  describe.only("creating users", () => {
    test("creation succeeds with a fresh username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "jamesbond007",
        name: "James Bond",
        password: "bondjames007",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      assert(usernames.includes(newUser.username));
    });

    test("creation fails with a duplicate username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "something else",
        password: "ooopsnotunique",
      };

      const res = await api.post("/api/users").send(newUser).expect(400);
      assert.strictEqual(res.body.error, "expected `username` to be unique");

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test("creation fails with a missing username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        name: "something else",
        password: "ooopsmissing user",
      };

      const res = await api.post("/api/users").send(newUser).expect(400);
      assert.strictEqual(
        res.body.error,
        "User validation failed: username: Path `username` is required.",
      );

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test("creation fails with a too short username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "hi",
        name: "else something",
        password: "ooopsshort user",
      };

      const res = await api.post("/api/users").send(newUser).expect(400);
      assert.strictEqual(
        res.body.error,
        "User validation failed: username: Path `username` (`hi`, length 2) is shorter than the minimum allowed length (3).",
      );

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test("creation fails with a missing password", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "James James",
        name: "something else else",
      };

      const res = await api.post("/api/users").send(newUser).expect(400);
      assert.strictEqual(res.body.error, "missing password");

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test("creation fails with a too short password", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "hi there",
        name: "something something",
        password: "12",
      };

      const res = await api.post("/api/users").send(newUser).expect(400);
      assert.strictEqual(res.body.error, "password too short");

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
