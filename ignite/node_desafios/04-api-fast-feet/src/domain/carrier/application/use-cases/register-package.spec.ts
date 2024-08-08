import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { InMemoryPackageRepository } from "test/repositories/in-memory-package-repository";
import { RegisterPackageUseCase } from "./register-package";
import { makeRecipient } from "test/factories/make-recipient";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let inMemoryPackageRepository: InMemoryPackageRepository;
let sut: RegisterPackageUseCase;

beforeEach(() => {
  inMemoryRecipientRepository = new InMemoryRecipientRepository();
  inMemoryPackageRepository = new InMemoryPackageRepository();
  sut = new RegisterPackageUseCase(
    inMemoryRecipientRepository,
    inMemoryPackageRepository
  );
});

describe("Register Package", () => {
  it("Should be able to register an package", async () => {
    const recipient = makeRecipient();
    inMemoryRecipientRepository.items.push(recipient);

    const result = await sut.execute({
      code: "Px0001",
      type: "fragile",
      recipientId: recipient.id,
    });

    expect(result.isRight()).toBe(true);
  });
});
