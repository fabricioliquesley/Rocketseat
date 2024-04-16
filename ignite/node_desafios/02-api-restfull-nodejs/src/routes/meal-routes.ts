import { FastifyInstance, FastifyRequest} from "fastify";
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

    const mealId = await mealServices.createMeal({
      data: {
        name,
        description,
        user_id: String(sessionId),
        diet_compliant,
      },
    });

    return reply.status(201).send({ mealId });
  });

  app.put("/edit/:id", async () => {});

  app.delete("/:id", async () => {});

  app.get("/", async (request, reply) => {
    const sessionId = request.cookies.sessionId;

    const meals = await mealServices.getAllMeals({
      sessionId: String(sessionId),
    });

    return reply.status(200).send({ meals });
  });

  app.get("/:mealId", async (request: FastifyRequest<{ Params: Params }>, reply) => {
    

    const mealId = request.params.mealId;

    const meal = await mealServices.getMeal({
      mealId,
    });

    return reply.status(200).send({ meal });
  });
}
