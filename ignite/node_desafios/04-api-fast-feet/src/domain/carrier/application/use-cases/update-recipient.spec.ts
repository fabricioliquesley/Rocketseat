import { InMemoryAdminRepository } from "test/repositories/in-memory-admin-repository";
import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { UpdateRecipientUseCase } from "./update-recipient";
import { makeRecipient } from "test/factories/make-recipient";
import { makeAdmin } from "test/factories/make-admin";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let inMemoryAdminRepository: InMemoryAdminRepository;
let sut: UpdateRecipientUseCase;

beforeEach(() => {
  inMemoryRecipientRepository = new InMemoryRecipientRepository();
  inMemoryAdminRepository = new InMemoryAdminRepository();
  sut = new UpdateRecipientUseCase(
    inMemoryRecipientRepository,
    inMemoryAdminRepository
  );
});

describe("Update recipient", () => {
  it("Should be able to update an recipient", async () => {
    const recipient = makeRecipient();
    const admin = makeAdmin();

    inMemoryRecipientRepository.create(recipient);
    inMemoryAdminRepository.create(admin);

    const result = await sut.execute({
      name: "Arthur Morgan",
      recipientCPF: recipient.cpf,
      adminCPF: admin.cpf,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "Arthur Morgan",
      })
    );
  });

  it("shouldn't be able to update a cpf if it already exists", async () => {
    const recipient = makeRecipient();
    const recipient2 = makeRecipient();
    const admin = makeAdmin();

    inMemoryRecipientRepository.create(recipient);
    inMemoryRecipientRepository.create(recipient2);
    inMemoryAdminRepository.create(admin);

    const result = await sut.execute({
      cpf: recipient2.cpf,
      recipientCPF: recipient.cpf,
      adminCPF: admin.cpf,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});
