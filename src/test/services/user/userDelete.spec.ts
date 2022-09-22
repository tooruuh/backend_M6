import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

import app from "../../../app";
import request from "supertest";

const userTest1 = {
  name: "test",
  email: "test@email.com",
  password: "12345",
  phone: "9999-9999",
};

const userTest2 = {
  name: "test 2",
  email: "test2@email.com",
  password: "12345",
  phone: "9999-9999",
};

const test1Login = {
  email: "test@email.com",
  password: "12345",
};

const test2Login = {
  email: "test2@email.com",
  password: "12345",
};

const ErroLogin = {
  email: "test@email.com",
  password: "123456",
};

describe("Testing route DELETE /users/me/:id", () => {
  let connection: DataSource;

  let create1: any;
  let create2: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    create1 = await request(app).post("/users").send(userTest1);
    create2 = await request(app).post("/users").send(userTest2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Testing tokenless deletion", async () => {
    const login = await request(app).post("/users/login").send(test1Login);
    const { token } = login.body;

    const user = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app).delete(`/users/me/${user.body.uuid}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token!");
  });

  it("Testing Deleting Another User", async () => {
    const signinUser1 = await request(app)
      .post("/users/login")
      .send(test1Login);
    const signinUser2 = await request(app)
      .post("/users/login")
      .send(test2Login);

    const token1 = signinUser1.body.token;
    const token2 = signinUser2.body.token;

    const response = await request(app)
      .delete(`/users/me/${create1.body.id}`)
      .set("Authorization", `Bearer ${token2}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "you cannot update/delete a user other than you"
    );
  });

  it("Testing Deleting Owner User", async () => {
    const signin = await request(app).post("/users/login").send(test1Login);
    const token = signin.body.token;

    const user = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .delete(`/users/me/${user.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveProperty(
      "message",
      "User deleted with sucess!"
    );
  });
});
