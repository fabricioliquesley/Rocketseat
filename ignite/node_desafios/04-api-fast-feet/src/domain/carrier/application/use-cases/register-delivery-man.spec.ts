import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { RegisterDeliveryManUseCase } from "./register-delivery-man";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { makeDeliveryMan } from "test/factories/make-delivery-man";
import { DeliveryManAlreadyExistsError } from "./errors/delivery-man-already-exists-error";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let fakeHashGenerator: FakeHasher;
let sut: RegisterDeliveryManUseCase;

beforeEach(() => {
  inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
  fakeHashGenerator = new FakeHasher();
  sut = new RegisterDeliveryManUseCase(
    inMemoryDeliveryManRepository,
    fakeHashGenerator
  );
});

describe("Delivery Man", () => {
  it("Should be able to create a new delivery man", async () => {
    await sut.execute({
      name: "John Smith",
      cpf: "111.222.333-44",
      password: "123456",
    });

    expect(inMemoryDeliveryManRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "John Smith",
      })
    );
  });

  it("should not be possible to create a new delivery man with the same cpf", async () => {
    const deliveryMan = await makeDeliveryMan({ cpf: "111.222.333-44" });
    await inMemoryDeliveryManRepository.create(deliveryMan);

    const result = await sut.execute({
      name: "John Smith",
      cpf: "111.222.333-44",
      password: "123456",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DeliveryManAlreadyExistsError);
  });

  it("should be able to hash the password", async () => {
    const result = await sut.execute({
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
