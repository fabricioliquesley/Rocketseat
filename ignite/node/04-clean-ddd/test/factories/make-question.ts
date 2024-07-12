import { faker } from "@faker-js/faker";

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Question,
  QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(
  override: Partial<QuestionProps>,
  id?: UniqueEntityId
) {
  const question = Question.create({
    authorId: new UniqueEntityId("SX01"),
    title: faker.lorem.sentence(),
    slug: Slug.create("question-1"),
    content: faker.lorem.text(),
    ...override,
  }, id);

  return question;
}
