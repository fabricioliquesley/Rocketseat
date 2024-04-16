import { knex } from "../database";

export interface RepositorySchema {
  createMeal({}: parametersSchema): Promise<string>;
  getAllMeals({}: parametersSchemaNoData): Promise<object[]>;
  getMeal({}: parametersSchemaNoData): Promise<object>;
}

type parametersSchema = {
  table?: string;
  data: {
    id: string;
    name: string;
    description: string;
    diet_compliant: string;
    user_id: string;
    created_at: string;
  };
};

type parametersSchemaNoData = {
  table: string;
  sessionId?: string;
  mealId?: string;
};

export class MealRepository implements RepositorySchema {
  async createMeal({ table, data }: parametersSchema): Promise<string> {
    const { id, name, description, created_at, user_id, diet_compliant } = data;

    await knex(table).insert({
      id,
      name,
      description,
      created_at,
      user_id,
      diet_compliant,
    });

    return id;
  }

  async getAllMeals({
    table,
    sessionId,
  }: parametersSchemaNoData): Promise<object[]> {
    const meals: object[] = await knex(table).where("user_id", sessionId);

    return meals;
  }

  async getMeal({ table, mealId }: parametersSchemaNoData): Promise<object> {
    const meal: object = await knex(table).where("id", mealId).first();

    return meal;
  }
}
