import { beforeEach, describe, expect, it } from "vitest";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comments-repository";
import { ListAnswerCommentsUseCase } from "./list-answer-comments";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-student-repository";
import { makeStudent } from "test/factories/make-student";

let inMemoryStudentRepository: InMemoryStudentsRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: ListAnswerCommentsUseCase;

describe("List Answer Comments", () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentsRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentRepository
    );
    sut = new ListAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it("Should be able to list answer comments", async () => {
    const student = makeStudent();

    inMemoryStudentRepository.items.push(student);

    const comment1 = makeAnswerComment({
      answerId: new UniqueEntityId("QX01"),
      authorId: student.id,
    });
    
    const comment2 = makeAnswerComment({
      answerId: new UniqueEntityId("QX01"),
      authorId: student.id,
    });

    const comment3 = makeAnswerComment({
      answerId: new UniqueEntityId("QX01"),
      authorId: student.id,
    });

    await inMemoryAnswerCommentsRepository.create(comment1);
    await inMemoryAnswerCommentsRepository.create(comment2);
    await inMemoryAnswerCommentsRepository.create(comment3);

    const result = await sut.execute({
      answerId: "QX01",
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

  it("Should be able to list paginated answer comments", async () => {
    const student = makeStudent();

    inMemoryStudentRepository.items.push(student);

    for (let i = 0; i < 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId("QX02"),
          authorId: student.id,
        })
      );
    }

    const result = await sut.execute({ answerId: "QX02", page: 2 });

    expect(result.value?.comments).toHaveLength(2);
  });
});
