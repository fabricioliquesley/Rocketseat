import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.integer("best_sequence").defaultTo(0).after("password");
    table.integer("current_sequence").defaultTo(0).after("best_sequence");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumns("best_sequence", "current_sequence");
  });
}
