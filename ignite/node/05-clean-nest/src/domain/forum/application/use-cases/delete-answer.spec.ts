import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteAnswerUseCase } from "./delete-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/use-case-errors/not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { makeAnswerAttachment } from "test/factories/make-answer-attachment";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

beforeEach(() => {
  inMemoryAnswerAttachmentsRepository =
    new InMemoryAnswerAttachmentsRepository();
  inMemoryAnswersRepository = new InMemoryAnswersRepository(
    inMemoryAnswerAttachmentsRepository
  );
  sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
});

describe("Delete Answer", () => {
  it("should be able to delete a answer", async () => {
    const authorId = new UniqueEntityId("SX01");
    const fakeAnswer = makeAnswer({ authorId }, new UniqueEntityId("AX01"));

    await inMemoryAnswersRepository.create(fakeAnswer);
    await inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: fakeAnswer.id,
        attachmentId: new UniqueEntityId("AAX01"),
      }),
      makeAnswerAttachment({
        answerId: fakeAnswer.id,
        attachmentId: new UniqueEntityId("AAX02"),
      })
    );

    await sut.execute({ answerId: "AX01", authorId: "SX01" });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0);
  });

  it("it shouldn't be possible to delete a answer if you're not the author", async () => {
    const authorId = new UniqueEntityId("SX01");
    const fakeAnswer = makeAnswer({ authorId }, new UniqueEntityId("QX01"));
    await inMemoryAnswersRepository.create(fakeAnswer);

    const result = await sut.execute({ answerId: "QX01", authorId: "SX02" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
