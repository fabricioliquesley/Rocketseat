import { InMemoryDeliveryManRepository } from "test/repositories/in-memory-delivery-man-repository";
import { InMemoryPackageRepository } from "test/repositories/in-memory-package-repository";
import { DeliverAPackageUseCase } from "./deliver-a-package";
import { makePackage } from "test/factories/make-package";
import { makeDeliveryMan } from "test/factories/make-delivery-man";
import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import { DeliveryManNotMatchError } from "./errors/delivery-man-not-match-error";
import { InMemoryAttachmentRepository } from "test/repositories/in-memory-attachment-repository";
import { makeAttachment } from "test/factories/make-attachment";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

let inMemoryPackageRepository: InMemoryPackageRepository;
let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository;
let inMemoryAttachmentRepository: InMemoryAttachmentRepository;
let sut: DeliverAPackageUseCase;

beforeEach(() => {
  inMemoryPackageRepository = new InMemoryPackageRepository();
  inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository();
  inMemoryAttachmentRepository = new InMemoryAttachmentRepository();
  sut = new DeliverAPackageUseCase(
    inMemoryPackageRepository,
    inMemoryDeliveryManRepository,
    inMemoryAttachmentRepository
  );
});

describe("Mark a package as delivered", () => {
  it("Should be able to mark a package as delivered", async () => {
    const _package = makePackage();
    const packageAttachment = makeAttachment(_package.id);
    const deliveryMan = makeDeliveryMan();

    inMemoryPackageRepository.create(_package);
    inMemoryDeliveryManRepository.create(deliveryMan);
    inMemoryAttachmentRepository.create(packageAttachment);

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
    const packageAttachment = makeAttachment(_package.id);
    const deliveryMan = makeDeliveryMan();

    inMemoryPackageRepository.create(_package);
    inMemoryDeliveryManRepository.create(deliveryMan);
    inMemoryAttachmentRepository.create(packageAttachment);

    _package.registerDeliveryMan(new UniquesEntityId("other-delivery-man"));
    inMemoryPackageRepository.save(_package);

    const result = await sut.execute({
      packageId: _package.id,
      deliveryManId: deliveryMan.id,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(DeliveryManNotMatchError);
  });

  it("should not be possible to mark an order as delivered if a photo has not been sent", async () => {
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

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
