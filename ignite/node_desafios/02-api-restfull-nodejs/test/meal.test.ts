import { execSync } from "child_process";
import request from "supertest";
import { it, describe, beforeEach, beforeAll, afterAll, expect } from "vitest";
import { app } from "../src/app";

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

describe("Meal routes", () => {
  it("should be able to create a new meal", async () => {
    const response = await request(app.server).post("/meals").send({
      name: "Frango grelhado",
      description: "Fatias de peito de frango grelhada, com batata doce!",
      diet_compliant: "yes",
    });

    expect(response.body).toEqual(
      expect.objectContaining({
        mealId: expect.stringContaining("-"),
      })
    );
  });
});
