import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-student-repository";
import { makeStudent } from "test/factories/make-student";
import { makeAttachment } from "test/factories/make-attachment";
import { makeQuestionAttachment } from "test/factories/make-question-attachment";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let inMemoryStudentRepository: InMemoryStudentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe("Get Question By Slug", () => {
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
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to find a question by slug", async () => {
    const student = makeStudent({ name: "John Doe" });

    await inMemoryStudentRepository.create(student);

    const attachment1 = makeAttachment();
    const attachment2 = makeAttachment();

    await inMemoryAttachmentRepository.create(attachment1);
    await inMemoryAttachmentRepository.create(attachment2);

    const fakeQuestion = makeQuestion({
      slug: Slug.create("question-slug"),
      authorId: student.id,
    });

    await inMemoryQuestionsRepository.create(fakeQuestion);

    const questionAttachment1 = makeQuestionAttachment({
      attachmentId: attachment1.id,
      questionId: fakeQuestion.id,
    });

    const questionAttachment2 = makeQuestionAttachment({
      attachmentId: attachment2.id,
      questionId: fakeQuestion.id,
    });

    inMemoryQuestionAttachmentsRepository.createMany([
      questionAttachment1,
      questionAttachment2,
    ]);

    const result = await sut.execute({
      slug: "question-slug",
    });

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        questionId: fakeQuestion.id,
        title: fakeQuestion.title,
      }),
    });
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        author: expect.objectContaining({
          name: "John Doe",
        }),
      }),
    });
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        attachments: expect.arrayContaining([
          expect.objectContaining({
            url: attachment1.url,
          }),
          expect.objectContaining({
            url: attachment2.url,
          }),
        ]),
      }),
    });
  });
});
