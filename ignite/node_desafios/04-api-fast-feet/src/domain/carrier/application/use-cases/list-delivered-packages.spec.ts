import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { InMemoryPackageRepository } from "test/repositories/in-memory-package-repository";
import { ListDeliveredPackagesUseCase } from "./list-delivered-packages";
import { makeDeliveryMan } from "test/factories/make-delivery-man";
import { makePackage } from "test/factories/make-package";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let inMemoryPackageRepository: InMemoryPackageRepository;
let sut: ListDeliveredPackagesUseCase;

beforeEach(() => {
  inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
  inMemoryPackageRepository = new InMemoryPackageRepository();
  sut = new ListDeliveredPackagesUseCase(
    inMemoryDeliveryManRepository,
    inMemoryPackageRepository
  );
});

describe("List delivered packages", () => {
  it("Should be able to list all delivered packages of a delivery man", async () => {
    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryManRepository.create(deliveryMan);

    const _package1 = makePackage({
      deliveryManId: deliveryMan.id,
      situation: "delivered",
      deliveredAt: new Date("2024-08-12T14:33:45.424Z"),
    });
    const _package2 = makePackage();
    const _package3 = makePackage({
      deliveryManId: deliveryMan.id,
      situation: "delivered",
      deliveredAt: new Date("2024-08-10T12:45:45.424Z"),
    });

    inMemoryPackageRepository.create(_package1);
    inMemoryPackageRepository.create(_package2);
    inMemoryPackageRepository.create(_package3);

    const result = await sut.execute({
      deliveryId: deliveryMan.id,
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.packages).toHaveLength(2);
  });

  it("Should be able to list paginated delivered packages of a delivery man", async () => {
    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryManRepository.create(deliveryMan);

    for (let i = 0; i < 22; i++) {
      const _package = makePackage({
        deliveryManId: deliveryMan.id,
        situation: "delivered",
        deliveredAt: new Date("2024-08-10T12:45:45.424Z"),
      });

      inMemoryPackageRepository.create(_package);
    }

    const result = await sut.execute({
      deliveryId: deliveryMan.id,
      page: 2,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.packages).toHaveLength(2);
  });
});
