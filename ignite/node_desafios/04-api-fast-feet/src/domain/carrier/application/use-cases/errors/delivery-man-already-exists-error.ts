import { UseCaseError } from "src/core/errors/use-case-error";

export class DeliveryManAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`Delivery man ${identifier} already exists`);
  }
}
