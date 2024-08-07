import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { ListQuestionAnswersUseCase } from "./list-question-answers";
import { beforeEach, describe, expect, it } from "vitest";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ListQuestionAnswersUseCase;

describe("List Answers to a Question", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
    sut = new ListQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it("Should be able to list question answers", async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({
        createdAt: new Date(2024, 0, 20),
        questionId: new UniqueEntityId("QX01"),
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId("QX01"),
      })
    );
    await inMemoryAnswersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityId("QX02"),
      })
    );

    const result = await sut.execute({ questionId: "QX01", page: 1 });

    expect(result.value?.answers).toHaveLength(2);
  });

  it("Should be able to list paginated answers", async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityId("QX02") })
      );
    }

    const result = await sut.execute({ questionId: "QX02", page: 2 });

    expect(result.value?.answers).toHaveLength(2);
  });
});
