import fastify from "fastify";
import { randomUUID } from "node:crypto";
import { knex } from "./database";
import { env } from "./env";

const app = fastify();

app.get("/hello", async () => {
  const transactions = await knex("transactions")
    .insert({
      id: randomUUID(),
      title: "Transação de teste",
      amount: 1000,
    })
    .returning("*");

  return transactions;
});

app
  .listen({
    port: env.PORT,
  })
  .then(() => console.log("http server running"));
