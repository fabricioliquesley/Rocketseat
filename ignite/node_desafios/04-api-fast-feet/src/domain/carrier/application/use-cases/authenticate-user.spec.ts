import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { AuthenticateUserUseCase } from "./authenticate-user";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { makeDeliveryMan } from "test/factories/make-delivery-man";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let hashComparer: FakeHasher;
let encrypter: FakeEncrypter;
let sut: AuthenticateUserUseCase;

beforeEach(() => {
  inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
  hashComparer = new FakeHasher();
  encrypter = new FakeEncrypter();
  sut = new AuthenticateUserUseCase(
    inMemoryDeliveryManRepository,
    hashComparer,
    encrypter
  );
});

describe("Authenticate User", () => {
  it("Should be able to authenticate a user", async () => {
    const user = makeDeliveryMan({
      cpf: "111.222.333-44",
      password: "123456-hashed",
    });

    inMemoryDeliveryManRepository.create(user);

    const result = await sut.execute({
      cpf: "111.222.333-44",
      password: "123456",
    });

    expect(result.value).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      })
    );
  });
});
