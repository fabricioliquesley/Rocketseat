import { InMemoryAdminRepository } from "test/repositories/in-memory-admin-repository";
import { InMemoryPackageRepository } from "test/repositories/in-memory-package-repository";
import { MarkPackageAsOnHoldUseCase } from "./mark-package-as-on-hold";
import { makePackage } from "test/factories/make-package";
import { makeAdmin } from "test/factories/make-admin";

let inMemoryPackageRepository: InMemoryPackageRepository;
let inMemoryAdminRepository: InMemoryAdminRepository;
let sut: MarkPackageAsOnHoldUseCase;

beforeEach(() => {
  inMemoryPackageRepository = new InMemoryPackageRepository();
  inMemoryAdminRepository = new InMemoryAdminRepository();
  sut = new MarkPackageAsOnHoldUseCase(
    inMemoryPackageRepository,
    inMemoryAdminRepository
  );
});

describe("Mark a package as on hold", () => {
  it("Should be able to mark a package as on hold", async () => {
    const _package = makePackage();
    const admin = makeAdmin();

    inMemoryPackageRepository.create(_package);
    inMemoryAdminRepository.create(admin);

    const result = await sut.execute({
      packageId: _package.id,
      adminId: admin.id,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryPackageRepository.items[0]).toEqual(
      expect.objectContaining({
        situation: "on_hold"
      })
    )
  });
});
