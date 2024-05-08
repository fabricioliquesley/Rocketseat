import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to find nearby Gyms", async () => {
    const { token } = await createAndAuthenticateUser({app, isAdmin: true});

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Near Gym",
        description: "",
        phone: "3557-4000",
        latitude: -20.330418496217895,
        longitude: -43.451698625558215,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Far Gym",
        description: "",
        phone: "3557-4000",
        latitude: -19.91553294412631,
        longitude: -43.940822318057336,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -20.3833472,
        longitude: -43.4163019,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Near Gym",
      }),
    ]);
  });
});
