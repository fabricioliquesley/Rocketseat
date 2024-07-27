import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { NotAllowedError } from "@/core/errors/use-case-errors/not-allowed-error";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-student-repository";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let inMemoryStudentRepository: InMemoryStudentsRepository;
let sut: DeleteAnswerCommentUseCase;

beforeEach(() => {
  inMemoryStudentRepository = new InMemoryStudentsRepository();
  inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
    inMemoryStudentRepository
  );
  sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
});

describe("Delete Answer Comment", () => {
  it("should be able to delete answer comment", async () => {
    const fakeAnswerComment = makeAnswerComment();
    await inMemoryAnswerCommentsRepository.create(fakeAnswerComment);

    await sut.execute({
      answerCommentId: fakeAnswerComment.id.toString(),
      authorId: fakeAnswerComment.authorId.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it("it shouldn't be possible to delete a answer if you're not the author", async () => {
    const fakeAnswerComment = makeAnswerComment();
    await inMemoryAnswerCommentsRepository.create(fakeAnswerComment);

    const result = await sut.execute({
      answerCommentId: fakeAnswerComment.id.toString(),
      authorId: "SX02",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
