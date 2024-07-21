import { HashComparer } from "@/domain/forum/application/cryptography/hashComparer";
import { HashGenerator } from "@/domain/forum/application/cryptography/hashGenerator";
import { compare, hash } from "bcryptjs";

export class bcryptHasher implements HashGenerator, HashComparer {
  hash(plain: string): Promise<string> {
    return hash(plain, 8);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
