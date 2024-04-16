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

  it("should bee able to delete a meal", async () => {
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

    const mealIdResponse = await request(app.server)
      .post("/meals")
      .send({
        name: "Frango grelhado",
        description: "Fatias de peito de frango grelhada, com batata doce!",
        diet_compliant: "yes",
      })
      .set("cookie", String(cookie));

    const mealId = mealIdResponse.body.mealId;

    const deleteResponse = await request(app.server)
      .del(`/meals/${mealId}`)
      .set("Cookie", String(cookie));

    expect(deleteResponse.body).toEqual(1);
  });

  it("should bee able to edit a meal", async () => {
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

    const mealIdResponse = await request(app.server)
      .post("/meals")
      .send({
        name: "Frango grelhado",
        description: "Fatias de peito de frango grelhada, com batata doce!",
        diet_compliant: "yes",
      })
      .set("cookie", String(cookie));

    const mealId = mealIdResponse.body.mealId;

    const meal = await request(app.server)
      .get(`/meals/${mealId}`)
      .set("Cookie", String(cookie));

    const editMealResponse = await request(app.server)
      .put(`/meals/edit/${mealId}`)
      .send({
        name: "Pizza",
        description: "3 fatias de pizza",
        diet_compliant: "no",
      })
      .set("Cookie", String(cookie));

    const expectObject = {
      id: meal.body.meal.id,
      name: "Pizza",
      description: "3 fatias de pizza",
      diet_compliant: "no",
      created_at: meal.body.meal.created_at,
      user_id: meal.body.meal.user_id
    }

    expect(editMealResponse.body.meal).toEqual(expectObject);
  });
});
