import { InMemoryPackageRepository } from "test/repositories/in-memory-package-repository";
import { InMemoryAdminRepository } from "test/repositories/in-memory-admin-repository";
import { DeletePackageUseCase } from "./delete-package";
import { makePackage } from "test/factories/make-package";
import { makeAdmin } from "test/factories/make-admin";

let inMemoryPackageRepository: InMemoryPackageRepository;
let inMemoryAdminRepository: InMemoryAdminRepository;
let sut: DeletePackageUseCase;

beforeEach(() => {
  inMemoryPackageRepository = new InMemoryPackageRepository();
  inMemoryAdminRepository = new InMemoryAdminRepository();
  sut = new DeletePackageUseCase(
    inMemoryPackageRepository,
    inMemoryAdminRepository
  );
});

describe("Delete Package", () => {
  it("Should be able to delete an package", async () => {
    const _package = makePackage();
    const admin = makeAdmin();

    inMemoryPackageRepository.items.push(_package);
    inMemoryAdminRepository.items.push(admin);

    const result = await sut.execute({
      adminId: admin.id,
      packageId: _package.id,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryPackageRepository.items).toHaveLength(0);
  });
});
