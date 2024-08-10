import { Either, left, right } from "src/core/either";
import { HashGenerator } from "../cryptography/hashGenerator";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { RecipientRepository } from "../repositories/recipient-repository";
import { Recipient } from "../../enterprise/entities/recipient";

interface RegisterRecipientUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

type RegisterRecipientUseCaseResponse = Either<
  UserAlreadyExistsError,
  { recipient: Recipient }
>;

export class RegisterRecipientUseCase {
  constructor(
    private recipientRepositoryRepository: RecipientRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipientWithSameCpf =
      await this.recipientRepositoryRepository.findByCPF(cpf);

    if (recipientWithSameCpf) {
      return left(new UserAlreadyExistsError(cpf));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const recipient = Recipient.create({
      name,
      cpf,
      password: hashedPassword,
    });

    await this.recipientRepositoryRepository.create(recipient);

    return right({ recipient });
  }
}
