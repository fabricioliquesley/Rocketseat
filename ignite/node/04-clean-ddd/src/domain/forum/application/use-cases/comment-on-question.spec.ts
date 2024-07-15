import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-respository";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

beforeEach(() => {
  inMemoryQuestionAttachmentsRepository =
    new InMemoryQuestionAttachmentsRepository();
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
    inMemoryQuestionAttachmentsRepository
  );
  inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();

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
