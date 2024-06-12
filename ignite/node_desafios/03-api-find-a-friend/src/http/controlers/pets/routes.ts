import { FastifyInstance } from "fastify";
import { register } from "./register";
import { verifyJWT } from "@/http/middlewares/virify-jwt";
import { getPetDetails } from "./get-pet-details";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pets/register", { onRequest: [verifyJWT] }, register);
  app.get("/pets", getPetDetails);
}
