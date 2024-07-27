import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-student-repository";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let inMemoryStudentRepository: InMemoryStudentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

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
  inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(inMemoryStudentRepository);

  sut = new CommentOnQuestionUseCase(
    inMemoryQuestionsRepository,
    inMemoryQuestionCommentsRepository
  );
});

describe("Comment on Question", () => {
  it("should be able to comment on question", async () => {
    const fakeQuestion = makeQuestion();

    await inMemoryQuestionsRepository.create(fakeQuestion);

    await sut.execute({
      questionId: fakeQuestion.id.toString(),
      authorId: "SX01",
      content: "New comment",
    });

    expect(inMemoryQuestionCommentsRepository.items[0].content).toBe(
      "New comment"
    );
  });
});
