import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryStudentsRepository } from "test/repositories/in-memory-student-repository";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { AuthenticateStudentUseCase } from "./authenticate-student";
import { makeStudent } from "test/factories/make-student";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

let inMemoryStudentsRepository: InMemoryStudentsRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;
let sut: AuthenticateStudentUseCase;

describe("Authenticate Student", () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository();
    fakeHasher = new FakeHasher();
    fakeEncrypter = new FakeEncrypter();
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter
    );
  });

  it("should be able to authenticate a student", async () => {
    const student = makeStudent({
      email: "test@example.com",
      password: await fakeHasher.hash("12345678"),
    });

    inMemoryStudentsRepository.create(student);

    const result = await sut.execute({
      email: "test@example.com",
      password: "12345678",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    });
  });

  it("should not be able to authenticate a student with wrong credentials", async () => {
    const student = makeStudent({
      email: "test@example.com",
      password: await fakeHasher.hash("12345678"),
    });

    inMemoryStudentsRepository.create(student);

    const result = await sut.execute({
      email: "john.doe@gmail.com",
      password: "12345679",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(WrongCredentialsError);
  });
});
