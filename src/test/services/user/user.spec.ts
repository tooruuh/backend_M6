import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors/appError";

import request from "supertest";
import app from "../../../app";

describe("Create an user", () => {
  let connection: DataSource;

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

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during DataSource initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should insert the information of new user in the database", async () => {
    const response = await request(app).post("/users").send(userTest1);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).not.toHaveProperty("password");
  });

  it("Testing user creation with already used email", async () => {
    try {
      const response = await request(app).post("/users").send(userTest1);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("Email already exists");
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe("Wrong email/password");
        expect(error.statusCode).toBe(401);
      }
    }
  });

  it("Testing valid login", async () => {
    const response = await request(app).post("/users/login").send(test1Login);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });

  it("Testing invalid login", async () => {
    const response = await request(app).post("/users/login").send(ErroLogin);

    expect(response.statusCode).toBe(401);
  });
});
