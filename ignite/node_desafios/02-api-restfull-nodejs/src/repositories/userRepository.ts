import { knex } from "../database";

type bodySchema = {
  table: string;
  data: {
    id?: string;
    name?: string;
    email: string;
    password: string;
  };
};

interface User {
  createUser({ table, data }: bodySchema): void;
  getUser({ table, data }: bodySchema): object;
}

export class UserRepository implements User {
  async createUser({ table, data }: bodySchema): Promise<void> {
    const { id, name, email, password } = data;

    await knex(table).insert({
      id,
      name,
      email,
      password,
    });

    return;
  }

  async getUser({ table, data }: bodySchema): Promise<object> {
    const { email, password } = data;

    const user = await knex(table).select("id", "name", "email", "created_at").where({ email, password }).first();

    return user;
  }
}
