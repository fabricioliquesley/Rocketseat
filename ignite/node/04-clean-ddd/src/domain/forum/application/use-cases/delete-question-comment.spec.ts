import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-respository";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { NotAllowedError } from "@/core/errors/use-case-errors/not-allowed-error";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

beforeEach(() => {
  inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
  sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
});

describe("Delete Question Comment", () => {
  it("should be able to delete question comment", async () => {
    const fakeQuestionComment = makeQuestionComment();
    await inMemoryQuestionCommentsRepository.create(fakeQuestionComment);

    await sut.execute({
      questionCommentId: fakeQuestionComment.id.toString(),
      authorId: fakeQuestionComment.authorId.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it("it shouldn't be possible to delete a answer if you're not the author", async () => {
    const fakeQuestionComment = makeQuestionComment();
    await inMemoryQuestionCommentsRepository.create(fakeQuestionComment);

    const result = await sut.execute({
      questionCommentId: fakeQuestionComment.id.toString(),
      authorId: "SX02",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).instanceOf(NotAllowedError);
  });
});
