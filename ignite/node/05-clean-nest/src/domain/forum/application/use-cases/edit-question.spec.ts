import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/use-case-errors/not-allowed-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { makeQuestionAttachment } from "test/factories/make-question-attachment";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;

beforeEach(() => {
  inMemoryQuestionAttachmentsRepository =
    new InMemoryQuestionAttachmentsRepository();
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
    inMemoryQuestionAttachmentsRepository
  );
  sut = new EditQuestionUseCase(
    inMemoryQuestionsRepository,
    inMemoryQuestionAttachmentsRepository
  );
});

describe("Edit Question", () => {
  it("should be able to edit a question", async () => {
    const authorId = new UniqueEntityId("SX01");
    const fakeQuestion = makeQuestion({ authorId }, new UniqueEntityId("QX01"));

    await inMemoryQuestionsRepository.create(fakeQuestion);
    await inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: fakeQuestion.id,
        attachmentId: new UniqueEntityId("QAX01"),
      }),
      makeQuestionAttachment({
        questionId: fakeQuestion.id,
        attachmentId: new UniqueEntityId("QAX02"),
      })
    );

    const { value } = await sut.execute({
      questionId: fakeQuestion.id.toString(),
      authorId: "SX01",
      title: "New title",
      content: "New content",
      attachmentsIds: ["QAX01", "QAX03"],
    });

    expect(value).toMatchObject({
      question: expect.objectContaining({
        title: "New title",
        content: "New content",
      }),
    });
    expect(
      inMemoryQuestionsRepository.items[0].attachments.getItems()
    ).toHaveLength(2);
    expect(inMemoryQuestionsRepository.items[0].attachments.getItems()).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityId("QAX01") }),
        expect.objectContaining({ attachmentId: new UniqueEntityId("QAX03") }),
      ]
    );
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
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it("should sync new add and removed attachments when editing a question", async () => {
    const authorId = new UniqueEntityId("SX01");
    const fakeQuestion = makeQuestion({ authorId }, new UniqueEntityId("QX01"));

    await inMemoryQuestionsRepository.create(fakeQuestion);
    await inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: fakeQuestion.id,
        attachmentId: new UniqueEntityId("QAX01"),
      }),
      makeQuestionAttachment({
        questionId: fakeQuestion.id,
        attachmentId: new UniqueEntityId("QAX02"),
      })
    );

    const result = await sut.execute({
      questionId: fakeQuestion.id.toString(),
      authorId: "SX01",
      title: "New title",
      content: "New content",
      attachmentsIds: ["QAX01", "QAX03"],
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(2)
    expect(inMemoryQuestionAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({attachmentId: new UniqueEntityId("QAX01")}),
        expect.objectContaining({attachmentId: new UniqueEntityId("QAX03")}),
      ])
    )
  });
});
