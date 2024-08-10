import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { RegisterRecipientUseCase } from "./register-recipient";
import { makeRecipient } from "test/factories/make-recipient";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let fakeHashGenerator: FakeHasher;
let sut: RegisterRecipientUseCase;

beforeEach(() => {
  inMemoryRecipientRepository = new InMemoryRecipientRepository();
  fakeHashGenerator = new FakeHasher();
  sut = new RegisterRecipientUseCase(
    inMemoryRecipientRepository,
    fakeHashGenerator
  );
});

describe("Register recipient", () => {
  it("Should be able to register a recipient", async () => {
    const result = await sut.execute({
      name: "Arthur Morgan",
      cpf: "111.222.333-44",
      password: "123456",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "Arthur Morgan",
      })
    );
  });

  it("Should no be able to register a recipient with same cpf", async () => {
    const recipient = makeRecipient();
    inMemoryRecipientRepository.create(recipient);

    const result = await sut.execute({
      cpf: recipient.cpf,
      name: "Arthur Franklin",
      password: "123456",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});
