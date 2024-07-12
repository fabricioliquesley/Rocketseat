import { faker } from "@faker-js/faker";

import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";

export function makeAnswer(
  override: Partial<AnswerProps>,
  id?: UniqueEntityId
) {
  const question = Answer.create(
    {
      authorId: new UniqueEntityId("SX01"),
      questionId: new UniqueEntityId("PX01"),
      content: faker.lorem.text(),
      ...override,
    },
    id
  );

  return question;
}
