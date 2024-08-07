import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { RegisterUserUseCase } from "./register-user";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { makeDeliveryMan } from "test/factories/make-delivery-man";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let fakeHashGenerator: FakeHasher;
let sut: RegisterUserUseCase;

beforeEach(() => {
  inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
  fakeHashGenerator = new FakeHasher();
  sut = new RegisterUserUseCase(
    inMemoryDeliveryManRepository,
    "delivery-man",
    fakeHashGenerator
  );
});

describe("Register User", () => {
  it("should not be possible to create a user with the same cpf", async () => {
    const deliveryMan = await makeDeliveryMan({ cpf: "111.222.333-44" });
    await inMemoryDeliveryManRepository.create(deliveryMan);

    const result = await sut.execute({
      name: "John Smith",
      cpf: "111.222.333-44",
      password: "123456",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to hash the password", async () => {
    await sut.execute({
      name: "John Smith",
      cpf: "111.222.333-44",
      password: "123456",
    });

    const hashedPassword = await fakeHashGenerator.hash("123456");

    expect(inMemoryDeliveryManRepository.items[0].password).toEqual(
      hashedPassword
    );
  });
});
