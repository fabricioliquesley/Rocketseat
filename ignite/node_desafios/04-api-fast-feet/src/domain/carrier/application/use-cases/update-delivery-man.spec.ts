import { InMemoryAdminRepository } from "test/repositories/in-memory-admin-repository";
import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { UpdateDeliveryManUseCase } from "./update-delivery-man";
import { makeAdmin } from "test/factories/make-admin";
import { makeDeliveryMan } from "test/factories/make-delivery-man";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let inMemoryAdminRepository: InMemoryAdminRepository;
let sut: UpdateDeliveryManUseCase;

beforeEach(() => {
  inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
  inMemoryAdminRepository = new InMemoryAdminRepository();
  sut = new UpdateDeliveryManUseCase(
    inMemoryDeliveryManRepository,
    inMemoryAdminRepository
  );
});

describe("Update delivery man", () => {
  it("Should be able to update a delivery man", async () => {
    const admin = makeAdmin();
    const deliveryMan = makeDeliveryMan();

    inMemoryAdminRepository.create(admin);
    inMemoryDeliveryManRepository.create(deliveryMan);

    const result = await sut.execute({
      adminCPF: admin.cpf,
      deliveryManCPF: deliveryMan.cpf,
      name: "Lucas",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryManRepository.items[0]).toEqual(
      expect.objectContaining({
        name: "Lucas",
      })
    );
  });

  it(" shouldn't be possible to update the cpf if it already exists", async () => {
    const admin = makeAdmin();
    const deliveryMan = makeDeliveryMan();

    inMemoryAdminRepository.create(admin);
    inMemoryDeliveryManRepository.create(deliveryMan);

    const result = await sut.execute({
      adminCPF: admin.cpf,
      deliveryManCPF: deliveryMan.cpf,
      cpf: admin.cpf,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});
