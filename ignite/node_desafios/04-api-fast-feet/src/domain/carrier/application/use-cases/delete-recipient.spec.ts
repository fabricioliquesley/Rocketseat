import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { makeRecipient } from "test/factories/make-recipient";
import { InMemoryAdminRepository } from "test/repositories/in-memory-admin-repository";
import { DeleteRecipientUseCase } from "./delete-recipient";
import { makeAdmin } from "test/factories/make-admin";

let inMemoryRecipientRepository: InMemoryRecipientRepository;
let inMemoryAdminRepository: InMemoryAdminRepository;
let sut: DeleteRecipientUseCase;

beforeEach(() => {
  inMemoryRecipientRepository = new InMemoryRecipientRepository();
  inMemoryAdminRepository = new InMemoryAdminRepository();
  sut = new DeleteRecipientUseCase(
    inMemoryRecipientRepository,
    inMemoryAdminRepository
  );
});

describe("Delete recipient", () => {
  it("Should be able to delete a recipient", async () => {
    const recipient = makeRecipient();
    const admin = makeAdmin();

    inMemoryRecipientRepository.create(recipient);
    inMemoryAdminRepository.create(admin);

    const result = await sut.execute({
      recipientCPF: recipient.cpf,
      adminCPF: admin.cpf,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientRepository.items).toHaveLength(0);
  });
});
