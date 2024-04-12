import { knex } from "../database";
import { randomUUID } from "crypto";

type bodySchema = {
  table: string;
  data: {
    name: string;
    email: string;
    password: string;
  };
};

interface User {
  createUser({ table, data }: bodySchema): void;
}

export class UserRepository implements User {
  async createUser({ table, data }: bodySchema): Promise<void> {
    const { name, email, password } = data;

    await knex(table).insert({
      id: randomUUID(),
      name,
      email,
      password,
    });

    console.log(name, email, password);
  }
}
