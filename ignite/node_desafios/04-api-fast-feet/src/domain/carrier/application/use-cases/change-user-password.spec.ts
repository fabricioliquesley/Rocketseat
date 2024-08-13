import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { ChangeUserPasswordUseCase } from "./change-user-password";
import { makeDeliveryMan } from "test/factories/make-delivery-man";
import { PasswordNotMatchError } from "./errors/password-not-match-error";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let sut: ChangeUserPasswordUseCase;

beforeEach(() => {
  inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
  sut = new ChangeUserPasswordUseCase(inMemoryDeliveryManRepository);
});

describe("Change user password", () => {
  it("Should be able to change the user password", async () => {
    const user = makeDeliveryMan({
      password: "123456",
    });
    inMemoryDeliveryManRepository.create(user);

    const result = await sut.execute({
      userId: user.id,
      currentPassword: "123456",
      newPassword: "654321",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryManRepository.items[0]).toEqual(
      expect.objectContaining({
        password: "654321",
      })
    );
  });

  it("Should not be possible to change the user's password if the current password is wrong", async () => {
    const user = makeDeliveryMan();
    inMemoryDeliveryManRepository.create(user);

    const result = await sut.execute({
      userId: user.id,
      currentPassword: "123456",
      newPassword: "654321",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(PasswordNotMatchError);
  });
});
