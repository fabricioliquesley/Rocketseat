import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { makeAnswer } from "test/factories/make-answer";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-respository";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

beforeEach(() => {
  inMemoryAnswerAttachmentsRepository =
    new InMemoryAnswerAttachmentsRepository();
  inMemoryAnswersRepository = new InMemoryAnswersRepository(
    inMemoryAnswerAttachmentsRepository
  );
  inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

  sut = new CommentOnAnswerUseCase(
    inMemoryAnswersRepository,
    inMemoryAnswerCommentsRepository
  );
});

describe("Comment on Answer", () => {
  it("should be able to comment on answer", async () => {
    const fakeAnswer = makeAnswer();

    await inMemoryAnswersRepository.create(fakeAnswer);

    await sut.execute({
      answerId: fakeAnswer.id.toString(),
      authorId: "SX01",
      content: "New comment",
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toBe(
      "New comment"
    );
  });
});
