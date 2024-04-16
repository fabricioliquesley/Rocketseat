import { execSync } from "child_process";
import request from "supertest";
import { it, describe, beforeEach, beforeAll, afterAll, expect } from "vitest";
import { app } from "../src/app";

type mealSchema = {
  name: string;
  description: string;
  diet_compliant: string;
};

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

beforeEach(() => {
  execSync("npm run knex -- migrate:rollback --all");
  execSync("npm run knex -- migrate:latest");
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

  it("should be able to list all meals", async () => {
    await request(app.server).post("/users").send({
      name: "New user",
      email: "user@example.com",
      password: "secretPassword",
    });

    const createSessionResponse = await request(app.server)
      .post("/users/session")
      .send({
        email: "user@example.com",
        password: "secretPassword",
      });

    const cookie = createSessionResponse.get("Set-Cookie");

    await request(app.server).post("/meals").send({
      name: "Frango grelhado",
      description: "Fatias de peito de frango grelhada, com batata doce!",
      diet_compliant: "yes",
    });

    const mealsList = await request(app.server)
      .get("/meals")
      .set("Cookie", String(cookie));

    expect(mealsList.body).toHaveProperty("meals");
    expect(Array.isArray(mealsList.body.meals)).toBe(true);
    mealsList.body.meals.forEach((meal: mealSchema) => {
      expect(meal).toEqual(
        expect.objectContaining({
          name: "Frango grelhado",
          description: "Fatias de peito de frango grelhada, com batata doce!",
          diet_compliant: "yes",
        })
      );
    });
  });

  it("should be able to get a specific meal", async () => {
    await request(app.server).post("/users").send({
      name: "New user",
      email: "user@example.com",
      password: "secretPassword",
    });

    const createSessionResponse = await request(app.server)
      .post("/users/session")
      .send({
        email: "user@example.com",
        password: "secretPassword",
      });

    const cookie = createSessionResponse.get("Set-Cookie");

    const mealIdResponse = await request(app.server).post("/meals").send({
      name: "Frango grelhado",
      description: "Fatias de peito de frango grelhada, com batata doce!",
      diet_compliant: "yes",
    });

    const mealId = mealIdResponse.body.mealId;

    const meal = await request(app.server)
      .get(`/meals/${mealId}`)
      .set("Cookie", String(cookie));

    expect(meal.body.meal.id).toEqual(mealId);
  });
});
