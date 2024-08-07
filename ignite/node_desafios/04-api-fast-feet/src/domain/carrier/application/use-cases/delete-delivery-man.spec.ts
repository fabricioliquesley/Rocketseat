import { InMemoryAdminRepository } from "test/repositories/in-memory-admin-repository";
import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { DeleteDeliveryManUseCase } from "./delete-delivery-man";
import { makeAdmin } from "test/factories/make-admin";
import { makeDeliveryMan } from "test/factories/make-delivery-man";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let inMemoryAdminRepository: InMemoryAdminRepository;
let sut: DeleteDeliveryManUseCase;

beforeEach(() => {
  inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
  inMemoryAdminRepository = new InMemoryAdminRepository();
  sut = new DeleteDeliveryManUseCase(
    inMemoryDeliveryManRepository,
    inMemoryAdminRepository
  );
});

describe("Delete delivery man", () => {
  it("Should be able to delete a delivery man", async () => {
    const admin = makeAdmin();
    const deliveryMan = makeDeliveryMan();

    inMemoryAdminRepository.create(admin);
    inMemoryDeliveryManRepository.create(deliveryMan);

    const result = await sut.execute({
      adminCPF: admin.cpf,
      deliveryManCPF: deliveryMan.cpf,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryManRepository.items).toHaveLength(0);
  });
});
