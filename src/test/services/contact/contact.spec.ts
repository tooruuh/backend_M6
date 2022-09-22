import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors/appError";

import request from "supertest";
import app from "../../../app";

describe("Create an user", () => {
  let connection: DataSource;

  const contact1 = {
    name: "Test",
    email: "victor2@kenzie.com.br",
    contact: "0000-0000",
  };

  const contact2 = {
    name: "Test 2",
    email: "victor2@kenzie.com.br",
  };

  const user = {
    name: "test",
    email: "test@email.com",
    password: "12345",
    phone: "9999-9999",
  };

  const userLogin = {
    email: "test@email.com",
    password: "12345",
  };

  let createUser: any;
  let loginUser: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during DataSource initialization", err);
      });

    createUser = await request(app).post("/users").send(user);
    loginUser = await request(app).post("/users/login").send(userLogin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should insert the information of new user in the database", async () => {
    const response = await request(app)
      .post(`/users/contacts/${createUser.body.id}`)
      .send(contact1)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("contact");
  });

  it("Testing create missing field ", async () => {
    const response = await request(app)
      .post(`/users/contacts/${createUser.body.id}`)
      .send(contact2)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "fill in all fields");
  });
});
