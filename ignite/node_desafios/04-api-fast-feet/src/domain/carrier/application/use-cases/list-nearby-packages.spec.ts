import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { InMemoryPackageRepository } from "test/repositories/in-memory-package-repository";
import { makeDeliveryMan } from "test/factories/make-delivery-man";
import { makePackage } from "test/factories/make-package";
import { ListNearbyPackagesUseCase } from "./list-nearby-packages";

let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let inMemoryPackageRepository: InMemoryPackageRepository;
let sut: ListNearbyPackagesUseCase;

beforeEach(() => {
  inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
  inMemoryPackageRepository = new InMemoryPackageRepository();
  sut = new ListNearbyPackagesUseCase(
    inMemoryDeliveryManRepository,
    inMemoryPackageRepository
  );
});

describe("List nearby packages", () => {
  it("Should be able to list packages with delivery location nearby delivery man location", async () => {
    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryManRepository.create(deliveryMan);

    const _package1 = makePackage({
      deliveryManId: deliveryMan.id,
      latitude: -19.8391873,
      longitude: -43.9060971,
    });
    const _package2 = makePackage();
    const _package3 = makePackage({
      deliveryManId: deliveryMan.id,
      latitude: -19.826025,
      longitude: -43.883106,
    });

    inMemoryPackageRepository.create(_package1);
    inMemoryPackageRepository.create(_package2);
    inMemoryPackageRepository.create(_package3);

    const result = await sut.execute({
      deliveryId: deliveryMan.id,
      deliveryManLatitude: -19.829548,
      deliveryManLongitude: -43.888267,
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.packages).toHaveLength(2);
  });

  it("Should be able to list paginated packages with delivery location nearby delivery man location", async () => {
    const deliveryMan = makeDeliveryMan();
    inMemoryDeliveryManRepository.create(deliveryMan);

    for (let i = 0; i < 22; i++) {
      const _package = makePackage({
        deliveryManId: deliveryMan.id,
        latitude: -19.8391873,
        longitude: -43.9060971,
      });

      inMemoryPackageRepository.create(_package);
    }

    const result = await sut.execute({
      deliveryId: deliveryMan.id,
      deliveryManLatitude: -19.829548,
      deliveryManLongitude: -43.888267,
      page: 2,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.packages).toHaveLength(2);
  });
});
