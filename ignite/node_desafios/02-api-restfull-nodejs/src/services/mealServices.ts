import { randomUUID } from "crypto";
import { RepositorySchema } from "../repositories/mealRepository";

interface Meal {
  createMeal({}: parametersSchema): Promise<string>;
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
}
