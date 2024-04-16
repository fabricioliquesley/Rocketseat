import { randomUUID } from "crypto";
import { RepositorySchema } from "../repositories/mealRepository";

interface Meal {
  createMeal({}: parametersSchema): Promise<string>;
  getAllMeals({}: parametersSchemaNoData): Promise<object>;
  getMeal({}: parametersSchemaNoData): Promise<object>;
  deleteMeal({}: parametersSchemaNoData): Promise<number>;
  editMeal({}: parametersSchema): Promise<editResponse>;
}

type editResponse =
  | {
      id: string;
      name: string;
      description: string;
      diet_compliant: string;
      user_id: string;
      created_at: string;
    }
  | number;

type parametersSchema = {
  table?: string;
  data: {
    name: string;
    description: string;
    user_id?: string;
    diet_compliant: string;
  };
  mealId?: string;
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

  async deleteMeal({
    mealId,
    sessionId,
  }: parametersSchemaNoData): Promise<number> {
    type mealSchema = {
      user_id: string;
    };

    type userSchema = {
      id: string;
    };

    const user: userSchema = await this.#mealRepository.getUser({
      table: "users",
      sessionId,
    });

    const meal: mealSchema = await this.#mealRepository.getMeal({
      table: "meals",
      mealId,
    });

    if (user?.id != meal?.user_id) {
      return 2;
    }

    const result = this.#mealRepository.deleteMeal({ table: "meals", mealId });

    return result;
  }

  async editMeal({ data, mealId }: parametersSchema): Promise<editResponse> {
    type mealSchema = {
      id?: string;
      name?: string;
      description?: string;
      diet_compliant?: string;
      user_id: string;
      created_at?: string;
    };

    type userSchema = {
      id: string;
    };

    const { name, description, user_id, diet_compliant } = data;

    const user: userSchema = await this.#mealRepository.getUser({
      table: "users",
      sessionId: user_id,
    });

    const meal: mealSchema = await this.#mealRepository.getMeal({
      table: "meals",
      mealId,
    });

    if (user?.id != meal?.user_id) {
      return 2;
    }

    await this.#mealRepository.editMeal({
      table: "meals",
      mealId,
      data: {
        name,
        description,
        diet_compliant,
      },
    });

    const editMeal = {
      id: String(meal.id),
      name,
      description,
      diet_compliant,
      user_id: String(meal.user_id),
      created_at: String(meal.created_at)
    };

    return editMeal;
  }
}
