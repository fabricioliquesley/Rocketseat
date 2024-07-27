import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { ChooseBestAnswerUseCase } from "./choose-best-answer";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { NotAllowedError } from "@/core/errors/use-case-errors/not-allowed-error";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-student-repository";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let inMemoryStudentRepository: InMemoryStudentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseBestAnswerUseCase;

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
  inMemoryAnswerAttachmentsRepository =
    new InMemoryAnswerAttachmentsRepository();
  inMemoryAnswersRepository = new InMemoryAnswersRepository(
    inMemoryAnswerAttachmentsRepository
  );
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
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
