import { expect, it, describe, beforeEach } from "vitest";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./getUserProfile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let userRepository: InMemoryUserRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await userRepository.createUser({
      name: "john Doe",
      email: "john.doe@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("john Doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "not-found"
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
