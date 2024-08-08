import { PackageRepository } from "@/domain/carrier/application/repositories/package-repository";
import { Package } from "@/domain/carrier/enterprise/entities/package";

export class InMemoryPackageRepository implements PackageRepository {
  public items: Package[] = [];

  async findById(id: string): Promise<Package> {
    const _package = this.items.find((item) => item.id.toString() === id);

    return _package;
  }

  async create(_package: Package): Promise<void> {
    this.items.push(_package);
  }

  async delete(_package: Package): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(_package.id));

    this.items.splice(index, 1);
  }

  async save(_package: Package): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(_package.id));

    this.items[index] = _package;
  }
}
