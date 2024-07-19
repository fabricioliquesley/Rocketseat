import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { ListQuestionCommentsUseCase } from "./list-question-comments";
import { makeQuestionComment } from "test/factories/make-question-comment";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: ListQuestionCommentsUseCase;

describe("List Question Comments", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it("Should be able to list question comments", async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("QX01") })
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("QX01") })
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("QX01") })
    );

    const result = await sut.execute({
      questionId: "QX01",
      page: 1,
    });

    expect(result.value?.questionComments).toHaveLength(3);
  });

  it("Should be able to list paginated question comments", async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId("QX02") })
      );
    }

    const result = await sut.execute({ questionId: "QX02", page: 2 });

    expect(result.value?.questionComments).toHaveLength(2);
  });
});
