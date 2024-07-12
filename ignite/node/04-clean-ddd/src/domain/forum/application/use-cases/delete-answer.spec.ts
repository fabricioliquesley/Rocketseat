import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteAnswerUseCase } from "./delete-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

beforeEach(() => {
  inMemoryAnswersRepository = new InMemoryAnswersRepository();
  sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
});

describe("Delete Answer", () => {
  it("should be able to delete a answer", async () => {
    const authorId = new UniqueEntityId("SX01");
    const fakeAnswer = makeAnswer({ authorId }, new UniqueEntityId("QX01"));
    await inMemoryAnswersRepository.create(fakeAnswer);

    await sut.execute({ answerId: "QX01", authorId: "SX01" });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("it shouldn't be possible to delete a answer if you're not the author", async () => {
    const authorId = new UniqueEntityId("SX01");
    const fakeAnswer = makeAnswer({ authorId }, new UniqueEntityId("QX01"));
    await inMemoryAnswersRepository.create(fakeAnswer);

    await expect(() =>
      sut.execute({ answerId: "QX01", authorId: "SX02" })
    ).rejects.toBeInstanceOf(Error);
    expect(inMemoryAnswersRepository.items).toHaveLength(1);
  });
});
