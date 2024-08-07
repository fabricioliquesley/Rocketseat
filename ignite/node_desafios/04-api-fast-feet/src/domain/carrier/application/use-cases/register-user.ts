import { Either, left, right } from "src/core/either";
import { DeliveryMan } from "../../enterprise/entities/delivery-man";
import { DeliveryManRepository } from "../repositories/delivery-man-repository";
import { HashGenerator } from "../cryptography/hashGenerator";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { AdminRepository } from "../repositories/admin-repository";
import { Admin } from "../../enterprise/entities/admin";

interface RegisterUserUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  { user: DeliveryMan | Admin }
>;

export class RegisterUserUseCase {
  constructor(
    private userRepositoryRepository: DeliveryManRepository | AdminRepository,
    private type: "admin" | "delivery-man",
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameCpf = await this.userRepositoryRepository.findByCPF(cpf);

    if (userWithSameCpf) {
      return left(new UserAlreadyExistsError(cpf));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    let user: DeliveryMan | Admin;

    if (this.type === "delivery-man") {
      user = DeliveryMan.create({
        name,
        cpf,
        password: hashedPassword,
      });
    } else {
      user = Admin.create({
        name,
        cpf,
        password: hashedPassword,
      });
    }

    await this.userRepositoryRepository.create(user);

    return right({ user });
  }
}
