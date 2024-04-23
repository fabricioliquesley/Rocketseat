import { expect, it, describe } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const { user } = await registerUseCase.executeRegister({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const { user } = await registerUseCase.executeRegister({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const userRepository = new InMemoryUserRepository();
    const registerUseCase = new RegisterUseCase(userRepository);

    const email = "john.doe@gmail.com";

    await registerUseCase.executeRegister({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerUseCase.executeRegister({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
