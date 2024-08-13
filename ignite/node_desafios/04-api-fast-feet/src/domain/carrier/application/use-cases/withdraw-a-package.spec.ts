import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { InMemoryPackageRepository } from "test/repositories/in-memory-package-repository";
import { WithdrawAPackageUseCase } from "./withdraw-a-package";
import { makePackage } from "test/factories/make-package";
import { makeDeliveryMan } from "test/factories/make-delivery-man";

let inMemoryPackageRepository: InMemoryPackageRepository;
let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let sut: WithdrawAPackageUseCase;

beforeEach(() => {
  inMemoryPackageRepository = new InMemoryPackageRepository();
  inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
  sut = new WithdrawAPackageUseCase(
    inMemoryPackageRepository,
    inMemoryDeliveryManRepository
  );
});

describe("Withdraw a package", () => {
  it("Should be able to mark a package as withdraw", async () => {
    const _package = makePackage();
    const deliveryMan = makeDeliveryMan();

    inMemoryPackageRepository.create(_package);
    inMemoryDeliveryManRepository.create(deliveryMan);

    const result = await sut.execute({
      packageId: _package.id,
      deliveryManId: deliveryMan.id,
    });
    
    expect(result.isRight()).toBe(true);
    expect(inMemoryPackageRepository.items[0].deliveryManId).toEqual(
      deliveryMan.id
    );
  });
});
