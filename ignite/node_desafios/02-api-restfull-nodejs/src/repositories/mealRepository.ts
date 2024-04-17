import { z } from "zod";
import { knex } from "../database";

export interface RepositorySchema {
  getUser({}: parametersSchemaNoData): Promise<{ id: string }>;
  createMeal({}: parametersSchema): Promise<string>;
  getAllMeals({}: parametersSchemaNoData): Promise<object[]>;
  getMeal({}: parametersSchemaNoData): Promise<{ user_id: string }>;
  deleteMeal({}: parametersSchemaNoData): Promise<number>;
  editMeal({}: parametersEditSchema): Promise<number>;
  getMetrics({}: parametersSchemaNoData): Promise<metricsResponse>;
  getBestSequence({}: parametersSchemaNoData): Promise<number>;
  getCurrentSequence({}: parametersSchemaNoData): Promise<number>;
  updateBestSequence({}: parameterSequence): Promise<void>;
  updateCurrentSequence({}: parameterSequence): Promise<void>;
}

type metricsResponse = {
  dietIn: string | number;
  dietOut: string | number;
  totalMeal: number;
};

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
};

type parametersSchemaNoData = {
  table: string;
  sessionId?: string;
  mealId?: string;
};

interface parameterSequence extends parametersSchemaNoData {
  value: number;
}

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

  async editMeal({
    table,
    data,
    mealId,
  }: parametersEditSchema): Promise<number> {
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

  async getMetrics({
    table,
    sessionId,
  }: parametersSchemaNoData): Promise<metricsResponse> {
    const In = await knex(table)
      .count("diet_compliant")
      .where({ diet_compliant: "yes", user_id: sessionId })
      .first();

    const Out = await knex(table)
      .count("diet_compliant")
      .where({ diet_compliant: "no", user_id: sessionId })
      .first();

    const dietIn = In["count(`diet_compliant`)"];
    const dietOut = Out["count(`diet_compliant`)"];

    const totalMeal = Number(dietIn) + Number(dietOut);

    return { dietIn, dietOut, totalMeal };
  }

  async getBestSequence({
    table,
    sessionId,
  }: parametersSchemaNoData): Promise<number> {
    const bestSequenceSchema = z.object({
      best_sequence: z.number(),
    });

    const { best_sequence } = bestSequenceSchema.parse(
      await knex(table).select("best_sequence").where("id", sessionId).first()
    );
    
    return best_sequence;
  }

  async getCurrentSequence({
    table,
    sessionId,
  }: parametersSchemaNoData): Promise<number> {
    const currentSequenceSchema = z.object({
      current_sequence: z.number(),
    });

    const { current_sequence } = currentSequenceSchema.parse(
      await knex(table)
        .select("current_sequence")
        .where("id", sessionId)
        .first()
    );

    return current_sequence;
  }

  async updateBestSequence({
    table,
    sessionId,
    value,
  }: parameterSequence): Promise<void> {
    await knex(table).update("best_sequence", value).where("id", sessionId);
  }

  async updateCurrentSequence({
    table,
    sessionId,
    value,
  }: parameterSequence): Promise<void> {
    await knex(table).update("current_sequence", value).where("id", sessionId);
  }
}
