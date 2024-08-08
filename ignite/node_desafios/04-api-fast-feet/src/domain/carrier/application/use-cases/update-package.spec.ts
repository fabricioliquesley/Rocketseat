import { InMemoryAdminRepository } from "test/repositories/in-memory-admin-repository";
import { InMemoryPackageRepository } from "test/repositories/in-memory-package-repository";
import { UpdatePackageUseCase } from "./update-package";
import { makePackage } from "test/factories/make-package";
import { makeAdmin } from "test/factories/make-admin";

let inMemoryPackageRepository: InMemoryPackageRepository;
let inMemoryAdminRepository: InMemoryAdminRepository;
let sut: UpdatePackageUseCase;

beforeEach(() => {
  inMemoryPackageRepository = new InMemoryPackageRepository();
  inMemoryAdminRepository = new InMemoryAdminRepository();
  sut = new UpdatePackageUseCase(
    inMemoryPackageRepository,
    inMemoryAdminRepository
  );
});

describe("Update Package", () => {
  it("Should be able to update an package", async () => {
    const _package = makePackage();
    const admin = makeAdmin();

    inMemoryPackageRepository.create(_package);
    inMemoryAdminRepository.create(admin);

    const result = await sut.execute({
      adminId: admin.id,
      packageId: _package.id,
      code: "Px0002",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({ code: "Px0002" })
    );
  });
});
