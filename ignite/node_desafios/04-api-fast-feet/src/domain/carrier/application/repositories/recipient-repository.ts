export abstract class RecipientRepository {
  abstract findById(id: string): Promise<any | null>;
}
