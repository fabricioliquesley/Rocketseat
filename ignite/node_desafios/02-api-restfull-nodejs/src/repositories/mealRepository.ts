import { knex } from "../database";

export interface RepositorySchema {
  createMeal({}: parametersSchema): Promise<string>;
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
}
