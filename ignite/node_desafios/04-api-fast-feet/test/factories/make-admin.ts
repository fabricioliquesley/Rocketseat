import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import {
  Admin,
  AdminProps,
} from "@/domain/carrier/enterprise/entities/admin";
import { faker } from "@faker-js/faker";
import { fake } from "validation-br/dist/cpf";

export function makeAdmin(
  override?: Partial<AdminProps>,
  id?: UniquesEntityId
) {
  const admin = Admin.create(
    {
      name: faker.person.fullName(),
      password: faker.internet.password(),
      cpf: fake(),
      ...override,
    },
    id
  );

  return admin;
}
