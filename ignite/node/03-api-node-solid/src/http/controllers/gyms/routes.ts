import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";

import { create } from "./create";
import { searchGyms } from "./search";
import { fetchNearbyGyms } from "./nearby";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/gyms", create);
  app.get("/gyms/search", searchGyms);
  app.get("/gyms/nearby", fetchNearbyGyms);
}
