import { Module } from "@nestjs/common";
import { JwtEncrypter } from "./jwt-encrypter";
import { Encrypter } from "@/domain/forum/application/cryptography/encrypter";
import { HashComparer } from "@/domain/forum/application/cryptography/hashComparer";
import { bcryptHasher } from "./bcrypt-hasher";
import { HashGenerator } from "@/domain/forum/application/cryptography/hashGenerator";

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: bcryptHasher },
    { provide: HashGenerator, useClass: bcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
