import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

import app from "../../../app";
import request from "supertest";

describe("Teste para metodo PATCH em /users/me/:id", () => {
  let connection: DataSource;

  interface User {
    name: string;
    email: string;
    password?: string;
    phone: string;
  }

  let testUser1: User = {
    name: "Teste Kenzie",
    email: "teste@kenzie.com",
    password: "123456Ab!",
    phone: "teste@kenzie.com",
  };

  let testUser2: User = {
    name: "Teste2 Kenzie",
    email: "teste2@kenzie.com",
    password: "123456Ab!",
    phone: "teste2@kenzie.com",
  };

  let response1: any;
  let validEmail: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    response1 = await request(app).post("/users").send(testUser1);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to update an user", async () => {
    const userLogin = {
      email: testUser1.email,
      password: testUser1.password,
    };

    const login = await request(app).post("/users/login").send(userLogin);
    const { token } = login.body;

    const responsePatch = await request(app)
      .patch(`/users/me/${response1.body.id}`)
      .send(testUser2)
      .set("Authorization", `Bearer ${token}`);

    const responseGet = await request(app)
      .patch(`/users/me/${response1.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(responsePatch.status).toEqual(201);
    expect(responseGet.statusCode).toBe(201);
  });

  test("Trying to update a user that doesn't exist", async () => {
    const response = await request(app).get(`/users/me/1`);

    expect(response.status).toEqual(404);
  });
});
