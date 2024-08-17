import { Module } from "@nestjs/common";
import { RegisterUser } from "./controllers/regiter-recipient.controller";
import { RegisterRecipientUseCase } from "@/domain/carrier/application/use-cases/register-recipient";
import { RecipientRepository } from "@/domain/carrier/application/repositories/recipient-repository";
import { InMemoryRecipientRepository } from "test/repositories/in-memory-recipient-repository";
import { HashGenerator } from "@/domain/carrier/application/cryptography/hashGenerator";
import { FakeHasher } from "test/cryptography/fake-hasher";

@Module({
  controllers: [RegisterUser],
  providers: [
    RegisterRecipientUseCase,
    {
      provide: RecipientRepository,
      useClass: InMemoryRecipientRepository,
    },
    {
      provide: HashGenerator,
      useClass: FakeHasher,
    },
  ],
})
export class HttpModule {}
