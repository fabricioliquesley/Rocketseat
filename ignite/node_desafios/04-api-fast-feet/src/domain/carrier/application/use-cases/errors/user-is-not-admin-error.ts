import { UseCaseError } from "@/core/errors/use-case-error";

export class UserIsNotAdminError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`The user ${identifier} is not an administrator`);
  }
}
