export class invalidCredentialsError extends Error {
  constructor() {
    super("invalid credentials.")
  }
}