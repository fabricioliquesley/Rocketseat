import { FakeHasher } from "test/cryptography/fake-hasher";
import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { RegisterUserUseCase } from "./register-user";

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

describe("Register Delivery-man", () => {
  it("Should be able to create a new delivery man", async () => {
    await sut.execute({
      name: "John Smith",
      cpf: "111.222.333-44",
      password: "123456",
    });

    expect(inMemoryDeliveryManRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "John Smith",
        role: "delivery-man",
      })
    );
  });
});
