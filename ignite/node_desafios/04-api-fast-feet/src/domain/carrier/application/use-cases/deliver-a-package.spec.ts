import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { InMemoryPackageRepository } from "test/repositories/in-memory-package-repository";
import { DeliverAPackageUseCase } from "./deliver-a-package";
import { makePackage } from "test/factories/make-package";
import { makeDeliveryMan } from "test/factories/make-delivery-man";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import { DeliveryManNotMatchError } from "./errors/delivery-man-not-match-error";

let inMemoryPackageRepository: InMemoryPackageRepository;
let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let sut: DeliverAPackageUseCase;

beforeEach(() => {
  inMemoryPackageRepository = new InMemoryPackageRepository();
  inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
  sut = new DeliverAPackageUseCase(
    inMemoryPackageRepository,
    inMemoryDeliveryManRepository
  );
});

describe("Mark a package as delivered", () => {
  it("Should be able to mark a package as delivered", async () => {
    const _package = makePackage();
    const deliveryMan = makeDeliveryMan();

    inMemoryPackageRepository.create(_package);
    inMemoryDeliveryManRepository.create(deliveryMan);

    _package.registerDeliveryMan(deliveryMan.id);
    inMemoryPackageRepository.save(_package);

    const result = await sut.execute({
      packageId: _package.id,
      deliveryManId: deliveryMan.id,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryPackageRepository.items[0].situation).toEqual("delivered");
  });

  it("Should not be able to mark a package as delivered with other delivery man", async () => {
    const _package = makePackage();
    const deliveryMan = makeDeliveryMan();

    inMemoryPackageRepository.create(_package);
    inMemoryDeliveryManRepository.create(deliveryMan);

    _package.registerDeliveryMan(new UniquesEntityId("other-delivery-man"));
    inMemoryPackageRepository.save(_package);

    const result = await sut.execute({
      packageId: _package.id,
      deliveryManId: deliveryMan.id,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DeliveryManNotMatchError);
  });
});
