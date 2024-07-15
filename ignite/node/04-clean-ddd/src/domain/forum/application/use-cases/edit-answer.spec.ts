import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditAnswerUseCase } from "./edit-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeAnswer } from "test/factories/make-answer";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { makeAnswerAttachment } from "test/factories/make-answer-attachment";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

beforeEach(() => {
  inMemoryAnswerAttachmentsRepository =
    new InMemoryAnswerAttachmentsRepository();
  inMemoryAnswerRepository = new InMemoryAnswersRepository(
    inMemoryAnswerAttachmentsRepository
  );
  sut = new EditAnswerUseCase(
    inMemoryAnswerRepository,
    inMemoryAnswerAttachmentsRepository
  );
});

describe("Edit Answer", () => {
  it("should be able to edit a answer", async () => {
    const authorId = new UniqueEntityId("IX01");
    const fakeAnswer = makeAnswer({ authorId }, new UniqueEntityId("AX01"));

    await inMemoryAnswerRepository.create(fakeAnswer);
    await inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: fakeAnswer.id,
        attachmentId: new UniqueEntityId("QAX01"),
      }),
      makeAnswerAttachment({
        answerId: fakeAnswer.id,
        attachmentId: new UniqueEntityId("QAX02"),
      })
    );

    const result = await sut.execute({
      answerId: "AX01",
      authorId: authorId.toString(),
      attachmentsIds: ["AAX01", "AAX03"],
      content: "New answer content",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toMatchObject({
      answer: expect.objectContaining({
        content: "New answer content",
      }),
    });
    expect(
      inMemoryAnswerRepository.items[0].attachments.getItems()
    ).toHaveLength(2);
    expect(inMemoryAnswerRepository.items[0].attachments.getItems()).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId("AAX01") }),
      expect.objectContaining({ attachmentId: new UniqueEntityId("AAX03") }),
    ]);
  });

  it("it shouldn't be possible to edit a answer if you're not the author", async () => {
    const authorId = new UniqueEntityId("IX01");
    const fakeAnswer = makeAnswer({ authorId }, new UniqueEntityId("AX01"));
    await inMemoryAnswerRepository.create(fakeAnswer);

    const result = await sut.execute({
      answerId: "AX01",
      authorId: "IX02",
      attachmentsIds: [],
      content: "New content",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
