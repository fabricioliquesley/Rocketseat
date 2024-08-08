import { Package } from "../../enterprise/entities/package";

export abstract class PackageRepository {
  abstract findById(id: string): Promise<null | Package>;
  abstract create(_package: Package): Promise<void>;
  abstract delete(_package: Package): Promise<void>;
  abstract save(_package: Package): Promise<void>;
}
