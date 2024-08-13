import { UseCaseError } from "@/core/errors/use-case-error";

export class PasswordNotMatchError extends Error implements UseCaseError {
  constructor() {
    super("The passwords don't match");
  }
}
