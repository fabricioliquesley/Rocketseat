import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import {
  Package,
  PackageProps,
} from "@/domain/carrier/enterprise/entities/package";
import { faker } from "@faker-js/faker";

export function makePackage(
  override?: Partial<PackageProps>,
  id?: UniquesEntityId
) {
  const _package = Package.create(
    {
      code: "Px0001",
      type: "fragile",
      recipientId: new UniquesEntityId("01"),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id
  );

  return _package;
}
