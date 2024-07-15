import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ChooseBestAnswerUseCase } from "./choose-best-answer";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { NotAllowedError } from "./errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseBestAnswerUseCase;

beforeEach(() => {
  inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
  inMemoryAnswersRepository = new InMemoryAnswersRepository();
  sut = new ChooseBestAnswerUseCase(
    inMemoryQuestionsRepository,
    inMemoryAnswersRepository
  );
});

describe("Choose Best Answer", () => {
  it("should be able to choose the question best a answer", async () => {
    const fakeQuestion = makeQuestion();
    const fakeAnswer = makeAnswer({ questionId: fakeQuestion.id });

    await inMemoryQuestionsRepository.create(fakeQuestion);
    await inMemoryAnswersRepository.create(fakeAnswer);

    await sut.execute({
      answerId: fakeAnswer.id.toString(),
      authorId: fakeQuestion.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      fakeAnswer.id
    );
  });

  it("it shouldn't be possible to choose best a answer if you're not the author", async () => {
    const fakeQuestion = makeQuestion();
    const fakeAnswer = makeAnswer({ questionId: fakeQuestion.id });

    await inMemoryQuestionsRepository.create(fakeQuestion);
    await inMemoryAnswersRepository.create(fakeAnswer);

    const result = await sut.execute({
      answerId: fakeAnswer.id.toString(),
      authorId: "IX02",
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  });
});
