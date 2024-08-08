import { UniquesEntityId } from "@/core/entities/unique-entity-id";
import {
  Recipient,
  RecipientProps,
} from "@/domain/carrier/enterprise/entities/recipient";
import { faker } from "@faker-js/faker";
import { fake } from "validation-br/dist/cpf";

export function makeRecipient(
  override?: Partial<RecipientProps>,
  id?: UniquesEntityId
) {
  const recipient = Recipient.create(
    {
      name: faker.person.fullName(),
      password: faker.internet.password(),
      cpf: fake(),
      ...override,
    },
    id
  );

  return recipient;
}
