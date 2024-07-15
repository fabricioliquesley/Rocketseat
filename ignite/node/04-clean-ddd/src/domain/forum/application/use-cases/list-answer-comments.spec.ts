import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-respository";
import { ListAnswerCommentsUseCase } from "./list-answer-comments";
import { makeAnswerComment } from "test/factories/make-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: ListAnswerCommentsUseCase;

describe("List Answer Comments", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository =
      new InMemoryAnswerCommentsRepository();
    sut = new ListAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it("Should be able to list answer comments", async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId("QX01") })
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId("QX01") })
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId("QX01") })
    );

    const result = await sut.execute({
      answerId: "QX01",
      page: 1,
    });

    expect(result.value?.answerComments).toHaveLength(3);
  });

  it("Should be able to list paginated answer comments", async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId("QX02") })
      );
    }

    const result = await sut.execute({ answerId: "QX02", page: 2 });

    expect(result.value?.answerComments).toHaveLength(2);
  });
});
