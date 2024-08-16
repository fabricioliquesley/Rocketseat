import { Either, left, right } from "src/core/either";
import { Admin } from "../../enterprise/entities/admin";
import { AdminRepository } from "../repositories/admin-repository";
import { HashGenerator } from "../cryptography/hashGenerator";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterAdminUseCaseRequest {
  name: string;
  cpf: string;
  password: string;
}

type RegisterAdminUseCaseResponse = Either<
  UserAlreadyExistsError,
  { admin: Admin }
>;

export class RegisterAdminUseCase {
  constructor(
    private adminRepositoryRepository: AdminRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterAdminUseCaseRequest): Promise<RegisterAdminUseCaseResponse> {
    const adminWithSameCpf = await this.adminRepositoryRepository.findByCPF(
      cpf
    );

    if (adminWithSameCpf) {
      return left(new UserAlreadyExistsError(cpf));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const admin = Admin.create({
      name,
      cpf,
      password: hashedPassword,
    });

    await this.adminRepositoryRepository.create(admin);

    return right({ admin });
  }
}
