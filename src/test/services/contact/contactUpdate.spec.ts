import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

import app from "../../../app";
import request from "supertest";

describe("Teste para metodo PATCH em /users/me/:id", () => {
  let connection: DataSource;

  const contact1 = {
    name: "Test",
    email: "victor2@kenzie.com.br",
    contact: "0000-0000",
  };

  const contactUpdate = {
    name: "Test 2",
    email: "victor2@kenzie.com.br",
    contact: "999-999",
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
  let createContact1: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during DataSource initialization", err);
      });

    createUser = await request(app).post("/users").send(user);
    loginUser = await request(app).post("/users/login").send(userLogin);

    createContact1 = await request(app)
      .post(`/users/contacts/${createUser.body.id}`)
      .send(contact1)
      .set("Authorization", `Bearer ${loginUser.body.token}`);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to update a contact", async () => {
    const response = await request(app)
      .patch(
        `/users/contacts/${createContact1.body.user}/${createContact1.body.id}`
      )
      .send(contactUpdate)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    expect(response.status).toEqual(201);
  });

  test("Trying to update a contact you don't own", async () => {
    const response = await request(app)
      .patch(
        `/users/contacts/${createContact1.body.user}/21`
      )
      .send(contactUpdate)
      .set("Authorization", `Bearer ${loginUser.body.token}`);

    expect(response.status).toEqual(401);
  });
});
