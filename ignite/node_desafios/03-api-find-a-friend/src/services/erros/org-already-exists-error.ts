export class OrgAlreadyExistsError extends Error {
  constructor() {
    super("this email already use by other organization.")
  }
}