import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

beforeEach(() => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
  sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
});

describe("Edit Question", () => {
  it("should be able to edit a question", async () => {
    const authorId = new UniqueEntityId("SX01");
    const fakeQuestion = makeQuestion({ authorId }, new UniqueEntityId("QX01"));
    await inMemoryQuestionsRepository.create(fakeQuestion);

    const { value } = await sut.execute({
      questionId: fakeQuestion.id.toString(),
      authorId: "SX01",
      title: "New title",
      content: "New content",
    });

    expect(value?.question).toMatchObject({
      title: "New title",
      content: "New content",
    });
  });

  it("it shouldn't be possible to edit a question if you're not the author", async () => {
    const authorId = new UniqueEntityId("SX01");
    const fakeQuestion = makeQuestion({ authorId }, new UniqueEntityId("QX01"));
    await inMemoryQuestionsRepository.create(fakeQuestion);

    const result = await sut.execute({
      questionId: "QX01",
      authorId: "SX02",
      title: "New title",
      content: "New content",
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  });
});
