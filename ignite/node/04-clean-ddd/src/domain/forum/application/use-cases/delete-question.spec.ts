import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

beforeEach(() => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
  sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
});

describe("Delete Question", () => {
  it("should be able to delete a question", async () => {
    const authorId = new UniqueEntityId("SX01");
    const fakeQuestion = makeQuestion({ authorId }, new UniqueEntityId("QX01"));
    await inMemoryQuestionsRepository.create(fakeQuestion);

    await sut.execute({ questionId: "QX01", authorId: "SX01" });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it("it shouldn't be possible to delete a question if you're not the author", async () => {
    const authorId = new UniqueEntityId("SX01");
    const fakeQuestion = makeQuestion({ authorId }, new UniqueEntityId("QX01"));
    await inMemoryQuestionsRepository.create(fakeQuestion);

    const result = await sut.execute({ questionId: "QX01", authorId: "SX02" })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  });
});
