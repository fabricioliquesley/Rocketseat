import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "@/core/errors/use-case-errors/not-allowed-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { makeQuestionAttachment } from "test/factories/make-question-attachment";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-student-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let inMemoryStudentRepository: InMemoryStudentsRepository;
let sut: DeleteQuestionUseCase;

beforeEach(() => {
  inMemoryQuestionAttachmentsRepository =
    new InMemoryQuestionAttachmentsRepository();
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  inMemoryStudentRepository = new InMemoryStudentsRepository();
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
    inMemoryQuestionAttachmentsRepository,
    inMemoryAttachmentRepository,
    inMemoryStudentRepository
  );
  sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
});

describe("Delete Question", () => {
  it("should be able to delete a question", async () => {
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

    await sut.execute({ questionId: "QX01", authorId: "SX01" });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0);
  });

  it("it shouldn't be possible to delete a question if you're not the author", async () => {
    const authorId = new UniqueEntityId("SX01");
    const fakeQuestion = makeQuestion({ authorId }, new UniqueEntityId("QX01"));
    await inMemoryQuestionsRepository.create(fakeQuestion);

    const result = await sut.execute({ questionId: "QX01", authorId: "SX02" });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
