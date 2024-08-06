import { HashComparer } from "@/domain/carrier/application/cryptography/hashComparer";
import { HashGenerator } from "@/domain/carrier/application/cryptography/hashGenerator";

export class FakeHasher implements HashComparer, HashGenerator {
  async hash(plain: string): Promise<string> {
    return plain.concat("-hashed");
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat("-hashed") === hash;
  }
}
