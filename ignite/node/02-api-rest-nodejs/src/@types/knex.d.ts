import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    transactions: {
      id: String;
      title: String;
      amount: number;
      created_at: string;
      session_id?: String;
    };
  }
}
