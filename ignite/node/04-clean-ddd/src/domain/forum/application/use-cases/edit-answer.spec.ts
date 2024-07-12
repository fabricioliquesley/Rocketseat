import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-answer";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

beforeEach(() => {
  inMemoryAnswerRepository = new InMemoryAnswersRepository();
  sut = new EditAnswerUseCase(inMemoryAnswerRepository);
});

describe("Edit Answer", () => {
  it("should be able to edit a answer", async () => {
    const authorId = new UniqueEntityId("IX01");
    const fakeAnswer = makeAnswer({ authorId }, new UniqueEntityId("AX01"));
    await inMemoryAnswerRepository.create(fakeAnswer);

    const { answer } = await sut.execute({
      answerId: "AX01",
      authorId: authorId.toString(),
      content: "New answer content",
    });

    expect(answer).toMatchObject({
      content: "New answer content",
    });
  });

  it("it shouldn't be possible to edit a answer if you're not the author", async () => {
    const authorId = new UniqueEntityId("IX01");
    const fakeAnswer = makeAnswer({ authorId }, new UniqueEntityId("AX01"));
    await inMemoryAnswerRepository.create(fakeAnswer);

    await expect(() =>
      sut.execute({
        answerId: "AX01",
        authorId: "IX02",
        content: "New content",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
