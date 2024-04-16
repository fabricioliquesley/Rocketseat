import { randomUUID } from "crypto";
import { RepositorySchema } from "../repositories/mealRepository";

interface Meal {
  createMeal({}: parametersSchema): Promise<string>;
  getAllMeals({}: parametersSchemaNoData): Promise<object>;
  getMeal({}: parametersSchemaNoData): Promise<object>;
}

type parametersSchema = {
  table?: string;
  data: {
    name: string;
    description: string;
    user_id: string;
    diet_compliant: string;
  };
};

type parametersSchemaNoData = {
  table?: string;
  sessionId?: string;
  mealId?: string;
};

export class MealServices implements Meal {
  #mealRepository;

  constructor(mealRepository: RepositorySchema) {
    this.#mealRepository = mealRepository;
  }

  async createMeal({ data }: parametersSchema): Promise<string> {
    const { name, description, diet_compliant, user_id } = data;

    const mealId = await this.#mealRepository.createMeal({
      table: "meals",
      data: {
        id: randomUUID(),
        name,
        description,
        created_at: new Date().toLocaleString(),
        user_id,
        diet_compliant,
      },
    });

    return mealId;
  }

  async getAllMeals({ sessionId }: parametersSchemaNoData): Promise<object[]> {
    const userMeals: object[] = await this.#mealRepository.getAllMeals({
      table: "meals",
      sessionId,
    });

    return userMeals;
  }

  async getMeal({ mealId }: parametersSchemaNoData): Promise<object> {
    const userMeal: object = await this.#mealRepository.getMeal({
      table: "meals",
      mealId,
    });

    return userMeal;
  }
}
