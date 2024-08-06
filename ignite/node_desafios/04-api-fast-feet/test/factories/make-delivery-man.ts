import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import {
  DeliveryMan,
  DeliveryManProps,
} from "@/domain/carrier/enterprise/entities/delivery-man";
import { faker } from "@faker-js/faker";
import { fake } from "validation-br/dist/cpf";

export function makeDeliveryMan(
  override?: Partial<DeliveryManProps>,
  id?: UniquesEntityId
) {
  const deliveryMan = DeliveryMan.create(
    {
      name: faker.person.fullName(),
      password: faker.internet.password(),
      cpf: fake(),
      ...override,
    },
    id
  );

  return deliveryMan;
}
