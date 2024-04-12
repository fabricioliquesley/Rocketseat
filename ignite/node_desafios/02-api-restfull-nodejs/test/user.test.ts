import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app";
import request from "supertest";
import { execSync } from "child_process";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

beforeEach(() => {
  execSync("npm run knex migrate:rollback --all");
  execSync("npm run knex migrate:latest");
});

describe("User routes", () => {
  it("should be able to create a new user", async () => {
    const response = await request(app.server).post("/users").send({
      name: "New user",
      email: "user@example.com",
      password: "secretPassword"
    })

    expect(response.status).toEqual(201);
  });
});
