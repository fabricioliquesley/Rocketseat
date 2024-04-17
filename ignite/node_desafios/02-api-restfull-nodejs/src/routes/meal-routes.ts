import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { throwParametersError } from "../utils/throwParametersError";
import { MealRepository } from "../repositories/mealRepository";
import { MealServices } from "../services/mealServices";

const mealRepository = new MealRepository();
const mealServices = new MealServices(mealRepository);

interface Params {
  mealId: string;
}

export async function mealRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      diet_compliant: z.enum(["yes", "no"]),
    });

    const result = bodySchema.safeParse(request.body);

    if (!result.success) {
      return throwParametersError(result.error.issues, reply);
    }

    const { name, description, diet_compliant } = result.data;

    const sessionId = request.cookies.sessionId;

    const meal_Id = await mealServices.createMeal({
      data: {
        name,
        description,
        user_id: String(sessionId),
        diet_compliant,
      },
    });

    return reply.status(201).send({ mealId: meal_Id });
  });

  app.put(
    "/edit/:mealId",
    async (request: FastifyRequest<{ Params: Params }>, reply) => {
      const bodySchema = z.object({
        name: z.string(),
        description: z.string(),
        diet_compliant: z.enum(["yes", "no"]),
      });

      const { mealId } = request.params;
      const { name, description, diet_compliant } = bodySchema.parse(
        request.body
      );

      const sessionId = request.cookies.sessionId;

      const editResponse = await mealServices.editMeal({
        data: { name, description, diet_compliant, user_id: sessionId },
        mealId,
      });

      if (editResponse == 2) {
        return reply
          .status(400)
          .send({ message: "ERROR: this user cannot update the meal!" });
      }

      return reply.status(200).send({ meal: editResponse });
    }
  );

  app.delete(
    "/:mealId",
    async (request: FastifyRequest<{ Params: Params }>, reply) => {
      const mealId = request.params.mealId;

      const sessionId = request.cookies.sessionId;

      const deleteResponse = await mealServices.deleteMeal({
        mealId: mealId,
        sessionId: sessionId,
      });

      if (deleteResponse == 2) {
        return reply
          .status(400)
          .send({ message: "ERROR: this user cannot delete the meal!" });
      }

      if (deleteResponse == 0) {
        return reply
          .status(400)
          .send({ message: "ERROR: Meal could not be excluded!" });
      }

      return reply.status(200).send(deleteResponse);
    }
  );

  app.get("/", async (request, reply) => {
    const sessionId = request.cookies.sessionId;

    const meals = await mealServices.getAllMeals({
      sessionId: String(sessionId),
    });

    return reply.status(200).send({ meals });
  });

  app.get(
    "/:mealId",
    async (request: FastifyRequest<{ Params: Params }>, reply) => {
      const mealId = request.params.mealId;

      const meal = await mealServices.getMeal({
        mealId,
      });

      return reply.status(200).send({ meal });
    }
  );

  app.get("/metrics", async (request, reply) => {
    const sessionId = request.cookies.sessionId;

    const metrics = await mealServices.getMetrics({ sessionId });

    return reply.status(200).send({ metrics });
  });
}
