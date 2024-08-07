import { Either, left, right } from "@/core/either";
import { DeliveryManRepository } from "../repositories/delivery-man-repository";
import { AdminRepository } from "../repositories/admin-repository";
import { HashComparer } from "../cryptography/hashComparer";
import { Encrypter } from "../cryptography/encrypter";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

export interface AuthenticateUserUseCaseRequest {
  cpf: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>;

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: DeliveryManRepository | AdminRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByCPF(cpf);
    
    if (!user) {
      return left(new WrongCredentialsError());
    }

    const thePasswordsMatch = await this.hashComparer.compare(
      password,
      user.password
    );

    if (!thePasswordsMatch) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    });

    return right({ accessToken });
  }
}
