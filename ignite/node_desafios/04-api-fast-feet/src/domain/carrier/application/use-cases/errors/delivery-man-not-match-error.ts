import { UseCaseError } from "@/core/errors/use-case-error";

export class DeliveryManNotMatchError extends Error implements UseCaseError {
  constructor() {
    super("the deliverers don't match");
  }
}
