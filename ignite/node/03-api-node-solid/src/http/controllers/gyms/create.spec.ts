import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create Gym", async () => {
    const { token } = await createAndAuthenticateUser({ app, isAdmin: true });

    const response = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "Node é incrível",
        phone: "4002-8922",
        latitude: -20.3833472,
        longitude: -43.4163019,
      });

    expect(response.statusCode).toEqual(201);
  });
});
