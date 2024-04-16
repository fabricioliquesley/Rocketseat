import { knex } from "../database";

export interface RepositorySchema {
  getUser({}: parametersSchemaNoData): Promise<{ id: string }>;
  createMeal({}: parametersSchema): Promise<string>;
  getAllMeals({}: parametersSchemaNoData): Promise<object[]>;
  getMeal({}: parametersSchemaNoData): Promise<{ user_id: string }>;
  deleteMeal({}: parametersSchemaNoData): Promise<number>;
  editMeal({}: parametersEditSchema): Promise<number>;
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
  mealId?: string;
};

type parametersEditSchema = {
  table?: string;
  data: {
    name: string;
    description: string;
    diet_compliant: string;
  };
  mealId?: string;
}

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

  async getMeal({
    table,
    mealId,
  }: parametersSchemaNoData): Promise<{ user_id: string }> {
    type mealType = {
      user_id: string;
    };

    const meal: mealType = await knex(table).where("id", mealId).first();

    return meal;
  }

  async deleteMeal({ table, mealId }: parametersSchemaNoData): Promise<number> {
    const result = await knex(table).del().where("id", mealId);

    return result;
  }

  async getUser({
    table,
    sessionId,
  }: parametersSchemaNoData): Promise<{ id: string }> {
    const user = await knex(table).where("id", sessionId).first();

    return user;
  }

  async editMeal({ table, data, mealId }: parametersEditSchema): Promise<number> {
    const { name, description, diet_compliant } = data;

    const result = await knex(table)
      .update({
        name,
        description,
        diet_compliant,
      })
      .where("id", mealId);

    return result;
  }
}
