import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comments-repository";
import { ListQuestionCommentsUseCase } from "./list-question-comments";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-student-repository";
import { makeStudent } from "test/factories/make-student";

let inMemoryStudentRepository: InMemoryStudentsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: ListQuestionCommentsUseCase;

describe("List Question Comments", () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentsRepository();
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentRepository
    );
    sut = new ListQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it("Should be able to list question comments", async () => {
    const student = makeStudent();

    inMemoryStudentRepository.items.push(student);

    const comment1 = makeQuestionComment({
      questionId: new UniqueEntityId("QX01"),
      authorId: student.id,
    });

    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityId("QX01"),
      authorId: student.id,
    });

    const comment3 = makeQuestionComment({
      questionId: new UniqueEntityId("QX01"),
      authorId: student.id,
    });

    inMemoryQuestionCommentsRepository.create(comment1);
    inMemoryQuestionCommentsRepository.create(comment2);
    inMemoryQuestionCommentsRepository.create(comment3);

    const result = await sut.execute({
      questionId: "QX01",
      page: 1,
    });

    expect(result.value?.comments).toHaveLength(3);
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          authorName: student.name,
          content: comment1.content,
        }),
        expect.objectContaining({
          authorName: student.name,
          content: comment2.content,
        }),
        expect.objectContaining({
          authorName: student.name,
          content: comment3.content,
        }),
      ])
    );
  });

  it("Should be able to list paginated question comments", async () => {
    const student = makeStudent();

    inMemoryStudentRepository.items.push(student);

    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId("QX02"),
          authorId: student.id,
        })
      );
    }

    const result = await sut.execute({ questionId: "QX02", page: 2 });

    expect(result.value?.comments).toHaveLength(2);
  });
});
