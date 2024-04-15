import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("meals", (table) => {
    table.uuid("id").primary();
    table.text("name");
    table.text("description");
    table.string("created_at");
    table.uuid("user_id").references("id").inTable("users");
    table.enum("diet_compliant", ["yes", "no"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("meals");
}
