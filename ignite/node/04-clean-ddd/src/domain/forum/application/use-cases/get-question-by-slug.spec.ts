import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to find a question by slug", async () => {
    const fakeQuestion = makeQuestion({ slug: Slug.create("question-slug") });
    await inMemoryQuestionsRepository.create(fakeQuestion);

    const result = await sut.execute({
      slug: "question-slug",
    });

    expect(result.value?.question.id).toBeTruthy();
    expect(result.value?.question.title).toEqual(fakeQuestion.title);
  });
});
