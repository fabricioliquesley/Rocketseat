import { FakeHasher } from "test/cryptography/fake-hasher";
import { RegisterUserUseCase } from "./register-user";
import { InMemoryAdminRepository } from "test/repositories/in-memory-admin-repository";

let inMemoryAdminRepository: InMemoryAdminRepository;
let fakeHashGenerator: FakeHasher;
let sut: RegisterUserUseCase;

beforeEach(() => {
  inMemoryAdminRepository = new InMemoryAdminRepository();
  fakeHashGenerator = new FakeHasher();
  sut = new RegisterUserUseCase(
    inMemoryAdminRepository,
    "admin",
    fakeHashGenerator
  );
});

describe("Register Admin", () => {
  it("Should be able to create a new admin", async () => {
    await sut.execute({
      name: "John Smith",
      cpf: "111.222.333-44",
      password: "123456",
    });

    expect(inMemoryAdminRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "John Smith",
        role: "admin",
      })
    );
  });
});
